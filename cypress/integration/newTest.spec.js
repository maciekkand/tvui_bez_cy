/* eslint-disable*/
describe('1. Selection by hours', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    })

    it.only('1. Enter "Pt 8 Luty and click Search button to get results', () => {
    cy.get("[data-test='day']")
      .select('Pt 9 Luty')
      .get("[data-test='buttonSearch']")
      .click()
      //.get('#stockTable')
      //.find('tbody')
      //.find('tr')
      //.should('have.length', 1)
  })
})

describe('2. Wyszukiwanie sklepów - brak miasta lub ulicy', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('1. Brak miasta i ulicy, klik w Searcha i ma się wyświetlić modal "Brak miasta"', () => {
    cy.get("[data-test='buttonSearch']")
      .click()
      .get("[data-test='modalCity']")
  })

  it('2. Jest miasto, ale brak ulicy, klik w Searcha i ma wyświetlić się modal "Brak ulicy"', () => {
    cy.get("[data-test='city']")
      .select('Warszawa')

    cy.get("[data-test='buttonSearch']")
      .click()
      .get("[data-test='modalStreet']")
  })

  it('3. Jest ulica ale brak miasta, klik w Searcha i ma wyświetlić się modal "Brak miasta"', () => {
    cy.get("[data-test='street']")
      .type('Dolna 5a')

    cy.contains('Search')
      .click()
      .get("[data-test='modalCity']")
  })
})

describe(`3. Reset buttons (są sklepy (Wwa, Dolna 5a, 600m).
             Czek w Chleb i Masło wyświetla kolumny Chleb, Maslo i Total`, () => {
  // wybranie sklepów w promieniu 600m od Dolnej 5a, Wwa
  beforeEach(() => {
    cy.visit('http://localhost:8080')
      .get("[data-test='city']")
      .select('Warszawa')
      .get("[data-test='street']")
      .type('Dolna 5a')
      .get("[data-test='radius']")
      .clear()
      .type(600)
      .get("[data-test='buttonSearch']")
      .click()

      .wait(1000)

      // czeknięcie boksów 'Chleb' i 'Masło'
      .get("[data-test='stocks']")
      .get('#__BVID__19__BV_check_0_opt_')
      .check({ force: true })
      .get('#__BVID__19__BV_check_1_opt_')
      .check({ force: true })
  })

  it('1. Unczek zdejmuje czekboksy towarów i znika ich kolumny i Total', () => {
    // czy nagłówek tabela zawiera słowa 'Total', 'Chleb' lub 'Masło'
    cy.get('#stockTable thead tr th')
      .contains(/Total/)
      .get('#stockTable thead tr th')
      .contains(/Chleb/)
      .get('#stockTable thead tr th')
      .contains(/Chleb/)

      // uncheck boksa Chleb
      .get("[data-test='stocks']")
      .get('#__BVID__19__BV_check_0_opt_')
      .uncheck({ force: true })

      .wait(500)

    // znika kolumna 'Chleb' ?
    cy.get('#stockTable thead tr th')
      .contains(/Chleb/)
      .should('not.exist')

      // uncheck boksa Maslo
      .get("[data-test='stocks']")
      .get('#__BVID__19__BV_check_1_opt_')
      .uncheck({ force: true })

      //Znika kolumna 'Maslo' ?
      .get('#stockTable thead tr th')
      .contains(/Maslo/)
      .should('not.exist')

      // i 'Total' ?
      .get('#stockTable thead tr th')
      .contains(/Total/)
      .should('not.exist')
  })

  it('2. Klik Reset towarów odczekowuje towary i znika ich kolumny i kolumnę Total ?', () => {
    // Klik w Reset powinien znikać kolumny Total, Chleb i Maslo
    cy.get("[data-test='buttonResetStock']")
      .click()

      //Znika kolumna 'Total' ?
      .get('#stockTable thead tr th')
      .contains(/Total/)
      .should('not.exist')

      //Znika kolumna 'Chleb' ?
      .get('#stockTable thead tr th')
      .contains(/Chleb/)
      .should('not.exist')

      //Znika kolumna 'Maslo' ?
      .get('#stockTable thead tr th')
      .contains(/Maslo/)
      .should('not.exist')
  })

  it('3. Klik Reset lokalizacji odczekowuje towary i znika ich kolumny i kolumnę Total ?', () => {
    // Klik w Reset powinien znikać kolumny Total, Chleb i Maslo
    cy.get("[data-test='buttonResetLocation']")
      .click()

      //Znika tabela towarów ?
      .get('#stockTable')
      .should('not.exist')
  })
})
