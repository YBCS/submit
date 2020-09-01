<!-- this is for part 7 ex 9 onwards -->

- [x] if you make it a git repo dont forget to gitignore those env files

### Ex 7.9 - 7. 11

- [] maintain state using redux
  - identify which to change (the useState funcs)
  - map out an idea of the outcome store shape

  - Observation:
    - <Provider store = {store}> App  </Provider>
    - for each component under /components
      - mapStateToProps(state)
      - export default connect (mapStateToProps, mapDispatchToProps) (nameOfComponent)
    - The way each reducers are written, actionCreator
  
  - redux thunk will allow async operations
  - `npm install --save-dev redux-devtools-extension` to use debugs

- [x] complete blogReducer
  - All action:
    - [x] initializeBlogs
    - [x] create
      the new notification use the blog itself. how is *solution* handled
    - [x] update
      question : a func which was async coz it called a service say becomes a redux and now uses dispatch, no longer needing the service call. Do I still maintain an async func coz the dispatch will inturn call an action which makes await request but the action will itself be async ????
    - [x] remove
      axios.delete has no return value 🤦‍♂️
- I was mislead by 'internal state of React components'. It just means useState

- [x] Blog View to redux
  - put a property view : false in blog store
  - when clicked view : true and calls a toggle action 
    - bug: when I like the view goes to false again
      - maybe fixing the blog model in backend will fix it 
        - nope that's a long fix
        - instead modify the like action

### Ex 7.12

- [] Store signed in user in the Redux store.
  - storage.saveUser is not working for some reason (fixed by moving to reducer)
  - now user.name is not being read even though its rendered in the blog component
  - moved the logic to loginReducer and it worked. is it the right way tho 🙄

### Ex 7.13

- [x] use react router for User view
  - `npm install --save react-router-dom`
    - [] I can move the state to redux
    - [x] I have to style it with tables

### Ex 7.14

- [x] view for individual user
  - order of Router matters !
  - [] course material was converting match.params.id to Number.. why?

### Ex 7.15

- [x] view for individual Blog

  - woah wat did I do to my blogStyle
    - I added style twice 😅

- suddenly in the questions blogs view doesnt show the author ??? (course material)

### Ex 7.16

- [x] Navigation menu for application
  - [] make it nav bar or add some styles

### Ex 7.17

- [x] Commenting on a blog post
  - modify backend
    - comments field inside every blog  

### Ex 7.18

- [x] Commenting on a blog -- front end
  - study the diff and update takeaways
  
  - to add a feature (comment)
    - make backend changes
      - new schema, new api endpoint
      - test the features
    - make frontend changes
      - make new action creators
      - update related components in frontend

### Ex 7.19

- [] style your website
  - [x] container
  - [x] table
  - [x] form
  - [x] button
  - [x] notification
  - [x] nav bar
    


### Questions:

- when we pass an argument to a component
  good practise to pass minimum required ?
   eg : we pass anecdotes.id instead of passing in anecdotes (say while like)

- individul blog view / hide with redux