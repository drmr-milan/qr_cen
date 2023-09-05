import Link from "next/link";

export default function Footer() {
	const current_year = new Date().getFullYear();

	return (
		<footer className="px-2 py-4 bg-gray-900 text-gray-200">
			<p className="text-center">
				&copy; 2023-{current_year} Sva praza zadrzana. Izradio{" "}
				<Link
					href="https://milanilic.dev"
					target="_blank"
					className="italic underline underline-offset-4"
				>
					MI
				</Link>
			</p>
		</footer>
	);
}
