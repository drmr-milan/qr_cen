"use client";

import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
// import { URL_schema } from "@/lib/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit, IconPlus } from "@tabler/icons-react";

const URL_schema = z.object({
	Instagram: z.string(),
	Facebook: z.string().url({ message: "Mora biti isptava link" }).max(100, { message: "Link ne može biti duži od 100 karaktera" }),
});

export function URL_form_wrapper({ name, value }) {
	const form = useForm({ resolver: zodResolver(URL_schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	function onSubmit(data) {
		console.log(data);

		// e.preventDefault();

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
		<div>
			<div className="flex justify-between items-center">
				<p>{name}</p>

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
									name={name}
									defaultValue={value || ""}
									type="url"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									form={`${name}_form`}
								>
									Sačuvaj
								</Button>
							</form>
						</Form>
						<DialogFooter>
							<DialogClose>Odustani</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{value && (
				<Link
					href={value}
					target="_blank"
					className="italic underline underline-offset-2"
				>
					{value}
				</Link>
			)}
		</div>
	);
}
