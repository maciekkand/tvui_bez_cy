export const daysForSelectBox = () => {
  const daysForSelectArray = []

  for (let index = 0; index < 7; index++) {
    const day = new Date().getTime() + index * 1000 * 60 * 60 * 24
    const dayString = new Date(day).toString().slice(0, 10)
    const startOfTodayTimestamp = new Date().setUTCHours(0, 0, 0, 0)
    const dayObj = {
      text: dayString,
      value: startOfTodayTimestamp
    }

    daysForSelectArray.push(dayObj)
  }
  return daysForSelectArray
}

export const hoursForSelectBox = endHour => {
  const hoursForSelectArray = []
  const currentHour = new Date().getHours()

  for (let index = currentHour; index < 25; index++) {
    const hour = {
      text: index + endHour,
      value: index + endHour
    }

    hoursForSelectArray.push(hour)
  }
  return hoursForSelectArray
}
