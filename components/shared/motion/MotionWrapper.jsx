"use client";
import { motion } from "framer-motion";

const MotionWrapper = ({ children, className }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 1.2, duration: 0.4, ease: "easeIn" },
			}}
			className={className}>
			{children}
		</motion.div>
	);
};

export default MotionWrapper;
