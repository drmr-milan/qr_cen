import { NextResponse } from "next/server";
import promisePool from "@/lib/database";

export async function GET(req) {
	return NextResponse.json({ local_data: { name: "Hotel" } });
}

export async function POST(req, { params }) {
	const { local_id } = await req.json();
	const db_connection = await promisePool.getConnection();
	let local_data = null;

	// console.log(local_id);

	try {
		[local_data] = await db_connection.query("SELECT * FROM qr_cen.locals WHERE id = ?;", [local_id]);

		// console.log(local_data);
		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ local_data: local_data[0] });
}
