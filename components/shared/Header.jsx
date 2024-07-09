import Link from "next/link";
import Nav from "./navbar/Nav";
import { Button } from "../ui/button";
import MobileNav from "./navbar/MobileNav";

const Header = () => {
	return (
		<header className="py-8 xl:py-12 text-white">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/">
					<h2 className="text-4xl font-semibold">
						Sorokin<span className="text-accent">.</span>
					</h2>
				</Link>
				<div className="hidden xl:flex items-center gap-4">
					<Nav />
					<Button
						asChild
						className="bg-accent hover:bg-accent-hover text-primary rounded-full">
						<Link href="/contacts">
							<span className="text-xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br from-gray-700 to-gray-900 hover:drop-shadow-[4px_4px_6px_rgba(0,0,0,0.5)]">
								Зв&apos;язатись
							</span>
						</Link>
					</Button>
				</div>
				<div className="xl:hidden">
					<MobileNav />
				</div>
			</div>
		</header>
	);
};

export default Header;
