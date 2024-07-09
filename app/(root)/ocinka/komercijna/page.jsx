import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import TabsSection from "@/components/shared/pages/TabsSection";
import { komercInfo } from "@/lib/data";

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
