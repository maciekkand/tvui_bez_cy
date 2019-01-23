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

  return daysForSelectArray
}

export const hoursForSelectBox = (selectedDay, endHour) => {
  const hoursForSelectArray = []
  let currentHour

  if (new Date(selectedDay).toDateString() === new Date().toDateString()) {
    currentHour = new Date().getHours()
  }
  else currentHour = 3

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

  return hoursForSelectArray
}

export const stations = [
  { text: 'TVP 1', value: 'TVP 1' },
  { text: 'TVP 2', value: 'TVP 2' },
  { text: 'Polsat', value: 'Polsat' },
  { text: 'TVN', value: 'TVN' },
  { text: 'TV', value: 'TV' },
  { text: 'TV 4', value: 'TV 4' },
  { text: 'TV 7', value: 'TV 7' },
  { text: 'TV Puls', value: 'TV Puls' },
  { text: 'Puls 2', value: 'Puls 2' },
  { text: 'TVP Info', value: 'TVP Info' },
  { text: 'TVP Kultura', value: 'TVP Kultura' },
  { text: 'Fokus TV', value: 'Fokus TV' },
  { text: 'TVP Historia', value: 'TVP Historia' },
  { text: 'TVP Seriale', value: 'TVP Seriale' },
  { text: 'AXN', value: 'AXN' },
  { text: 'AXN White', value: 'AXN White' },
  { text: 'AXN Black', value: 'AXN Black' },
  { text: 'Ale kino+', value: 'Ale kino+' },
  { text: 'TNT', value: 'TNT' },
  { text: 'TNT Fabuła', value: 'TNT Fabuła' },
  { text: 'Stopklatka TV', value: 'Stopklatka TV' }
]

