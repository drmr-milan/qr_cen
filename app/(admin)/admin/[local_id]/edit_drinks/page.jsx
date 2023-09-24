"use client";

import useSWR from "swr";

import Category_add from "@/components/Category_add";
import Category_rename_delete from "@/components/Category_rename_remove";
import Article_add from "@/components/Article_add";
import Category_order from "@/components/Category_order";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Edit_drinks({ params }) {
	const { data, error, isLoading } = useSWR(`/api/admin/${params.local_id}/categorys/drinks_cat/drinks`, fetcher);

	if (isLoading) return <p>Loading...</p>;

	const { content, local_info } = data;

	console.log(content);

	return (
		<main className="flex-grow py-8">
			<p className="text-center text-xl font-semibold mb-6">{local_info.name} - Karta Pića</p>

			<p className="ml-2">Ako je maxi paket mogucnost izbora sa slikama ili samo tekst za manje pakete ova opcija zakljucana</p>
			<br />

			<p className="ml-2">Ako je sa slikama napraviti drugi pregled</p>
			<p className="ml-2">Link za pregled kako gosti vide</p>
			<br />

			<p className="ml-2">Broj kategorija, broj artikala sa kategorijom i broj artikala bez kategorije ako nije maxi paket prikazati i ogranicenja</p>
			<br />

			{local_info.package === "Besplatan" && content.length < 5 && (
				<div className="mx-4 my-8 text-center">
					<Category_add
						local_id={params.local_id}
						cat_type="drinks_cat"
						items_type="drinks"
						key={Math.random()}
					/>
				</div>
			)}

			{local_info.package === "Plus" && content.length < 10 && (
				<div className="mx-4 my-8 text-center">
					<Category_add
						local_id={params.local_id}
						cat_type="drinks_cat"
						items_type="drinks"
						key={Math.random()}
					/>
				</div>
			)}

			{local_info.package === "Maxi" && (
				<div className="mx-4 my-8 text-center">
					<Category_add
						local_id={params.local_id}
						cat_type="drinks_cat"
						items_type="drinks"
						key={Math.random()}
					/>
				</div>
			)}

			{content.map((cat) => {
				return (
					<section key={`${cat.name.replaceAll(" ", "_")}_section`}>
						<div className={`flex gap-2 items-center pr-2 py-2 bg-gray-900 text-gray-50 ${cat.order_num === 1 ? "pl-6" : "pl-2"}`}>
							{cat.order_num > 1 && (
								<Category_order
									local_id={params.local_id}
									cat_type="drinks_cat"
									items_type="drinks"
									cat_name={cat.name.replaceAll(" ", "_")}
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
							/>
						</div>

						{cat.articles.map((article) => {
							return (
								<article
									className="custom-bg px-4 p-2"
									key={article.id}
								>
									<p>Naziv: {article.name}</p>
									<p>Cijena: {article.price}</p>

									{article.volume && <p>Zapremina: {article.volume}l</p>}
									{article.desc && <p>Opis: {article.desc}</p>}
								</article>
							);
						})}
					</section>
				);
			})}

			<p className="ml-16">Artikl u kategoriji</p>
			<p className="ml-16 opacity-75">Izmjeni button: (Naziv, zapremina, opis), Ukloni iz kategorije, Obrisi artikl</p>
			<p className="ml-16 opacity-75">Slika button: Dodaj sliku, Ukloni sliku - samo za maxi paket</p>

			<br />

			<p className="ml-2">Dodaj artikl</p>
		</main>
	);
}
