import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
	const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

	if (!SMTP_PASSWORD || !SMTP_EMAIL) {
		return NextResponse.json(
			{ error: "Missing SMTP credentials" },
			{ status: 500 }
		);
	}

	const { to, subject, body } = await req.json();

	if (!to || !subject || !body) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 }
		);
	}

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: SMTP_EMAIL,
			pass: SMTP_PASSWORD,
		},
	});

	try {
		await transporter.sendMail({
			from: SMTP_EMAIL,
			to,
			subject,
			html: body,
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Error sending email" }, { status: 500 });
	}
}
