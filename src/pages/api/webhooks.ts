import { Stripe } from "stripe";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { Readable } from "stream";
import { stripe } from "../../services/stripe";
import { manageSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.descriptions.created",
  "customer.descriptions.updated",
  "customer.descriptions.deleted",
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const secret = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      return res.status(400).send(`WebHooks error: ${error.message}`);
    }
    const { type } = event;
    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "customer.description.updated":
          case "customer.description.deleted":
            const subscription = event.data.object as Stripe.Subscription;

            await manageSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
            );

            break;

          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            await manageSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );
            break;
          default:
            throw new Error("Unhandled event");
        }
      } catch (error) {
        //
        return res.json({
          error: `Webhook error ${error.message}`,
        });
      }
    }

    res.status(200).json({
      received: true,
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method not allowed");
  }
};
