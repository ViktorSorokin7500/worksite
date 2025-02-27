import { ServicePage } from "@/components/shared";
import { neruhomistInfo } from "@/lib/data.js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Нерухомість",
  description: "Незалежна оцінка нерухомого майна в Україні",
};

export default function Neruhomist() {
  return (
    <ServicePage
      title="Оцінка житлової нерухомості"
      shortDesc="Вартість для продажу, іпотеки чи суду"
      sections={neruhomistInfo}
    />
  );
}
