describe('basic user flows', () => {
  beforeEach(() => {
    // Reset the database using the development-only route
    cy.resetDb()
  })

  it('logs in and out', () => {
    cy.seedUsers()
    cy.login('user1', 'password1')

    // Log out
    cy.get('nav div.menu-trigger').click()
    cy.contains('a', 'Logout').click()
    cy.url().should('include', '/login')
  })

  it('registers new user', () => {
    cy.visit('/login')
    cy.contains('a', 'Signup').click()
    cy.get('input[placeholder="User Name"]').type('newUser')
    cy.get('input[placeholder="Email"]').type('newUser@example.com')
    cy.get('input[placeholder="Password"]').type('newUserPassword')
    cy.get('input[placeholder="Confirm Password"]').type('newUserPassword')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/dashboard')
    cy.contains('h1', 'newUser')
  })

  it('navigates around the website', () => {
    cy.seedData()
    const username = 'user1'
    cy.login(username, 'password1')

    // Visit profile
    cy.get('.main-content > a[href*="/users/"]').click()
    cy.url().should('include', '/users/1')
    cy.get('h1').should('contain', username)
    cy.contains('h3', 'Post 1a')

    // Visit followers list (user2 and user3 follow user1)
    cy.visit('/users/1')
    cy.contains('p', 'follower').click()
    cy.url().should('include', '/users/1/followers')
    cy.contains('div', 'user2')
    cy.contains('div', 'user3')

    // Visit user2 following list
    cy.contains('div', 'user2').click()
    cy.url().should('include', '/users/2')
    cy.contains('p', 'following').click()
    cy.url().should('include', '/users/2/following')
    cy.contains('div', username)

    // Visit post
    cy.get('nav > a.Title').click()
    cy.url().should('include', '/dashboard')
    cy.get('a[href="/posts/1"]').click()
    cy.url().should('include', '/posts/1')
    cy.get('div.comment').should('exist')
    cy.get('div.comment > div.replies').should('exist')

    // Visit community from post
    cy.get('a[href="/community/1"]').click()
    cy.url().should('include', '/community/1')
    cy.contains('h1', 'Stardew Valley Test Community')

    // Visit community member list
    cy.contains('span', 'Community Members').click()
    cy.url().should('include', '/community/1/members')
    cy.get('ul').should('have.length', 3)
  })

  it('creates a community and a post', () => {
    cy.seedUsers()
    cy.login('user1', 'password1')

    // Create a community for Forza Motorsport (IGDB id: 78511)
    cy.visit('/create-community/78511')
    cy.get('h2').should('contain', 'Forza Motorsport')
    const communityName = 'Forza Motorsport Test Community'
    cy.get('#communityName').type(communityName)
    cy.get('button[type=submit]').click()
    cy.get('h1').should('contain', communityName)

    // Create a post
    cy.get('#create-post-button').click()
    cy.url().should('include', '/create-post')
    cy.get('#community-list li:first').click()
    const postTitle = 'cypress test title'
    cy.get('input[placeholder=Title]').type(postTitle)
    cy.get('textarea[placeholder="Write your post here..."]').type('cypress test description')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/community')
    cy.contains('h3', postTitle)
  })

  it('comments and replies to comments', () => {
    cy.seedData()
    cy.login('user1', 'password1')

    cy.visit('/posts/1')
    cy.get('.comment-list')
      .children('.comment')
      .first()
      .within(() => {
        cy.get('> .replies').should('exist')
        cy.get('> .comment-content .toggle-replies-btn').click()
        cy.get('> .replies').should('not.exist')
        cy.get('> .comment-content .toggle-replies-btn').click()
        cy.get('> .replies').should('exist')
        cy.get('> .comment-content .reply-btn').click()
        const replyText = 'Reply from cypress'
        cy.get('textarea[placeholder="Write a reply..."]').type(replyText)
        cy.get('button[type=submit]').click()
        cy.contains('p', replyText)
      })

    cy.get('div.comment-list > button.reply-btn').click()
    const topLevelText = 'Top level reply from cypress'
    cy.get('textarea[placeholder="Write a reply..."').type(topLevelText)
    cy.get('button[type=submit]').click()
    cy.contains('p', topLevelText)
  })

  it('follows and unfollows communities', () => {
    cy.seedData()
    cy.login('user1', 'password1')

    // Visit community 1
    cy.visit('/community/1')
    // 3 members and an "Unfollow" button
    cy.contains('span', '3')
    cy.contains('button', 'Unfollow Community').click()
    // 2 members and a "Follow" button
    cy.contains('span', '2')
    cy.contains('button', 'Follow Community')

    // Visit community 2
    cy.visit('/community/2')
    // 0 members and a "Follow" button
    cy.contains('span', '0')
    cy.contains('button', 'Follow Community').click()
    // 1 member and an "Unfollow" button
    cy.contains('span', '1')
    cy.contains('button', 'Unfollow Community')
  })

  it('follows and unfollows users', () => {
    cy.seedData()
    cy.login('user1', 'password1')

    // Follow user2
    cy.visit('/users/2')
    cy.contains('p', '0 followers')
    cy.contains('button', 'Follow user').click()
    cy.contains('p', '1 follower').click()
    cy.url().should('include', '/users/2/followers')
    cy.contains('div', 'user1')

    // Unfollow user2
    cy.visit('/users/2')
    cy.contains('button', 'Unfollow user').click()
    cy.contains('p', '0 followers').click()
    cy.url().should('include', '/users/2/followers')
    cy.get('main ul').children().should('have.length', 0)
  })

  it('edits the users profile', () => {
    cy.seedUsers()
    const username = 'user1'
    const newBio = 'New bio from cypress'
    cy.login(username, 'password1')

    cy.visit('/users/1')
    cy.contains('button', 'Edit Profile').click()
    cy.get('#username').clear()
    cy.get('#username').type(username + '_edited')
    cy.get('#bio').type(newBio)
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/users/1')
    cy.contains('h1', username + '_edited')
    cy.contains('p', newBio)
  })
})