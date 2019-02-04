/* eslint-disable*/
import { dayAndHours, category, station } from './cyhelper'

describe('I. Selection by hours', () => {
  it('1. Entering nothing gets "Śr 13 Luty" in last row and 23rd hour in the one', () => {

    dayAndHours('Śr 13 Luty', '', '')
    cy.wait(5000)
    cy.get("[data-test='btnSearch']").click()
      .get('#table > tbody > tr:first > td:nth-child(4)').contains(/23.+/).should('exist')
      //.get('#table > tbody > tr:first > td:nth-child(4)').should('contain', /23/)
      .get('#table > tbody > tr:last > td:nth-child(2)').should('have.text', 'Śr 13 Luty')
  })

  it('2. Entering "Śr 13 Luty", "7" as startHour,  \
          "10" as endHour gest "6" or "7"in the first rows "Czas" column \
          and "9" or "10" in the last one', () => {

    dayAndHours('Śr 13 Luty', '7', '10')
    cy.wait(5000)
    cy.get("[data-test='btnSearch']").click()
    cy.get('#table > tbody > tr:first > td:nth-child(4)').contains(/[6, 7].*/).should('exist')
    cy.get('#table > tbody > tr:last > td:nth-child(4)').contains(/[9, 10].*/).should('exist')
  })
})

describe('II. Selection by hours and categories', () => {
  it('1. Selecting "Śr 13 Luty", startHour = "10", endHour="12", \
          checking "Serial" and "Inne", gets "serial" in the first row \
          and "inne" as a category name, in the last one. \
          There is over 100 documents returned', () => {

    dayAndHours('Śr 13 Luty', '10', '12')
    cy.wait(5000)
    cy.get("[data-test='btnSearch']").click()

    category(2)
    category(7)

    cy.get('#table > tbody > tr:first > td:nth-child(7)').contains('inne').should('exist')
    .get('#table > tbody > tr:last > td:nth-child(7)').contains('serial').should('exist')
    .get('#table > tbody > tr').its('length').should('be.gte', 100)

  })

  it('2. Selecting "Śr 13 Luty", startHour = 18, endHour = 22, \
    checking "Wiadomości" and "Sport", gets "serial" in the first row \
    and "inne" as a category name, in the last one. \
    There is over 450 documents returned', () => {

    dayAndHours('Śr 13 Luty', '18', '22')
    cy.wait(5000)
    cy.get("[data-test='btnSearch']").click()

    category(3)
    category(4)

    cy.get('#table > tbody > tr:first > td:nth-child(7)').contains('sport').should('exist')
    .get('#table > tbody > tr:last > td:nth-child(7)').contains('wiadomosci').should('exist')
    .get('#table > tbody > tr').its('length').should('be.gte', 50)

  })
})

describe('IV. Selection by stations and hours', () => {

  it('1. Entering "Śr 13 Luty", startHour = 10, endHour = 14, \
              checking "TVP1", "POLSAT" and "ATM Rozrywka" gets "TVP 1" \
              and "ATM Rozrywka" as a stations names in the 1st and last \
              row of the table', () => {

      cy.visit('http://localhost:8080/stations')
      station('TvpTvn', 0)
      station('Polsat', 1)
      station('Polskie', 2)
      cy.get("[data-test='btnOK']").click().wait(1000)

      dayAndHours('Śr 13 Luty', '10', '14')
      cy.wait(500)
      cy.get("[data-test='btnSearch']").click()

      cy.get('#table > tbody > tr:first > td:nth-child(3)').contains('POLSAT').should('exist')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(3)').contains('TVP 1').should('exist')
  })

})

describe('V. Selection by stations, categories and hours', () => {
  it('1. Entering "Śr 13 Luty", startHour = 9, endHour = 13, \
              checking "Serial" and "Inne" as categories and \
              "TVP 1", "CANAL+ Film" and "Nat Geo People HD" as stations, \
              gets "TVP 1" and "Nat Geo People HD" as a stations names \
              in the 1st and last row of the table', () => {

      cy.visit('http://localhost:8080/stations')
      station('TvpTvn', 0)
      station('Canal', 2)
      station('DiscoveryNational', 3)
      cy.get("[data-test='btnOK']").click().wait(1000)

      category(2)
      category(7)

      dayAndHours('Śr 13 Luty', '9', '13')
      cy.wait(500)
      cy.get("[data-test='btnSearch']").click()

      .get('#table > tbody > tr:first > td:nth-child(7)').contains('serial').should('exist')
      .get('#table > tbody > tr:nth-child(12) > td:nth-child(7)').contains('inne').should('exist')

      .get('#table > tbody > tr:first > td:nth-child(3)').contains('TVP 1').should('exist')
      .get('#table > tbody > tr:last > td:nth-child(3)').contains('Nat Geo People HD').should('exist')
  })

})

describe('VI. Selection by favorites, categories and hours', () => {
  it('1. Entering "Śr 13 Luty", startHour = 13, endHour = 17, \
              checking "TVP2", "Canal+ Film" and "Nat Geo People", checking \
              "Serial" and "Inne", and selects 2 favorite programs, \
              doubleclicking on them. Gets you "Opowieść.." and "Ostatni", \
              once "Pokaż" button is clicked', () => {

      cy.visit('http://localhost:8080/stations')
      station('TvpTvn', 0)
      station('Canal', 2)
      station('DiscoveryNational', 3)
      cy.get("[data-test='btnOK']").click().wait(1000)

      category(2)
      category(7)

      dayAndHours('Śr 13 Luty', '9', '13')
      cy.wait(500)
      cy.get("[data-test='btnSearch']").click()


      .get('#table > tbody > tr:first > td:nth-child(5)').dblclick()
      .get('#table > tbody > tr:nth-child(4) > td:nth-child(7)').dblclick()

      .get("[data-test='btnShow']").click()

      .get('#table > tbody > tr:first > td:nth-child(5)').should('exist')
      .get('#table > tbody > tr:nth-child(2) > td:nth-child(5)').should('exist')


      .get("[data-test='btnResetFavorites']").click().wait(100)
      .get('#table > tbody > tr:first').should('not.exist')


      .get("[data-test='btnResetAll']").click()

      .get("[data-test='day']").should('have.value', '')
      .get("[data-test='startHour']").should('have.value', '')
      .get("[data-test='endHour']").should('have.value', '')

      .get('#categories > div:nth-child(2) > label > span').should('not.be.checked')
      .get('#categories > div:nth-child(7) > label > span').should('not.be.checked')
  })

})

describe('VII. Selection by text search, stations, categories and hours', () => {
  it('1. Entering keyword "komed" to the text search box gets entries \
      containing this word in the "title" column', () => {

    cy.visit('http://localhost:8080')
    .get("[data-test='textSearch']")
    .type('komed')
    .get("[data-test='btnSearch']").click().wait(5000)
    .get('#table > tbody > tr:first > td:nth-child(6)').contains(/komed/i).should('exist')
    .get('#table > tbody > tr:last > td:nth-child(6)').contains(/komed/i).should('exist')
  })
})
