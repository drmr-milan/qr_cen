import { NextResponse } from "next/server";
import promisePool from "@/lib/database";

export async function GET(req, { params }) {
	const db_connection = await promisePool.getConnection();
	let content = null;

	try {
		[content] = await db_connection.query("SELECT * FROM qr_cen.locals WHERE id = ?;", [params.local_id]);

		await db_connection.release();
	} catch (error) {
		await db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ content: content[0] }, { status: 200 });
}
