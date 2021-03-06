import Head from "next/head";
import { GetStaticProps } from "next";
import { SubscribeButton } from "./components/SubscribeButton";
import styles from "./home.module.scss";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export  function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contantContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br />
            the <span>React</span> word.
          </h1>
          <p>
            Get access to all the publications <br />
            <span> for {product.amount} month </span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Avatar" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KTsehKWiRn3lmJmqtr9mioy", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
