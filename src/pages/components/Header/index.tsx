import React from "react";
import SignButton from "../SignButton";
import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";

export default function Header() {
 
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img alt="ig.news" src="/images/logo.svg" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignButton />
      </div>
    </header>
  );
}
