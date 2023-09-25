"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { zodResolver } from "@hookform/resolvers/zod";
import { Delete_cat_schema, Edit_cat_schema } from "@/utils/ValidationShemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { IconEdit } from "@tabler/icons-react";

const fecher = (...args) => fetch(...args).then((res) => res.json());

export default function Article_edit({ local_id, cat_type, item_type, article_id, article_name, order_num }) {
	const form = useForm({ resolver: zodResolver(Edit_cat_schema) });
	const form_remove = useForm({ resolver: zodResolver(Delete_cat_schema) });
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	return (
		<Button
			variant="ghost"
			size="icon"
			// className="bg-gray-900 text-gray-50"
		>
			<IconEdit
				stroke={1}
				size={44}
			/>
		</Button>
	);
}
