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

//! Za napraviti dve funkcije komponente
// article.description ima vise od 35ch element function
function Article_name({ article }) {
	if (article.name.length < 35)
		return (
			<p className="whitespace-nowrap">
				{article.name}
				{article?.volume_weight && <span className="text-sm whitespace-nowrap ml-2 opacity-70">{article.volume_weight}l</span>}
			</p>
		);

	return (
		<div>
			<p className="whitespace-nowrap">{article.name.substring(0, 25)}</p>

			<p className="whitespace-nowrap">
				{article.name.substring(25)}
				{article?.volume_weight && <span className="text-sm whitespace-nowrap ml-2 opacity-70">{article.volume_weight}l</span>}
			</p>
		</div>
	);
}

function No_desc({ article }) {
	return (
		<article className="flex px-4 text-lg gap-2 mb-2 justify-end items-end">
			<Article_name article={article} />

			<p className="flex-grow overflow-hidden">....................................................................................</p>
			<p className="text-right whitespace-nowrap">{article.price} KM</p>
		</article>
	);
}
// article.description ima manje od 35ch element function

function Short_name_wo_desc({ article }) {
	return (
		<article className="flex px-4 text-lg gap-2 mb-2">
			<p className="whitespace-nowrap">
				{article.name_part_1}
				{article?.volume_weight && <span className="text-sm whitespace-nowrap ml-2 opacity-70">{article.volume_weight}l</span>}
			</p>

			<p className="flex-grow overflow-hidden">....................................................................................</p>

			<p className="text-right whitespace-nowrap">{article.price} KM</p>
		</article>
	);
}

function Long_name_wo_desc({ article }) {
	return (
		<article className="text-lg px-4 mb-2">
			<p className="whitespace-nowrap mb-1">{article.name_part_1}</p>

			<div className="flex gap-2">
				<p className="whitespace-nowrap">
					{article.name_part_2}
					{article?.volume_weight && <span className="text-sm whitespace-nowrap ml-2 opacity-70">{article.volume_weight}l</span>}
				</p>

				<p className="flex-grow overflow-hidden">....................................................................................</p>

				<p className="text-right whitespace-nowrap">{article.price} KM</p>
			</div>
		</article>
	);
}

function Short_name_w_desc({ article }) {
	return (
		<article className="text-lg px-4 mb-2">
			<p className="whitespace-nowrap">
				{article.name_part_1}
				{article?.volume_weight && <span className="text-sm whitespace-nowrap ml-2 opacity-70">{article.volume_weight}l</span>}
			</p>

			<div className="flex gap-2 items-center">
				{article.description?.length < 35 ? (
					<p className="text-sm whitespace-nowrap opacity-70">{article.description}</p>
				) : (
					<AlertDialog>
						<AlertDialogTrigger className="text-sm whitespace-nowrap opacity-70 pb-1">Lista sastojaka</AlertDialogTrigger>
						<AlertDialogContent className="bg-gray-100">
							<AlertDialogHeader>
								<AlertDialogTitle>{article.name}</AlertDialogTitle>
								<AlertDialogDescription className="text-md">{article.description}</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel className="bg-gray-100 text-gray-900  border-gray-900">Zatvori</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}

				<p className="flex-grow overflow-hidden">....................................................................................</p>

				<p className="text-right whitespace-nowrap">{article.price} KM</p>
			</div>
		</article>
	);
}

export default function Menu_dots_list({ article }) {
	// return No_desc({ article });

	if (article.name_part_2 === null && article.description === null) return <Short_name_wo_desc article={article} />;
	if (article.name_part_2 === null && article.description !== null) return <Short_name_w_desc article={article} />;

	return <Long_name_wo_desc article={article} />;

	return (
		<article className="flex px-4 text-lg gap-2 mb-2 justify-end items-end">
			{/* <div className={article.description?.length < 7 ? "flex flex-col" : undefined}>
				<p className="whitespace-nowrap">
					{article.name}
					{article?.volume && <span className="text-sm whitespace-nowrap ml-2 opacity-70">{article.volume}l</span>}
				</p>

				{article.description?.length > 7 && article.description?.length < 35 && (
					<p className="text-sm whitespace-nowrap opacity-70 pb-1">{article.description}</p>
				)}

				{article.description?.length > 35 && (
					<AlertDialog>
						<AlertDialogTrigger className="text-sm whitespace-nowrap opacity-70 pb-1">Lista sastojaka</AlertDialogTrigger>
						<AlertDialogContent className="bg-gray-100">
							<AlertDialogHeader>
								<AlertDialogTitle>{article.name}</AlertDialogTitle>
								<AlertDialogDescription className="text-md">{article.description}</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel className="bg-gray-100 text-gray-900  border-gray-900">Zatvori</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div> */}

			<p className="whitespace-nowrap">Ima opis i sranje je Ima opis i sranje je ranje je</p>

			<p className="flex-grow overflow-hidden">....................................................................................</p>
			<p className="text-right whitespace-nowrap">{article.price} KM</p>
		</article>
	);
}
