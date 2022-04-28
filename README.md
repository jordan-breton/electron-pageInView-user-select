# About

Simple repository to create the simplest reproductible case to demonstrate electron `webContents::findInPage` bug with css `user-select: text`

Just clone this project and launch it with `yarn start`

Type `lorem` in the search input, then try to navigate with `next` and `prev` buttons.

Close the app, comment the css rule in `index.html`, restart and retry the search input. It now works as intended.