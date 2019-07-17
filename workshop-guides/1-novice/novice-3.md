# React workshop - Epic Novice-3

## Overview
This epic covers basic yet important behaviors of components. Let's start playing with React :)

Enjoy! 

## Epic Tickets
> NOTICE: before you start working, please checkout  [novice-3](https://github.com/esakal/react-workshop/tree/novice-3) and use it to develop this epic tasks

### Ticket Novice-3 (conditional rendering)
- [ ] setup `.env` file to include api keys of `pusher - chatkit` provided by presenter.
- [ ] in `app.tsx` - upon mounting 
  - [ ] show `Loading...` message when mounting 
  - [ ] connect to ChatKit using `./src/chatkit-service.ts` class `ChatkitService` method `connect`
- [ ] if connection failed, replace loading with message `Failed to connect...`
- [ ] if connected, replace loading message with `Hello {your name}!`

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
- [ ] show `MessageCreate` component in `app.tsx` only if user is connected
- [ ] use the `caption` class name in `MessageCreate` to change the div style to `font-size: 12px; background: purple;`

### Ticket Novice-3.2 (css modules & controlled components)
> You can continue your work or checkout and continue with branch [novice-3.2](https://github.com/esakal/react-workshop/tree/novice-3.2)

- [ ] refactor two existing components to use css modules and make sure the conflict of `captions` is resolved. Use the article found in 'references' section.
- [ ] feel free to remove those not that sofisticated class names, they did their part and not needed anymore.
- [ ] add state `value: string` to `MessageCreate`.
- [ ] add `onChange` react event to the `input` component.
- [ ] add a method to handle that event, when called it should update the value of the stage. Use [the article](https://reactjs.org/docs/forms.html) as a reference.
- [ ] add second event `onKeyUp` and a matching method to handle it. use event args `e.which === 13` to detect pressing `enter` and write the value to console.

### Ticket Novice-3.3 (lifting state up)
> You can continue your work or checkout and continue with branch [novice-3.3](https://github.com/esakal/react-workshop/tree/novice-3.3)

- [ ] move `value` from `MessageCreate` state into `App` state
- [ ] extend `MessageCreate` props with `onChange` `onSend` events
- [ ] adjust code so a user can type value and print it to console when pressing enter.
- [ ] instead of writing to console use `ChatkitService` method `sendMessage` to send the message to the server. Ask for the roomId from the presenter.
- [ ] expose *optional* `disabled` prop in `MessageCreate` that if set disable user typing. default to not disabled.
- [ ] add 'swear filter' that replaces any of the following words ('[badass](https://www.urbandictionary.com/define.php?term=Badass)', 'sexy', 'motherfucker') with 'nice guy'
- [ ] add 'antisocial filter' that disable the input if the user types the phrase 'coffee break' [useful link](https://www.slashgear.com/how-many-daily-cups-of-coffee-are-safe-study-offers-surprising-answer-10576199/)

### Ticket Novice-3.4 (component life cycle events) - Bonus!
> You can continue your work or checkout and continue with branch [novice-3.4](https://github.com/esakal/react-workshop/tree/novice-3.4)

This ticket provides less guidance to level up the challange. Ping me if you need assistance 
- [ ] continuing from previous task, once the input field is disabled, add event to `MessageCreate` that will be triggered after 5 seconds and will cause `App` to re-enable the component.
- [ ] when user types 'i need your help', make `MessageCreate` to write to console 'Sorry, I'm very busy...' every 1 second eternally. [useful link](https://www.quora.com/Why-do-some-people-pretend-to-be-busy-and-occupied)
- [ ] when user types 'lo tzarich tovot', make `App` to disconnect (which will cause `MessageCreate` to be unmounted).
- [ ] make sure the writes to console log stops as `MessageCreate` is not there anymore.


## Epic Highlights  
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


## Epic References
- [css resets](http://facebook.github.io/create-react-app/docs/adding-css-reset)
- [Adding a CSS Modules Stylesheet in CRA](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)
- [React synthetic events](https://reactjs.org/docs/events.html)
- [Controlled components](https://reactjs.org/docs/forms.html)
