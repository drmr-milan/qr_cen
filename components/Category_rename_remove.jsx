"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { Delete_cat_schema, Edit_cat_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Category_rename_delete({ local_id, cat_type, items_type, cat_id, name, order_num }) {
	const form = useForm({ resolver: zodResolver(Edit_cat_schema) });
	const form_remove = useForm({ resolver: zodResolver(Delete_cat_schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	async function onSubmit(data) {
		setOpen(false);

		toast({
			title: `Izmjena - naziva kategorije`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/${local_id}/categorys/${cat_type}/${items_type}`, {
			method: "PUT",
			body: JSON.stringify({ cat_id: data.cat_id, new_value: data.new_value }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Izmjena - naziva kategorije`,
			description: <p>Uspjesno izmjenjeno</p>,
		});

		mutate(`/api/admin/${local_id}/categorys/${cat_type}/${items_type}`);
	}

	async function onSubmit_remove(data) {
		setOpen(false);

		toast({
			title: `Brisanje - kategorije`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/${local_id}/categorys/${cat_type}/${items_type}`, {
			method: "DELETE",
			body: JSON.stringify({ cat_id: data.cat_id, order_num: data.order_num }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Brisanje - kategorije`,
			description: <p>Uspjesno</p>,
		});

		mutate(`/api/admin/${local_id}/categorys/${cat_type}/${items_type}`);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="bg-gray-900 text-gray-50"
				>
					<IconEdit
						stroke={1}
						size={44}
					/>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="mb-2">Izmjena - kategorije</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id={`rename_${cat_type}_form`}
					>
						<FormField
							name="cat_id"
							defaultValue={cat_id}
							render={({ field }) => (
								<FormItem>
									<Input
										{...field}
										className="hidden"
									/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="new_value"
							defaultValue={name || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											autoComplete="off"
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>

				<Form {...form_remove}>
					<form
						onSubmit={form_remove.handleSubmit(onSubmit_remove)}
						id={`remove_${name.replaceAll(" ", "_")}_form`}
						className="hidden"
					>
						<FormField
							name="cat_id"
							defaultValue={cat_id}
							render={({ field }) => (
								<FormItem>
									<Input {...field} />
								</FormItem>
							)}
						/>
						<FormField
							name="order_num"
							defaultValue={order_num}
							render={({ field }) => (
								<FormItem>
									<Input {...field} />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter className="grid gap-2">
					<Button
						type="submit"
						form={`rename_${cat_type}_form`}
						className="bg-gray-900 text-gray-50"
					>
						Sačuvaj
					</Button>

					<Button
						type="submit"
						variant="destructive"
						form={`remove_${name.replaceAll(" ", "_")}_form`}
					>
						Obriši kategoriju i sve artikle u njoj
					</Button>

					<Button
						asChild
						variant="ghost"
					>
						<DialogClose>Odustani</DialogClose>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
