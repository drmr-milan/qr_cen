import { IconLanguage } from "@tabler/icons-react";
import { IconMoon } from "@tabler/icons-react";

export function Header_user() {
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
