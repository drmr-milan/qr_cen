import { format } from "date-fns";

export default function Event_text({ event }) {
	return (
		<article className="flex rounded-lg bg-gray-300/30 overflow-hidden shadow-md">
			<div className="grid content-center px-5 py-4 bg-gray-900 text-gray-200">
				<p className="text-center mb-1">{format(new Date(event.date_time), "dd.MM")}</p>
				<p className="text-center">{format(new Date(event.date_time), "kk:mm")}</p>
			</div>

			<div className="grid content-center flex-grow p-4">
				<p className="text-lg text-center font-semibold py-4">{event.title}</p>

				{event.description && <p className="mt-2 opacity-75">{event.description}</p>}
			</div>
		</article>
	);
}
