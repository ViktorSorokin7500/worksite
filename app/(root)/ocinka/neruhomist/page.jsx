import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import TabsSection from "@/components/shared/pages/TabsSection";
import { neruhomistInfo } from "@/lib/data";

const Neruhomist = () => {
	return (
		<section className="container mx-auto w-screen">
			<MotionWrapper>
				<h1 className="h1 text-center mb-4 lg:mb-8">
					Оцінка Житлової Нерухомості
				</h1>
				<TabsSection info={neruhomistInfo} />
			</MotionWrapper>
		</section>
	);
};

export default Neruhomist;
