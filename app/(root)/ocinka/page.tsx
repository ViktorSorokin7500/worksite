import Link from "next/link";
import styles from "@/styles/modules/ocinka.module.scss";
import houseImg from "@/public/images/house.jpg";
import carImg from "@/public/images/car.jpg";
import equipmentImg from "@/public/images/equipment.jpg";
import damageImg from "@/public/images/damage.jpg";
import officeImg from "@/public/images/office.jpg";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  image: string;
  path: string;
}

const ocinkaTypes: CardProps[] = [
  {
    title: "Оцінка збитків",
    description:
      "Визначення втрат від агресії РФ для відшкодування чи відновлення",
    image: damageImg.src,
    path: "/ocinka/zbytky",
  },
  {
    title: "Оцінка КТЗ",
    description: "Ринкова вартість транспорту для угод чи податків",
    image: carImg.src,
    path: "/ocinka/ktz",
  },
  {
    title: "Оцінка обладнання",
    description: "Вартість для угод, кредитів чи ліквідації",
    image: equipmentImg.src,
    path: "/ocinka/obladnannja",
  },
  {
    title: "Оцінка комерційної нерухомості",
    description: "Вартість для бізнесу, обліку чи податків",
    image: officeImg.src,
    path: "/ocinka/komercijna",
  },
  {
    title: "Оцінка житлової нерухомості",
    description: "Вартість для продажу, іпотеки чи суду",
    image: houseImg.src,
    path: "/ocinka/neruhomist",
  },
];

export default function Ocinka() {
  return (
    <div className={styles.ocinka}>
      {/* Герой */}
      <section className={styles.hero}>
        <h1>Оцінка майна — швидко і точно</h1>
        <p>
          Ми надаємо професійну та обґрунтовану оцінку, необхідну для подальших
          юридичних і фінансових процесів
        </p>
        <Link href="/contacts" className={styles.cta}>
          Замовити оцінку
        </Link>
      </section>

      {/* Виды оценки */}
      <section className={styles.types}>
        <h2>Види оцінки</h2>
        <div className={styles.grid}>
          {ocinkaTypes.map((type) => (
            <div key={type.path} className={styles.card}>
              <Image
                src={type.image}
                alt={type.title}
                fill
                style={{ objectFit: "cover" }}
                className={styles.bgImage}
              />
              <h3>{type.title}</h3>
              <p>{type.description}</p>
              <Link href={type.path} className={styles.btn}>
                Детальніше
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Як ми працюємо */}
      <section className={styles.process}>
        <h2>Як ми працюємо</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.number}>1</span>
            <h3>Визначення мети оцінки</h3>
            <p>Попередня ідентифікація об’єкта оцінки</p>
          </div>
          <div className={styles.step}>
            <span className={styles.number}>2</span>
            <h3>Аналіз даних</h3>
            <p>Аналіз повноти вихідних даних, розрахунок вартості послуг</p>
          </div>
          <div className={styles.step}>
            <span className={styles.number}>3</span>
            <h3>Укладання договору</h3>
            <p>Укладання договору про надання послуг з оцінки</p>
          </div>
          <div className={styles.step}>
            <span className={styles.number}>4</span>
            <h3>Оціночні процедури</h3>
            <p>Здійснення процедур, складання звіту про оцінку</p>
          </div>
          <div className={styles.step}>
            <span className={styles.number}>5</span>
            <h3>Презентація звіту</h3>
            <p>Передача готового звіту клієнту</p>
          </div>
        </div>
      </section>

      {/* Призыв */}
      <section className={styles.call}>
        <h2>Потрібна оцінка?</h2>
        <p>Зв’яжіться з нами, щоб отримати звіт за 24 години</p>
        <Link href="/contacts" className={styles.cta}>
          Зв’язатись зараз
        </Link>
      </section>
    </div>
  );
}
