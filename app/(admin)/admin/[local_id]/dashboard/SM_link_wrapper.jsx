import Link from "next/link";
import SM_link_form from "./SM_link_form";

export default function SM_link_wrapper({ local_id, name, value, type, schema }) {
	return (
		<div className="truncate">
			<div className="flex justify-between items-center">
				<p>{name}</p>

				<SM_link_form
					local_id={local_id}
					name={name}
					value={value}
					type={type}
					schema={schema}
				/>
			</div>

			{value && type === "url" && (
				<Link
					href={value}
					target="_blank"
					className="italic underline underline-offset-2"
				>
					{value}
				</Link>
			)}

			{value && type !== "url" && <p className="italic">{value}</p>}
		</div>
	);
}
