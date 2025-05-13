import { LinearInterpolationCalculator } from "@/components/shared";
import styles from "@/styles/modules/tools.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Лінійна інтерполяція",
  description: "Розрахунок лінійної інтерполяції для оцінки",
};

export default function VariationCoefficient() {
  return (
    <div className={styles.formula}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Лінійна інтерполяція</h1>
          <p>
            Метод наближення функції для знаходження проміжних значень на основі
            заданих даних.
          </p>
        </div>
      </section>
      <div className={styles.container}>
        <h2>Розрахунок</h2>
        <LinearInterpolationCalculator />
      </div>
    </div>
  );
}
