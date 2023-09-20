"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconCheck } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { IconRestore } from "@tabler/icons-react";
import { useState } from "react";

// import useSWR, { mutate } from "swr";
// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function Social_m_form({ form_name, type, value }) {
	return (
		<form
			className="relative my-4"
			onSubmit={async (e) => {
				e.preventDefault();

				console.log(e.target[form_name].value);
			}}
		>
			<Label
				htmlFor={form_name}
				className="bg-gray-200 px-1 absolute top-[-1rem] left-2 text-base font-normal"
			>
				{form_name}
			</Label>

			<div className="flex gap-2 items-center">
				<Input
					key={form_name}
					type={type}
					id={form_name}
					placeholder={form_name}
					className="bg-transparent border-[1px] border-gray-900 text-base flex-grow"
					defaultValue={value}
				/>

				<button
					type="button"
					onClick={() => (document.getElementById(form_name).value = value)}
				>
					<IconRestore
						size={44}
						stroke={1}
						className="p-2"
					/>
				</button>

				<button type="submit">
					<IconCheck
						size={44}
						stroke={1}
						className="p-2"
					/>
				</button>
			</div>
		</form>
	);
}

export function About_form({ local_id }) {
	const { data, error, isLoading } = useSWR(`http://0.0.0.0:3000/api/admin/about?local_id=${local_id}`, fetcher);

	if (isLoading) return <p>Loading...</p>;

	const { content } = data;

	console.log(content);

	return (
		<form
			className="relative mt-4"
			onSubmit={async (e) => {
				e.preventDefault();

				const send_req = await fetch("http://0.0.0.0:3000/api/admin/about", {
					method: "POST",
					body: JSON.stringify({ local_id, about: e.target.about.value }),
				});

				console.log(send_req.status);

				const resp = await send_req.json();

				console.log(resp);

				mutate(`http://0.0.0.0:3000/api/admin/about?local_id=${local_id}`);
			}}
		>
			<Label
				htmlFor="about"
				className="bg-gray-200 px-1 absolute top-[-1rem] left-2 text-base font-normal"
			>
				Opis
			</Label>

			<Textarea
				id="about"
				name="about"
				defaultValue={content}
				className="bg-transparent border-[1px] border-gray-900 text-base flex-grow h-[15rem] resize-none"
				// onInput={(e) => setState(e.target.value.length)}
				maxLength="300"
			/>

			{/* <p className="bg-gray-200 px-1 pb-1 absolute top-0 right-2 text-sm font-normal translate-y-[-50%]">{state} / 300</p> */}

			<div className="flex gap-2 justify-end">
				<button
					type="button"
					onClick={() => (document.getElementById("about").value = content)}
				>
					<IconRestore
						size={44}
						stroke={1}
						className="p-2"
					/>
				</button>

				<button type="submit">
					<IconCheck
						size={44}
						stroke={1}
						className="p-2"
					/>
				</button>
			</div>
		</form>
	);
}

export function Work_hours_form({ day_of_week }) {
	return (
		<form id={`form_${day_of_week}`}>
			<Label className="text-base font-normal">{day_of_week.split("_")[0]}</Label>

			<div className="flex gap-2 items-center justify-between">
				<div className="flex flex-grow gap-2">
					<Input
						type="time"
						name="time_from"
						placeholder="od"
						className="bg-transparent p-0 border-transparent border-b-[1px] border-b-gray-900 text-base flex-grow rounded-none"
						defaultValue="07:30"
					/>
					<Input
						type="time"
						name="time_to"
						placeholder="do"
						className="bg-transparent p-0 border-transparent border-b-[1px] border-b-gray-900 text-base flex-grow rounded-none"
						defaultValue=""
					/>
				</div>

				<div className="flex gap-2 items-center">
					{/* //TODO Create new form with id to set null values in db */}
					<button type="button">
						<IconX
							size={44}
							stroke={1}
							className="p-2"
						/>
					</button>
					<button type="submit">
						<IconCheck
							size={44}
							stroke={1}
							className="p-2"
						/>
					</button>
				</div>
			</div>
		</form>
	);
}
