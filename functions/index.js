const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require("stripe")('sk_test_51HS9pLJhSge19zmweT5fHyaiOA7GhTeNjV2fynZloHljQPhiELW87AbTU7SFwykmL1Q48GuuQOiI1MIo1yleI0ug00AoRidb5i');

// App config
const app = express();

// Middleewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (req, res) => res.status(200).send('helloworld'));

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;

    console.log('PAYMENT req received >>>>>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});
// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-ba819/us-central1/api


