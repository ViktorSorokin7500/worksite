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
