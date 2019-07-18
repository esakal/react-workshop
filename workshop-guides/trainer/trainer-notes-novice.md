# Trainer Notes - Novice Unit
This document contains personal notes about the `Novice` unit.

> Please make sure you read first [the trainer introduction](./readme.md).

# Novice-1: scaffold a project using CRA

## Task novice-1

### Preparation
- checkout branch `novice-1.1` (`rm -rf node-modules && npm i`), run application
- open relevant PR with code changes

### Self exercise
- This task should usually take ~15-20 minutes.
  
### Task summary
- discuss about scaffolding the project with `npx create-react-app my-app --typescript —use-npm`
- reasons for npx? uses latest version of CRA without installing it locally.
- npm or yarn? 
	- both are fine, you need to choose one and stick with it. 
	- **Tip:** when introducing to a new project, always check if it uses npm or yarn because they are not compatible, mixing them will cause errors and it is hard to diagnose it.
- why typescript?
	- simplifies javascript code, making it easier to read and debug
	- highly productive development tools like static checking
	- Powerful type system, including generics
- **demo:** show the application, review code changes of the task using the PR
	- discuss about the content of the project. use below to elaborate about some specific areas.
	- file `package.json`
		- discuss about 'dependencies', 'devDependencies', 'peerDependencies'
			- reason about CRA abstracting all the devop and thus has no `devDependencies`. if interested show the `package.json` of `react-scripts`
		- discuss about CRA using `browserslist` to make the css compatible
		- what are all the `@types/*` libraries? what are the alternatives? 1. a library support typescript. 2. the community support it and then create a `@types/*` library. 3. use `react-app-env.d.ts` to declare that library without type check support `declare module '@pusher/chatkit-client'`.
	- file `tsconfig.json`
		- needed for typescript transpiler. discuss about `target` set to `es5` so you can write in any version of ecma script and typescript converts it to es5 to support common browsers.
		- typescript inject polyfills according to your setup.
	- folder `public`
		- this is the entry point of the application. CRA bundle everything and inject link into the `index.html` file.
- **demo:** review changes of suggested solution in relevant pull request
	- 4 ways to handle svg:
		- add it directly to the javascript
		- import it as done in boilerplate and set the image src. CRA take care of coping the SVG file and fix url in css for us.
		- import as react component. discuss about named export vs default export


## Task novice-1.1

### Preparation
- checkout branch `novice-1.2`, run application
- open relevant PR with code changes

### Self exercise
- This task should usually take ~5 minutes.
- In the meanwhile, create users in chatkit as described in the setup section of the workshop.


### Task summary	 
- **demo:** review changes of suggested solution in relevant pull request
	- discuss about setting body with `height: 100vh` to support responsive layouts
	 
---

# Novice-2: architecture and product requirements for the workshop application

## Task novice-2

### Preparation
- checkout branch `workshop-application` (`rm -rf node-modules && npm i`), run application

### Self exercise
not relevant for this unit

### Task recap
- **demo:** run the application in two machines with two different users and demonstrate the workshop application
- review together the planned architecture in [novice-2 unit](../1-novice/novice-2.md)

# Novice-3: components, states, data flow, life cycle and more.

## Task novice-3

### Preparation
- checkout branch `novice-3.1` (`rm -rf node-modules && npm i`), run application
- open relevant PR with code changes

### Self exercise
This task should usually take ~20 minutes.
  
### Task summary
- **demo:** show the application, review code changes of the task using the PR
	- app.tsx
		- conditional rendering, support also the condition? true : false 
		- why state is explicitly delcared?
		- how import to `@pusher/playkit-client` works just because of decleration
		- why `chatkitService` is class variable and not state?
		- make awerness to the `chatkitService console log`
		- loading is set directly, why not in mount?
	2. index.css
		1. show page source and affected dom element with/without css reset

## Task novice-3.1

