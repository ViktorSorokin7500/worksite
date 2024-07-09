import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

export default function WhatsApp() {
	return (
		<Link href="https://wa.me/380505392048" target="_blank" title="WhatsApp">
			<div className="size-10 bg-green-500 hover:bg-green-400 rounded flex justify-center items-center">
				<IoLogoWhatsapp className="size-10 fill-white" aria-label="WhatsApp" />
			</div>
		</Link>
	);
}
