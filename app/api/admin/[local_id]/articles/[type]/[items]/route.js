import { NextResponse } from "next/server";
import promisePool from "@/lib/database";
import { Delete_article_validation, New_article_validation, Order_article_validation } from "@/utils/ValidationShemas";

export async function POST(req, { params }) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		New_article_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query(
			"INSERT INTO ?? VALUES (UUID(), ?, ?, ?, ?, (SELECT COALESCE(MAX(count_table.order_num), 0) + 1 AS new_max FROM ?? AS count_table WHERE local_id = ? AND drinks_cat_id = ?), ?, ?);",
			[
				params.items,
				params.local_id,
				incoming_data.cat_id,
				incoming_data.name,
				incoming_data.price,
				params.items,
				params.local_id,
				incoming_data.cat_id,
				incoming_data.volume,
				incoming_data.desc,
			]
		);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `${incoming_data.items} added` }, { status: 200 });
}

export async function PATCH(req, { params }) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		Order_article_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}
	console.log(incoming_data);
	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query(
			"UPDATE ?? SET order_num = CASE WHEN order_num = ? then ? WHEN order_num = ? then ? END WHERE local_id = ? AND drinks_cat_id = ? AND (order_num = ? OR order_num = ?);",
			[
				params.items,
				incoming_data.order_num,
				incoming_data.order_num - 1,
				incoming_data.order_num - 1,
				incoming_data.order_num,
				params.local_id,
				incoming_data.cat_id,
				incoming_data.order_num,
				incoming_data.order_num - 1,
			]
		);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `${params.type} item order updated` }, { status: 200 });
}

export async function DELETE(req, { params }) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		Delete_article_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query("DELETE FROM ?? WHERE id = ?;", [params.items, incoming_data.article_id]);
		await db_connection.query("UPDATE ?? SET order_num = order_num - 1 WHERE local_id = ? AND drinks_cat_id = ? AND order_num > ?;", [
			params.items,
			params.local_id,
			incoming_data.cat_id,
			incoming_data.order_num,
		]);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `${params.type} category and articles deleted` }, { status: 200 });
}
