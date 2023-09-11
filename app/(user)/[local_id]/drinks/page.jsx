import { Header_user_menus } from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Menu_w_imgs from "@/components/Menu_w_imgs";
import Menu_dots_list from "@/components/Menu_dots_list";

export default function Drinks({ params }) {
	// console.log(params.local_name);

	// const data = await getData from DB

	params.local_name = "kkk";

	const data_2 = [
		{
			category_name: "Topli napitci",
			articles: [
				{
					name_part_1: "Domaća kafa",
					name_part_2: null,
					price: 2.5,
					image: "/img.jpg",
					description: null,
					volume_weight: null,
				},
				{
					name_part_1: "Espresso",
					name_part_2: null,
					price: 2,
					image: "/img.jpg",
					description: null,
					volume_weight: null,
				},
				{
					name_part_1: "Capucchino",
					name_part_2: null,
					price: 2,
					image: "/img.jpg",
					description: null,
					volume_weight: null,
				},
				{
					name_part_1: "Nes",
					name_part_2: null,
					price: 1.5,
					image: "/img.jpg",
					description: null,
					volume_weight: null,
				},
				{
					name_part_1: "Topla čokolada",
					name_part_2: null,
					price: 3,
					image: "/img.jpg",
					description: null,
					volume_weight: null,
				},
				{
					name_part_1: "Čaj",
					name_part_2: null,
					price: 2,
					image: "/img.jpg",
					description: null,
					volume_weight: null,
				},
				{
					name_part_1: "Jutarna kafa do 9h",
					name_part_2: null,
					price: 1.5,
					image: "/img.jpg",
					description: null,
					volume_weight: null,
				},
			],
		},
		{
			category_name: "Sokovi",
			articles: [
				{
					name_part_1: "Coca Cola",
					name_part_2: null,
					price: 2.5,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.25,
				},
				{
					name_part_1: "Cockta",
					name_part_2: null,
					price: 2,
					image: "/img.jpg",
					description: "Narandža, jagoda, ...",
					volume_weight: 0.25,
				},
				{
					name_part_1: "Red Bull",
					name_part_2: null,
					price: 5,
					image: "/img.jpg",
					description: "Narandža, jagoda, jabuka, višnja, b",
					volume_weight: 0.25,
				},
				{
					name_part_1: "Negazirani sokovi Narandža",
					name_part_2: "Jagoda, Jabuka, Višnja",
					price: 3,
					image: "/img.jpg",
					description: "Narandža, jagoda, jabuka, višnja, breskva, ribizla, multivitamin",
					volume_weight: 0.25,
				},
			],
		},
		{
			category_name: "Pivo",
			articles: [
				{
					name_part_1: "Heineken",
					name_part_2: null,
					price: 4,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.33,
				},
				{
					name_part_1: "Becks",
					name_part_2: null,
					price: 3.5,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.33,
				},
				{
					name_part_1: "Tuborg",
					name_part_2: null,
					price: 4,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.33,
				},
				{
					name_part_1: "Bavaria - Bezalkoholno",
					name_part_2: null,
					price: 4,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.33,
				},
			],
		},
		{
			category_name: "Žestoka pića",
			articles: [
				{
					name_part_1: "Whiskey Chivas Regal",
					name_part_2: null,
					price: 5,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.03,
				},
				{
					name_part_1: "Whiskey Jack Daniels",
					name_part_2: null,
					price: 5,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.03,
				},
				{
					name_part_1: "Jägermeister",
					name_part_2: null,
					price: 5,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.03,
				},
				{
					name_part_1: "Gorki List",
					name_part_2: null,
					price: 5,
					image: "/img.jpg",
					description: null,
					volume_weight: 0.03,
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
								<AccordionContent className="duration-[3000ms] ease-in">
									{category.articles.map((article, index_article) => {
										return (
											// <Menu_w_imgs
											// 	article={article}
											// 	index_article={index_article}
											// 	key={`${article.name}${index_article}`}
											// />
											<Menu_dots_list
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
