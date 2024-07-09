"use client";

import CountUp from "react-countup";

const stats = [
	{
		num: new Date().getFullYear() - 2008,
		text: "років на ринку оцінки",
	},
	{
		num: 90,
		text: "тендерів на Прозорро",
	},
	{
		num: 3200,
		text: "складених звітів",
	},
];

const Stats = () => {
	return (
		<div className="container mx-auto">
			<div className="flex flex-col md:flex-row gap-4 max-w-[80vw] mx-auto xl:max-w-none">
				{stats.map((item, index) => {
					return (
						<div
							key={index}
							className="flex-1 flex flex-col gap-0.5 items-center justify-center">
							<div className="flex items-center">
								<CountUp
									end={item.num}
									duration={5}
									delay={2}
									className="text-4xl lg:text-6xl font-extrabold"
								/>
								{index !== 0 && <span className="text-2xl">+</span>}
							</div>
							<p className="leading-snug text-white/60 text-center">
								{item.text}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Stats;
