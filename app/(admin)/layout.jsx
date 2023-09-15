import "@/app/globals.css";
import Footer from "@/components/Footer";
import { Navigation_admin } from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
	title: "E-Cjenovnik - Dashboard",
	// description: 'Generated by create next app',
};

export default function RootLayoutAdmin({ children }) {
	return (
		<html lang="sr">
			<body
				className={cn(
					"flex flex-col min-h-screen-custom bg-gray-200 text-gray-900 dark:bg-gray-950 dark:text-gray-300 transition-colors duration-300 " +
						outfit.className
				)}
			>
				<section className="flex-grow flex">
					{children}
					{/* <Navigation_admin /> */}
				</section>

				<Footer />
			</body>
		</html>
	);
}
