import { ContactsForm } from "@/components/shared";
import styles from "@/styles/modules/contacts.module.scss";
import { Metadata } from "next";
import { FaWhatsapp, FaTelegramPlane, FaViber } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Зв’яжіться з нами для оцінки майна через телефон, email або месенджери",
};

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      {/* Герой */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Зв’яжіться з нами</h1>
          <p>Залиште повідомлення, і ми відповімо вам якомога швидше</p>
        </div>
      </section>

      {/* Форма и контакты */}
      <div className={styles.container}>
        <div className={styles.formSection}>
          <h2>Надіслати повідомлення</h2>
          <ContactsForm /> {/* Клиентский компонент */}
        </div>

        <div className={styles.infoSection}>
          <h2>Наші контакти</h2>
          <p>
            Телефон (Vodafone):{" "}
            <a href="tel:+380505392048">+38 (050) 539 20 48</a>
          </p>
          <p>
            Телефон (Kyivstar):{" "}
            <a href="tel:+380676842648">+38 (067) 684 26 48</a>
          </p>
          <p>
            Email: <span>mfvict@gmail.com</span>
          </p>
          <p>
            Мессенджери:
            <a href="https://wa.me/380505392048" className={styles.iconLink}>
              <FaWhatsapp size={30} fill="#25D366" />
            </a>
            <a href="https://t.me/+380505392048" className={styles.iconLink}>
              <FaTelegramPlane size={30} fill="#0088cc" />
            </a>
            <a
              href="viber://chat?number=%2B380505392048"
              className={styles.iconLink}
            >
              <FaViber size={30} fill="#665CAC" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
