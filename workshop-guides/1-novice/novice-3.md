# React workshop - Unit Novice-3

## Overview
This unit covers practical use-cases with components. Let's start playing with React :)

## Unit Tickets
> NOTICE: before you start working, please checkout branch [novice-3](https://github.com/esakal/react-workshop/tree/novice-3) and use it to develop this unit tasks

### Ticket Novice-3 (conditional rendering)
- [ ] create file `.env` based on content of `.env.template`, ask the keys from the presenter..
  - **NOTICE** everytime you change a value in `.env` file you must run again `npm run serve`.
- [ ] in `app.tsx` - upon mounting 
  - [ ] show `Loading...` message when mounting 
  - [ ] connect to ChatKit using `./src/chatkit-service.ts` class `ChatkitService` method `connect`
- [ ] if connection failed, replace loading with message `Failed to connect...`
- [ ] if connected, replace loading message with `Hello {your name}!`

**Troubleshooting**: If your IDE complains about unknown import of .css files, add `declare module '*.css';` in file `react-app-env.d.ts`

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/3)

### Ticket Novice-3.1 (create component)
> You can continue your work or checkout and continue with branch [novice-3.1](https://github.com/esakal/react-workshop/tree/novice-3.1)

- [ ] add new component named `message-create` according coding convention:
```
src
  |- components
     |- message-create
        |- message-create.tsx
        |- message-create.css
        |- index.ts
```
- [ ] in `MessageCreate` component render the following: 
```
<>
	<div className={'caption'}>Type your message here</div>
	<input />
</>
```
- [ ] in `index.ts` add `export * from './message-create.tsx'`.
- [ ] show `MessageCreate` component in `app.tsx` only if user is connected
- [ ] use the `caption` class name in `MessageCreate` to change the div style to `font-size: 12px; background: purple;`

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/4)

### Ticket Novice-3.2 (css modules & controlled components)
> You can continue your work or checkout and continue with branch [novice-3.2](https://github.com/esakal/react-workshop/tree/novice-3.2)

- [ ] refactor two existing components to use css modules and make sure the conflict of `captions` is resolved. Use the article found in 'references' section.
- [ ] feel free to remove those not that sofisticated class names, they did their part and not needed anymore.
- [ ] add state `value: string` to `MessageCreate`.
- [ ] add `onChange` react event to the `input` component.
- [ ] add a method to handle that event, when called it should update the value of the state. Use [the article](https://reactjs.org/docs/forms.html) as a reference.
  - **tip**: any method used to handle events should be created as arrow functions otherwise you might have issues with `this`. instead of `handleChange() {}` do `handleChange = () => {}`.
- [ ] add second event `onKeyUp` and a matching method to handle it. use event args `e.which === 13` to detect pressing `enter` and write the value to console.

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/5)

### Ticket Novice-3.3 (lifting state up)
> You can continue your work or checkout and continue with branch [novice-3.3](https://github.com/esakal/react-workshop/tree/novice-3.3)

- [ ] move `value` from `MessageCreate` state into `App` state
- [ ] extend `MessageCreate` props, add `onChange` and `onSend` events.
	- `onChange` is a 'proxy event' and should have the same signature of the originator. In our case `(e: any) => void`. 
	- `onSend` abstract the logic of `onKeyUp` and can expose a more relevant signature `() => void`
- [ ] adjust code so a user can type value and print it to console when pressing enter. It should behave the same while the value should be managed in `App` component.
- [ ] instead of writing to console use `ChatkitService` method `sendMessage` to send the message to the server. Ask for the roomId from the presenter and add that value to `.env` file with key `REACT_APP_CHATKIT_TEST_ROOM_ID` 
  - **NOTICE** everytime you change a value in `.env` file you must run again `npm run serve`.
- [ ] expose *optional* `disabled` prop in `MessageCreate` that if set disable user typing. default to not disabled.
- [ ] add 'swear filter' that replaces any of the following words ('[badass](https://www.urbandictionary.com/define.php?term=Badass)', 'sexy', 'motherfucker') with 'nice guy'
- [ ] add 'antisocial filter' that disable the input if the user types the phrase 'coffee break' [useful link](https://www.slashgear.com/how-many-daily-cups-of-coffee-are-safe-study-offers-surprising-answer-10576199/)

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/6)

### Ticket Novice-3.4 (component life cycle events) - Bonus!
> You can continue your work or checkout and continue with branch [novice-3.4](https://github.com/esakal/react-workshop/tree/novice-3.4)

This ticket provides less guidance to level up the challange. Ping me if you need assistance 
- [ ] continuing from previous task, once the input field is disabled, add event to `MessageCreate` that will be triggered after 5 seconds and will cause `App` to re-enable the component.
- [ ] when user types 'i need your help', make `MessageCreate` to write to console 'Sorry, I'm very busy...' every 1 second eternally. [useful link](https://www.quora.com/Why-do-some-people-pretend-to-be-busy-and-occupied)
- [ ] when user types 'lo tzarich tovot', make `App` to disconnect (which will cause `MessageCreate` to be unmounted).
- [ ] make sure the writes to console log stops as `MessageCreate` is not there anymore.

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/7)

### Ticket Novice-3.5 (state manipulations)
> You can continue your work or checkout and continue with branch [novice-3.5](https://github.com/esakal/react-workshop/tree/novice-3.5)

- [ ] extends `App` state with 
```
bookmarks: {
            list: {id: string, value: string}[],
            ownerIdType: string
     }
```
- [ ] upon mounting - set value of ownerIdType to string `User`  
- [ ] when user types `show bookmarks` - print all bookmarks to console with title `showing bookmarks for '${this.state.ownerIdType}'`.
- [ ] when user types `add bookmark {something somthing}!` - add new bookmark. generate id using npm librari `short` library. don't forget to add types as well by consuming `@types/shortid` (into devDependencies)
- [ ] make sure adding to array doesn't delete value of `ownerId` without re-setting is manually. Search for the functional programming technique **without** adding 3rd party libraries
- [ ] when user types `remove bookmark XXX!` - remove bookmark with id XXX if exists and print to console new bookmarks
- [ ] when use types `modify bookmark {id} {new value}!` - modify value if id exists

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/20)

## Unit Highlights  
- component state
- component typescript support for props & state
- workaround for state issue with typescript
- using .env local file
- workaround libraries without typescript declarations
- css resets 
- fragments
- css modules
- controlled components
- react synthetic events
- default props
- component life cycle events (componentDidMount, componentWillUnmount, componentDidUpdate)


## Unit References
- [css resets](http://facebook.github.io/create-react-app/docs/adding-css-reset)
- [Adding a CSS Modules Stylesheet in CRA](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)
- [React synthetic events](https://reactjs.org/docs/events.html)
- [Controlled components](https://reactjs.org/docs/forms.html)
