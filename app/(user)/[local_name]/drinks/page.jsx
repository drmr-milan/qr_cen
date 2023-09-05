import { Header_user_menus } from "@/components/Header";
import Image from "next/image";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Drinks({ params }) {
	// console.log(params.local_name);

	const data_2 = [
		{
			category: "Topli napici",
			articles: [
				{
					name: "Kava",
					price: 2.5,
					image: "/img.jpg",
					description: null,
				},
			],
		},
	];

	const data = [
		{
			name: "Kava",
			price: 2.5,
			image: "/img.jpg",
			description: null,
		},
		{
			name: "Ledeni caj",
			price: 3,
			image: "/img.jpg",
			description: "4 jajeta, sunka, 2 vrste sira, 4 pogacice, 3 kobasice, lepinja, jos 400g prasetine, dimljeni vrat",
		},
		{
			name: "Voda",
			price: 1.5,
			image: "/img.jpg",
			description: "4 jajeta, sunka, 2 vrste sira, 4 pogacice",
		},
		{
			name: "Kava",
			price: 2.5,
			image: "/img.jpg",
			description: null,
		},
		{
			name: "Ledeni caj",
			price: 3,
			image: "/img.jpg",
			description: "Bas bas leden",
		},
		{
			name: "Voda",
			price: 1.5,
			image: "/img.jpg",
			description: null,
		},
		{
			name: "Kava",
			price: 2.5,
			image: "/img.jpg",
			description: null,
		},
		{
			name: "Ledeni caj",
			price: 3,
			image: "/img.jpg",
			description: "Bas bas leden",
		},
		{
			name: "Voda",
			price: 1.5,
			image: "/img.jpg",
			description: null,
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
					<AccordionItem value="item-1">
						<AccordionTrigger>Topli napici</AccordionTrigger>
						<AccordionContent className="duration-[3000ms] ease-in">
							<section>
								{data.map((item, index) => {
									return (
										<article
											className="grid grid-cols-2 items-center"
											key={`${item.name}${index}`}
										>
											<div className="text-center flex flex-col gap-4 p-2">
												<p className="text-lg">{item.name}</p>
												<p>{item.price} KM</p>
												{item.description !== null && item.description.length <= 50 && (
													<p
														className="description-custom opacity-70"
														title={item.description}
													>
														{item.description}
													</p>
												)}

												{item.description !== null && item.description.length > 50 && (
													<AlertDialog>
														<AlertDialogTrigger className="opacity-70">Lista sastojaka</AlertDialogTrigger>
														<AlertDialogContent className="bg-gray-100">
															<AlertDialogHeader>
																<AlertDialogTitle>{item.name}</AlertDialogTitle>
																<AlertDialogDescription className="text-md">{item.description}</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel className="bg-gray-100 text-gray-900  border-gray-900">
																	Zatvori
																</AlertDialogCancel>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												)}
											</div>

											<div className={`aspect-square relative ${index % 2 === 0 && "-order-last"}`}>
												<Image
													src={item.image}
													fill
													alt={`Slika proizvoda ${item.name}`}
												/>
											</div>
										</article>
									);
								})}
							</section>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Is it styled?</AccordionTrigger>
						<AccordionContent>Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Is it animated?</AccordionTrigger>
						<AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Collapsible>
					<CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
					<CollapsibleContent className="duration-300">
						<section>
							{data.map((item, index) => {
								return (
									<article
										className="grid grid-cols-2 items-center"
										key={`${item.name}${index}`}
									>
										<div className="text-center flex flex-col gap-4 p-2">
											<p className="text-lg">{item.name}</p>
											<p>{item.price} KM</p>
											{item.description !== null && item.description.length <= 50 && (
												<p
													className="description-custom opacity-70"
													title={item.description}
												>
													{item.description}
												</p>
											)}

											{item.description !== null && item.description.length > 50 && (
												<AlertDialog>
													<AlertDialogTrigger className="opacity-70">Lista sastojaka</AlertDialogTrigger>
													<AlertDialogContent className="bg-gray-100">
														<AlertDialogHeader>
															<AlertDialogTitle>{item.name}</AlertDialogTitle>
															<AlertDialogDescription className="text-md">{item.description}</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel className="bg-gray-100 text-gray-900  border-gray-900">
																Zatvori
															</AlertDialogCancel>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											)}
										</div>

										<div className={`aspect-square relative ${index % 2 === 0 && "-order-last"}`}>
											<Image
												src={item.image}
												fill
												alt={`Slika proizvoda ${item.name}`}
											/>
										</div>
									</article>
								);
							})}
						</section>
					</CollapsibleContent>
				</Collapsible>

				<Collapsible>
					<CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
					<CollapsibleContent className="duration-300">
						<section>
							{data.map((item, index) => {
								return (
									<article
										className="grid grid-cols-2 items-center"
										key={`${item.name}${index}`}
									>
										<div className="text-center flex flex-col gap-4 p-2">
											<p className="text-lg">{item.name}</p>
											<p>{item.price} KM</p>
											{item.description !== null && item.description.length <= 50 && (
												<p
													className="description-custom opacity-70"
													title={item.description}
												>
													{item.description}
												</p>
											)}

											{item.description !== null && item.description.length > 50 && (
												<AlertDialog>
													<AlertDialogTrigger className="opacity-70">Lista sastojaka</AlertDialogTrigger>
													<AlertDialogContent className="bg-gray-100">
														<AlertDialogHeader>
															<AlertDialogTitle>{item.name}</AlertDialogTitle>
															<AlertDialogDescription className="text-md">{item.description}</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel className="bg-gray-100 text-gray-900  border-gray-900">
																Zatvori
															</AlertDialogCancel>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											)}
										</div>

										<div className={`aspect-square relative ${index % 2 === 0 && "-order-last"}`}>
											<Image
												src={item.image}
												fill
												alt={`Slika proizvoda ${item.name}`}
											/>
										</div>
									</article>
								);
							})}
						</section>
					</CollapsibleContent>
				</Collapsible>

				<Collapsible>
					<CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
					<CollapsibleContent className="duration-300">
						<section>
							{data.map((item, index) => {
								return (
									<article
										className="grid grid-cols-2 items-center"
										key={`${item.name}${index}`}
									>
										<div className="text-center flex flex-col gap-4 p-2">
											<p className="text-lg">{item.name}</p>
											<p>{item.price} KM</p>
											{item.description !== null && item.description.length <= 50 && (
												<p
													className="description-custom opacity-70"
													title={item.description}
												>
													{item.description}
												</p>
											)}

											{item.description !== null && item.description.length > 50 && (
												<AlertDialog>
													<AlertDialogTrigger className="opacity-70">Lista sastojaka</AlertDialogTrigger>
													<AlertDialogContent className="bg-gray-100">
														<AlertDialogHeader>
															<AlertDialogTitle>{item.name}</AlertDialogTitle>
															<AlertDialogDescription className="text-md">{item.description}</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel className="bg-gray-100 text-gray-900  border-gray-900">
																Zatvori
															</AlertDialogCancel>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											)}
										</div>

										<div className={`aspect-square relative ${index % 2 === 0 && "-order-last"}`}>
											<Image
												src={item.image}
												fill
												alt={`Slika proizvoda ${item.name}`}
											/>
										</div>
									</article>
								);
							})}
						</section>
					</CollapsibleContent>
				</Collapsible>
			</main>
		</>
	);
}
