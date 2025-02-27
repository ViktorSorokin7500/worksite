import { ServicePage } from "@/components/shared";
import { zbytkyInfo } from "@/lib/data.js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Збитки",
  description: "Оцінка збитків від агресії РФ для відшкодування чи відновлення",
};

export default function Zbytky() {
  return (
    <ServicePage
      title="Оцінка збитків"
      shortDesc="Визначення втрат від агресії РФ для відшкодування чи відновлення"
      sections={zbytkyInfo}
    />
  );
}
