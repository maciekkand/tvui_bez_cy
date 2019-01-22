export const daysForSelectBox = () => {
  const daysForSelectArray = []

  daysForSelectArray.push({ text: 'Dzień', value: null })

  for (let index = 0; index < 7; index++) {
    const day = new Date().getTime() + index * 1000 * 60 * 60 * 24
    const dayString = new Date(day).toString().slice(0, 10)
    const startOfDayTimestamp = new Date(day).setUTCHours(0, 0, 0, 0)

    const dayObj = {
      text: dayString,
      value: startOfDayTimestamp,
      valueStr: new Date(startOfDayTimestamp)
    }
    daysForSelectArray.push(dayObj)
  }

  console.log('daysForSelectArray = ', daysForSelectArray)
  return daysForSelectArray
}

export const hoursForSelectBox = (selectedDay, endHour) => {
  const hoursForSelectArray = []
  let currentHour

  console.log('selectedDay = ', new Date(selectedDay).toDateString())
  console.log('today = ', new Date().toDateString())

  if (new Date(selectedDay).toDateString() === new Date().toDateString()) {
    currentHour = new Date().getHours()
  }
  else currentHour = 3

  console.log('currentHour = ', currentHour)

  for (let index = currentHour; index < 24; index++) {
    const hour = {
      text: index + endHour,
      value: index + endHour
    }

    hoursForSelectArray.push(hour)
  }

  if (endHour) {
    hoursForSelectArray.unshift({ text: 'Godzina Do', value: null })
  }
  else {
    hoursForSelectArray.unshift({ text: 'Godzina Od', value: null })
  }

  console.table(hoursForSelectArray)

  return hoursForSelectArray
}
