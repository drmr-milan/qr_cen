import { IconPhotoX } from "@tabler/icons-react";
import { format } from "date-fns";
import Image from "next/image";

export default function Event_graphic({ event }) {
	return (
		<article className="flex flex-col rounded-lg bg-gray-400/60 overflow-hidden shadow-md">
			<div className="relative w-full aspect-square">
				{event.image ? (
					<Image
						src={event.image}
						priority={true}
						fill
						alt="Event image"
					/>
				) : (
					<IconPhotoX
						size={72}
						className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-90"
					/>
				)}

				<p className="bg-gray-200/95 absolute top-0 right-0 px-4 py-3 font-semibold rounded-bl-lg shadow-lg">
					{format(new Date(event.date_time), "dd.MM | kk:mm")}
				</p>

				{event.title && <p className="bg-gray-200/95 absolute bottom-0 left-0 px-4 py-3 text-lg font-semibold rounded-tr-lg">{event.title}</p>}
			</div>
		</article>
	);
}
