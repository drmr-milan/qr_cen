import { IconArrowBackUp } from "@tabler/icons-react";
import { IconLanguage } from "@tabler/icons-react";
import { IconMoon } from "@tabler/icons-react";
import Link from "next/link";

export function Header_user_main() {
	return (
		<header className="w-full fixed top-0 left-0 z-10 flex items-center justify-end">
			<section className="flex bg-gray-200 rounded-bl-lg shadow-lg pl-2 pr-1">
				<IconMoon
					size={44}
					className="p-2"
				/>
				<IconLanguage
					size={44}
					className="p-2"
				/>
			</section>
		</header>
	);
}

export function Header_user_menus({ local_name }) {
	return (
		<header className="w-full fixed top-0 left-0 z-10 flex items-center justify-between">
			<Link href={`/${local_name}`}>
				<IconArrowBackUp
					size={44}
					className="p-2 bg-gray-200 rounded-br-lg shadow-lg"
				/>
			</Link>

			<section className="flex bg-gray-200 rounded-bl-lg shadow-lg pl-2 pr-1">
				<IconMoon
					size={44}
					className="p-2"
				/>
				<IconLanguage
					size={44}
					className="p-2"
				/>
			</section>
		</header>
	);
}
