# File Manager

**File Manager prototype in Reactjs and Electron**

Includes : Reactjs, Redux, Electron, Babel, Webpack, FlowType

<img src="https://raw.githubusercontent.com/francisl/bigstoat/master/resources/screenshot2.png" width="600" height="521">

## Get it Running

```bash
# Clone this repository
git clone git@github.com:francisl/electron-template.git
# Go into the repository
cd bigstoat
# Install dependencies and run the app
npm install
# Run the application
npm start
```

## Development

- `index.html` : Is the Main React template.
- `src/app/` : Client/UI Reactjs application
- `src/app/app.jsx` : Entry file for Reactjs
- `src/electron/` : Backend/Electron application
- `src/electron/electron.js` : Starts the app and creates a browser window to render HTML.


### packages.json additional commands

- flow - Run the type checker
- build - Compile the javascript through babel and webpack
- build:app - Only compile client application
- build:electron - Only compile backend
- start - typecheck, compile and run the application


#### License [MPL-2.0](LICENSE.md)
