import * as z from "zod";

export const URL_schema = z.object({
	new_link: z.string().url({ message: "Link nije validan" }).max(100, { message: "Max 10 karaktera" }),
});

export const Email_schema = z.object({
	new_link: z.string().email({ message: "Email adresa nije validna" }),
});

export const Phone_schema = z.object({
	new_link: z.number(),
});

const SM_url_schema = z.object({
	local_id: z.string(),
	new_link_field: z.enum(["Instagram", "Facebook", "Boking", "Website"]),
	new_link_value: z.string().url(),
});

const SM_email_schema = z.object({
	local_id: z.string(),
	new_link_field: z.enum(["Email"]),
	new_link_value: z.string().email(),
});

const SM_phone_schema = z.object({
	local_id: z.string(),
	new_link_field: z.enum(["Telefon"]),
	new_link_value: z.number(),
});

const SM_patch_schema = z.object({
	local_id: z.string(),
	new_link_field: z.enum(["Instagram", "Facebook", "Booking", "Website", "Email", "Telefon"]),
});

export function SM_put_validate({ incoming_data }) {
	if (incoming_data.type === "url") return SM_url_schema.parse(incoming_data);
	if (incoming_data.type === "email") return SM_email_schema.parse(incoming_data);
	if (incoming_data.type === "tel") return SM_phone_schema.parse(incoming_data);

	throw new Error();
}

export function SM_patch_validate({ incoming_data }) {
	return SM_patch_schema.parse(incoming_data);
}

export const About_schema = z.object({
	about_value: z.string().max(300, { message: "Max 300 karaktera" }),
});

//* ============================================= //
//* ========= SET VALUE NULL VALIDATION ========= //
//* ============================================= //

export const Set_value_null_schema = z.object({
	local_id: z.string(),
	col_name: z.enum(["instagram", "facebook", "booking", "website", "email", "telefon", "about"]),
});

export function Set_value_null_validation({ incoming_data }) {
	return Set_value_null_schema.parse(incoming_data);
}
