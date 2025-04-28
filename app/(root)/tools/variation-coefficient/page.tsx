import VariationCoefficientCalculator from "@/components/shared/VariationCoefficientCalculator";
import styles from "@/styles/modules/tools.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Коефіцієнт варіації",
  description: "Розрахунок коефіцієнта варіації для оцінки розсіювання даних",
};

export default function VariationCoefficient() {
  return (
    <div className={styles.formula}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Коефіцієнт варіації</h1>
          <p>
            Формула для оцінки ступеня розсіювання даних відносно середнього
            значення.
          </p>
        </div>
      </section>
      <div className={styles.container}>
        <h2>Розрахунок</h2>
        <VariationCoefficientCalculator />
      </div>
    </div>
  );
}
