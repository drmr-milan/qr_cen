"use client";

import useSWR from "swr";

import Link from "next/link";

import { differenceInCalendarDays } from "date-fns";

import { Button } from "@/components/ui/button";

import { Info_free, Info_paid, Info_paid_exired } from "./Info_elements";

import About_form from "./About_form";
import SM_url_form from "./SM_url_form";
import SM_email_form from "./SM_email_form";
import SM_phone_form from "./SM_phone_form";
import Work_hours_form from "./Work_hours_form";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Dashboard({ params }) {
	const { data, error, isLoading } = useSWR(`http://0.0.0.0:3000/api/admin/${params.local_id}`, fetcher);

	if (isLoading) return <p>Loading...</p>;

	const { content } = data;

	// console.log(content);

	return (
		<main className="flex-grow py-8">
			<p className="text-center text-xl font-semibold mb-6">{content.name}</p>

			<section className="grid grid-cols-2 md:grid-cols-4">
				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900 shadow-md">
					<p className="text-center font-semibold mb-6">Info</p>

					{content.package === "Besplatan" && <Info_free name={content.name} />}
					{content.package !== "Besplatan" && differenceInCalendarDays(new Date(content.package_expire), new Date()) > 0 && (
						<Info_paid content={content} />
					)}
					{content.package !== "Besplatan" && differenceInCalendarDays(new Date(content.package_expire), new Date()) <= 0 && (
						<Info_paid_exired content={content} />
					)}
				</article>

				<article className="flex flex-col gap-4 px-4 pt-4 pb-6 m-4 rounded-md text-center col-span-2 border-[1px] border-gray-900 shadow-md">
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

				<article className="flex flex-col gap-4 px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900 shadow-md">
					<p className="font-semibold text-center">Karta pića</p>

					<p className="text-center">
						Katergorija: {content.drinks_cat}
						{content.package === "Besplatno" && " od 5"}
						{content.package === "Plus" && " od 10"}
					</p>

					<p className="text-center">
						Artikala: {content.drinks}
						{content.package === "Besplatno" && " od 50"}
						{content.package === "Plus" && " od 100"}
					</p>

					<p className="text-center">
						Način prikazivanja: {content.drinks_images === 0 && "Samo tekst"}
						{content.drinks_images === 1 && "Sa slikama"}
					</p>

					<Button
						asChild
						className="bg-gray-900"
					>
						<Link href={`/admin/${params.local_id}/edit_drinks`}>Pregled & izmjene</Link>
					</Button>
				</article>

				<article className="flex flex-col gap-4 px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900 shadow-md">
					<p className="font-semibold text-center">Meni</p>

					{/* //TODO: create tables in DB for food_cat & food_items */}
					{/* //TODO: replace content.drinks with respected content.food */}
					{/* //TODO: create /edit_food & change Link href down  */}

					<p className="text-center">
						Katergorija: {content.drinks_cat}
						{content.package === "Besplatno" && " od 5"}
						{content.package === "Plus" && " od 10"}
					</p>

					<p className="text-center">
						Artikala: {content.drinks}
						{content.package === "Besplatno" && " od 50"}
						{content.package === "Plus" && " od 100"}
					</p>

					<p className="text-center">
						Način prikazivanja: {content.drinks_images === 0 && "Samo tekst"}
						{content.drinks_images === 1 && "Sa slikama"}
					</p>

					<Button
						asChild
						className="bg-gray-900"
					>
						<Link href="#">Pregled & izmjene</Link>
					</Button>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-1 border-[1px] border-gray-900 shadow-md">
					<p className="font-semibold mb-6 text-center">Promocije</p>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-1 border-[1px] border-gray-900 shadow-md">
					<p className="font-semibold mb-6 text-center">Dešavanja</p>
				</article>

				<article className="flex flex-col gap-4 px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900 shadow-md">
					<p className="font-semibold text-center">Vise informacija</p>

					<div>
						<div className="flex justify-between items-center">
							<p>Ponedeljak</p>

							<Work_hours_form
								local_id={params.local_id}
								day_of_week="monday"
								display_name="ponedeljak"
								from_time={content.monday_from}
								to_time={content.monday_to}
							/>
						</div>

						{content.monday_from && (
							<p className="italic">
								{content.monday_from.substring(0, 5)} - {content.monday_to.substring(0, 5)}
							</p>
						)}
					</div>

					<div>
						<div className="flex justify-between items-center">
							<p>Utorak</p>

							<Work_hours_form
								local_id={params.local_id}
								day_of_week="tuesday"
								display_name="utorak"
								from_time={content.tuesday_from}
								to_time={content.tuesday_to}
							/>
						</div>

						{content.tuesday_from && (
							<p className="italic">
								{content.tuesday_from.substring(0, 5)} - {content.tuesday_to.substring(0, 5)}
							</p>
						)}
					</div>

					<div>
						<div className="flex justify-between items-center">
							<p>Srijeda</p>

							<Work_hours_form
								local_id={params.local_id}
								day_of_week="wednesday"
								display_name="srijeda"
								from_time={content.wednesday_from}
								to_time={content.wednesday_to}
							/>
						</div>

						{content.wednesday_from && (
							<p className="italic">
								{content.wednesday_from.substring(0, 5)} - {content.wednesday_to.substring(0, 5)}
							</p>
						)}
					</div>

					<div>
						<div className="flex justify-between items-center">
							<p>Četvrtak</p>

							<Work_hours_form
								local_id={params.local_id}
								day_of_week="thursday"
								display_name="četvrtak"
								from_time={content.thursday_from}
								to_time={content.thursday_to}
							/>
						</div>

						{content.thursday_from && (
							<p className="italic">
								{content.thursday_from.substring(0, 5)} - {content.thursday_to.substring(0, 5)}
							</p>
						)}
					</div>

					<div>
						<div className="flex justify-between items-center">
							<p>Petak</p>

							<Work_hours_form
								local_id={params.local_id}
								day_of_week="friday"
								display_name="petak"
								from_time={content.friday_from}
								to_time={content.friday_to}
							/>
						</div>

						{content.friday_from && (
							<p className="italic">
								{content.friday_from.substring(0, 5)} - {content.friday_to.substring(0, 5)}
							</p>
						)}
					</div>

					<div>
						<div className="flex justify-between items-center">
							<p>Subota</p>

							<Work_hours_form
								local_id={params.local_id}
								day_of_week="saturday"
								display_name="subota"
								from_time={content.saturday_from}
								to_time={content.saturday_to}
							/>
						</div>

						{content.saturday_from && (
							<p className="italic">
								{content.saturday_from.substring(0, 5)} - {content.saturday_to.substring(0, 5)}
							</p>
						)}
					</div>

					<div>
						<div className="flex justify-between items-center">
							<p>Nedelja</p>

							<Work_hours_form
								local_id={params.local_id}
								day_of_week="sunday"
								display_name="nedelja"
								from_time={content.sunday_from}
								to_time={content.sunday_to}
							/>
						</div>

						{content.sunday_from && (
							<p className="italic">
								{content.sunday_from.substring(0, 5)} - {content.sunday_to.substring(0, 5)}
							</p>
						)}
					</div>

					<div>
						<div className="flex justify-between items-center">
							<p>Opis</p>

							<About_form
								local_id={params.local_id}
								value={content.about}
							/>
						</div>

						{content.about && <p className="whitespace-pre-wrap italic">{content.about}</p>}
					</div>
				</article>

				<article className="flex flex-col gap-4 px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900 shadow-md">
					<p className="font-semibold text-center">Linkovi</p>

					<div className="truncate">
						<div className="flex justify-between items-center">
							<p>Instagram</p>

							<SM_url_form
								local_id={params.local_id}
								name="instagram"
								value={content.instagram}
							/>
						</div>

						{content.instagram && (
							<Link
								href={content.instagram}
								target="_blank"
								className="italic underline underline-offset-2"
							>
								{content.instagram}
							</Link>
						)}
					</div>

					<div className="truncate">
						<div className="flex justify-between items-center">
							<p>Facebook</p>

							<SM_url_form
								local_id={params.local_id}
								name="facebook"
								value={content.facebook}
							/>
						</div>

						{content.facebook && (
							<Link
								href={content.facebook}
								target="_blank"
								className="italic underline underline-offset-2"
							>
								{content.facebook}
							</Link>
						)}
					</div>

					<div className="truncate">
						<div className="flex justify-between items-center">
							<p>Booking</p>

							<SM_url_form
								local_id={params.local_id}
								name="booking"
								value={content.booking}
							/>
						</div>

						{content.booking && (
							<Link
								href={content.booking}
								target="_blank"
								className="italic underline underline-offset-2"
							>
								{content.booking}
							</Link>
						)}
					</div>

					<div className="truncate">
						<div className="flex justify-between items-center">
							<p>Website</p>

							<SM_url_form
								local_id={params.local_id}
								name="website"
								value={content.website}
							/>
						</div>

						{content.website && (
							<Link
								href={content.website}
								target="_blank"
								className="italic underline underline-offset-2"
							>
								{content.website}
							</Link>
						)}
					</div>

					<div className="truncate">
						<div className="flex justify-between items-center">
							<p>Email</p>

							<SM_email_form
								local_id={params.local_id}
								name="email"
								value={content.email}
							/>
						</div>

						{content.email && <p className="italic">{content.email}</p>}
					</div>

					<div className="truncate">
						<div className="flex justify-between items-center">
							<p>Telefon</p>

							<SM_phone_form
								local_id={params.local_id}
								name="phone"
								value={content.phone}
							/>
						</div>

						{content.phone && <p className="italic">0{content.phone}</p>}
					</div>
				</article>
			</section>
		</main>
	);
}
