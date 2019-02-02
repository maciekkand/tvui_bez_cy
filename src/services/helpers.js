/* cSpell:disable */
export const days = () => {
  const weekDayNames = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']
  const monthNames = ['Sty', 'Luty', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']
  const daysForSelectBox = []

  daysForSelectBox.push({
    text: 'Dzień',
    value: null,
  })

  for (let index = 0; index < 7; index++) {
    const startOfDay = new Date().setUTCHours(index * 24, 0, 0, 0)

    const dayName = weekDayNames[new Date(startOfDay).getDay()]
    const dayOfMonth = new Date(startOfDay).getDate()
    const monthName = monthNames[new Date(startOfDay).getMonth()]
    const dayString = dayName + ' ' + dayOfMonth + ' ' + monthName

    const dayObj = {
      text: dayString,
      value: startOfDay,
      dayString,
    }

    daysForSelectBox.push(dayObj)
  }

  return daysForSelectBox
}

export const endHours = startHour => {
  const hours = [{ text: 'Godzina Do', value: null }]
  const start = startHour || 3

  for (let index = start + 1; index < 25; index++) {
    const hour = {
      text: index,
      value: index,
    }
    hours.push(hour)
  }
  return hours
}
