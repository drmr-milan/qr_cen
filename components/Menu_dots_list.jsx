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

export default function Menu_dots_list({ article, index_article }) {
	return (
		<article className="flex px-4 text-lg gap-2 mb-2 justify-end items-end">
			<div className={article.description?.length < 7 ? "flex flex-col" : undefined}>
				<p className="whitespace-nowrap">
					{article.name}
					{article.description?.length <= 7 && <span className="text-sm whitespace-nowrap ml-2 opacity-70">{article.description}</span>}
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
			</div>

			<p className="flex-grow overflow-hidden">....................................................................................</p>
			<p className="text-right whitespace-nowrap">{article.price} KM</p>
		</article>
	);
}
