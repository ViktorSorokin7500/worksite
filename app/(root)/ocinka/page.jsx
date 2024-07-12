import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import Link from "next/link";
import React from "react";

import { BsArrowDownRight } from "react-icons/bs";

const pages = [
	{
		num: "01",
		link: "/ocinka/zbytky",
		title: "Оцінка Збитків",
		desc: "Оцінка збитків, завданих агресією рф проти України, проводиться для визначення економічних втрат, спричинених руйнуванням інфраструктури, житла, промислових об'єктів та іншого майна. Вона необхідна для документування і подальшого відшкодування втрат через міжнародні суди та інші правові механізми, для розрахунку гуманітарної та фінансової допомоги, а також для планування відновлення постраждалих територій.",
	},
	{
		num: "02",
		link: "/ocinka/ktz",
		title: "Оцінка КТЗ",
		desc: "Оцінка КТЗ визначає їхню ринкову вартість і потрібна для встановлення справедливої ціни при купівлі чи продажу транспортних засобів. Вона також використовується при оформленні кредитів, де транспортний засіб є заставою, і для бухгалтерського обліку та податкових цілей, таких як амортизація і розрахунок податків.",
	},
	{
		num: "03",
		link: "/ocinka/obladnannja",
		title: "Оцінка Обладнання",
		desc: "Оцінка обладнання потрібна при купівлі або продажу обладнання, оформлення кредитів. Вона також необхідна для бухгалтерського обліку, розрахунку амортизації та податкових зобов'язань. Крім того, оцінка використовується для визначення вартості при ліквідації чи злитті підприємств.",
	},
	{
		num: "04",
		link: "/ocinka/komercijna",
		title: "Оцінка Комерційної Нерухомості",
		desc: "Оцінка комерційної нерухомості забезпечує об'єктивну інформацію про вартість майна, визначення вартості активів для бухгалтерського обліку і податкових розрахунків, що є ключовою для прийняття фінансових і стратегічних рішень",
	},

	{
		num: "05",
		link: "/ocinka/neruhomist",
		title: "Оцінка Житлової Нерухомості",
		desc: "Оцінка нерухомості допомагає визначити ринкову вартість перед продажем, покупкою або для отримання іпотеки. Це також важливо для юридичних процедур, таких як спадщина або розподіл майна, а також для судових справ",
	},
];

const Ocinka = () => {
	return (
		<section className="flex flex-col justify-center py-8 lg:py-0">
			<div className="container mx-auto">
				<MotionWrapper className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
					{pages.map((page, i) => {
						return (
							<div
								key={i}
								className={`${
									i === 0 ? "md:col-span-2" : "md:col-span-1"
								} group space-y-4`}>
								<div className="w-full flex justify-between items-center">
									<div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
										{page.num}
									</div>
									<Link
										href={page.link}
										className="size-12 rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center group-hover:-rotate-45"
										title="Перейти">
										<BsArrowDownRight className="text-primary text-2xl" />
									</Link>
								</div>
								<h2 className="h2 group-hover:text-accent transition-all  duration-500">
									<Link href={page.link}>{page.title}</Link>
								</h2>
								<p className="text-white/80">{page.desc}</p>
								<div className="border-b border-white/20 w-full" />
							</div>
						);
					})}
				</MotionWrapper>
			</div>
		</section>
	);
};

export default Ocinka;
