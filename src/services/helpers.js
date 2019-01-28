/* cSpell:disable */
export const days = () => {
  const daysForSelectArray = []

  daysForSelectArray.push({
    text: 'Dzień',
    value: null,
  })

  for (let index = 0; index < 7; index++) {
    const day = new Date().getTime() + index * 1000 * 60 * 60 * 24
    const dayString = new Date(day).toString().slice(0, 10)

    const dayObj = {
      text: dayString,
      value: index,
    }
    daysForSelectArray.push(dayObj)
  }

  return daysForSelectArray
}

export const endHours = startHour => {
  console.log('startHour = ', startHour)

  const hours = [{ text: 'Godzina Do', value: null }]
  const start = startHour || 3

  for (let index = start + 1; index < 25; index++) {
    const hour = {
      text: index,
      value: index,
    }

    console.log('hour = ', hour)
    hours.push(hour)
  }

  console.log('hours = ', hours)
  return hours
}
