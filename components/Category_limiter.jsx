"use client";

import Category_add from "@/components/Category_add";

export default function Category_limiter({ local_id, local_package, cat_type, items_type, num_of_items }) {
	if (local_package === "Besplatan")
		return (
			<div className="mx-4 my-8 text-center">
				{num_of_items < 5 ? (
					<Category_add
						local_id={local_id}
						cat_type={cat_type}
						items_type={items_type}
						key={Math.random()}
					/>
				) : (
					<>
						<p>Dostigli ste maksimum kategorija po paketu.</p>
						<p>Kupite bolji paket ili obrišite neki od postojećih kategorija.</p>
					</>
				)}
			</div>
		);

	if (local_package === "Plus")
		return (
			<div className="mx-4 my-8 text-center">
				{num_of_items < 10 ? (
					<Category_add
						local_id={local_id}
						cat_type={cat_type}
						items_type={items_type}
						key={Math.random()}
					/>
				) : (
					<>
						<p className="font-semibold">Dostigli ste maksimum kategorija po paketu.</p>
						<p className="opacity-75">Kupite bolji paket ili obrišite neki od postojećih kategorija.</p>
					</>
				)}
			</div>
		);

	return (
		<div className="mx-4 my-8 text-center">
			<Category_add
				local_id={local_id}
				cat_type={cat_type}
				items_type={items_type}
				key={Math.random()}
			/>
		</div>
	);
}
