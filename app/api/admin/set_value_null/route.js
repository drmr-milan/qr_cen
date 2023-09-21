import { NextResponse } from "next/server";
import promisePool from "@/lib/database";
import { Set_value_null_validation } from "@/utils/ValidationShemas";

export async function PATCH(req, { params }) {
	let incoming_data = null;

	try {
		incoming_data = await req.json();
		Set_value_null_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}
	const db_connection = await promisePool.getConnection();

	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = NULL WHERE id = ?;", [incoming_data.col_name, incoming_data.local_id]);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `${incoming_data.col_name} data removed` }, { status: 200 });
}
