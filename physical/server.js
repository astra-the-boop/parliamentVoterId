require("dotenv").config();
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const app = express();
const port = 3002;

const clientId = process.env.CLIENT_ID1;
const clientSecret = process.env.CLIENT_SECRET1;
const redirectUri = `${process.env.REDIRECT_DOMAIN}/physical`;

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

function encrypt6digit(input, key){
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(input);
    const digest = hmac.digest();

    const base36 = BigInt("0x"+digest.toString("hex")).toString(36).toUpperCase();

    const alphanum = base36.replace(/[^A-Z0-9]/g, '');
    return alphanum.slice(0,6).padEnd(6, "X");
}

function getVoterBlock(input, key){
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(input);
    const digest = hmac.digest();

    return (digest[0] % 3); //0 to 2
}

//the rest of the code below :3c

async function sendDM(channelID, messageText, time){
    try{
        const response = await axios.post("https://slack.com/api/chat.postMessage",{
            channel: channelID,
            text: messageText
        },{
            headers:{
                "Authorization": `Bearer ${process.env.BOT_TOKEN1}`,
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    @font-face {
      font-family: 'Phantom Sans';
      src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Phantom Sans';
      src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff2') format('woff2');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }

    body {
      background-color: #e0e6ed;
      margin: 0;
      font-family: 'Phantom Sans', sans-serif;
    }

    #header {
      background-color: #333;
      display: flex;
      justify-content: center;
      padding: 15px 0;
    }

    #logo {
      height: 60px;
    }

    #body {
      text-align: center;
      color: #ec3750;
      padding: 1rem;
      max-width: 900px;
      margin: 0 auto;
    }

    h1 {
      font-size: 1.75rem;
    }

    h2 {
      font-size: 1.2rem;
      color: #ec3750;
    }

    h3 {
      font-size: 1rem;
      color: #8492a6;
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
      transition: transform 0.125s ease-in-out, box-shadow 0.125s ease-in-out;
      box-sizing: border-box;
      margin-top: 10px;
      padding: 10px 20px;
      background: none;
      color: #ec3750;
      border: 2px solid currentcolor;
      font-size: 1rem;
    }

    button:hover {
      transform: scale(1.05);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 8px 12px rgba(0, 0, 0, 0.12);
    }

    code {
      display: inline-block;
      background-color: #8492a6;
      color: #e0e6ed;
      padding: 6px 10px;
      border-radius: 4px;
      font-family: monospace;
      margin-top: 5px;
      word-wrap: break-word;
    }

    #details {
      margin-top: 20px;
    }

    table {
      width: 100%;
      max-width: 100%;
      border-collapse: collapse;
    }

    td {
      border: 3px solid #e67787;
      padding: 10px;
      text-align: center;
      font-size: 1.5rem;
    }

    @media (max-width: 600px) {
      h1 { font-size: 1.7rem; }
      h2 { font-size: 1rem; }
      td { font-size: 1.2rem; padding: 8px; }
      button { width: 100%; padding: 10px; }
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
    
    const voterBlock = ${getVoterBlock(cipherProcess(userInfo.data.sub),key)};
</script>
<div id="header">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6cccae8b08b7481b3ad4ba320ccadf381a032c96_parliament-full.svg" id="logo">
</div>
<div id="body">
    <h1>Thank you for signing up to vote in the August 2025 General Elections!</h1>
    <h2 style="color:#338eda">Your voter identification details are below. Please fill out your ballot according to the instructions on the sheet with the information provided below.</h2>
    <h3 style="color: #8492a6">Time of retrieval: ${unixTimestamp}</h3>

    <h2>Do NOT share your voter identification code, this code is used to identify you are a legitimate voter. This code is only valid for the August 2025 Election cycle on physical ballots.</h2>
    <button id="proceed" onclick="document.getElementById('details').style.display = 'block'; document.getElementById('proceed').style.display = 'none'">Proceed</button>
    <div id="details" style="display:none;">
      <h2 style="text-align: left; color: #e67787">SLACK ID</h2>
      <table>
        <tr>
          <td style="color: #e67787"><b>U</b></td>
          <td style="color: black"><b>${userInfo.data.sub[1]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[2]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[3]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[4]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[5]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[6]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[7]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[8]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[9]}</b></td>
          <td style="color: black"><b>${userInfo.data.sub[10]}</b></td>
        </tr>
      </table><br>
      <hr style="color: #e67787"><br>
      <h2 style="text-align: left; margin-bottom: -3px; color: #e67787">VOTER BLOCK</h2>
      <table>
        <tr>
            <td style="border-width: 0px"><h2 style="margin-bottom: 2px; color: #e67787">BLOCK A</h2></td>
            <td style="border-width: 0px"><h2 style="margin-bottom: 2px; color: #e67787">BLOCK B</h2></td>
            <td style="border-width: 0px"><h2 style="margin-bottom: 2px; color: #e67787">BLOCK C</h2></td>
        </tr>
        <tr>
          <td style="height: 0.7rem; width: 2rem" id="bA"><b></b></td>
          <td style="height: 0.7rem; width: 2rem" id="bB"><b></b></td>
          <td style="height: 0.7rem; width: 2rem" id="bC"><b></b></td>
        </tr>
      </table><br>
      <hr style="color: #e67787"><br>
      <h2 style="text-align: left; color: #e67787">VOTER IDENTIFICATION CODE</h2>
      <table>
        <tr>
          <td style="color: black"><b>${encrypt6digit(cipherProcess(userInfo.data.sub), key)[0]}</b></td>
          <td style="color: black"><b>${encrypt6digit(cipherProcess(userInfo.data.sub), key)[1]}</b></td>
          <td style="color: black"><b>${encrypt6digit(cipherProcess(userInfo.data.sub), key)[2]}</b></td>
          <td style="color: black"><b>${encrypt6digit(cipherProcess(userInfo.data.sub), key)[3]}</b></td>
          <td style="color: black"><b>${encrypt6digit(cipherProcess(userInfo.data.sub), key)[4]}</b></td>
          <td style="color: black"><b>${encrypt6digit(cipherProcess(userInfo.data.sub), key)[5]}</b></td>
        </tr>
      </table><br>
    </div>
    <br><br><p style="color: #8492a6">The Parliament of Hack Club (Hack Club Parliament) and other associated communities and entities are not associated with the Hack Club non-profit organization. This is an unofficial community group and only exists for the purpose of entertainment.</p>
</div>
    <script>
        if(voterBlock === 0){
            document.getElementById("bA").style.backgroundColor = "#333333";
            document.getElementById("bA").innerHTML = "<p style='color: #e0e6ed; font-size: 0.7rem; margin-top: 0.1rem; margin-bottom: 0.1rem'>Fill this box on your ballot</p>"
        }
        if(voterBlock === 1){
            document.getElementById("bB").style.backgroundColor = "#333333";
            document.getElementById("bB").innerHTML = "<p style='color: #e0e6ed; font-size: 0.7rem; margin-top: 0.1rem; margin-bottom: 0.1rem'>Fill this box on your ballot</p>"
        }
        if(voterBlock === 2){
            document.getElementById("bC").style.backgroundColor = "#333333";
            document.getElementById("bC").innerHTML = "<p style='color: #e0e6ed; font-size: 0.7rem; margin-top: 0.1rem; margin-bottom: 0.1rem'>Fill this box on your ballot</p>"
        }
    </script>
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