import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import ukraine from "/public/ukraine.png";

const Testimonial = () => {
	return (
		<div className="container mx-auto h-full">
			<div className="flex flex-col lg:flex-row items-center justify-between">
				<div className="lg:w-1/2 text-center lg:text-left">
					<h1 className="h1 mb-6">НЕЗАЛЕЖНА ЕКСПЕРТНА ОЦІНКА</h1>
					<p className="mb-9 text-white/80">
						<span>
							Пропонуємо комплексні послуги з незалежної оцінки. Наша експертиза
							охоплює оцінку нерухомості, рухомого майна, обладнання та збитків.
						</span>
						<span className="hidden md:inline">
							У сучасних умовах, коли військові дії змінюють реальність, оцінка
							збитків, завданих агресією з боку російської федерації, стала
							актуальною.
						</span>
						<span>
							Ми надаємо професійну та обґрунтовану оцінку, необхідну для
							подальших юридичних і фінансових процесів
						</span>
					</p>
					<div className="flex flex-col md:flex-row justify-center lg:justify-start items-center gap-4">
						<Button
							asChild
							className="border-accent border bg-secondary text-accent hover:bg-accent-hover hover:text-white hover:border-white">
							<Link href="/contacts">Консультація</Link>
						</Button>
					</div>
				</div>
				<div className="lg:w-1/2 ">
					<Image src={ukraine} alt="ukraine" width={0} height={0} priority />
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
