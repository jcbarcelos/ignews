import { signIn, useSession } from "next-auth/client";
import React from "react";
import styles from "./styles.module.scss";

export default function SubscribeButton() {
  const [session] = useSession();

  function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }
    //checkout session

    
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
