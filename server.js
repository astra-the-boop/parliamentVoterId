require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = "https://mackerel-moved-elephant.ngrok-free.app";

app.get("/callback", async (req, res) => {
    const code = req.query.code;
    const response = await axios.post("https://slack.com/api/oauth.v2.access", null, {
        params:{
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
        },
    });

    const slackUserId = response.headers.authed_user.id;
    res.send(`Your Slack ID is ${slackUserId}`);
});

app.listen(port, () => {
   console.log(`Running at http://localhost:${port}`);
});
