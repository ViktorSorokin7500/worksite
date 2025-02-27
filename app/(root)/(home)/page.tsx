"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/modules/home.module.scss";
import houseImg from "@/public/images/house.jpg";
import carImg from "@/public/images/car.jpg";
import equipmentImg from "@/public/images/equipment.jpg";
import damageImg from "@/public/images/damage.jpg";
import officeImg from "@/public/images/office.jpg";
import Image from "next/image";

export default function Home() {
  const [counts, setCounts] = useState({ years: 0, tenders: 0, reports: 0 });
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const animate = (target: number, key: string) => {
            let start = 0;
            const step = target / 50;
            const timer = setInterval(() => {
              start += step;
              if (start >= target) {
                start = target;
                clearInterval(timer);
              }
              setCounts((prev) => ({ ...prev, [key]: Math.floor(start) }));
            }, 20);
          };

          animate(17, "years");
          animate(90, "tenders");
          animate(4000, "reports");
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Герой */}
      <section className={styles.hero}>
        <h1>НЕЗАЛЕЖНА ЕКСПЕРТНА ОЦІНКА</h1>
        <p>Визначимо точну вартість вашого майна — від квартир до збитків</p>
        <Link href="/contacts" className={styles.cta}>
          Зв’язатись зараз
        </Link>
      </section>

      {/* Услуги */}
      <section className={styles.services}>
        <h2>Що ми оцінюємо</h2>
        <div className={styles.grid}>
          <Link href="/ocinka/neruhomist" className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={houseImg}
                alt="Нерухомість"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3>Нерухомість</h3>
            <p>Квартири, будинки, земля — оцінимо швидко</p>
          </Link>
          <Link href="/ocinka/ktz" className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={carImg}
                alt="Транспорт"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3>Транспорт</h3>
            <p>Авто чи спецтехніка — без питань</p>
          </Link>
          <Link href="/ocinka/obladnannja" className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={equipmentImg}
                alt="Обладнання"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3>Обладнання</h3>
            <p>Станки, техніка — знаємо, як це працює</p>
          </Link>
          <Link href="/ocinka/zbytky" className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={damageImg}
                alt="Збитки"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3>Збитки</h3>
            <p>Збитки від агресії рф — порахуємо все</p>
          </Link>
          <Link href="/ocinka/komercijna" className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={officeImg}
                alt="Комерція"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3>Комерція</h3>
            <p>Офіси, склади — для бізнесу</p>
          </Link>
        </div>
      </section>

      {/* Про нас */}
      <section className={styles.about} ref={statsRef}>
        <h2>Чому ми?</h2>
        <p>17 років розбираємося в майні — від гаражів до заводів.</p>
        <div className={styles.stats}>
          <div>
            <span className={styles.count}>{counts.years}</span>
            <p>років на ринку</p>
          </div>
          <div>
            <span className={styles.count}>{counts.tenders}+</span>
            <p>тендерів на Прозорро</p>
          </div>
          <div>
            <span className={styles.count}>{counts.reports}+</span>
            <p>звітів складено</p>
          </div>
        </div>
      </section>

      {/* Быстрый контакт */}
      <section className={styles.quickContact}>
        <h2>Потрібна оцінка?</h2>
        <div>
          Телефонуйте:
          <p>
            <a href="tel:+380505392048">+38 (050) 539 20 48</a>
          </p>
          <p>
            <a href="tel:+380676842648">+38 (067) 684 26 48</a>
          </p>
        </div>
        <p>
          Або пишіть: <a href="mailto:mfvict@gmail.com">mfvict@gmail.com</a>
        </p>
        <Link href="/contacts" className={styles.cta}>
          Детальні контакти
        </Link>
      </section>
    </>
  );
}
