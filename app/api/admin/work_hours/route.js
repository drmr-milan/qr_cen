import { NextResponse } from "next/server";
import promisePool from "@/lib/database";
import { Work_hours_remove_validation, Work_hours_validation } from "@/utils/ValidationShemas";

export async function PUT(req) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		Work_hours_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = ?, ?? = ? WHERE id = ?;", [
			incoming_data.col_name_from,
			incoming_data.new_value_from,
			incoming_data.col_name_to,
			incoming_data.new_value_to,
			incoming_data.local_id,
		]);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `Work hours edited` }, { status: 200 });
}

export async function PATCH(req) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		Work_hours_remove_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = NULL, ?? = NULL WHERE id = ?;", [
			incoming_data.col_name_from,
			incoming_data.col_name_to,
			incoming_data.local_id,
		]);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `Work hours removed` }, { status: 200 });
}
