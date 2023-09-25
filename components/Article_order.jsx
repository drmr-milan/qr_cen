"use client";

import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { Order_article_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { IconArrowBadgeUp } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Article_order({ local_id, cat_type, items_type, cat_id, item_name, order_num }) {
	const form = useForm({ resolver: zodResolver(Order_article_schema) });
	const { toast } = useToast();

	async function onSubmit(data) {
		console.log(data);

		toast({
			title: `Izmjena - pozicije artikla`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/${local_id}/articles/${cat_type}/${items_type}`, {
			method: "PATCH",
			body: JSON.stringify({ cat_id: data.cat_id, order_num: data.order_num }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Izmjena - pozicije artikla`,
			description: <p>Uspjesno izmjenjeno</p>,
		});

		mutate(`/api/admin/${local_id}/categorys/${cat_type}/${items_type}`);
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					id={`order_${item_name.replaceAll(" ", "_")}_form`}
					className="hidden"
				>
					<FormField
						control={form.control}
						name="cat_id"
						defaultValue={cat_id}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="order_num"
						defaultValue={order_num}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<Button
				type="submit"
				form={`order_${item_name.replaceAll(" ", "_")}_form`}
				variant="ghost"
				size="icon"
				// className="bg-gray-900 text-gray-50"
			>
				<IconArrowBadgeUp
					stroke={1}
					size={44}
				/>
			</Button>
		</>
	);
}
