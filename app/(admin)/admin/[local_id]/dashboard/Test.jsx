"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IconEdit, IconPlus } from "@tabler/icons-react";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
	username: z.string().url({ message: "Mora biti isptava link" }),
});

export default function Test({ name, value, type }) {
	const form = useForm({ resolver: zodResolver(FormSchema) });

	const { toast } = useToast();

	const [open, setOpen] = useState(false);

	function onSubmit(data) {
		console.log(data);

		setOpen(false);

		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
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
						id="ig_form"
					>
						<FormField
							control={form.control}
							name="username"
							defaultValue={value || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} />
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
						form="ig_form"
					>
						Sačuvaj
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
