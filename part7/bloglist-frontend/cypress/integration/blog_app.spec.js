describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  // 5.17
  it('Login form is shown', function () {
    cy.contains('Log in application')
    cy.contains('login')
  })

  // 5.18
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      // cy.contains('wrong username or password')

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'border-style', 'solid')
      // .and('have.css', 'color', 'rgb(255, 0, 0')

      // cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0')
    })

    // 5.19 -- logged in can create a blog
    describe.only('When logged in', function () {
      beforeEach(function () {
        // log in user here
        // cy.get('#username').type('mluukkai')
        // cy.get('#password').type('salainen')
        // cy.get('#login-button').click()
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('A blog can be created', function () {
        cy.contains('Matti Luukkainen logged in')
        // cy.contains('create new blog').click()

        // cy.get('#title').type('blog from cypress')
        // cy.get('#author').type('buda')
        // cy.get('#url').type('www.dont-break.com')

        // cy.get('#create-blog').click()
        // cy.get('#hide-form').click()

        cy.createBlog({
          title: 'blog from cypress',
          author: 'buda',
          url: 'www.dont-break.com',
        })

        // checks from the notification
        // check from Blog component
        cy.get('.blog').contains('blog from cypress').contains('buda')
        // .contains('show')
      })

      // it starts from deleting everything and loggin in
      describe('a blog exist', function () {
        beforeEach(function () {
          // create some blogs
          // cy.contains('create new blog').click()
          // cy.get('#title').type('another blog for cypress')
          // cy.get('#author').type('buda - 1')
          // cy.get('#url').type('www.dontBreak.com')
          // cy.get('#create-blog').click()
          // cy.get('#hide-form').click()

          // cy.contains('create new blog').click()
          // cy.get('#title').type('blog for cypress')
          // cy.get('#author').type('leanFuzzBall')
          // cy.get('#url').type('www.dont_break.com')
          // cy.get('#create-blog').click()
          // cy.get('#hide-form').click()

          // add two more using cy.visit and POST
          cy.createBlog({
            title: 'another blog for cypress',
            author: 'buda1',
            url: 'www.first.com',
            likes: '10'
          })
          cy.createBlog({
            title: 'another second blog for cy',
            author: 'buda2',
            url: 'www.second.com',
            likes: '20'
          })
          cy.createBlog({
            title: 'another third (in top) blog for cy',
            author: 'buda3',
            url: 'www.third.com',
            likes: '30'
          })
        })

        it('blog can be liked', function () {
          cy.get('.blog')
            .contains('another blog for cypress')
            .contains('show')
            .click()
            .get('#like-button')
            .click()
            .parent()
            .contains('likes 1')
        })

        it('blog can be delted by same user who create', function () {
          cy.get('.blog')
            .contains('another blog for cypress')
            .contains('show')
            .click()
            .parent()
            .parent()
            .contains('remove')
            .click()
          cy.get('.blog')
            .should('not.contain', 'another blog for cypress')

        })

        it.only('blogs are ordered according to likes', function(){
          cy.get('.blog').then(blogs => {
            console.log(blogs.length)
            console.log(blogs)
            // console.log('wut this ',blogs.innerText)
            cy.wrap(blogs[0]).should('contain', 'another third (in top) blog for cy')
            cy.wrap(blogs[1]).should('contain', 'another second blog for cy')
            cy.wrap(blogs[2]).should('contain', 'another blog for cypress')
          })
        })

      })
    })
  })
})
