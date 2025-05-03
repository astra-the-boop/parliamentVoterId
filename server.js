require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = "https://mackerel-moved-elephant.ngrok-free.app/callback";

//defining cipher methods as functions for convenience's sake
function base64(input){
    return Buffer.from(input).toString('base64')
}

function replace(input,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,zero,one,two,three,four,five,six,seven,eight,nine){
    let output = "";
    for(i=0; i<input.length; i++){
        switch(input[i].toLowerCase()){
            case "a":
                output += a;
                break;
            case "b":
                output += b;
                break;
            case "c":
                output += c;
                break;
            case "d":
                output += d;
                break;
            case "e":
                output += e;
                break;
            case "f":
                output += f;
                break;
            case "g":
                output += g;
                break;
            case "h":
                output += h;
                break;
            case "i":
                output += i;
                break;
            case "j":
                output += j;
                break;
            case "k":
                output += k;
                break;
            case "l":
                output += l;
                break;
            case "m":
                output += m;
                break;
            case "n":
                output += n;
                break;
            case "o":
                output += o;
                break;
            case "p":
                output += p;
                break;
            case "q":
                output += q;
                break;
            case "r":
                output += r;
                break;
            case "s":
                output += s;
                break;
            case "t":
                output += t;
                break;
            case "u":
                output += u;
                break;
            case "v":
                output += v;
                break;
            case "w":
                output += w;
                break;
            case "x":
                output += x;
                break;
            case "y":
                output += y;
                break;
            case "z":
                output += z;
                break;
            case "1":
                output += one;
                break;
            case "2":
                output += two;
                break;
            case "3":
                output += three;
                break;
            case "4":
                output += four;
                break;
            case "5":
                output += five;
                break;
            case "6":
                output += six;
                break;
            case "7":
                output += seven;
                break;
            case "8":
                output += eight;
                break;
            case "9":
                output += nine;
                break;
            case "0":
                output += zero;
                break;
            default:
                break;}}}

//add your own if you want :D

function cipherProcess(input){
    //enter process here
    let output = input;
    output = base64(output);
    return output
}

//the rest of the code below :3c

app.get("/callback", async (req, res) => {
    const code = req.query.code;

    try{
        const tokenRes = await axios.post("https://slack.com/api/openid.connect.token", null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                code,
                redirect_uri: redirectUri,
                grant_type: "authorization_code"
            },
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        });

        if(!tokenRes.data.ok){
            return res.status(500).send(`Oath error: ${tokenRes.data.error}`);
        }

        const accessToken = tokenRes.data.access_token;

        const userInfo = await axios.get("https://slack.com/api/openid.connect.userInfo", {
            headers: {"Authorization": `Bearer ${accessToken}`},
        });

        if(!userInfo.data.sub){
            return res.status(500).send(`Error: ${userInfo.data.sub}`);
        }

        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <style>
        @font-face {
    font-family: 'Phantom Sans';
    src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff')
    format('woff'),
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff2')
    format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Phantom Sans';
    src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Italic.woff')
    format('woff'),
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Italic.woff2')
    format('woff2');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}
@font-face {
    font-family: 'Phantom Sans';
    src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff')
    format('woff'),
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff2')
    format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

body{
    background-color: #e0e6ed;
    margin: 0;
}

code{
    background-color: #8492a6;
    color: black
}

#body {
    font-family: 'Phantom Sans';
    text-align: center;
    color: #ec3750;
    padding: 0 20% 0 20%
}

#header{
    background-color: #333333;
    min-width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 20px;
}

#logo {
    height: 60px;
}

h1{
    font-size: 40px
}
    </style>
    <title>Voter Identification Code - Hack Club Parliament</title>
</head>
<body>
    <div id="header">
        <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6cccae8b08b7481b3ad4ba320ccadf381a032c96_parliament-full.svg" id="logo">
    </div>
    <div id="body">
        <h1>Thank you for voting in the May 2025 Parliament elections!</h1>
        <h3 style="color:#338eda">Your voter identification details are below:</h3>
        <br>
        <details>
        <summary>
        <h3>Do NOT share your voter identification code, this code is used to identify you are the real voter. This code is only valid for the May 2025 Election cycle. Click on this text to proceed</h3>
    </summary>
    <p style="color: #338eda"><b>Slack ID:</b></p>
        <div style="border-radius: 5px; background-color: #8492a6; padding: 10px">
        <code>${userInfo.data.sub}</code>
        </div>
<br><b><p style="color: #338eda">Voter Identification Code:</p></b>
        <div style="border-radius: 5px; background-color: #8492a6; padding: 10px">
        <code>${cipherProcess(userInfo.data.sub)}</code>
        </div>
    </details>
    <br><br><p style="color: #8492a6">The Parliament of Hack Club (Hack Club Parliament) and other associated communities and entities are not associated with the Hack Club non-profit organization. This is an unofficial community group and only exists for the purpose of entertainment.</p>
    </div>
</body>
</html>

`);

    } catch(err){
        console.error(err);
        res.status(500).send(`Oath exchange failed - ${err}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})