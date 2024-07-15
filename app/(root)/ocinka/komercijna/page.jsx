import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import TabsSection from "@/components/shared/pages/TabsSection";
import { komercInfo } from "@/lib/data";

export const metadata = {
	title: "Оцінка Комерційної Нерухомості",
	description:
		"Оцінка комерційної нерухомості забезпечує об'єктивну інформацію про вартість майна, визначення вартості активів для бухгалтерського обліку і податкових розрахунків, що є ключовою для прийняття фінансових і стратегічних рішень.",
	keywords:
		"оцінка, оцінка майна, оцінка комерційної нерухомості, оцінка бізнес-нерухомості, оцінка вартості майна, оцінювач",
	alternates: {
		canonical: "https://sorokinsv.com/ocinka/komercijna",
	},
	openGraph: {
		title: "Оцінка Комерційної Нерухомості | Сорокін",
		description:
			"Оцінка комерційної нерухомості забезпечує об'єктивну інформацію про вартість майна, визначення вартості активів для бухгалтерського обліку і податкових розрахунків, що є ключовою для прийняття фінансових і стратегічних рішень.",
		url: "https://sorokinsv.com/ocinka/komercijna",
		type: "website",
		images: [
			{
				url: "https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
				width: 800,
				height: 600,
				alt: "Зображення України",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Оцінка Комерційної Нерухомості | Сорокін",
		description:
			"Оцінка комерційної нерухомості забезпечує об'єктивну інформацію про вартість майна, визначення вартості активів для бухгалтерського обліку і податкових розрахунків, що є ключовою для прийняття фінансових і стратегічних рішень.",
		image:
			"https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
	},
	lang: "uk-UA",
};

const Komercijna = () => {
	return (
		<section className="container mx-auto w-screen">
			<MotionWrapper>
				<h1 className="h1 text-center mb-4 lg:mb-8">
					Оцінка Комерційної Нерухомості
				</h1>
				<TabsSection info={komercInfo} />
			</MotionWrapper>
		</section>
	);
};

export default Komercijna;
