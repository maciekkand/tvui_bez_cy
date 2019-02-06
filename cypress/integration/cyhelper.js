export const dayAndHours = (day, startHour, endHour) => {
  cy.visit('http://localhost:8080')
    .get("[data-test='day']").select(day)
    .get("[data-test='startHour']").select(startHour)
    .get("[data-test='endHour']").select(endHour)
}

export const category = (categoryIndex, timeout = 200) => {
  const query = '#categories > div:nth-child(' + categoryIndex + ') > label > span'
  cy.get(query).click().wait(timeout)
}

export const station = (groupName, stationIndex ) => {
  const query = "[data-test='stations" + groupName + "']"
  cy.get(query).find('input').eq(stationIndex).click({ force: true })
}

export const tableCell = (tr, td) => {
  if (typeof tr === 'string') {
    return '#table > tbody > tr:' + tr + ' > td:nth-child(' + td + ')'
  }

  return '#table > tbody > tr:nth-child(' + tr + ') > td:nth-child(' + td + ')'
}

export const isWordInColumn = (el, word) => {
  const regex = new RegExp(word, 'i')

  cy.wrap(el).invoke('text').then(text => {
    if (!text.match(regex)) {
      throw new Error('Incorrect station')
    }
  })

}
