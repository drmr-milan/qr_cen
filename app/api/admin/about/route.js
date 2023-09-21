import { NextResponse } from "next/server";
import promisePool from "@/lib/database";

export async function PUT(req, { params }) {
	let incoming_data = null;

	incoming_data = await req.json();

	// try {
	// 	incoming_data = await req.json();
	// 	SM_patch_validate({ incoming_data });
	// } catch (error) {
	// 	console.error(error);
	// 	return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	// }

	console.log(incoming_data);

	const db_connection = await promisePool.getConnection();

	try {
		await db_connection.query("UPDATE qr_cen.locals SET about = ? WHERE id = ?;", [incoming_data.about, incoming_data.local_id]);

		// console.log(local_data);
		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ message: "About updated" }, { status: 200 });
}

export async function PATCH(req, { params }) {
	let incoming_data = null;

	incoming_data = await req.json();

	// try {
	// 	incoming_data = await req.json();
	// 	SM_patch_validate({ incoming_data });
	// } catch (error) {
	// 	console.error(error);
	// 	return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	// }

	console.log(incoming_data);

	const db_connection = await promisePool.getConnection();

	try {
		await db_connection.query("UPDATE qr_cen.locals SET ?? = NULL WHERE id = ?;", [incoming_data.new_link_field, incoming_data.local_id]);

		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ message: "About removed" }, { status: 200 });
}
