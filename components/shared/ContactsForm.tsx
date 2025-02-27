"use client";
import { useState } from "react";
import styles from "@/styles/modules/contacts.module.scss";

export const ContactsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setStatus("Ваше повідомлення надіслано!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Щось пішло не так. Спробуйте ще раз.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name">Ім’я</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Номер телефону</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Повідомлення</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.cta}>
        Надіслати
      </button>
      {status && <p className={styles.status}>{status}</p>}
    </form>
  );
};
