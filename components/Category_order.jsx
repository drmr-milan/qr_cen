"use client";

import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";

import { IconArrowBadgeUp } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Category_order({ local_id, cat_type, items_type, cat_id, order_num }) {
	const form = useForm();
	const { toast } = useToast();

	async function onSubmit() {
		toast({
			title: `Izmjena - pozicije kategorije`,
			description: <p>U toku</p>,
		});

		const send_data = await fecher(`/api/admin/${local_id}/categorys/${cat_type}/${items_type}`, {
			method: "PATCH",
			body: JSON.stringify({ order_num }),
		}).catch((error) => {
			console.log(error);
			alert("Došlo je do greške.");
			location.reload();
		});

		toast({
			title: `Izmjena - pozicije kategorije`,
			description: <p>Uspjesno izmjenjeno</p>,
		});

		mutate(`/api/admin/${local_id}/categorys/${cat_type}/${items_type}`);
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					id={`order_${cat_id}_form`}
					className="hidden"
				></form>
			</Form>
			<Button
				type="submit"
				form={`order_${cat_id}_form`}
				variant="ghost"
				size="icon"
				className="bg-gray-900 text-gray-50"
			>
				<IconArrowBadgeUp
					stroke={1}
					size={44}
				/>
			</Button>
		</>
	);
}
