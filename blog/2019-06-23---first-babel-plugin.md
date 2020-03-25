---
title: Wrote my first babel plugin!( Its Simple )
author: Sanket Maru
date: 2019-06-22
hero: ./images/ast-explorer.png
excerpt: I wrote my first babel plugin which reduces the size of the web app my removing class methods and jsx elements. The motivation is to remove class methods which are not executed when app is viewed in mobile view.
---

To write a babel plugin first you need to understand how babel plugins work. I will write down the things i required to write the plugin :-

1. Go through the basics of [Babel-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md).
Basics will help to understand what is an AST, parsing, traversal of AST (Stages of Babel).
&nbsp;
2. Play with [Ast-explorer](https://astexplorer.net)
This will help to identify the different visitors of AST and which visitor you want to catch them to manipulate the paths.
&nbsp;
3. Setup a CRA (create-react-app) or a simple node project with a webpack config  [createapp.dev](https://createapp.dev/) is useful to get things done fast.
&nbsp;
3. Debug, debug and debug........ 
Debug other plugins code. 
Setup vscode to debug the babel plugins inside node_modules.
&nbsp;
  *I will be covering a seperate blog on debbuging plugins and difficulties i faced developing a babel plugin*
&nbsp;
  Below is my vscode launch.json
&nbsp;
```json
  {
    "type": "node",
    "request": "launch",
    "name": "Launch Program",
    "program": "${workspaceFolder}/scripts/build.js"
  }
```
&nbsp;

**Motivation**

There are chances that some part of your code doesn't get executed on a mobile device and functionality is completely hidden from the user. The code still resides in the bundle and is downloaded by the user. 

This babel plugin will remove the code developer has marked it as desktop and will never be included in the chunk. 

How do you do it ? Its Simple..

```js
visitor: {
    Program(programPath) {
      programPath.traverse({
        ClassMethod(path) {
          if (path.node.key.name.endsWith(classMethodEnv)) {
            path.remove();
          }
        },
        JSXElement(path) {
          path.node.openingElement.attributes.forEach(ele => {
            if (ele.name.name === jsxEnv)
              path.remove();
          });
        }
      });
    }
  }
``` 

We want to transform the AST such that every Class Method and JSXElement gets visited and removed if it matches the condition.
[Babel: Visitors](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors)

 > I have made the plugin use a Program(path) visitor, and then do a path.traverse for all the visitors. This is done to explicitly process the whole file at the first chance plugin gets. If this is not done then it doesn't ensure ordering of plugins and your visitor might not get visited as it has been compiled to a different state by other plugins.

Other option you can make your plugin work is to use a Class visitor and traverse for the class methods from there. 

Now that we are done with the [plugin](https://github.com/sanketmaru/babel-plugin-mobile-optimizer-react/blob/master/index.js), we will be using it a react app to test it out.

*Published as a npm library [here](https://www.npmjs.com/package/babel-plugin-mobile-optimizer-react)*

**Usage**

Your React Component 
```js
export default class App extends Component {

handleClick_mobile() {
  console.log("Mobile Handle Click");
}

handleClick_desktop() {
  console.log("Desktop handle Click");
}

render() {
  return (
    <div>
      <table>
        <tr data-mobile onClick={this.handleClick_mobile.bind(this)}>
          <td>Mobile</td>
        </tr>
        <tr data-desktop onClick={this.handleClick_desktop.bind(this)}>
          <td>Web</td>
        </tr>
      </table>
    </div>
  );
}
}
```
will be transpiled to :-
```js
export default class App extends Component {

handleClick_mobile() {
  console.log("Mobile Handle Click");
}

render() {
  return (
    <div>
      <table>
        <tr data-mobile onClick={this.handleClick_mobile.bind(this)}>
          <td>Mobile</td>
        </tr>
      </table>
    </div>
  );
}
}
```
Above, the plugin has removed the tr which has a name of *data-desktop* and class method ending with *_desktop*

We have passed the env vars to the plugin as 

```js
plugins: [
[require.resolve('babel-plugin-mobile-optimizer-react'), {
  "JSX_ENV": "data-desktop", // remove jsx code matching with name as data-desktop
  "CLASS_METHOD_ENV": "_desktop" // remove class method ending with _desktop
}]
]
```

I hope this will help to write your own babel plugin. Complete code can be found on my github repo

Plugin :- [babel-plugin-mobile-optimizer-react](https://github.com/sanketmaru/babel-plugin-mobile-optimizer-react) 
Usage in react app :- [react-labs](https://github.com/sanketmaru/react-labs)

*In the next blog i will be mentioning about debugging the babel plugin and how you can setup vscode to debug it.*