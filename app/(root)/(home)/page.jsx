import Stats from "@/components/shared/home/Stats";
import Testimonial from "@/components/shared/home/Testimonial";
import WorkTypes from "@/components/shared/home/WorkTypes";
import MotionWrapper from "@/components/shared/motion/MotionWrapper";

export default function Home() {
	return (
		<section className="h-full space-y-4 lg:space-y-12">
			<MotionWrapper>
				<Testimonial />
				<Stats />
				<WorkTypes />
			</MotionWrapper>
		</section>
	);
}
