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
					name: "Domaća kafa",
					price: 2.5,
					image: "/img.jpg",
					description: null,
				},
				{
					name: "Espresso",
					price: 2,
					image: "/img.jpg",
					description: null,
				},
				{
					name: "Capucchino",
					price: 2,
					image: "/img.jpg",
					description: null,
				},
				{
					name: "Nes",
					price: 1.5,
					image: "/img.jpg",
					description: null,
				},
				{
					name: "Topla čokolada",
					price: 3,
					image: "/img.jpg",
					description: null,
				},
				{
					name: "Čaj",
					price: 2,
					image: "/img.jpg",
					description: null,
				},
				{
					name: "Jutarna kafa do 9h",
					price: 1.5,
					image: "/img.jpg",
					description: null,
				},
			],
		},
		{
			category_name: "Sokovi",
			articles: [
				{
					name: "Coca Cola",
					price: 2.5,
					image: "/img.jpg",
					description: "0.25l",
				},
				{
					name: "Cockta",
					price: 2,
					image: "/img.jpg",
					description: "0.25l a moze i vise",
				},
				{
					name: "Red Bull",
					price: 5,
					image: "/img.jpg",
					description: "0.25l",
				},
				{
					name: "Negazirani sokovi",
					price: 3,
					image: "/img.jpg",
					description: "narandža, jagoda, jabuka, višnja, breskva, ribizla, multivitamin",
				},
			],
		},
		{
			category_name: "Pivo",
			articles: [
				{
					name: "Heineken",
					price: 4,
					image: "/img.jpg",
					description: "0.33l",
				},
				{
					name: "Becks",
					price: 3.5,
					image: "/img.jpg",
					description: "0.33l",
				},
				{
					name: "Tuborg",
					price: 4,
					image: "/img.jpg",
					description: "0.33l",
				},
				{
					name: "Bavaria - Bezalkoholno",
					price: 4,
					image: "/img.jpg",
					description: "0.33l",
				},
			],
		},
		{
			category_name: "Žestoka pića",
			articles: [
				{
					name: "Whiskey Chivas Regal",
					price: 5,
					image: "/img.jpg",
					description: "0.03l",
				},
				{
					name: "Whiskey Jack Daniels",
					price: 5,
					image: "/img.jpg",
					description: "0.03l",
				},
				{
					name: "Jägermeister",
					price: 5,
					image: "/img.jpg",
					description: "0.03l",
				},
				{
					name: "Gorki List",
					price: 5,
					image: "/img.jpg",
					description: "0.03l",
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
												index_article={index_article}
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
