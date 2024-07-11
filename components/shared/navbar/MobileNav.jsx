"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { DialogTitle } from "@radix-ui/react-dialog";

const links = [
	{ name: "Головна", path: "/" },
	{ name: "Оцінка", path: "/ocinka" },
	{ name: "Зв'язатись", path: "/contacts" },
];

const MobileNav = () => {
	const pathname = usePathname();
	return (
		<Sheet>
			<SheetTrigger className="flex justify-center items-center">
				<CiMenuFries className="text-[32px] text-accent" />
			</SheetTrigger>
			<SheetContent className="flex justify-center items-center bg-primary">
				<nav className="flex flex-col justify-center items-center gap-8">
					{links.map((link, index) => {
						return (
							<SheetClose asChild key={index}>
								<Link
									href={link.path}
									className={`${
										link.path === pathname &&
										"text-accent border-b-2 border-accent"
									} text-xl capitalize hover:text-accent transition-all`}>
									<DialogTitle>{link.name}</DialogTitle>
								</Link>
							</SheetClose>
						);
					})}
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
