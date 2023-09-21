import * as z from "zod";

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

//* ============================================ //
//* ============= ABOUT VALIDATION ============= //
//* ============================================ //

export const About_schema = z.object({
	local_id: z.string(),
	col_name: z.enum(["about"]),
	new_value: z.string().max(300, { message: "Max 300 karaktera" }),
});

export function About_schema_validate({ incoming_data }) {
	return About_schema.parse(incoming_data);
}

//* ============================================ //
//* ============== URL VALIDATION ============== //
//* ============================================ //

export const URL_schema = z.object({
	local_id: z.string(),
	col_name: z.enum(["instagram", "facebook", "booking", "website"]),
	new_value: z.string().url().max(100, { message: "Max 100 karaktera" }),
});

export function URL_schema_validation({ incoming_data }) {
	return URL_schema.parse(incoming_data);
}

//* ============================================ //
//* ============= EMAIL VALIDATION ============= //
//* ============================================ //

export const Email_schema = z.object({
	local_id: z.string(),
	col_name: z.enum(["email"]),
	new_value: z.string().email({ message: "Nije ispravan format email-a" }),
});

export function Email_schema_validation({ incoming_data }) {
	return Email_schema.parse(incoming_data);
}

//* ============================================ //
//* ============= PHONE VALIDATION ============= //
//* ============================================ //

export const Phone_schema = z.object({
	local_id: z.string(),
	col_name: z.enum(["phone"]),
	new_value: z.string(),
});

export function Phone_schema_validation({ incoming_data }) {
	return Phone_schema.parse(incoming_data);
}
