import { NextResponse } from "next/server";
import promisePool from "@/lib/database";

export async function PUT(req, { params }) {
	const { local_id, new_link_field, new_link_value } = await req.json();
	const db_connection = await promisePool.getConnection();

	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = ? WHERE id = ?;", [new_link_field.toLowerCase(), new_link_value, local_id]);

		// console.log(local_data);
		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ message: "SM link updated" }, { status: 200 });
}

export async function PATCH(req, { params }) {
	const { local_id, new_link_field } = await req.json();
	const db_connection = await promisePool.getConnection();

	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = NULL WHERE id = ?;", [new_link_field.toLowerCase(), local_id]);

		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ message: "SM link removed" }, { status: 200 });
}
