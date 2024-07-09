"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	firstname: z
		.string()
		.min(2, { message: "Введіть ваше ім'я" })
		.max(30, { message: "Не більше 30 літер" }),
	secondname: z
		.string()
		.min(2, { message: "Введіть ваше прізвище" })
		.max(50, { message: "Не більше 50 літер" }),
	email: z.string().email({ message: "Введіть вашу електронну пошту" }),
	phonenumber: z.string().regex(/^\+?([0-9] ?){6,14}[0-9]$/, {
		message:
			"Номер телефону повинен бути у форматі +XXXXXXXXXXX або XXXXXXXXXX",
	}),
	questionType: z.enum(
		[
			"Оберіть варіант",
			"Консультація",
			"Оцінка збитків",
			"Оцінка нерухомості",
			"Оцінка обладнання",
			"Оцінка КТЗ",
			"Інше питання",
		],
		{
			message: "Оберіть один з варіантів",
		}
	),
	message: z.string().max(124, { message: "Не більше 124 літер" }),
});

const ContactForm = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstname: "",
			secondname: "",
			email: "",
			phonenumber: "",
			message: "",
			questionType: "Оберіть варіант",
		},
	});

	const types = [
		"Оберіть варіант",
		"Консультація",
		"Оцінка збитків",
		"Оцінка нерухомості",
		"Оцінка обладнання",
		"Оцінка КТЗ",
		"Інше питання",
	];

	async function onSubmit(values) {
		try {
			const response = await fetch("/api/sendMail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					to: "mfvict@gmail.com",
					subject: `Оцінка`,
					body: `
					<div style="font-family: Arial, sans-serif; color: #333; padding: 4px;">
						<table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
							<tr>
								<td colspan="2" style="text-align: center; padding: 10px; background-color: #f4f4f4; border-bottom: 2px solid #ddd;">
									<h2 style="margin: 0; color: #555;">Оцінка</h2>
								</td>
							</tr>
							<tr>
								<td style="padding: 10px; font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #ddd;">І'мя:</td>
								<td style="padding: 10px; background-color: #fff; border-bottom: 1px solid #ddd;">${values.firstname}</td>
							</tr>
							<tr>
								<td style="padding: 10px; font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #ddd;">Прізвище:</td>
								<td style="padding: 10px; background-color: #fff; border-bottom: 1px solid #ddd;">${values.secondname}</td>
							</tr>
							<tr>
								<td style="padding: 10px; font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #ddd;">Поштова адреса:</td>
								<td style="padding: 10px; background-color: #fff; border-bottom: 1px solid #ddd; word-break: break-word;">${values.email}</td>
							</tr>
							<tr>
								<td style="padding: 10px; font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #ddd;">Номер телефону:</td>
								<td style="padding: 10px; background-color: #fff; border-bottom: 1px solid #ddd;">${values.phonenumber}</td>
							</tr>
							<tr>
								<td style="padding: 10px; font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #ddd;">Запит щодо:</td>
								<td style="padding: 10px; background-color: #fff; border-bottom: 1px solid #ddd;">${values.questionType}</td>
							</tr>
							<tr>
								<td style="padding: 10px; font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #ddd;">Повідомлення:</td>
								<td style="padding: 10px; background-color: #fff; border-bottom: 1px solid #ddd;">${values.message}</td>
							</tr>
						</table>
					</div>
				`,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				alert("Дякуємо! Запит відправлено");
			} else {
				const error = await response.json();
				alert(`Failed to send email: ${error.error}`);
			}
		} catch (error) {
			console.error("Error sending email:", error);
			alert("Failed to send email.");
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 bg-[#27272c] p-10 rounded-xl max-w-[960px]">
				<h3 className="h3 text-accent">Зворотний зв&apos;язок</h3>
				<p className="text-white/80">
					Будь ласка, опишіть свої питання або потреби щодо оцінки майна. Ми
					надамо вам професійну консультацію та відповімо на ваш запит
					найближчим часом
				</p>

				<FormField
					control={form.control}
					name="firstname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ім&apos;я</FormLabel>
							<FormControl>
								<Input className="" placeholder="Введіть ім'я" {...field} />
							</FormControl>
							<FormMessage className="text-sm text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="secondname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Прізвище</FormLabel>
							<FormControl>
								<Input
									placeholder="Введіть своє прізвище"
									className=""
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-sm text-red-500" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Пошта</FormLabel>
							<FormControl>
								<Input placeholder="Введіть свою електрону пошту" {...field} />
							</FormControl>
							<FormMessage className="text-sm text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phonenumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Номер телефону</FormLabel>
							<FormControl>
								<Input placeholder="Введіть свій номер телефону" {...field} />
							</FormControl>
							<FormMessage className="text-sm text-red-500" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="questionType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Тип запиту</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => field.onChange(value)}
									value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Оберіть варіант">
											{field.value}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{Object.values(types).map((type, i) => (
											<SelectItem
												key={i}
												className="bg-primary hover:text-secondary"
												value={type}>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage className="text-sm text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Запит</FormLabel>
							<FormControl>
								<Input placeholder="Опишіть своє питання" {...field} />
							</FormControl>
							<FormMessage className="text-sm text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="bg-accent hover:bg-accent-hover text-primary rounded-full">
					Відправити запит
				</Button>
			</form>
		</Form>
	);
};

export default ContactForm;
