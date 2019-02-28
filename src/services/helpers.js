/* cSpell:disable */
export const daysForSelectBox = () => {
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
      //valueStr: new Date(startOfDayTimestamp)
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
      value: index + endHour,
    }

    hoursForSelectArray.push(hour)
  }

  if (endHour) {
    hoursForSelectArray.unshift({
      text: 'Godzina Do',
      value: null,
    })
  }
  else {
    hoursForSelectArray.unshift({
      text: 'Godzina Od',
      value: null,
    })
  }

  return hoursForSelectArray
}

export const email = text => {
  const params = {
    notes: text,
  }

  emailjs
    .send('gmail', 'tv', params)
    .then(res => {
      console.log('SUCCESS!', res.status, res.text)
    })
    .catch(err => console.log('EMAIL FAILED:', err))
}
