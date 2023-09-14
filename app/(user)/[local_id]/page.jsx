import { Header_user_main } from "@/components/Header";
import { IconDiscount2, IconGlassFull, IconToolsKitchen2, IconBrandGoogle, IconSpeakerphone, IconInfoCircle } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function LocalMain({ params }) {
	// console.log("dosao");
	// const data = await new Promise((resolve) => setTimeout(resolve, 500));
	// console.log(params.local_name);

	params.local_name = "kkk";

	const data = {
		local_name: "",
		image: "/hotel_laktasi.jpg",
		promotions: true,
		drinks_menu: true,
		drinks_menu_graphic: false,
		food_menu: true,
		food_menu_graphic: true,
		google_review: "",
		events: true,
		work_hours: true,
		monday: "",
		tuesday: "",
		wednesday: "",
		thursday: "",
		friday: "",
		saturday: "",
		sunday: "",
		about_local: "",
	};

	if (params.local_name !== "kkk") notFound();

	return (
		<>
			<Header_user_main />

			<main className="flex flex-col flex-grow w-full mx-auto">
				<div className="relative w-full aspect-[5/4] bg-gray-400">
					<Image
						src={data.image}
						priority={true}
						fill
						// objectFit="cover"
						// objectPosition="center"
						alt={data.local_name + "logo"}
					/>
				</div>

				<section className="flex-grow grid grid-cols-2 content-center border-custom py-8">
					{data.promotions === true && (
						<article className="col-start-1 col-end-3">
							<Link
								href="#"
								className="flex gap-2 items-center justify-center py-4"
							>
								<IconDiscount2
									size={36}
									stroke={1}
								/>
								<p className="text-xl">Promocije</p>
							</Link>
						</article>
					)}

					{data.drinks_menu === true && data.food_menu === true && (
						<>
							<article className="col-start-1 col-end-3">
								<Link
									href={`/${params.local_name}/${data.drinks_menu_graphic ? "drinks_graphic" : "drinks"}`}
									className="flex gap-2 items-center justify-center py-4"
								>
									<IconGlassFull
										size={36}
										stroke={1}
									/>
									<p className="text-xl">Karta pića</p>
								</Link>
							</article>

							<article className="col-start-1 col-end-3">
								<Link
									href={`/${params.local_name}/${data.food_menu_graphic ? "food_graphic" : "food"}`}
									className="flex gap-2 items-center justify-center py-4"
								>
									<IconToolsKitchen2
										size={36}
										stroke={1}
									/>
									<p className="text-xl">Meni</p>
								</Link>
							</article>
						</>
					)}

					{data.drinks_menu === true && data.food_menu === false && (
						<article className="col-start-1 col-end-3">
							<Link
								href={`/${params.local_name}/${data.drinks_menu_graphic ? "drinks_graphic" : "drinks"}`}
								className="flex gap-2 items-center justify-center py-4"
							>
								<IconGlassFull
									size={36}
									stroke={1}
								/>
								<p className="text-xl">Pica</p>
							</Link>
						</article>
					)}

					{data.drinks_menu === false && data.food_menu === true && (
						<article className="col-start-1 col-end-3">
							<Link
								href={`/${params.local_name}/${data.food_menu_graphic ? "food_graphic" : "food"}`}
								className="flex gap-2 items-center justify-center py-4"
							>
								<IconToolsKitchen2
									size={36}
									stroke={1}
								/>
								<p className="text-xl">Hrana</p>
							</Link>
						</article>
					)}

					{data.google_review !== null && (
						<article className="col-start-1 col-end-3">
							<Link
								href="#"
								className="flex gap-2 items-center justify-center py-4"
							>
								<IconBrandGoogle
									size={36}
									stroke={1}
								/>
								<p className="text-xl">Ostavi Google utisak</p>
							</Link>
						</article>
					)}

					{data.events === true && (
						<article className="col-start-1 col-end-3">
							<Link
								href={`/${params.local_name}/events`}
								className="flex gap-2 items-center justify-center py-4"
							>
								<IconSpeakerphone
									size={36}
									stroke={1}
								/>
								<p className="text-xl">Dešavanja</p>
							</Link>
						</article>
					)}

					{data.work_hours !== false && data.about_local !== null && (
						<article className="col-start-1 col-end-3">
							<Link
								href="#"
								className="flex gap-2 items-center justify-center py-4"
							>
								<IconInfoCircle
									size={36}
									stroke={1}
								/>
								<p className="text-xl">Više o nama</p>
							</Link>
						</article>
					)}
				</section>
			</main>
		</>
	);
}
