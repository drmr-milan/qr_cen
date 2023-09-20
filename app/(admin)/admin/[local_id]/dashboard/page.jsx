"use client";

import Link from "next/link";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { format, differenceInCalendarDays } from "date-fns";

import { IconPencil, IconPlus, IconEdit } from "@tabler/icons-react";

import SM_link_wrapper from "./SM_link_wrapper";
import { Email_schema, Phone_schema, URL_schema } from "@/utils/ValidationShemas";
import { Info_free, Info_paid, Info_paid_exired } from "./Info_elements";

import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Dashboard({ params }) {
	const { data, error, isLoading } = useSWR(`http://0.0.0.0:3000/api/admin/dashboard/${params.local_id}`, fetcher);

	if (isLoading) return <p>Loading...</p>;

	const { content } = data;

	// console.log(content);

	const SM_links = [
		{
			name: "Instagram",
			value: content.instagram,
			type: "url",
			schema: URL_schema,
		},
		{
			name: "Facebook",
			value: content.facebook,
			type: "url",
			schema: URL_schema,
		},
		{
			name: "Booking",
			value: content.booking,
			type: "url",
			schema: URL_schema,
		},
		{
			name: "Website",
			value: content.website,
			type: "url",
			schema: URL_schema,
		},
		{
			name: "Email",
			value: content.email,
			type: "email",
			schema: Email_schema,
		},
		{
			name: "Telefon",
			value: content.telefon,
			type: "phone",
			schema: Phone_schema,
		},
	];

	return (
		<main className="flex-grow py-8">
			<p className="text-center text-xl font-semibold mb-6">{content.name}l</p>

			<section className="grid grid-cols-2 md:grid-cols-4">
				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="text-center font-semibold mb-6">Info</p>

					{content.package === "Besplatan" && <Info_free name={content.name} />}
					{content.package !== "Besplatan" && differenceInCalendarDays(new Date(content.package_expire), new Date()) > 0 && (
						<Info_paid content={content} />
					)}
					{content.package !== "Besplatan" && differenceInCalendarDays(new Date(content.package_expire), new Date()) <= 0 && (
						<Info_paid_exired content={content} />
					)}
				</article>

				<article className="flex flex-col gap-4 px-4 pt-4 pb-6 m-4 rounded-md text-center col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-2">Pregledi ____</p>

					<div className="flex gap-4 items-center justify-center">
						<p>09.2023.</p>

						<p>___</p>

						<p>+- ___ (___%)</p>

						<p>Icon up/down</p>
					</div>

					<div className="flex gap-4 items-center justify-center">
						<p>08.2023.</p>

						<p>___</p>

						<p>+- ___ (___%)</p>

						<p>Icon up/down</p>
					</div>

					<div className="flex gap-4 items-center justify-center">
						<p>07.2023.</p>

						<p>___</p>

						<p>+- ___ (___%)</p>

						<p>Icon up/down</p>
					</div>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Karta pica</p>

					<div className="flex flex-wrap justify-evenly">
						<div className="flex items-center mb-4">
							<p>Katergorija: ___</p>

							<Link href="#">
								<IconPencil
									stroke={1}
									size={46}
									className="p-2"
								/>
							</Link>
						</div>

						<div className="flex items-center mb-4">
							<p>Artikala: ___</p>

							<Link href="#">
								<IconPencil
									stroke={1}
									size={46}
									className="p-2"
								/>
							</Link>
						</div>
					</div>

					<div className="flex gap-2 justify-center">
						<p className="mb-2">Način prikazivanja:</p>

						<RadioGroup defaultValue="option-one">
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="option-one"
									id="option-one"
								/>
								<Label
									htmlFor="option-one"
									className="font-normal text-base"
								>
									Samo tekst
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="option-two"
									id="option-two"
								/>
								<Label
									htmlFor="option-two"
									className="font-normal text-base"
								>
									Sa slikama
								</Label>
							</div>
						</RadioGroup>
					</div>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Meni</p>

					<div className="flex flex-wrap justify-evenly">
						<div className="flex items-center mb-4">
							<p>Katergorija: ___</p>

							<Link href="#">
								<IconPencil
									stroke={1}
									size={46}
									className="p-2"
								/>
							</Link>
						</div>

						<div className="flex items-center mb-4">
							<p>Artikala: ___</p>

							<Link href="#">
								<IconPencil
									stroke={1}
									size={46}
									className="p-2"
								/>
							</Link>
						</div>
					</div>

					<div className="flex gap-2 justify-center">
						<p className="mb-2">Način prikazivanja:</p>

						<RadioGroup defaultValue="option-one">
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="option-one"
									id="option-one"
								/>
								<Label
									htmlFor="option-one"
									className="font-normal text-base"
								>
									Samo tekst
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="option-two"
									id="option-two"
								/>
								<Label
									htmlFor="option-two"
									className="font-normal text-base"
								>
									Sa slikama
								</Label>
							</div>
						</RadioGroup>
					</div>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-1 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Promocije</p>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-1 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Dešavanja</p>
				</article>

				<article className="flex flex-col gap-4 px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-2 text-center">Vise informacija</p>

					{/* <Work_hours_form day_of_week="Ponedeljak" />
					<Work_hours_form day_of_week="Utorak" />
					<Work_hours_form day_of_week="Srijeda" />
					<Work_hours_form day_of_week="Četvrtak" />
					<Work_hours_form day_of_week="Petak" />
					<Work_hours_form day_of_week="Subota" />
					<Work_hours_form day_of_week="Nedelja" /> */}

					<div className="flex justify-between items-center">
						<p>Opis</p>

						{content.about ? (
							<IconEdit
								stroke={1}
								size={44}
								className="p-2"
							/>
						) : (
							<IconPlus
								stroke={1}
								size={44}
								className="p-2"
							/>
						)}
					</div>

					{content.about && <p className="whitespace-pre-wrap">{content.about}</p>}

					{/* <About_form
						value={content.about}
						local_id={content.id}
					/> */}
				</article>

				<article className="flex flex-col gap-2 px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Linkovi</p>

					{SM_links.map((item) => {
						return (
							<SM_link_wrapper
								local_id={params.local_id}
								name={item.name}
								value={item.value}
								type={item.type}
								schema={item.schema}
								key={`${item.name}_element`}
							/>
						);
					})}
				</article>
			</section>
		</main>
	);
}
