import { NextResponse } from "next/server";
import promisePool from "@/lib/database";

export async function GET(req, { searchParams }) {
	const local_id = req.nextUrl.searchParams.get("local_id");
	const db_connection = await promisePool.getConnection();
	let content = null;

	try {
		[content] = await db_connection.query("SELECT about FROM qr_cen.locals WHERE id = ?;", [local_id]);

		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ content: content[0].about }, { status: 200 });
}

export async function POST(req, { params }) {
	const { local_id, about } = await req.json();
	const db_connection = await promisePool.getConnection();
	let local_data = null;

	// console.log(local_id);

	try {
		await db_connection.query("UPDATE qr_cen.locals SET about = ? WHERE id = ?;", [about, local_id]);

		// console.log(local_data);
		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ message: "About updated" }, { status: 200 });
}
