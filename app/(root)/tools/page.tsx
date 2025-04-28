import Link from "next/link";
import styles from "@/styles/modules/tools.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Інструменти оцінювача",
  description: "Професійні інструменти для оцінки майна та збитків",
};

const formulas = [
  { id: "variation-coefficient", title: "Коефіцієнт варіації" },
];

export default function Formulas() {
  return (
    <div className={styles.formulas}>
      {/* Герой */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Інструменти для оцінювачів</h1>
          <p>Ознайомтесь з професійними інструментами для оцінки</p>
        </div>
      </section>

      <div className={styles.container}>
        <h2>Доступні формули</h2>
        <div className={styles.grid}>
          {formulas.map((formula) => (
            <Link
              key={formula.id}
              href={`/tools/${formula.id}`}
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
