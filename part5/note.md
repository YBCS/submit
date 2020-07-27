### fix backend
* [x] create missing files  
* [x] install the app and get it running  
* the port
* possible problems:
    * signed with diff secret (.env)
    * eslintegnore -- build
    * package.json -- start script
      * what is cross-env for

* follow along the backend from the ground up 
* [x] add 2 users:  
    buda, mutenR
* [x] add some blogs (maybe 2, 3 by each user)

## part 5

### Ex 5.1
* [x] connect to backend
  * [x] make the login form
  * [x] implement handleLogin
    * **_question_** : have to display the blogs which is posted only by the logged in user ?

### Ex 5.2
* [x] Make login permanent
  * [x] in blogs : setToken
  * update App.js to use setToken
  * [x] test it out
  * [x] implement logout 

now how do I log out 

### Ex 5.3
* [x] allow a logged-in user to add new blogs
  * [x] show a form to post blog if logged in
    * [x] contains a button called create which 'post' blog
      * [x] in blogs : define create / 'post' 
        * [x] dont forget to include that header
  * made mistake : `headers` spelling (blogs.js - create)
    * **can improve** : 
      * use one state to make new blog
      * [x] conv addBlog to async 


### Ex 5.4
* [x] implement notifications
  * [] understand from the solution and implement
    * [x] having color optional but sure can be done 😁
      * [x] means css file
  * [x] error notification for addBlog

* init git repo for whole project
  * ignore -- node_modules; .env and others

###  Ex 5.5
* [x] display create-blog form only when required/appropriate
  * two ways to to this [] togglable / [] style='none'
  * [x] refactor blogform and loginform into their own components
  * [x] use style = 'none' for conditional toggle ? 
  * [] use Toggle component for conditional toggle ? 
    * mistakes in maybe :  
      * onChange funcs in loginForm and BlogForm

###  Ex 5.6
* [x] make component for blogForm and loginForm
* [x] seperate states to the component itself
  * [x] test by creating a new blog
  * not really understood how BlogForm component was separated

###  Ex 5.7
* [x] add each blog a button, which controls if all of the details about the blog are shown or not  
  * changes in components/Blog.js
  * [x] add like button

###  Ex 5.8
* [x] functionality for the like button. Http PUT request
  * [x] problem -- once liked, user is no longer displayed -- maybe a get solves ?
    * I solved it by another get  -- admin told me to popluate in the backend, worked 🤩


###  Ex 5.9
* [x] show blogs in sorted order

### Ex 5.10
* [x] implement delete functionality
  * update blogs.js (add remove -- dont forget token), Blog.js (remove blog), App.js
  * also pop up confirmation (window.confirm)
  * [x] Show the button for deleting a blog post only if the blog post was added by the user.
    * update App, Blog -- send user from App into Blog then compare

### Ex 5.11
* [] PropTypes for one of the components
  * `npm install --save prop-types`
  * done at LoinForm very fast
  * [] do at some other component


### Ex 5.12
* [x] EsLint Front end
  * NB: do not run the eslint --init command.
  * `npm add --save-dev eslint-plugin-jest`
  * add .eslintrc.js -- that unix part ??
    * toggleable part ???
  * `npm install --save typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser @types/node @types/react @types/react-dom @types/jest`
    * should fix that typescript error when npm run eslint
  
### Ex 5.13  -- blog list tests
* [x] blog list tests
* `npm install --save-dev @testing-library/react @testing-library/jest-dom`
  * react-testing-library will render our tests
* `CI=true npm test`
  * to stop execution after a test
  * normally -- `npm test`
* `component.debug()`
  * to debug -- logs the html to console

### Ex 5.14
* [x] when show clicked url, likes are shown

### Ex 5.15
* [x] click likes 2 times and check if called 2x

### Ex 5.16*
* [x] test BlogForm for forms
  * add BlogForm.test.js
  * maybe update BlogForm.js
    * [] but always getting only one passed when there is even 2
      * bcoz one test file is one even if there is two seperate expect statements
* `CI=true npm test -- --coverage` -- test the coverage

### Ex 5.17 frontend integration testing
* [x] set up for cypress
  * `npm install --save-dev cypress`
  * `npm install eslint-plugin-cypress --save-dev`  
  * update elsintrc.js -- make sure right dir (admin help 😁)
  * in backend
    * add testing.js
    * update package.js and app.js
  * start the backend and the forntend
  * `npm run cypress:open` in frontend
* [x] empty the db everytime
  * use the router defined in testing
* dont commit without deciding what to do with cypress dir
    * [x] gitignore the video dir
* to run :
  * in backend dir : `npm run start:test`
  * in frontend dir : `npm start`
  * in frontend dir : `npm run cypress:open`


### Ex 5.18
* [x] test login with right, wrong cred
* [] if wrong verify css colors
  * cant get it to work -- my notifications are messed up -- refactor

### Ex 5.19
* [x] logged in can create blog

### Ex 5.20
* [x] user can like a blog
  * maybe bypass the form 

### Ex 5.21
* [x] same user can remove blog
  * [] different user can not remove blog
    * create a blog
    * create new user, logout , login with different user
    * find that remove button is hidden

### Ex 5.23
* [x] blogs are ordered according to likes ?? 
  * post some blogs with likes data (10, 20, 30)
  * get blogs
  * in the then block
    * compare that blogs are appearing as expected
* [x] add commands.js


#
> Contributing opportunity:
  * ex 5.6 question : *NewNote* should be NoteForm


> Questions:
  * [x] in 5.21, bypass the window.assert by default? -- yes
    * to bypass:
    ```
    cy.on("window:confirm", (_err, _runnable) => { return false; }))
    inside an it block will make cypress decline

    Aleksi Huotala, [27.07.20 18:12]
    https://docs.cypress.io/api/events/catalog-of-events.html#cy
    ```

> Need help from solution
  * 5.18 color of nav

> Note
  * env is not uploaded or tracked so check in /self