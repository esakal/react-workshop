# Trainer Notes - Introduction
Those are my personal notes and as such are not formalized as other materials introduced in this workshop 


# Expected participant profile
This workshop was created for intermediate level. Participants need to have some knowledge about React otherwise they will not be able to catch up with the workshop.  

- Experience with javascript (typescript is not mandatory)
- Experience with React 


# How to prepare to the workshop
1. go over to [repository readme.md](../../readme.md) file and complete `Setup the workshop application` section
2. create a google form asking the participants to fill their full name and github id (not email). The github id is shown when opening the user profile popup at the top-right side of github dashboard.
3. while participants work on `novice-1.1`, add participants as users to the pusher chatkit instance with their github user id (not email) using their console section. Don't forget to add each user to the same room, this part is needed for task `novice-3.3`
4. A week before the workshop send them an email with some homework. Make sure they followed the mandatory part and created CRA repo successfully.


# Example email 
This is the email I send them a few days before the workshop.

---

Hi All, 

The workshop will cover topics that are prerequisite for the course so this is a mandatory workshop for those who will participate in the course. If you are not participating in the course you can still join the workshop.

 
**Core Concepts**

1. Creating a new react projects using create-react-app CLI
2. Understanding JSX: writing JSX, using ES6 features like classes, destructions, arrow functions

**Components** 

3. Components & Props: default props, rendering, conditional rendering, change detection, typescript vs. propTypes
4. Uncontrolled components: working with uncontrolled components, using initial props, using ref
5. Component state: default state, states vs. props, 3 ways to set state, component life cycle relevant to state
6. Practical/Advanced techniques learned by building an application together
 

Some final words about the workshop. It is going to be written in typescript, we are going to mostly write code and you should complete the following tutorials until the workshop:

1. **Mandatory**: [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)
2. **Mandatory**: make sure your environment is setup correctly:
	- create temp folder and run `npx create-react-app my-app --typescript —use-npm`
	- follow the repo instruction and make sure you see their application 
3. **Recommended**: [review their documentation](https://reactjs.org/docs/hello-world.html). Relevant sections 1 - 12 (as much as you can/want/understand)
4. **recommended**: as we are going to use flexbox to layout the application, it is recommended to read [this useful cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox)

See you all,
Eran.
