function categoryCheck(type) {
  let category = ''
  const arrayFilm = ['film', 'komedi', 'dramat', 'horror', 'thriller']
  const arraySerial = ['serial', 'telenowela']
  const arrayEntertainment = ['rozrywk', 'teleturniej', 'show', 'muzycz']
  const arraySport = ['sport']

  const isFilm = arrayFilm.map(el => type.includes(el)).includes(true)
  const isSerial = arraySerial.map(el => type.includes(el)).includes(true)
  const isEntertainment = arrayEntertainment.map(el => type.includes(el)).includes(true)
  const isSport = arraySport.map(el => type.includes(el)).includes(true)

  if (isFilm) {
    category = 'film'
  }
  else if (isSerial) {
    category = 'serial'
  }
  else if (isEntertainment) {
    category = 'entertainment'
  }
  else if (isSport) {
    category = 'sport'
  }
  else category = 'other'

  console.log('type = ', type)
  console.log('isFilm = ', isFilm)
  console.log('isSerial = ', isSerial)
  console.log('isEntertainment = ', isEntertainment)
  console.log('isSport = ', isSport)
  console.log('_______________________________________\n')
  console.log('category = ', category)
  console.log('_______________________________________\n')
}

categoryCheck('telezakupy')
