import { signIn, useSession } from "next-auth/client";
import React from "react";
import { api } from "../../../services/api";
import { getStripeJs } from "../../../services/stripe-js";
import styles from "./styles.module.scss";

export default function SubscribeButton() {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }
    //checkout session

    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;
      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({sessionId})
    } catch (error) {
      alert(error.message)
    }
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
