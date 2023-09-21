import About_form from "./About_form";

export default function About_wrapper({ local_id, value }) {
	return (
		<>
			<div className="flex justify-between items-center">
				<p>Opis</p>

				<About_form
					local_id={local_id}
					value={value}
				/>
			</div>

			{value && <p className="whitespace-pre-wrap">{value}</p>}
		</>
	);
}
