# React workshop - Epic Novice-1

## Overview
This epic covers creation of project using [Create React App project](https://github.com/facebook/react/) (a.k.a CRA). This library exists to "Get Started Immediately", "Create React apps with no build configuration”. click here to read more about their [pilosophy](https://github.com/facebook/create-react-app#philosophy)


Enjoy!

## Epic Tickets

### Ticket Novice-1 (scaffold a project using CRA)
- [ ] create a new react application. choose `npm` as dependency manager and `typescript` as project language
```
npx create-react-app my-app --typescript —use-npm
```
- [ ] run the project and make sure it works

### Ticket Novice-1.1 (remove irrelevant parts)
> You can continue your work or checkout and continue with branch [novice-1.1](https://github.com/esakal/react-workshop/tree/novice-1.1)

- [ ] remove `readme.md` file content
- [ ] in `package.json`
  - [ ] remove the `eject` script
  - [ ] rename `start` script to `serve`
- [ ] remove any comments in `public/index.html`
- [ ] in `public/manifest.json`, either update 'name' or remove that file and update `public/index.html` accordingly
- [ ] remove all sample files under `src`, leave only `index.*`, `app.*` and `react-app-env.d.ts` (this list might vary between CRA versions).
- [ ] in `index.tsx` remove code related to `service worker` unless you plan to actually use it.
- [ ] in `tsconfig.json` set property `isolatedModules` to `false`
- [ ] in `index.css` add the following to `body`
```
height: 100vh;
  width: 100%;
``` 
- [ ] in `index.css` add new definition
```
#root {
  height: 100%;
  width: 100%;
}	}
```
- [ ] in `.gitignore` add `.env`. also add such a file under root
- [ ] unless you plan to actually write tests, remove any `test` files under `src`

## Why to use CRA?
- Developments process
	- flexible project scaffolding. Decide between npm/yarn and javascript/typescript.
	- adds code linting
	- includes testing framework
	- supports absolute imports
	- includes demo page with support for https and hot-reloading
- deployment
	- support code splitting
	- include many optimizations. For example bundling of css, fonts and svg images (when imported images are less than 10,000 bytes)
	- dynamic files import without bundling or custom workarounds using `Public` folder
- styles & assets
	- support css resets, css modules, sass
	- add polyfills based on `browserlist`
	- rewire relative path of css files when bundling images, fonts and other files
	- treat svg as react component
	
# When not to use CRA?
When creating a library. You can find tutorials that guide you how to twick CRA but at the end you should consider choosing more suitable project.


## Epic Highlights  
- create new application with: react, typescript, npm, jest
- considerations to use CRA. limitations with CRA


## Epic References
