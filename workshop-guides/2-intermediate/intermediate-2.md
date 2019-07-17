# React workshop - Unit Intermediate-2

## Overview
This unit cover some more advanced techniques

## Unit Tickets
> In this unit the layout components were refactored to include the actual look&feel and also to gain access to dedicated context used as state management. As mentioned earlier we will not discuss about the implementation of the state management as it will be covered in the following course.
>
> IMPORTANT: This unit introduce two types of components, smart and dump components. You are adviced not to change the type of the components. if a component is wrapped with High order component (HOC) it means that it has access to the context, all other component should be treated as dump components.  

> NOTICE: before you start working, please checkout branch [intermediate-2](https://github.com/esakal/react-workshop/tree/intermediate-2) and use it to develop this unit tasks

### Ticket Intermediate-2 (introduce channels context)
> This task is not personal and should be completed together during a joined session with the presenter.

- [x] review together changes done in plop templates and in many app components to consume channels context

### Ticket Intermediate-2.1 (user profile)
> You can continue your work or checkout and continue with branch [intermediate-2.1](https://github.com/esakal/react-workshop/tree/intermediate-2.1)

> This ticket modifies `UserProfile` component

- [ ] show your avatar using `ChannelsService.user` and `@material-ui/core/Avatar`

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/13)

### Ticket Intermediate-2.2 (channels list)
> You can continue your work or checkout and continue with branch [intermediate-2.2](https://github.com/esakal/react-workshop/tree/intermediate-2.2)

> This ticket modifies `ChannelList` component

- [ ] use component `ChannelSection` to show user channels
- [ ] use another component of `ChannelSection` to show available channels
- [ ] show refresh button on available channels and refresh list when clicked
  - note that the component already support refresh api, see component props
- [ ] (bonus) check automatically for updates every 10 seconds 
- [ ] clicking on a channel should activate it using relevant api in `ChannelsService`

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/14)

### Ticket Intermediate-2.3 (active channel view)
> You can continue your work or checkout and continue with branch [intermediate-2.3](https://github.com/esakal/react-workshop/tree/intermediate-2.3)

> This ticket modifies `ChannelView` component

- [ ] in `ChannelView` show `empty.svg` if no active channel selected. 
- [ ] in `ChannelView` show `ChannelMessages` and `MessageCreate` if has active channel.
- [ ] in `ChannelMessages` fill `renderMessages` to render all messages with `ChannelMessage`
- [ ] in `ChannelMessage` use `moment` api support to show time **from now**. see [moment documentation](https://momentjs.com/docs/)
 
 Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/15)
 
### Ticket Intermediate-2.4 (channel header)
> You can continue your work or checkout and continue with branch [intermediate-2.4](https://github.com/esakal/react-workshop/tree/intermediate-2.4)

> This ticket modifies `ChannelHeader` component

- [ ] show empty header until has connected user
- [ ] show actual channel name 
- [ ] show the edit name button **only** on hover (onMouseEnter, onMouseLeave)
  - the edit logic will be handled in another ticket

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/16)

### Ticket Intermediate-2.5 (create channel)
> You can continue your work or checkout and continue with branch [intermediate-2.5](https://github.com/esakal/react-workshop/tree/intermediate-2.5)

> This ticket modifies `ChannelCreate` component

- [ ] open modal component when clicked
- [ ] discard changes if modal closed
- [ ] create channel if modal approved
  - use `_newChannelInputRef` to get the value from the modal input

Once completed, you can review the suggested solution [here](https://github.com/esakal/react-workshop/pull/17)

### Ticket Intermediate-2.6 (sort channel list)
> You can continue your work or checkout and continue with branch [intermediate-2.6](https://github.com/esakal/react-workshop/tree/intermediate-2.6)

> This ticket modifies `ChannelList` component

- [ ] sort list of channels in each section. Make sure the sort is done in the component, **no need** to modify the channels context.

### Ticket Intermediate-2.7 (change channel name)
> This ticket modifies `ChannelHeader` component

- [ ] open material-ui modal when clicking on channel name and use relevant api in `ChannelsService` to change name in server.  

## Unit Highlights  
- uncontrolled component
- material-ui modal
- onMouseLeave / onMouseEnter
- smart/dump components
