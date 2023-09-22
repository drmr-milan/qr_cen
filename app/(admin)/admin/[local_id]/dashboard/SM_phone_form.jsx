"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { Phone_schema, Set_value_null_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit, IconPlus } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function SM_phone_form({ local_id, name, value }) {
	const form = useForm({ resolver: zodResolver(Phone_schema) });
	const form_remove = useForm({ resolver: zodResolver(Set_value_null_schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	async function onSubmit(data) {
		setOpen(false);

		toast({
			title: `Izmjena - telefona`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher("/api/admin/sm_phone", {
			method: "PUT",
			body: JSON.stringify({ local_id: data.local_id, col_name: data.col_name, new_value: data.new_value }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Izmjena - telefona`,
			description: <p>Uspjesno izmjenjeno</p>,
		});

		mutate(`http://0.0.0.0:3000/api/admin/${local_id}`);
	}

	async function onSubmit_remove(data) {
		setOpen(false);

		toast({
			title: `Brisanje - telefona`,
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
			title: `Brisanje - telefona`,
			description: <p>Uspjesno</p>,
		});

		mutate(`http://0.0.0.0:3000/api/admin/${local_id}`);
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				{value ? (
					"edit" && (
						<IconEdit
							stroke={1}
							size={44}
							className="p-2"
						/>
					)
				) : (
					<IconPlus
						stroke={1}
						size={44}
						className="p-2"
					/>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Izmjena - {name} linka</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id={`${name}_form`}
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
							name="col_name"
							defaultValue={name}
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
							defaultValue={value || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="066010232"
											autoComplete="off"
											type="tel"
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
						id={`${name}_form_remove`}
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
							defaultValue={name}
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
						form={`${name}_form`}
					>
						Sačuvaj
					</Button>

					{value && (
						<Button
							type="submit"
							variant="destructive"
							form={`${name}_form_remove`}
						>
							Ukloni telefon
						</Button>
					)}

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
