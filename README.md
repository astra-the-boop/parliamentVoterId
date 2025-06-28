# HC Parliament Voter ID Registration System
### Unique Voter identification system for Hack Club Parliament

#### The Parliament of Hack Club (Hack Club Parliament) and other associated communities and entities are not associated with the Hack Club non-profit organization. This is an unofficial community group and only exists for the purpose of entertainment.

---
## Usage guide and briefing on how it works:
- Click the "Sign in with Slack" button or click the link / scan the QR code if you were given one instead
- Sign into Slack if you haven't already
- Click Allow when Slack asks you for permission to access Hack Club workspace
- You will land on a page thanking you for signing up to vote, **make sure you read the disclaimers**!
- After you're done, click Proceed

> We generate this code by passing your Slack ID  which we get directly from Slack's API through a hashing algorithm to ensure security!

If you're on the digital ballot page, just select and copy, or click on the "Copy" button to save the code to your clipboard

If you're on the physical ballot page, copy down the characters given to you or fill in a box if told to!

> This one is actually a bit more interesting, we pass this through another hashing algorithm that's a bit more limited to 6 non-case-sensitive alphanumerical characters for the Voter ID and an integer between 0 and 2 (Matching Blocks A, B, and C) for the Voter Block!

---
## Hosting Guide:
- Create 2 Slack apps on [Slack API](https://api.slack.com)
```
Both boths should have the following:

Token with: 
connections:write, authorizations:read,app_configurations:write

Bot token scopes:
chat:write, im:write, users:read

User token scopes:
identity.basic, openid

Bot 1 should have its Redirect URL be https://<your domain>/callback
Bot 2 should have its Redirect URL be https://<your domain>/physical
```
- Install [node.js](https://nodejs.org/en)
- Create a `.env` file in the root directory
- Inside the `.env` file enter the following:
```dotenv
CLIENT_ID="Client ID of your first bot (for digital ballots)"
CLIENT_SECRET="First bot's client secret"
BOT_TOKEN="First bot's bot token"

CLIENT_ID1="Client ID of your second bot (for physical ballots)"
CLIENT_SECRET1="2nd bot's client secret"
BOT_TOKEN1="2nd bot's bot token"

REDIRECT_DOMAIN="The domain where Slack will redirect to / get requests and whatnot from"

ENCRYPT_KEY="Passcode / key used in the encryption hashing to generate and check the voter IDs"
```
- Run the following commands in the terminal (or different terminal instances) in the root directory of wherever you installed this:
```shell
node server.js
```
```shell
node physical/server.js
```
```shell
node proxy/proxy.js
```

> Fun fact: the proxy.js file is used as a ... well... proxy... to have the other 2 instances work together on the same port and domain!! i think i don't know i'm not that knoweledgeable or however you spell that word

Should be up and running now!! Want custom encryption methods? Modify the `cypherProcess` function in both .js files

---

## Verifying results:
So, you're the moderator for the election and you wanna make sure the things are not fraud? (fraud bad ew) We included a Python script that can assist you in that! (albeit, the Python script could definitely be improved by adding automation but for now it's still a great tool to verify!).

First of all, make sure you have the necessary libraries installed, I included that in `requirements.txt`, you can just do `pip install requirements.txt`, or install `python-dotenv` manually, there's only 1 after all...

But yeah anyway, just run the script and there you have it! It will tell you if the vote is legit or not, if not then it will spit back out its calculations alongside what you entered for you to compare (perhaps there's a typo somewhere? or whitespace?)

> This works by basically following step by step what we did to generate the ID in the first place and comparing if it's the same or not. Since we used hashing, this is probably one of the few ways to check as hashing is irreversible (or at least very costly to)