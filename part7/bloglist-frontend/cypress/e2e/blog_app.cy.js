describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Riyan Mohammad',
      username: 'Riyan1',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function(){
    it('successful with correct credentials', function(){
      cy.get('#username').type('Riyan1')
      cy.get('#password').type('password')
      cy.get('#login').click()
      cy.contains('Riyan1 logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('Riyan1')
      cy.get('#password').type('passwoed')
      cy.get('#login').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username:'Riyan1', password:'password' })
    })

    it.skip('A blog can be created', function(){
      cy.get('#newBlogBtn').click()
      cy.get('#title').type('Testing Cypress')
      cy.get('#author').type('Riyan')
      cy.get('#url').type('www.google.com')
      cy.get('#submitBtn').click()
      cy.get('#notification').contains('New blog Testing Cypress added')
    })

    it.skip('users can like a blog', function(){
      cy.get('#newBlogBtn').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Riyan')
      cy.get('#url').type('nice.com')
      cy.get('#submitBtn').click()
      cy.get('.blogDetailsButton').click()
      cy.get('.likeBtn').click()
      cy.contains('likes 1')
    })

    it('users can delete a blog', function(){
      cy.get('#newBlogBtn').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Riyan')
      cy.get('#url').type('nice.com')
      cy.get('#submitBtn').click()
      cy.get('.blogDetailsButton').click()
      cy.get('.deleteBtn').click()
    })

    it('only the creator of the blog can see the remove button', function(){
      cy.createBlog({ title: 'Testing again', author:'Riyan Mo', url:'okokok.com' })
      cy.createUser({ username:'DummyUser1', name: 'dummy123', password: 'password' })
      cy.login({ username:'DummyUser1', password:'password' })
      cy.get('.blogDetailsButton').click()
      cy.get('.blog').should('not.contain', 'remove')
    })

    describe('existing blogs', function(){
      beforeEach(function(){
        cy.createBlog({ title:'the title with the most likes', user:'Riyan', url:'google.com' })
        cy.get('.blogDetailsButton').click()
        cy.get('.likeBtn').click()
        cy.createBlog({ title:'the title with the second most likes', user:'Riyan Mohammad', url:'nice.com' })
      })

      it('are ordered according to likes', function(){
        cy.get('.blog').eq(0).should('contain', 'the title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'the title with the second most likes')
      })
    })
  })

})