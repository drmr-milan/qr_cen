"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { New_cat_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Category_add({ local_id, cat_type }) {
	const form = useForm({ resolver: zodResolver(New_cat_schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	async function onSubmit(data) {
		setOpen(false);

		toast({
			title: `Dodavanje nove kategorije`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/${local_id}/${cat_type}`, {
			method: "POST",
			body: JSON.stringify({ local_id: data.local_id, new_value: data.new_value }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Dodavanje nove kategorije`,
			description: <p>Uspjesno dodano</p>,
		});

		mutate(`http://0.0.0.0:3000/api/admin/${local_id}/${cat_type}`);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Button className="bg-gray-900 text-gray-50">Dodaj novu kategoriju</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Dodaj novu kategoriju</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id={`new_${cat_type}_form`}
					>
						<FormField
							name="local_id"
							defaultValue={local_id}
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
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Naziv nove kategorije"
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
						form={`new_${cat_type}_form`}
					>
						Dodaj kategoriju
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
