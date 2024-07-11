"use client";
import { useState, useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

const items = [
	{
		id: 1,
		title: "Оцінка збитків",
		desc: "Процес визначення фінансових втрат, які зазнали підприємства, установи, організації або приватні особи через збройний конфлікт або воєнні дії. Цей процес включає аналіз і розрахунок шкоди, завданої різним видам майна, а також витрат, пов'язаних із відновленням і ремонтом пошкоджених об'єктів",
		link: "/ocinka/zbytky",
		image: "/assets/zbytky.jpg",
	},
	{
		id: 2,
		title: "Оцінка комерційної нерухомості",
		desc: "Процес визначення ринкової вартості об'єктів нерухомості, які використовуються для бізнесових цілей. Ця оцінка проводиться для різних типів комерційної нерухомості, таких як офісні будівлі, торговельні центри, склади, виробничі приміщення, готелі тощо. Оцінка комерційної нерухомості важлива для прийняття рішень про інвестиції, продаж, оренду, страхування, а також для фінансової звітності та оподаткування",
		link: "/ocinka/komercijna",
		image: "/assets/komerc.jpg",
	},
	{
		id: 3,
		title: "Оцінка колісних транспортних засобів",
		desc: "Процес визначення ринкової вартості або іншої вартості колісних транспортних засобів, таких як легкові автомобілі, вантажівки, автобуси, причепи та спеціальна техніка. Цей процес використовується для різних цілей, включаючи купівлю-продаж, страхування, оподаткування, кредитування, оренду або оцінку збитків у випадку аварії чи інших пошкоджень",
		link: "/ocinka/ktz",
		image: "/assets/ktz.jpg",
	},
	{
		id: 4,
		title: "Оцінка житлової нерухомості",
		desc: "Процес визначення ринкової вартості об'єктів нерухомості, які використовуються для особистих потреб або є об'єктами житлової чи нежитлової власності, що не пов'язані з комерційною діяльністю. Це може включати житлові будинки, квартири, дачі, земельні ділянки, а також інші об'єкти, які не використовуються для бізнесових цілей",
		link: "/ocinka/neruhomist",
		image: "/assets/neruh.jpg",
	},
	{
		id: 5,
		title: "Оцінка обладнання",
		desc: "Процес визначення ринкової вартості або іншої вартості обладнання, яке використовується в промисловості, виробництві, сільському господарстві або інших секторах економіки. Оцінка може проводитися для різних цілей, таких як продаж, покупка, страхування, фінансування, оподаткування або управління активами",
		link: "/ocinka/obladnannja",
		image: "/assets/obladnan.jpg",
	},
];

const WorkTypes = () => {
	const [type, setType] = useState(items[0]);

	const handleSlediChange = (swiper) => {
		const currentIndex = swiper.activeIndex;
		setType(items[currentIndex]);
	};
	return (
		<section className="hidden lg:flex flex-col justify-center lg:px-0 py-8">
			<div className="container mx-auto">
				<div className="flex flex-col lg:flex-row lg:gap-8 lg:h-96">
					<div className="w-full lg:w-1/2 flex flex-col lg:justify-between order-2 lg:order-none space-y-4">
						<h2 className="h2 leading-none group-hover:text-accent transition-all duration-500 capitalize">
							{type.title}
						</h2>
						<p className="text-white/75">{type.desc}</p>
						<div className="border border-white/20" />
						<Link
							href="/ocinka"
							className="flex gap-2 item-center border border-white/80 w-fit p-2 rounded-full bg-accent-hover text-secondary font-semibold hover:bg-accent hover:text-primary">
							Дізнатись більше
						</Link>
					</div>
					<div className="w-full lg:w-1/2">
						<Swiper
							spaceBetween={30}
							slidesPerView={1}
							autoplay={{
								delay: 2500,
								disableOnInteraction: true,
							}}
							modules={[Autoplay]}
							className="mb-12 lg:mb-0"
							onSlideChange={handleSlediChange}>
							{items.map((item) => {
								return (
									<SwiperSlide key={item.id}>
										<div className="h-80 relative group flex justify-center items-center bg-pink-50/20">
											<div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10" />
											<div className="relative w-full h-full">
												<Image
													src={item.image}
													fill
													className="object-cover"
													alt={item.title}
												/>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WorkTypes;
