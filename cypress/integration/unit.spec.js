/*
*/
const mountVue = require('cypress-vue-unit-test')
let template = require('../../src/components/Search/Search.html')
const data = require('../../src/components/Search/Search.vue')

template = `${template}`

describe('Search', () => {
  //beforeEach(mountVue(Search))
  beforeEach(
    mountVue(template, data)
  )

  it('cokolwiek', () => {
    cy.get('#city')
      .select('Warszawa')
      .get('#street')
      .type('Dolna')
      .get('#streetNumber')
      .type('5a')
  })
})

/*
const mountVue = require('cypress-vue-unit-test')

describe('Declarative rendering', () => {
  // Vue code from https://vuejs.org/v2/guide/#Declarative-Rendering
  const template = `
    <div id="app">
      {{ message }}
    </div>
  `

  const data = {
    message: 'Hello Vue!'
  }

  // that's all you need to do
  beforeEach(mountVue({ template, data }))

  it('shows hello', () => {
    cy.contains('Hello Vue!')
  })

  it('changes message if data changes', () => {
    // mounted Vue instance is available under Cypress.vue
    Cypress.vue.message = 'Vue rocks!'
    cy.contains('Vue rocks!')
  })
})
*/
