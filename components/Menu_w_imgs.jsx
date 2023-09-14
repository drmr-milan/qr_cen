import Image from "next/image";

export default function Menu_w_imgs({ article, index_article }) {
	return (
		<article className="grid grid-cols-2 items-center">
			<div className="text-center flex flex-col gap-4 p-2">
				<p className="text-lg">{article.name}</p>

				{article.description && <p className="description-custom opacity-70">{article.description}</p>}
			</div>

			<div className={`aspect-square relative shadow-lg ${index_article % 2 === 0 && "-order-last"}`}>
				<Image
					src={article.image}
					fill
					alt={`Slika proizvoda ${article.name}`}
				/>

				<p
					className={`py-2 absolute top-0 bg-gray-200 text-gray-900 text-lg shadow-lg ${
						index_article % 2 === 0 ? "rounded-br-lg left-0 pl-2 pr-3" : "rounded-bl-lg right-0 pl-3 pr-2"
					}`}
				>
					{article.price} <span className="text-xs">KM</span>
				</p>
			</div>
		</article>
	);
}
