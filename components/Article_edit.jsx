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

export default function Article_edit({ local_id, cat_type, items_type, cat_id, article_id, article_name, order_num }) {
	const form = useForm({ resolver: zodResolver(Edit_cat_schema) });
	const form_remove = useForm();
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

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
				{/* <Form {...form}>
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
				</Form> */}

				<Form {...form_remove}>
					<form
						onSubmit={form_remove.handleSubmit(onSubmit_remove)}
						id={`remove_${article_id}_form`}
						className="hidden"
					></form>
				</Form>
				<DialogFooter className="grid gap-2">
					{/* <Button
						type="submit"
						form={`rename_${cat_type}_form`}
						className="bg-gray-900 text-gray-50"
					>
						Sačuvaj
					</Button> */}

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
