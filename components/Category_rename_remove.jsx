"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { About_schema, Set_value_null_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Category_rename_delete({ local_id, cat_id, name, cat_type }) {
	const form = useForm({ resolver: zodResolver(About_schema) });
	const form_remove = useForm({ resolver: zodResolver(Set_value_null_schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	async function onSubmit(data) {
		console.log(data);
		return;

		setOpen(false);

		toast({
			title: `Izmjena - naziva kategorije`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/cat_update`, {
			method: "PUT",
			body: JSON.stringify({ local_id: data.local_id, col_name: data.col_name, new_value: data.new_value }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Izmjena - naziva kategorije`,
			description: <p>Uspjesno izmjenjeno</p>,
		});

		mutate(`http://0.0.0.0:3000/api/admin/${local_id}/${cat_type}`);
	}

	async function onSubmit_remove(data) {
		console.log(data);
		return;

		setOpen(false);

		toast({
			title: `Brisanje - kategorije`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher("/api/admin/set_value_null", {
			method: "PATCH",
			body: JSON.stringify({ local_id: data.local_id, col_name: data.col_name }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Brisanje - kategorije`,
			description: <p>Uspjesno</p>,
		});

		mutate(`http://0.0.0.0:3000/api/admin/${local_id}/${cat_type}`);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<IconEdit
					stroke={1}
					size={44}
					className="p-2"
				/>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="mb-2">Izmjena - naziva kategorije</DialogTitle>
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
						id={`remove_${cat_type}_form`}
						className="hidden"
					>
						<FormField
							name="local_id"
							defaultValue={local_id}
							render={({ field }) => (
								<FormItem>
									<Input {...field} />
								</FormItem>
							)}
						/>
						<FormField
							name="col_name"
							defaultValue="about"
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
					>
						Sačuvaj
					</Button>

					<Button
						type="submit"
						variant="destructive"
						form={`remove_${cat_type}_form`}
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
