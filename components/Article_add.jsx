"use client";

import { Button } from "@/components/ui/button";

import { IconPlus } from "@tabler/icons-react";

export default function Article_add({ local_id, cat_id }) {
	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				className="bg-gray-900 text-gray-50"
			>
				<IconPlus
					stroke={1}
					size={44}
				/>
			</Button>
		</>
	);
}
