import { format } from "date-fns";

export default function Event_text({ event }) {
	return (
		<article className="rounded-lg bg-gray-300/50 overflow-hidden shadow-md">
			<div className="flex items-center">
				<div className="min-w-[85px] py-4 bg-gray-900 text-gray-200">
					<p className="text-center mb-1">{format(new Date(event.date_time), "dd.MM")}</p>
					<p className="text-center">{format(new Date(event.date_time), "kk:mm")}</p>
				</div>

				<p className="flex-grow text-lg text-center font-semibold p-2">{event.title}</p>
			</div>
		</article>
	);
}
