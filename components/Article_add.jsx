"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { New_article_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconPlus } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Article_add({ local_id, cat_id, cat_name, cat_type, items_type }) {
	const form = useForm({ resolver: zodResolver(New_article_schema) });
	// const form = useForm();
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	async function onSubmit(data) {
		console.log(data);

		// return;

		setOpen(false);

		toast({
			title: `Dodavanje artikla`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/${local_id}/articles/${cat_type}/${items_type}`, {
			method: "POST",
			body: JSON.stringify({ cat_id: data.cat_id, name: data.name, price: Number(data.price), volume: Number(data.volume), desc: data.desc }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Dodavanje artikla`,
			description: <p>Uspjesno dodano</p>,
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
					<IconPlus
						stroke={1}
						size={44}
					/>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Dodaj novu artikl u "{cat_name}"</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id={`new_article_${cat_name.replaceAll(" ", "_")}_form`}
						className="flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="cat_id"
							defaultValue={cat_id}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											className="hidden"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Naziv novog artikla"
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
							name="price"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Cijena"
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
							name="volume"
							defaultValue=""
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
							name="desc"
							defaultValue=""
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
				<DialogFooter className="grid gap-2">
					<Button
						type="submit"
						form={`new_article_${cat_name.replaceAll(" ", "_")}_form`}
					>
						Dodaj artikl
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
