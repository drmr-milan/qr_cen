export default function Menu_list({ article }) {
	return (
		<article className="flex gap-2 text-lg px-4 py-4 items-center custom-bg">
			<div className="flex-grow">
				<p>
					{article.name} {article.volume && <span className="text-sm opacity-75">{article.volume}l</span>}
				</p>

				{article.description && <p className="text-base mt-1 opacity-75">{article.description}</p>}
			</div>

			<div className="w-20">
				<p className="text-right">
					{article.price} <span className="text-xs">KM</span>
				</p>
			</div>
		</article>
	);
}
