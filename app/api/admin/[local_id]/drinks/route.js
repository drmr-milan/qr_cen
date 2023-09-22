import { NextResponse } from "next/server";
import promisePool from "@/lib/database";
import { New_cat_validation } from "@/utils/ValidationShemas";

export async function GET(req, { params }) {
	const db_connection = await promisePool.getConnection();
	let local_info,
		content,
		articles = null;

	try {
		[local_info] = await db_connection.query("SELECT name, package FROM qr_cen.locals WHERE id = ?;", [params.local_id]);
		[content] = await db_connection.query("SELECT id, name FROM qr_cen.drinks_cat WHERE local_id = ?;", [params.local_id]);
		[articles] = await db_connection.query("SELECT * FROM qr_cen.drinks WHERE local_id = ?;", [params.local_id]);

		content.forEach((cat) => {
			cat.articles = [];

			articles.forEach((article) => {
				if (cat.id === article.drinks_cat_id) cat.articles.push(article);
			});
		});
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" });
	}

	return NextResponse.json({ local_info: local_info[0], content: content }, { status: 200 });
}

export async function POST(req) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		New_cat_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query("INSERT INTO qr_cen.drinks_cat VALUES (UUID(), ?, ?);", [incoming_data.local_id, incoming_data.new_value]);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `${incoming_data.col_name} data added` }, { status: 200 });
}
