import ContactForm from "@/components/form/ContactForm";
import Telegram from "@/components/media/Telegram";
import Viber from "@/components/media/Viber";
import WhatsApp from "@/components/media/WhatsApp";
import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const info = [
	{ icon: <FaEnvelope />, title: "Пошта", desc: "mfvict@gmail.com" },
	{ icon: <FaPhoneAlt />, title: "Vodafone", desc: "+380954474848" },
	{ icon: <FaPhoneAlt />, title: "Vodafone", desc: "+380505392048" },
	{ icon: <FaPhoneAlt />, title: "Kyivstar", desc: "+380676842648" },
];

export const metadata = {
	title: "Контакти",
	description:
		"Зв'яжіться з нами для професійної оцінки майна та збитків. Ми надаємо експертні послуги з оцінки пошкоджень та зруйнованого майна.",
	keywords:
		"оцінка, оцінка майна, оцінка збитків, оцінювач, оцінка пошкоджень, оцінка зруйнованого майна, оценка, оценка имущества, оценка убытков, оценщик, оценка повреждений, оценка разрушенного имущества",
	alternates: {
		canonical: "https://www.sorokinsv.com/contacts",
	},
	openGraph: {
		title: "Контакти | Сорокін",
		description:
			"Зв'яжіться з нами для професійної оцінки майна та збитків. Ми надаємо експертні послуги з оцінки пошкоджень та зруйнованого майна.",
		url: "https://www.sorokinsv.com/contacts",
		type: "website",
		images: [
			{
				url: "https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
				width: 800,
				height: 600,
				alt: "Image Alt",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Контакти | Сорокін",
		description:
			"Зв'яжіться з нами для професійної оцінки майна та збитків. Ми надаємо експертні послуги з оцінки пошкоджень та зруйнованого майна.",
		image:
			"https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
	},
	lang: "uk-UA",
};

const Contacts = () => {
	return (
		<section className="container mx-auto">
			<MotionWrapper>
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="order-2 lg:order-none">
						<ContactForm />
					</div>
					<div className="flex-1 flex flex-col gap-4 items-center lg:justify-center order-1 lg:order-none space-y-6">
						<ul className="flex flex-wrap flex-row lg:flex-col justify-center items-center gap-10">
							{info.map((item, index) => {
								return (
									<li
										key={index}
										className="flex justify-center items-center gap-4">
										<div className="size-12 bg-[#27272c] text-accent rounded flex justify-center items-center text-2xl">
											{item.icon}
										</div>
										<div>
											<h4 className="text-white/60">{item.title}</h4>
											<span className="text-xl">{item.desc}</span>
										</div>
									</li>
								);
							})}
						</ul>
						<ul className="flex gap-8 justify-center items-center">
							<li>
								<Viber />
							</li>
							<li>
								<Telegram />
							</li>
							<li>
								<WhatsApp />
							</li>
						</ul>
					</div>
				</div>
			</MotionWrapper>
		</section>
	);
};

export default Contacts;
