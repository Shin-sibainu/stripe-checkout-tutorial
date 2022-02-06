const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51KQ7GjCvcMsmFaWcuui9CDi2zMFfzmJsfGbXElS2ovboCZpROOJJVoosttcVQ9EhV1R0Q3MmqhzA3T0aZGh6ql2T00fW5AMzCZ"
);
const PORT = 3000;

app.use(express.static("public"));

const YOUR_DOMAIN = `http://localhost:${PORT}`;

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1KQ7L4CvcMsmFaWcKPkKVUNl",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.redirect(303, session.url);
});

app.listen(PORT, () => console.log("サーバーが起動しました"));
