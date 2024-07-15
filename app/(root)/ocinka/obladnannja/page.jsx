import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import TabsSection from "@/components/shared/pages/TabsSection";
import { obladnannyaInfo } from "@/lib/data";

export const metadata = {
	title: "Оцінка Обладнання",
	description:
		"Оцінка обладнання потрібна при купівлі або продажу обладнання, оформленні кредитів. Вона також необхідна для бухгалтерського обліку, розрахунку амортизації та податкових зобов'язань. Крім того, оцінка використовується для визначення вартості при ліквідації чи злитті підприємств.",
	keywords:
		"оцінка, оцінка обладнання, ринкова вартість обладнання, оцінка промислового обладнання, оцінка вартості активів, оцінка техніки, оцінювач обладнання",
	alternates: {
		canonical: "https://sorokinsv.com/ocinka/obladnannja",
	},
	openGraph: {
		title: "Оцінка Обладнання | Сорокін",
		description:
			"Оцінка обладнання потрібна при купівлі або продажу обладнання, оформленні кредитів. Вона також необхідна для бухгалтерського обліку, розрахунку амортизації та податкових зобов'язань. Крім того, оцінка використовується для визначення вартості при ліквідації чи злитті підприємств.",
		url: "https://sorokinsv.com/ocinka/obladnannja",
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
		title: "Оцінка Обладнання | Сорокін",
		description:
			"Оцінка обладнання потрібна при купівлі або продажу обладнання, оформленні кредитів. Вона також необхідна для бухгалтерського обліку, розрахунку амортизації та податкових зобов'язань. Крім того, оцінка використовується для визначення вартості при ліквідації чи злитті підприємств.",
		image:
			"https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
	},
	lang: "uk-UA",
};

const Obladnanny = () => {
	return (
		<section className="container mx-auto w-screen">
			<MotionWrapper>
				<h1 className="h1 text-center mb-4 lg:mb-8">Оцінка Обладнання</h1>
				<TabsSection info={obladnannyaInfo} />
			</MotionWrapper>
		</section>
	);
};

export default Obladnanny;
