import Event_graphic from "@/components/Evenet_graphic";
import Event_text from "@/components/Event_text";
import { Header_user_menus } from "@/components/Header";

export default function Events({ params }) {
	//! TODO - GET DATA FROM DB - order by date from earliest to furder
	// const data = await fetch()
	const data = [
		{
			title: "Damir Bekovic - Akustik vece",
			date_time: "2023-09-13 20:00:00",
			img: "",
			description: null,
		},
		{
			title: "Aleksandra Prijovic",
			date_time: "2023-09-15 21:00:00",
			img: null,
			description: "Obradujte vase uci uz zvuke nase proslavljenje pjevacice. Uz dobro drustvo nikad nije dosadno",
		},
		{
			title: "Bend Tabanici i drugovi",
			date_time: "2023-09-23 19:00:00",
			img: null,
			description: null,
		},
		{
			title: "Marka zurka",
			date_time: "2023-10-01 18:00:00",
			img: "",
			description: null,
		},
	];

	params.local_name = "kkk";

	return (
		<>
			<Header_user_menus local_name={params.local_name} />

			<main className="flex-grow">
				<h1 className="text-2xl font-bold text-center pt-12 pb-8">Dešavanja</h1>

				<section className="flex flex-col gap-8 px-4">
					{data.map((event, index) => {
						if (event.img === null)
							return (
								<Event_text
									key={`event_${index}`}
									event={event}
								/>
							);

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
