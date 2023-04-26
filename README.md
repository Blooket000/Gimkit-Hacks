# Gimkit Utility
An open sourced utility for interacting with Gimkit's game socket and API. The core scripts behind the features have been developed and continually maintained since 2020.

## Official Support Server: https://discord.gg/gimkit
<br>

# Features
- Auto updating bookmarklet requiring no Inspect Element or local override shenanigans
- Simple GUI to control mode-specific features ~~with support for binding keybinds~~
- ~~Built-in game flooder and bot controller~~ (Coming soon)

## Mode Specific Features
<details>
  <summary>Classic</summary>

- Auto Answer
  - Automatically answer the questions correctly with configurable delay, accuracy, and question selection.
- Answer Once
  - Answers a question correctly once
- Highlight Answers
  - Changes the background of the correct answer to `#1e90ff`
- Input Answers
  - Changes the placeholder in the answer field to the correct answer
- Hidden Answers
  - Displays the MCQ index of the correct answer in the title of the page, or the answer to a typing question
- Auto Upgrade
  - Automatically buys the next upgrade when possible with the ability to toggle upgrades to purchase

</details>

### Notes
- Visual answer indicators read the UI to determine the question that is being asked. This means that questions that have identical text can be detected incorrectly and consequently render the wrong answer.
- Not all modes are supported yet _with this script_, however features have already been developed for every mode on Gimkit and will gradually be migrated to this repository

<br>

# Usage
The script must be executed before joining the game to receive the game state information. As Gimkit now freezes the WebSocket prototype when the page loads, the script will automatically open a new window with the script executing before the page loads bypassing the freeze.
- Of course, you can try to run the script from [output/main.js](output/main.js) in DevTools before the WebSocket is frozen
### UserScript
- Pull the script from [output/main-userscript.user.js](output/main-userscript.user.js) and create a new UserScript in Tampermonkey/Greasemonkey or whatever extension you use for userscripts
  - Click [here](https://undercovergoose.github.io/gimkit/output/main-userscript.user.js) to install the script directly into your extension
- The script should automaticallys bypass the WebSocket freeze requiring no new tabs being created

### CORS Bypass Required:
<details>
  <summary>These scripts require CORS to be disabled in your browser</summary>

> Paste the following into developer console:
```javascript
(async() => {
	const r = await fetch("https://undercovergoose.github.io/gimkit/output/main-minified.js");
	const t = await r.text();
	const w = window.open(location.href, "_blank");
	w.eval(t);
	w.focus();
})();
```
> or create a bookmarklet with the following url and press to launch:
```javascript
javascript:(async()=>{const r=await fetch("https://undercovergoose.github.io/gimkit/output/main-minified.js");const t=await r.text();const w=window.open(location.href,"_blank");w.eval(t);w.focus();})();void 0
```

</details>

### Running from Source
If you wish to clone the repo and run the script directly from the output folder you can do so by hosting a file server on some port to the repo and changing the URL in the script to `127.0.0.1:8080/output/main-minified.js` replacing the port with the one you are using.