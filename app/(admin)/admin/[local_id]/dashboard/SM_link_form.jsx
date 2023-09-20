"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit, IconPlus } from "@tabler/icons-react";

export default function SM_link_form({ local_id, name, value, type, schema }) {
	const form = useForm({ resolver: zodResolver(schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	let placeholder = "";
	if (type === "url") placeholder = "https://";
	if (type === "phone") placeholder = "065111222";

	async function onSubmit(data) {
		console.log({ local_id, new_link_field: name, new_link_value: data.new_link });

		setOpen(false);

		toast({
			title: `Izmjena - ${name} linka`,
			description: (
				// <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
				<p>U toku</p>
				// </pre>
			),
		});

		await new Promise((resolve) => setTimeout(resolve, 2000));

		toast({
			title: `Izmjena - ${name} linka`,
			description: (
				// <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
				<p>Uspjesno izmjenjeno</p>
				// </pre>
			),
		});
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
							type={type}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder={placeholder}
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<DialogClose>Odustani</DialogClose>
					<Button
						type="submit"
						form={`${name}_form`}
					>
						Sačuvaj
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
