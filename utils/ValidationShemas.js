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

//* ============================================= //
//* =========== WORK HOURS VALIDATION =========== //
//* ============================================= //

export const Work_hours_schema = z.object({
	local_id: z.string(),
	col_name_from: z.enum(["monday_from", "tuesday_from", "wednesday_from", "thursday_from", "friday_from", "saturday_from", "sunday_from"]),
	new_value_from: z.string(),
	col_name_to: z.enum(["monday_to", "tuesday_to", "wednesday_to", "thursday_to", "friday_to", "saturday_to", "sunday_to"]),
	new_value_to: z.string(),
});

export function Work_hours_validation({ incoming_data }) {
	return Work_hours_schema.parse(incoming_data);
}

export const Work_hours_remove_schema = z.object({
	local_id: z.string(),
	col_name_from: z.enum(["monday_from", "tuesday_from", "wednesday_from", "thursday_from", "friday_from", "saturday_from", "sunday_from"]),
	col_name_to: z.enum(["monday_to", "tuesday_to", "wednesday_to", "thursday_to", "friday_to", "saturday_to", "sunday_to"]),
});

export function Work_hours_remove_validation({ incoming_data }) {
	return Work_hours_remove_schema.parse(incoming_data);
}

//* ============================================= //
//* ========== NEW CATEGORY VALIDATION ========== //
//* ============================================= //

export const New_cat_schema = z.object({
	new_value: z.string().max(50, { message: "Max 50 karaktera" }),
});

export function New_cat_validation({ incoming_data }) {
	return New_cat_schema.parse(incoming_data);
}

//* ============================================ //
//* ========= EDIT CATEGORY VALIDATION ========= //
//* ============================================ //

export const Edit_cat_schema = z.object({
	cat_id: z.string(),
	new_value: z.string().max(50, { message: "Max 50 karaktera" }),
});

export function Edit_cat_validation({ incoming_data }) {
	return Edit_cat_schema.parse(incoming_data);
}

//* ============================================= //
//* ========= ORDER CATEGORY VALIDATION ========= //
//* ============================================= //

export const Order_cat_schema = z.object({
	order_num: z.number(),
});

export function Order_cat_validation({ incoming_data }) {
	return Order_cat_schema.parse(incoming_data);
}

//* ============================================ //
//* ======== DELETE CATEGORY VALIDATION ======== //
//* ============================================ //

export const Delete_cat_schema = z.object({
	cat_id: z.string(),
	order_num: z.number(),
});

export function Delete_cat_validation({ incoming_data }) {
	return Delete_cat_schema.parse(incoming_data);
}

//* ============================================ //
//* ========== NEW ARTICLE VALIDATION ========== //
//* ============================================ //

export const New_article_schema = z.object({
	// new_value: z.string().max(50, { message: "Max 50 karaktera" }),
	cat_id: z.string(),
	name: z.string().max(50, { message: "Max 50 karaktera" }),
	price: z.coerce.number(),
	volume: z.coerce.number().optional(),
	desc: z.string().max(50, { message: "Max 50 karaktera" }).optional(),
});

export function New_article_validation({ incoming_data }) {
	return New_article_schema.parse(incoming_data);
}

//* ============================================= //
//* ========= ORDER ARTICLES VALIDATION ========= //
//* ============================================= //

export const Order_article_schema = z.object({
	cat_id: z.string(),
	order_num: z.number(),
});

export function Order_article_validation({ incoming_data }) {
	return Order_article_schema.parse(incoming_data);
}

//* ============================================ //
//* ======== DELETE ARTICLES VALIDATION ======== //
//* ============================================ //

export const Delete_article_schema = z.object({
	article_id: z.string(),
	cat_id: z.string(),
	order_num: z.number(),
});

export function Delete_article_validation({ incoming_data }) {
	return Delete_cat_schema.parse(incoming_data);
}
