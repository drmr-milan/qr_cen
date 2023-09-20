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
