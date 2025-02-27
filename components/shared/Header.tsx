"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "@/styles/modules/header.module.scss";

interface NavItemProps {
  name: string;
  path: string;
}

const navItems: NavItemProps[] = [
  { name: "Головна", path: "/" },
  { name: "Оцінка", path: "/ocinka" },
  { name: "Формули", path: "/formulas" },
  { name: "Контакти", path: "/contacts" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Оцінка Майна</Link>
      </div>
      <button
        className={styles.burger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={isOpen ? styles.open : ""}></span>
      </button>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <ul>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
};

const NavItem = ({
  item,
  onClick,
}: {
  item: NavItemProps;
  onClick: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <li className={isActive ? styles.active : ""} onClick={onClick}>
      {isActive ? (
        <span>{item.name}</span>
      ) : (
        <Link href={item.path}>{item.name}</Link>
      )}
    </li>
  );
};
