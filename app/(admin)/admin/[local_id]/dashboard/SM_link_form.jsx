"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit, IconPlus } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function SM_link_form({ local_id, name, value, type, schema }) {
	const form = useForm({ resolver: zodResolver(schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	let placeholder = "";
	if (type === "url") placeholder = "https://";
	if (type === "phone") placeholder = "065111222";

	async function onSubmit(data) {
		console.log();

		setOpen(false);

		toast({
			title: `Izmjena - ${name} linka`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher("/api/admin/sm_links", {
			method: "PUT",
			body: JSON.stringify({ local_id, new_link_field: name, new_link_value: data.new_link }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Izmjena - ${name} linka`,
			description: <p>Uspjesno izmjenjeno</p>,
		});

		mutate(`http://0.0.0.0:3000/api/admin/dashboard/${local_id}`);
	}

	async function onSubmit_remove() {
		setOpen(false);

		toast({
			title: `Izmjena - ${name} linka`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher("/api/admin/sm_links", {
			method: "PATCH",
			body: JSON.stringify({ local_id, new_link_field: name }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Izmjena - ${name} linka`,
			description: <p>Uspjesno uklonjen</p>,
		});

		mutate(`http://0.0.0.0:3000/api/admin/dashboard/${local_id}`);
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
							control={form.control}
							name="new_link"
							defaultValue={value || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder={placeholder}
											autoComplete="off"
											type={type}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit_remove)}
						id={`${name}_form_remove`}
						className="hidden"
					></form>
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
							Ukloni link
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
