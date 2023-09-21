import { NextResponse } from "next/server";
import promisePool from "@/lib/database";
import { About_schema_validate } from "@/utils/ValidationShemas";

export async function PUT(req) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		About_schema_validate({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = ? WHERE id = ?;", [incoming_data.col_name, incoming_data.new_value, incoming_data.local_id]);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ message: "About updated" }, { status: 200 });
}
