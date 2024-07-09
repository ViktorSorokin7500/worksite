"use client";
import { useState } from "react";
import { NavComponent, NavSubComponent } from "./NavComponent";
import { usePathname } from "next/navigation";

const Nav = () => {
	const pathname = usePathname();
	console.log(pathname);
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const handleMouseEnter = () => {
		setDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		setDropdownOpen(false);
	};

	const items = [
		{
			id: 1,
			title: "Оцінка збитків",
			link: "/ocinka/zbytky",
		},
		{
			id: 2,
			title: "Оцінка комерційної нерухомості",
			link: "/ocinka/komercijna",
		},
		{
			id: 3,
			title: "Оцінка колесно-транспортних засобів",
			link: "/ocinka/ktz",
		},
		{
			id: 4,
			title: "Оцінка житлової нерухомості",
			link: "/ocinka/neruhomist",
		},
		{
			id: 5,
			title: "Оцінка обладнання",
			link: "/ocinka/obladnannja",
		},
	];

	return (
		<nav className="text-white">
			<div className="container mx-auto flex justify-between items-center p-2 gap-6">
				<NavComponent title="Головна" link="/" pathname={pathname} />
				<div
					className="relative"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					<NavComponent title="Оцінка" link="/ocinka" pathname={pathname} />
					<div
						className={`absolute left-1/2 transform -translate-x-1/2 border border-white w-96 bg-primary text-white/80 rounded shadow-lg transition-opacity ${
							isDropdownOpen
								? "opacity-100 z-50"
								: "opacity-0 pointer-events-none"
						} duration-300`}>
						{items.map(({ id, title, link }) => (
							<NavSubComponent
								key={id}
								title={title}
								link={link}
								onClick={() => setDropdownOpen(false)}
							/>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
