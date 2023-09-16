"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconCheck } from "@tabler/icons-react";
import { IconRestore } from "@tabler/icons-react";
import { useState } from "react";

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

export function About_form({ value }) {
	const [state, setState] = useState(value?.lenght || 0);

	return (
		<form className="relative">
			<Label
				htmlFor="about"
				className="bg-gray-200 px-1 absolute top-[-1rem] left-2 text-base font-normal"
			>
				Tekst
			</Label>

			<Textarea
				id="about"
				name="about"
				placeholder="Opis o Vama i vasem lokalu"
				defaultValue={value}
				className="bg-transparent border-[1px] border-gray-900 text-base flex-grow h-[15rem] resize-none"
				// onInput={(e) => setState(e.target.about.value.lenght)}
				onInput={(e) => setState(e.target.value.length)}
				onKeyPress={(e) => {
					if (state >= 300) return e.preventDefault();
				}}
			/>

			<p className="bg-gray-200 px-1 absolute top-0 right-2 text-sm font-normal translate-y-[-50%]">{state} / 300</p>

			<div className="flex  justify-end ">
				<button
					type="button"
					onClick={() => (document.getElementById("about").value = value)}
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
