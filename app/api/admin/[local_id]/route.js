import { NextResponse } from "next/server";
import promisePool from "@/lib/database";

export async function GET(req, { params }) {
	const db_connection = await promisePool.getConnection();
	let content = null;

	try {
		[content] = await db_connection.query(
			"SELECT *, (SELECT COUNT(id) FROM qr_cen.drinks_cat WHERE local_id = ?) AS drinks_cat, (SELECT COUNT(id) FROM qr_cen.drinks WHERE local_id = ?) AS drinks FROM qr_cen.locals WHERE id = ?;",
			[params.local_id, params.local_id, params.local_id]
		);

		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ content: content[0] }, { status: 200 });
}
