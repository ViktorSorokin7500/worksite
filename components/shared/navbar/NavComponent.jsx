import Link from "next/link";

export const NavComponent = ({ title, link, pathname }) => {
	let isActive = false;

	if (pathname === link) {
		isActive = true;
	} else if (link !== "/" && pathname.startsWith(link)) {
		isActive = true;
	}
	return (
		<Link href={link}>
			<h3
				className={`${
					isActive && "text-accent border-b-2 border-accent"
				} text-xl font-semibold hover:text-accent transition-all`}>
				{title}
			</h3>
		</Link>
	);
};

export const NavSubComponent = ({ title, link, desc, onClick }) => {
	return (
		<Link
			href={link}
			className="block z-50 px-4 py-2 transition-all hover:bg-secondary hover:text-accent-hover duration-150"
			onClick={onClick}>
			<h4 className="text-xl text-center font-semibold">{title}</h4>
		</Link>
	);
};
