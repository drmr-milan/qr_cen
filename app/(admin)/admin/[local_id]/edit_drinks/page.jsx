"use client";

import useSWR from "swr";

import Category_rename_delete from "@/components/Category_rename_remove";
import Article_add from "@/components/Article_add";
import Category_order from "@/components/Category_order";
import Category_limiter from "@/components/Category_limiter";
import Article_order from "@/components/Article_order";
import Article_edit from "@/components/Article_edit";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Edit_drinks({ params }) {
	const { data, error, isLoading } = useSWR(`/api/admin/${params.local_id}/categorys/drinks_cat/drinks`, fetcher);

	if (isLoading) return <p>Loading...</p>;

	const { content, local_info } = data;

	console.log(content);
	// console.log(local_info);

	return (
		<main className="flex-grow py-8">
			<p className="text-center text-xl font-semibold mb-6">{local_info.name} - Karta Pića</p>

			<p className="ml-2">Ako je maxi paket mogucnost izbora sa slikama ili samo tekst za manje pakete ova opcija zakljucana</p>
			<br />

			<p className="ml-2">Ako je sa slikama napraviti drugi pregled</p>
			<p className="ml-2">Link za pregled kako gosti vide</p>
			<br />

			{content.map((cat) => {
				return (
					<section key={`${cat.name.replaceAll(" ", "_")}_section`}>
						<div className={`flex gap-2 items-center pr-2 py-2 bg-gray-900 text-gray-50 ${cat.order_num === 1 ? "pl-6" : "pl-2"}`}>
							{cat.order_num > 1 && (
								<Category_order
									local_id={params.local_id}
									cat_type="drinks_cat"
									items_type="drinks"
									cat_id={cat.id}
									order_num={cat.order_num}
									key={Math.random()}
								/>
							)}

							<p className="flex-grow">{cat.name}</p>

							<Category_rename_delete
								local_id={params.local_id}
								cat_type="drinks_cat"
								items_type="drinks"
								cat_id={cat.id}
								name={cat.name}
								order_num={cat.order_num}
								key={Math.random()}
							/>

							<Article_add
								local_id={params.local_id}
								cat_id={cat.id}
								cat_name={cat.name}
								cat_type="drinks_cat"
								items_type="drinks"
								key={Math.random()}
							/>
						</div>

						{cat.articles.map((article) => {
							return (
								<article
									className={`custom-bg pr-2 p-2 flex gap-2 items-center ${article.order_num === 1 ? "pl-4" : "pl-2"}`}
									key={article.id}
								>
									{article.order_num > 1 && (
										<Article_order
											local_id={params.local_id}
											cat_type="drinks_cat"
											items_type="drinks"
											cat_id={cat.id}
											article_id={article.id}
											order_num={article.order_num}
											key={Math.random()}
										/>
									)}

									<div className="flex-grow">
										<p>Naziv: {article.name}</p>
										<p>
											Cijena: {article.price} <span className="text-xs">KM</span>
										</p>

										{article.volume !== "0.00" && (
											<p>
												Zapremina: {article.volume} <span className="text-xs">l</span>
											</p>
										)}
										{article.desc !== "" && <p>Opis: {article.desc}</p>}
									</div>

									<Article_edit
										local_id={params.local_id}
										cat_type="drinks_cat"
										items_type="drinks"
										cat_id={cat.id}
										article_id={article.id}
										article_name={article.name}
										order_num={article.order_num}
										key={Math.random()}
									/>
								</article>
							);
						})}
					</section>
				);
			})}

			<Category_limiter
				local_id={params.local_id}
				local_package={local_info.package}
				cat_type="drinks_cat"
				items_type="drinks"
				num_of_items={content.length}
				key={Math.random()}
			/>

			<p className="ml-16">Artikl u kategoriji</p>
			<p className="ml-16 opacity-75">Izmjeni button: (Naziv, zapremina, opis), Ukloni iz kategorije, Obrisi artikl</p>
			<p className="ml-16 opacity-75">Slika button: Dodaj sliku, Ukloni sliku - samo za maxi paket</p>

			<br />

			<p className="ml-2">Dodaj artikl</p>
		</main>
	);
}
