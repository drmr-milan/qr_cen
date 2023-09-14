import Event_graphic from "@/components/Event_graphic";
import { Header_user_menus } from "@/components/Header";

export default function Events_graphic({ params }) {
	//! TODO - GET DATA FROM DB - order by date from earliest to furder
	// const data = await fetch()
	const data = [
		{
			title: "Damir Bekovic - Akustik vece",
			date_time: "2023-09-13 20:00:00",
			image: null,
		},
		{
			title: "Aleksandra Prijovic",
			date_time: "2023-09-15 21:00:00",
			image: "/img.jpg",
		},
		{
			title: "Bend Tabanici i drugovi Bend Tabanici i drugovi Be",
			date_time: "2023-09-23 19:00:00",
			image: "/img.jpg",
		},
		{
			title: "Marka zurka",
			date_time: "2023-10-01 18:00:00",
			image: "/img.jpg",
		},
	];

	params.local_name = "kkk";

	return (
		<>
			<Header_user_menus local_name={params.local_name} />

			<main className="flex-grow mt-[5rem] mb-12">
				<section className="flex flex-col gap-12 px-4">
					{data.map((event, index) => {
						return (
							<Event_graphic
								key={`event_${index}`}
								event={event}
							/>
						);
					})}
				</section>
			</main>
		</>
	);
}
