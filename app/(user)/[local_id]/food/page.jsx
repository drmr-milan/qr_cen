import { Header_user_menus } from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Menu_list from "@/components/Menu_list";

export default function Food({ params }) {
	// console.log(params.local_name);

	// const data = await getData from DB

	params.local_name = "kkk";

	const data_2 = [
		{
			category_name: "Doručak",
			articles: [
				{
					name: "Omlet Sa Sirom",
					price: 6.5,
					image: "/img.jpg",
					description: "3 jajeta, pecivo",
					volume: null,
				},
				{
					name: "Omlet Sa Sirom i Slaninom",
					price: 7.5,
					image: "/img.jpg",
					description: "3 jajeta, pecivo",
					volume: null,
				},
				{
					name: "Omlet Sa Sirom i Šunkom",
					price: 7.5,
					image: "/img.jpg",
					description: "3 jajeta, pecivo",
					volume: null,
				},
				{
					name: "Omlet Sa Sirom i Kobasicama",
					price: 7.5,
					image: "/img.jpg",
					description: "3 jajeta, pecivo",
					volume: null,
				},
				{
					name: "Jaja Sa Hrenovkama",
					price: 7.5,
					image: "/img.jpg",
					description: "2 jajeta na oko, 3 hrenovke, pecivo",
					volume: null,
				},
				{
					name: "Bavarski doručak",
					price: 10,
					image: "/img.jpg",
					description: "kranjska kobasica, 3 jajeta, pomfrit, pavlaka, senf",
					volume: null,
				},
				{
					name: "Gurmanski Doručak",
					price: 7.5,
					image: "/img.jpg",
					description: "2 jajeta, 4 uštipka, mladi sir, 4 parčeta slanine",
					volume: null,
				},
			],
		},
		{
			category_name: "Piletina",
			articles: [
				{
					name: "Coca Cola",
					price: 2.5,
					image: "/img.jpg",
					description: null,
					volume: 0.25,
				},
			],
		},
		{
			category_name: "Teletina",
			articles: [
				{
					name: "Heineken",
					price: 4,
					image: "/img.jpg",
					description: null,
					volume: 0.33,
				},
			],
		},
		{
			category_name: "Svinjetina",
			articles: [
				{
					name: "Whiskey Chivas Regal",
					price: 5,
					image: "/img.jpg",
					description: null,
					volume: 0.03,
				},
			],
		},
	];

	return (
		<>
			<Header_user_menus local_name={params.local_name} />

			<main className="flex-grow">
				<h1 className="text-2xl font-bold text-center pt-12 pb-8">Karta pića</h1>

				<Accordion
					type="single"
					collapsible
					className="w-full"
				>
					{data_2.map((category, index_category) => {
						return (
							<AccordionItem
								value={`item-${index_category}`}
								key={index_category}
							>
								<AccordionTrigger className="text-lg">{category.category_name}</AccordionTrigger>
								<AccordionContent>
									{category.articles.map((article, index_article) => {
										return (
											<Menu_list
												article={article}
												key={`${article.name}${index_article}`}
											/>
										);
									})}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</main>
		</>
	);
}
