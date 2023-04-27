# Gimkit Utility
An open sourced utility for interacting with Gimkit's game socket and API. The core scripts behind the features have been developed and continually maintained since 2020.

## Official Support Server: https://discord.gg/gimkit
<br>

# Features
- Auto updating userscript requiring no Inspect Element or local override shenanigans
- Simple GUI to control mode-specific features ~~with support for binding keybinds~~
- ~~Built-in game flooder and bot controller~~ (Coming soon)

## Mode Specific Features
<details>
  <summary>Classic</summary>

- Auto Answer
  - Automatically answer the questions correctly with configurable delay, accuracy, and question selection.
- Highlight Answers
  - Changes the background of the correct answer to `#1e90ff`
- Input Answers
  - Changes the placeholder in the answer field to the correct answer
- Hidden Answers
  - Displays the MCQ index of the correct answer in the title of the page, or the answer to a typing question
- Auto Upgrade
  - Automatically buys the next upgrade when possible with the ability to toggle upgrades to purchase
- Set Claps
  - Adds any amount of claps, including negative numbers, to the counter when the game has finished
- Buy & Use Powerups
  - Buy specific or all powerups through the GUI
  - Use the powerups on yourself or others
- Buy & Apply Themes
  - Buy specific or all themes and apply them

</details>
<details>
  <summary>Jeopardy</summary>

- Auto Answer & Answer Once
  - Automatically answers the question correctly as soon as the question can be answered
- Highlight/Input/Hidden Answers & Set Claps (see **Classic**)

</details>
<details>
  <summary>Trust No One</summary>

- All Classic Features (see **Classic**)
- Purchase Shop Items
  - Buy the items from anywhere and even use them on yourself
- Spam Host
  - Spams the investigation log on the host with yourself purchasing Money Per Question :rofl:

</details>
<details>
  <summary>Infinity Mode</summary>

- All Classic Features (see **Classic**)
- Purchase & Use Infinity Stones
  - Buy and use the infinity stones from anywhere

</details>

### Notes
- Visual answer indicators read the UI to determine the question that is being asked. This means that questions that have identical text can be detected incorrectly and consequently render the wrong answer.
- Not all modes are supported yet _with this script_, however features have already been developed for every mode on Gimkit and will gradually be migrated to this repository

<br>

# Usage
The script must be executed before joining the game to receive the game state information. As Gimkit now freezes the WebSocket prototype when the page loads, the script will automatically open a new window with the script executing before the page loads bypassing the freeze.
- Of course, you can try to run the script from [output/bundle.js](output/bundle.js) in DevTools before the WebSocket is frozen

### UserScript (Recommended)
- Pull the script from [output/main-userscript.user.js](output/main-userscript.user.js) and create a new UserScript in Tampermonkey/Greasemonkey or whatever extension you use for userscripts
  - Click [here](https://undercovergoose.github.io/gimkit/output/main-userscript.user.js) to install the script directly into your extension
- The script should automaticallys bypass the WebSocket freeze requiring no new tabs being created

### Bookmarklet (2 Step Process)
- Visit [bookmarklet.html](https://undercovergoose.github.io/gimkit/bookmarklet.html) and drag both links to your bookmarks bar
- Navigate to https://gimkit.com/join and press the first script, then press the second script on the tab opened
- You'll know if the script worked if the default right-click context menu doesn't appear

### Auto Updating Bookmarks (CORS Bypass Required):
<details>
  <summary>These scripts require CORS to be disabled in your browser</summary>

> Paste the following into developer console:
```javascript
(async() => {
	const r = await fetch("https://undercovergoose.github.io/gimkit/output/bundle.min.js");
	const t = await r.text();
	const w = window.open(location.href, "_blank");
	w.eval(t);
	w.focus();
})();
```
> or create a bookmarklet with the following url and press to launch:
```javascript
javascript:(async()=>{const r=await fetch("https://undercovergoose.github.io/gimkit/output/bundle.min.js");const t=await r.text();const w=window.open(location.href,"_blank");w.eval(t);w.focus();})();void 0
```

### Running from Source
If you wish to clone the repo and run the script directly from the output folder you can do so by hosting a file server on some port to the repo and changing the URL in the script to `127.0.0.1:8080/output/bundle.min.js` replacing the port with the one you are using.

</details>