import { notFound } from "next/navigation";

export default async function LocalMain({ params }) {
	// console.log("dosao");
	// const data = await new Promise((resolve) => setTimeout(resolve, 500));
	// console.log(params.local_name);

	const data = {
		promotions: true,
		drinks_menu: true,
		good_menu: true,
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
		<main className="flex-grow">
			<h1>Lokal name</h1>
		</main>
	);
}
