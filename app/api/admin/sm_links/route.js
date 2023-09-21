import { NextResponse } from "next/server";
import promisePool from "@/lib/database";
import { SM_patch_validate, SM_put_validate } from "@/utils/ValidationShemas";

export async function PUT(req, { params }) {
	let incoming_data = null;

	try {
		incoming_data = await req.json();
		SM_put_validate({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();

	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = ? WHERE id = ?;", [
			incoming_data.new_link_field.toLowerCase(),
			incoming_data.new_link_value,
			incoming_data.local_id,
		]);

		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: "SM link updated" }, { status: 200 });
}

export async function PATCH(req, { params }) {
	let incoming_data = null;

	try {
		incoming_data = await req.json();
		SM_patch_validate({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();

	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = NULL WHERE id = ?;", [incoming_data.new_link_field.toLowerCase(), incoming_data.local_id]);

		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ message: "SM link removed" }, { status: 200 });
}
