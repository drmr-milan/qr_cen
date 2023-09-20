import * as z from "zod";

export const URL_schema = z.object({
	Instagram: z.string().url({ message: "Mora biti isptava link" }).max(100, { message: "Link ne može biti duži od 100 karaktera" }),
	Facebook: z.string().url({ message: "Mora biti isptava link" }).max(100, { message: "Link ne može biti duži od 100 karaktera" }),
});