### Preparation
- checkout branch `novice-3.2`, run application
- open relevant PR with code changes

### Self exercise
This task should usually take ~10 minutes.
  
### Task summary
- **demo:** show the application, review code changes of the task using the PR
	- message-create/index.ts
			1. why do we import React if we don’t use it directly
			2. why do we need this file?
	- app.tsx
			1. make sure not to abuse two username to decide about connected
			2. what is fragment, when to use it?
	- discuss about the css conflict and module solution
			1. how it works
			2. review alternatives (css-in-js as styles/components, (s)css modules)
			3. how it affect theming (css variable, scss mixin, javascript object with full javascript engine and props aware
			
## Task novice-3.2

### Preparation
- checkout branch `novice-3.3`, run application
- open relevant PR with code changes

### Self exercise
This task should usually take ~20 minutes.
  
### Task summary	
- **demo:** show the application, review code changes of the task using the PR
	- css modules implementation unique to CRA, done by babel plugins so in projects of other types can be done differently (not nessecerally .module.css)
	- message-create.tsx
		- reasons for using ‘any’ in ‘onChange’ instead of actual type
		- reasons for using property to declare a method
		- let them know be aware of `value` assigned to empty string instead of null (will be discussed later as part of uncontrolled component)
		- reasons for `const { value } = this.props’ instead of ‘this.props.value’
	- controlled component stuff and synthetic events
		- why is it called controlled components?
		- who is the controlled component?
		- what will happen if I remove the `setState` part? discuss about synthetic events and how they differ from the original events by name casing. Talk about the difference between this and preact.
		
		

## Task novice-3.3

### Preparation
- checkout branch `workshop-application` (`rm -rf node-modules && npm i`) 
- run the application and keep it open on the trainer screen, you want the participants to see messages they sent during the self exercise. 

### Self exercise
- This task should usually take ~30 minutes.
- **Important** while the participants work on this task, 
  
### Task summary
- checkout branch `novice-3.4`, run application
- open relevant PR with code changes	
- **demo:** show the application, review code changes of the task using the PR
	- discuss about reasons to lift state up (smart / dump components like disabled, services)
    - why ‘onSend’ doesn’t contain the ‘value’ as an argument
    - discuss about error handling which is out of scope of this exercise
    - show disable of the input 
    - discuss about default props and how to handle them in ES2015 and typescript (es2015 as static of a class)
    - discuss about typescript which transpile from newer versions to es5 like for `includes` being used to filter language
 
## Task novice-3.4

### Preparation
- checkout branch `novice-3.5`, run application
- open relevant PR with code changes

### Self exercise
This task should usually take ~15 minutes.
  
### Task summary	
- **demo:** show the application, review code changes of the task using the PR  
    - type `i need your help` -> `lo tzarich tovot` -> check the console to see the unmounting happened.
    - comment logfic of `componentWillUnmount` and repeat the demo. discuss about releasing memory to prevent memory leaks
    - discuss about more real life use-cases. For example controller component that trigger auto-complete or server logic once a props was modified `componentDidUpdate` or when change of `prop` perform heavy calculation that is stored in `state` so every time that prop is modified you want to handle it. or for uncontrolled component you want to change state only when `initialValue` is modified
   
## Task novice-3.5

### Preparation
- checkout branch `novice-3.6`, run application
- open relevant PR with code changes

### Self exercise
This task should usually take ~35 minutes.
  
### Task summary
- **demo:** show the application, review code changes of the task using the PR	
	- discuss about state
		- state must be immutable as it is used by virtual dom and shallow compare
		- `this.setState(..., () => {});` must be used if you want to perform action **after** state was modified.
		- `this.setState(prevState => {})` must be used if developer want to affect state based on previous state.
			- a great example is account balance. in the below example the balance will be adjusted with +100 only
```
this.setState({
	balance: this.state.balance + 3000;
});
this.setState({
	balance: this.state.balance + 100;
});
```




