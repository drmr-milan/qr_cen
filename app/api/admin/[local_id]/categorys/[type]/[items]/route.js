import { NextResponse } from "next/server";
import promisePool from "@/lib/database";
import { Delete_cat_validation, Edit_cat_validation, New_cat_validation, Order_cat_validation } from "@/utils/ValidationShemas";

export async function GET(req, { params }) {
	const db_connection = await promisePool.getConnection();
	let local_info,
		content,
		articles = null;

	try {
		[local_info] = await db_connection.query("SELECT name, package FROM locals WHERE id = ?;", [params.local_id]);
		[content] = await db_connection.query("SELECT id, name, order_num FROM ?? WHERE local_id = ? ORDER BY order_num;", [params.type, params.local_id]);
		[articles] = await db_connection.query("SELECT * FROM ?? WHERE local_id = ? ORDER BY order_num;", [params.items, params.local_id]);

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

export async function POST(req, { params }) {
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
		await db_connection.query(
			"INSERT INTO ?? VALUES (UUID(), ?, ?, (SELECT COALESCE(MAX(count_table.order_num), 0) + 1 AS new_max FROM ?? AS count_table WHERE local_id = ?));",
			[params.type, params.local_id, incoming_data.new_value, params.type, params.local_id]
		);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `${incoming_data.col_name} data added` }, { status: 200 });
}

export async function PUT(req, { params }) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		Edit_cat_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query("UPDATE ?? SET name = ? WHERE id = ?;", [params.type, incoming_data.new_value, incoming_data.cat_id]);
		db_connection.release();
	} catch (error) {
		db_connection.release();
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}

	return NextResponse.json({ message: `${incoming_data.col_name} item name updated` }, { status: 200 });
}

export async function PATCH(req, { params }) {
	let incoming_data = null;
	try {
		incoming_data = await req.json();
		Order_cat_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query(
			"UPDATE ?? SET order_num = CASE WHEN order_num = ? then ? WHEN order_num = ? then ? END WHERE local_id = ? AND (order_num = ? OR order_num = ?);",
			[
				params.type,
				incoming_data.order_num,
				incoming_data.order_num - 1,
				incoming_data.order_num - 1,
				incoming_data.order_num,
				params.local_id,
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
		Delete_cat_validation({ incoming_data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Invalid input data" }, { status: 422 });
	}

	const db_connection = await promisePool.getConnection();
	try {
		await db_connection.query("DELETE FROM ?? WHERE id = ?;", [params.type, incoming_data.cat_id]);
		await db_connection.query("UPDATE ?? SET order_num = order_num - 1 WHERE local_id = ? AND order_num > ?;", [
			params.type,
			params.local_id,
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
