<!-- all npm installs in order -->
  npm install nodemon --save-dev
  npm install express --save
  npm install cors --save
  npm istall mongoose --save
  npm install dotenv --save 
  npm install eslint --save-dev
  npm install --save-dev jest
  `npm install cross-env`
  `npm install --save-dev supertest`
  `npm install express-async-errors --save`



steps:
  4.1
    install all packages
    create mongodb by saving an obj in it (first time) 
    change the type of _id and __v
    setup requests directory to test post, get etc
    make it a git repo to track progress    
      (do not tract password and other private details also node_modules)
  4.2
    arrange to node structure good practice
    made git repo and add a branch for new part.. merge to master when done
    
    seperate loggers -- utils/loggers.js
    simplify index.js (entry point)
      fix as .env (gitignore this)
      install dotenv
        separate config -- utils/config.js
      import utils/ logger, config
    seperate route handlers -- controllers/blogs.js
      make dir models/blog.js (define blog schema)
    make app.js and use url shortner (inc in blogs.js) 
    now test it
    add middleware in utils
    add eslint

  4.3, 4.4
    make list_helper
    make total_Likes.test.js
      fix it
  4.5
    favorite blogs -- return ans[0]
    explore :
      [x] test out with one blog 
      [x] use single testing too 
    to use debugger while testing
      `node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand`
      chrome:// inspect
          `Open dedicated DevTools for Node`
    to test single test
      `npm test -- -t '<specify test here>'`
  
  <!-- 4 b -->
  4.8
    [x]configure to use initial db
      `npm install cross-env`
        to enable cross-env -- test, production, development
      update package.json
      `npm install --save-dev supertest`
        to use our own db for backend testing
      add tests/blog_api.test.js
        will use app.js
      `npm test -- tests/blog_api.test.js`
        run test only on blog_api.test.js
    [x] returns correct amout of blogs
    [x] returns in json format
  4.9
    [x] make sure _id is now id
  4.10
    [x] define /post route with async and write a test
  4.11
    [x] check - likes property is missing from the request
  4.12
      `npm install express-async-errors --save`
        to avoid try catch block -- sends to middle ware if using async, automatically
      add validators to blog schema for title and url
    [x] check - title and url properties are missing

  4.13
      difference btwn api.get('/api/blogs') and helper.blogsInDb() ??
      bug : beforeEach and helper.blogsInDb() were clashing
        fix : move beforeEach to a describe blog such that its executed only when checking init blog saved
    [x] deleting a single blog 
  4.14
    to run localhost:
      change .env monogo_url to use the test app
      change it back after done
    <!-- failing test but post request is made !! -->
        toJSON (wrong spelling), accessing null
    [x] updating the information of an individual blog post
  <!-- [x] clean up and commit -->

  part4 D 
  4.15
    [x] implement creating a user 
      add user.js, update blog.js, update app.js, config.js
        >>  references are now stored in both documents
      `npm install bcrypt --save` >> passwordHash
  4.16
    [x] bloglist expansion (restriction)
      [x] validators 
      [x] tests
        [x] uniq username
        [x] username, password < 3 **(mistake ? minLength : minlength )**
        [x] username missing
        [x] password missing
      update user.js, update blog_api.test.js, update test_helper
        // **bug:  length not length()**
  4.17
    [x] bloglist expansion (db user, note link) 
      [x] make schema changes and blogs route
      [x] add populate
      [x] verify with postman or jest
  4.18
    [x] token based auth
      `npm install jsonwebtoken --save`
      add controllers/login.js ; update app.js, .env
      [x] test with vs rest client
  4.19
    [x] token only allow user with token to post
      using 'Bearer' authentication schema
      update blogs
      make rest client : login, post_blog_token
  4.20
    [] separate the middleware
      change : app, middleware, blogs
  4.21
    [x] delete blogs only by same user who created it
      update blogs/post
  4.22
    [x] fix  test -- adding new blog
      requires 4.20
    [x] add test -- fails with status 401 if wrong user 
    
  

node packages info:
  **express is for server side development**
  **Cross-origin resource sharing (CORS)**

to help debug
  browser and cli
  >> `console.log(request.headers)`  
  >> `node --inspect index.js`
  testing
  >> `npm test -- -t 'when list has only one blog, equals the likes of that'` to test single test
  >> `npm test -- -t ''` copy this
  >> `node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand [any other arguments here]` 
    >> using debugger while *testing jest*  -- place `debugger` in code 

notes:
  * commit every time there is a good change and working
  * if i make middleware collecting error.. console.error is shown but not when I make custom validator
  
  gitk <filename>
    this views the history of a file in gui

  # diff between commits 14b8... and b410...
  git diff 14b8..b410
  # only include diff of specified files
  git diff 14b8..b410 path/to/file/a path/to/file/b

bug list or need help from solution list :
  favoriteBlog in list_helper
  4.16 verify
  all status codes
  



understand:
  jest vs supertest(advantage)
  db users and blog link (post request to create a new blog -- updates both blog and user db)
  token stuff in detail


[] commit again with cleanup
