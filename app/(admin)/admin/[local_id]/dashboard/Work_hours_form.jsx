"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { Work_hours_schema, Work_hours_remove_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit, IconPlus } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Work_hours_form({ local_id, day_of_week, display_name, from_time, to_time }) {
	const form = useForm({ resolver: zodResolver(Work_hours_schema) });
	const form_remove = useForm({ resolver: zodResolver(Work_hours_remove_schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	async function onSubmit(data) {
		setOpen(false);

		toast({
			title: `Izmjena - radnog vremena - ${display_name}`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher("/api/admin/work_hours", {
			method: "PUT",
			body: JSON.stringify({
				local_id: data.local_id,
				col_name_from: data.col_name_from,
				new_value_from: data.new_value_from,
				col_name_to: data.col_name_to,
				new_value_to: data.new_value_to,
			}),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Izmjena - radnog vremena - ${display_name}`,
			description: <p>Uspjesno izmjenjeno</p>,
		});

		mutate(`http://0.0.0.0:3000/api/admin/${local_id}`);
	}

	async function onSubmit_remove(data) {
		setOpen(false);

		toast({
			title: `Brisanje - radnog vremena - ${display_name}`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher("/api/admin/work_hours", {
			method: "PATCH",
			body: JSON.stringify({ local_id: data.local_id, col_name_from: data.col_name_from, col_name_to: data.col_name_to }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Brisanje - radnog vremena - ${display_name}`,
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
				{from_time ? (
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
					<DialogTitle>Izmjena - radnog vremena - {display_name}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id={`${day_of_week}_form`}
						className="flex gap-2 justify-center"
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
							name="col_name_from"
							defaultValue={`${day_of_week}_from`}
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
							name="new_value_from"
							defaultValue={from_time || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="test@test.test"
											autoComplete="off"
											type="time"
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="col_name_to"
							defaultValue={`${day_of_week}_to`}
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
							name="new_value_to"
							defaultValue={to_time || ""}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="test@test.test"
											autoComplete="off"
											type="time"
											required
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
						id={`${day_of_week}_form_remove`}
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
							name="col_name_from"
							defaultValue={`${day_of_week}_from`}
							render={({ field }) => (
								<FormItem>
									<Input {...field} />
								</FormItem>
							)}
						/>
						<FormField
							name="col_name_to"
							defaultValue={`${day_of_week}_to`}
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
						form={`${day_of_week}_form`}
					>
						Sačuvaj
					</Button>

					{from_time && (
						<Button
							type="submit"
							variant="destructive"
							form={`${day_of_week}_form_remove`}
						>
							Ukloni
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
