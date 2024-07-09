import MotionWrapper from "./motion/MotionWrapper";

const Footer = () => {
	return (
		<footer className="flex flex-col gap-3 py-4 px-8 text-white relative">
			<MotionWrapper>
				<div className="flex flex-col justify-center text-center">
					<span className="h3">Сорокін Сергій Вікторович</span>
					<span className="font-semibold">{new Date().getFullYear()}</span>
				</div>
			</MotionWrapper>
		</footer>
	);
};

export default Footer;
