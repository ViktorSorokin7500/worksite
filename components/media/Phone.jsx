import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";

export default function Phone() {
	return (
		<Link href="tel:+380505392048" target="_blank" className="sm:hidden">
			<BiPhoneCall
				className="w-9 h-9 fill-black bg-accent rounded-full"
				aria-label="Phone"
			/>
		</Link>
	);
}
