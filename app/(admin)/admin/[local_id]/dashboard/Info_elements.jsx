import Link from "next/link";
import { format, differenceInCalendarDays } from "date-fns";
import { IconAlertTriangle } from "@tabler/icons-react";

export function Info_free({ name }) {
	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<div className="flex items-center justify-center gap-8">
				<p>Aktivan paket: Besplatan</p>
				<p>Unapredi paket</p>
			</div>

			<Link
				href={`/${name}`}
				className="underline underline-offset-2"
			>
				Izgled koji gosti vide
			</Link>

			<p className="italic">Saznaj vise od boljim paketima</p>
		</div>
	);
}

export function Info_paid({ content }) {
	const expires_in = differenceInCalendarDays(new Date(content.package_expire), new Date());

	return (
		<div>
			<div className="flex flex-col gap-4 justify-center items-center">
				{content.package === "Plus" && (
					<div className="flex items-center justify-center gap-8">
						<p>Aktivan paket: {content.package}</p>
						<p>Unapredi paket</p>
					</div>
				)}

				{content.package === "Maxi" && <p>Aktivan paket: {content.package}</p>}

				<div className="flex items-center">
					{expires_in <= 5 && (
						<IconAlertTriangle
							stroke={3}
							size={44}
							className="p-2 text-red-600"
						/>
					)}

					{expires_in < 10 && expires_in > 5 && (
						<IconAlertTriangle
							stroke={3}
							size={44}
							className="p-2 text-yellow-500"
						/>
					)}

					<p>
						Ističe za: <span className="font-semibold">{expires_in} dana</span> ({format(new Date(content.package_expire), "dd.MM.yyyy.")})
					</p>
				</div>

				<Link
					href={`/${content.name}`}
					className="underline underline-offset-2"
				>
					Izgled koji gosti vide
				</Link>

				{content.package === "Plus" && <p className="italic">Saznaj prednosti Maxi paketa</p>}
			</div>
		</div>
	);
}

export function Info_paid_exired({ content }) {
	return (
		<div>
			<p>Paid expired</p>
		</div>
	);
}
