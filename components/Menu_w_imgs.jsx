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
import Image from "next/image";

export default function Menu_w_imgs({ article, index_article }) {
	return (
		<article className="grid grid-cols-2 items-center">
			<div className="text-center flex flex-col gap-4 p-2">
				<p className="text-lg">{article.name}</p>
				<p>{article.price} KM</p>
				{article.description !== null && article.description.length <= 50 && (
					<p
						className="description-custom opacity-70"
						title={article.description}
					>
						{article.description}
					</p>
				)}

				{article.description !== null && article.description.length > 50 && (
					<AlertDialog>
						<AlertDialogTrigger className="opacity-70">Lista sastojaka</AlertDialogTrigger>
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

			<div className={`aspect-square relative shadow-lg ${index_article % 2 === 0 && "-order-last"}`}>
				<Image
					src={article.image}
					fill
					alt={`Slika proizvoda ${article.name}`}
				/>
			</div>
		</article>
	);
}
