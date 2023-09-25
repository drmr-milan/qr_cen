"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { Delete_article_schema, Edit_cat_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Article_edit({
	local_id,
	cat_type,
	items_type,
	cat_id,
	article_id,
	article_name,
	article_price,
	article_volume,
	article_descr,
	order_num,
}) {
	// const form = useForm({ resolver: zodResolver(Edit_cat_schema) });
	const form = useForm();
	const form_remove = useForm();
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	async function onSubmit(data) {
		setOpen(false);

		toast({
			title: `Izmjena - naziva kategorije`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/${local_id}/articles/${cat_type}/${items_type}`, {
			method: "PUT",
			body: JSON.stringify({
				article_id: data.article_id,
				article_name: data.article_name,
				article_price: data.article_price,
				article_volume: data.article_volume,
				article_descr: data.article_descr,
			}),
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

	async function onSubmit_remove() {
		setOpen(false);

		toast({
			title: `Brisanje - artikla`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/${local_id}/articles/${cat_type}/${items_type}`, {
			method: "DELETE",
			body: JSON.stringify({ article_id, cat_id, order_num }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Brisanje - artikla`,
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
				>
					<IconEdit
						stroke={1}
						size={44}
					/>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="mb-2">Izmjena - artikla {article_name}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id={`edit_${article_id}_form`}
						className="flex flex-col gap-4"
					>
						<FormField
							name="article_id"
							defaultValue={article_id}
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
							name="article_name"
							defaultValue={article_name || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											autoComplete="off"
											type="text"
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="article_price"
							defaultValue={article_price || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											autoComplete="off"
											type="number"
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="article_volume"
							defaultValue={article_volume && article_volume !== "0.00" ? article_volume : ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Zapremina u litrama"
											autoComplete="off"
											type="number"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="article_descr"
							defaultValue={article_descr || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Opis"
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
						id={`remove_${article_id}_form`}
						className="hidden"
					></form>
				</Form>
				<DialogFooter className="grid gap-2">
					<Button
						type="submit"
						form={`edit_${article_id}_form`}
						className="bg-gray-900 text-gray-50"
					>
						Sačuvaj
					</Button>

					<Button
						type="submit"
						variant="destructive"
						form={`remove_${article_id}_form`}
					>
						Obriši artikl
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
