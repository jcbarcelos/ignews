import React from "react";
import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/client";

export default function SignButton() {
  const [session] =  useSession();
    
  return session ? (
    <button type="button" className={styles.signButton}
    onClick={()=> signOut() }>
      {/* <FaGithub color="#04d361" /> */}
      <img src={session.user.image}  className={styles.avatar} />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in wuth Github
    </button>
  );
}
