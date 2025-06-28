require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = `${process.env.REDIRECT_DOMAIN}/callback`;

const key = process.env.ENCRYPT_KEY;

//defining cipher methods as functions for convenience's sake
function base64(input){
    return Buffer.from(input).toString('base64')
}

function xorEncrypt(input, key){
    const keyBytes = new textEncoder().encode(key);
    const result = new uint8Array(input.length);
    for(let i=0; i<input.length; i++){
        result[i] = data[i] ^ keyBytes[i % keyBytes.length];
    }
    return result;
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

async function sendDM(channelID, messageText, time){
    try{
        const response = await axios.post("https://slack.com/api/chat.postMessage",{
            channel: channelID,
            text: messageText
        },{
            headers:{
                "Authorization": `Bearer ${process.env.BOT_TOKEN}`,
                "Content-Type": "application/json"
            }
        });
        console.log("Slack API response:", response.data);
    }
    catch(error){
        console.error(`Error sending DM - ${error.response?.data || error.message}`);
    }
}

app.get("/", async (req, res) => {
    const code = req.query.code;
    const unixTimestamp = Date.now();
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

        await sendDM(userInfo.data.sub, `:parliament-mini: *Thank you for signing up to vote in the August 2025 Hack Club elections.* :tada:

> Time of retrieval *(THIS IS NOT THE VOTER ID)*: ${unixTimestamp} 
> User Slack ID: ${userInfo.data.sub}

_Not you? Contact us for support in <#C08FA68NV2T> so we can remove this vote!_`);

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

button {
    cursor: pointer;
    font-family: inherit;
    border-radius: 99999px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.125);
    letter-spacing: 0.009em;
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.125s ease-in-out, box-shadow 0.125s ease-in-out;
    box-sizing: border-box;
    margin-top: 10px;
    min-width: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: center;
    line-height: inherit;
    text-decoration: none;
    padding: 16px 16px 16px 16px
    color: #ffffff;
    background-color: #ec3750;
    font-size:16px;
    background: none;
    color: #ec3750;
    border: 2px solid currentcolor;
    padding: 5px 5px 5px 5px
  }
  button:focus,
  button:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.0625),0 8px 12px rgba(0, 0, 0, 0.125);;
    transform: scale(1.0625);
  }
  summary::marker{
    content: "";
  }
  code{
    color: #e0e6ed;
  }
    </style>
    <title>August 2025 Voter ID Registration - Hack Club Parliament</title>
</head>
<body>
    <script>
    function copyText(id) {
        const text = document.getElementById(id).textContent;
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied " + id + " to clipboard");
        }).catch(err => {
            alert("Failed to copy text: " + err);
        });
    }
</script>
    <div id="header">
        <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6cccae8b08b7481b3ad4ba320ccadf381a032c96_parliament-full.svg" id="logo">
    </div>
    <div id="body">
        <h1>Thank you for signing up to vote in the August 2025 General Elections!</h1>
        <h2 style="color:#338eda">Your voter identification details are below. Please submit this on your vote ballot.</h2>
        <h3 style="color: #8492a6">Time of retrieval: ${unixTimestamp}</h3>
        
        <h2>Do NOT share your voter identification code, this code is used to identify you are a legitimate voter. This code is only valid for the August 2025 Election cycle for the digital ballot.</h2>
        <button id="proceed" onclick="document.getElementById('details').style.display = 'block'; document.getElementById('proceed').style.display = 'none'">Proceed</button>
        <div id="details" style="display: none">
    <h2 style="color: #338eda"><b>Slack ID:</b></h2>
        <div style="border-radius: 5px; background-color: #8492a6; padding: 10px">
        <code id="Slack_ID">${userInfo.data.sub}</code>
        </div>
        <button onclick="copyText('Slack_ID')">Copy text</button>
<br><br><b><h2 style="color: #338eda">Voter Identification Code:</h2></b>
        <div style="border-radius: 5px; background-color: #8492a6; padding: 10px">
        <code id="Voter_ID_Code">${cipherProcess(userInfo.data.sub)}</code>
        </div>
        <button onclick="copyText('Voter_ID_Code')">Copy text</button>
        </div>
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