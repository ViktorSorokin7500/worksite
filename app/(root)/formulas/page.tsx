import Link from "next/link";
import styles from "@/styles/modules/formulas.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Формули",
  description: "Професійні формули для оцінки майна та збитків",
};

// Список формул для оценщиков (можно дополнить)
const formulas = [
  { id: "variation-coefficient", title: "Коефіцієнт варіації" },
];

export default function Formulas() {
  return (
    <div className={styles.formulas}>
      {/* Герой */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Формули для оцінщиків</h1>
          <p>Ознайомтесь з професійними формулами для оцінки</p>
        </div>
      </section>

      {/* Список формул в виде карточек */}
      <div className={styles.container}>
        <h2>Доступні формули</h2>
        <div className={styles.grid}>
          {formulas.map((formula) => (
            <Link
              key={formula.id}
              href={`/formulas/${formula.id}`}
              className={styles.card}
            >
              <h3>{formula.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
