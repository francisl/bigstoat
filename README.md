# electron-template

**To start a React/Electron project in a second**

Includes : Reactjs, Redux, Electron, Babel ES2015, Webpack, FlowType

- `index.html` : Is the Main React template.
- `src/app.jsx` : Entry file for Reactjs
- `src/electron.js` : Starts the app and creates a browser window to render HTML.

There is two build file that is specific for Electron (webpack.conf.js) and the other for Reactjs (webpack.conf.app.js)

### packages.json commands

- flow : Run the type checker
- build : Compile the javascript through babel and webpack
- start : run the above command and start the application


```bash
# Clone this repository
git clone git@github.com:francisl/electron-template.git
# Go into the repository
cd electron-template
# Install dependencies and run the app
npm install
# Run the application
npm start
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest)

Reactjs
[documentation](https://facebook.github.io/react/docs/getting-started.html)

Redux
[documentation](http://redux.js.org/)

Flowtype
[documentation](http://flowtype.org/docs/getting-started.html#_)

#### License [MPL-2.0)](LICENSE.md)
