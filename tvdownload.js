/* eslint-disable */
/* #region cSpell-disable */
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const fileSave = './1.json'
const urlPrefix = 'https://programtv.onet.pl/?dzien='

function categoryCheck(type) {
  const arraySerial = ['serial', 'telenowela']
  const arrayFilm = ['film', 'komedi', 'dramat', 'horror', 'thriller', 'western']
  const arrayEntertainment = ['rozrywk', 'teleturniej', 'show', 'muzycz', 'kabaret']
  const arrayKids = ['animowan', 'familijn', 'dzieci']
  const arrayNews = ['informac', 'publicysty']

  const arraySport = [
    'sport',
    'piłka nożn',
    'piłka ręczn',
    'piłkars',
    'siatkówk',
    'badminton',
    'narciars',
    'łyżwiars',
    'golf',
    'żeglarstwo',
    'tenis',
    'boks',
    'wyścigi samochod',
    'koszykówka',
    'bilard',
    'bobsleje',
    'biathlon',
    'biatlon',
    'kombinacja norweska',
    'biegi narciarskie',
    'wyścigi motocyklowe',
    'snowboard',
    'saneczkarstwo',
    'kolarstwo',
    'hokej',
    'lekkoatletyka',
  ]

  const isFilm = arrayFilm.map(el => type.includes(el)).includes(true)
  const isSerial = arraySerial.map(el => type.includes(el)).includes(true)
  const isEntertainment = arrayEntertainment.map(el => type.includes(el)).includes(true)
  const isKids = arrayKids.map(el => type.includes(el)).includes(true)
  const isSport = arraySport.map(el => type.includes(el)).includes(true)
  const isNews = arrayNews.map(el => type.includes(el)).includes(true)

  if (isKids) {
    return 'dla dzieci'
  }
  else if (isSport) {
    return 'sport'
  }
  else if (isNews) {
    return 'wiadomosci'
  }
  else if (isSerial) {
    return 'serial'
  }
  else if (isFilm) {
    return 'film'
  }
  else if (isEntertainment) {
    return 'rozrywka'
  }
  else return 'inne'
}

const changeCategories = () => {
  const data = JSON.parse(fs.readFileSync('./tv1.json'))
  data.map(el => {
    el.category = categoryCheck(el.type)
    fs.appendFileSync('./tvNewCategories.json', JSON.stringify(el) + ',\n')
  })
}

const kanal = (day, page, channelFrom = 1, channelTo = 21) => {
  const url = `${urlPrefix + day}&strona=${page}`
  const config = { headers: { 'User-Agent': 'Mozilla/5.0' } }
  const weekDayNames = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']
  const monthNames = ['Sty', 'Luty', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']

  axios
    .get(url, config)
    //axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data)

      for (let channelNo = channelFrom; channelNo < channelTo; channelNo++) {
        // 1-4
        const channel = $(`#boxTVHolder${channelNo}`)
          .find('span.tvName')
          .text()
          .replace(/\t/g, '')
          .replace(/\n/g, '')

        const channels = $(`#boxTVHolder${channelNo} li`)

        channels.each((i, el) => {
          const id = day.toString().padStart(2, '0') + ((page - 1) * 20 + channelNo).toString().padStart(3, '0') + i.toString().padStart(2, '0')
          const time = $(el)
            .find('.hour')
            .text()
            .replace(/\t/g, '')
            .replace(/\n/g, '')
            .split(':')

          const timestampTodayMidnight = new Date().setUTCHours(0, 0, 0, 0) + day * 1000 * 60 * 60 * 24

          let hours = parseInt(time[0])
          let minutes = parseInt(time[1])

          hours = hours < 3 ? hours + 24 : hours
          const milliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000
          hours = hours > 23 ? hours - 24 : hours

          let timestamp = timestampTodayMidnight + milliseconds

          const dateTimestamp = new Date(timestamp)
            .toISOString()
            .slice(0, 16)
            .replace('T', ' ')

          let date = new Date(timestamp).toISOString().slice(0, 10)

          const dayName = weekDayNames[new Date(date).getDay()]
          const dayOfMonth = new Date(date).getDate()
          const monthName = monthNames[new Date(date).getMonth()]
          const dayString = dayName + ' ' + dayOfMonth + ' ' + monthName

          const link =
            '<a href="https://programtv.onet.pl' +
            $(el)
              .find('.title')
              .find('a')
              .attr('href') +
            '">Link</a>'

          const title = $(el)
            .find('.title a')
            .text()
            .replace(/\t/g, '')
            .replace(/\n/g, '')

          const type = $(el)
            .find('.type')
            .text()
            .replace(/\t/g, '')
            .replace(/\n/g, '')

          const category = categoryCheck(type)

          const seans = {
            id,
            channel,
            dateTimestamp,
            dayString,
            date,
            time: hours + ':' + minutes.toString().padStart(2, '0'),
            timestamp,
            title,
            category,
            type,
            link,
          }

          fs.appendFileSync(fileSave, `${JSON.stringify(seans)},\n`)
        })
      }
      fs.appendFileSync(fileSave, `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`)
    })
    .catch(err => {
      fs.appendFileSync(fileSave, err)
      console.log('Erorek !')
    })
}

/*
  Najpierw poszły 4 całe dni, ale potem blokowało mnie
  nawet gdy ścigałem po 1 dniu. Nie pomogła poniższa pętla opóźniająca
  nawet ustawiona na 3s opóźnienie (i=20).
  Pomógł restart smarka, bo złapał nowe IP i ściaganie po 1 dniu
  przy opóźnieniu = 400 ms (i=3)
  A teraz na delayu 100/100 między dniami i 40/40 między stronami
  poszły 4 dni, bo tylko tyle mu ustawiłem. Pewnie poszłoby i 7
*/

function delay(day = 0, page = 1, a, b) {
  console.time()
  const rand = Math.round(Math.random() * a + b)
  console.log('day = ' + day + ' page = ' + page + '  rand = ' + rand)
  for (let i = rand * 1e8; i > 0; i--) {}
  console.timeEnd()
}

const getAllChannels = () => {
  for (let day = 0; day < 13; day++) {  // 0 < 13 (czyli 13 dni)
    delay(day, 100, 100)
    for (let page = 1; page < 8; page++) { // 1 < 8 (czyli 7 stron)
      delay(day, page, 40, 40)
      kanal(day, page, 1, 20) // 1, 20
    }
  }
  console.log('Skończyłem i zapisałem do pliku: ', fileSave)
}

//changeCategories()

//getAllChannels()



// kanal(1, 1)    // 20
// kanal(1, 2)    // 40
// kanal(1, 3)      //  60
// kanal(1, 4)   //  80
// kanal(1, 5)    // 100
// kanal(1, 6)    // 120
// kanal(1, 7)    // 140


// kanal(2, 1)
// kanal(2, 2)
// kanal(2, 3)
// kanal(2, 4)
// kanal(2, 5)
// kanal(2, 6)
// kanal(2, 7)


// kanal(3, 1)
// kanal(3, 2)
// kanal(3, 3)
// kanal(3, 4)
// kanal(3, 5)
// kanal(3, 6)
// kanal(3, 7)


// kanal(4, 1)
// kanal(4, 2)
// kanal(4, 3)
// kanal(4, 4)
// kanal(4, 5)
// kanal(4, 6)
// kanal(4, 7)


// kanal(5, 1)
// kanal(5, 2)
// kanal(5, 3)
// kanal(5, 4)
// kanal(5, 5)
// kanal(5, 6)
// kanal(5, 7)


// kanal(6, 1)
// kanal(6, 2)
// kanal(6, 3)
// kanal(6, 4)
// kanal(6, 5)
// kanal(6, 6)
// kanal(6, 7)


// kanal(7, 1)
// kanal(7, 2)
// kanal(7, 3)
// kanal(7, 4)
// kanal(7, 5)
// kanal(7, 6)
// kanal(7, 7)


// kanal(8, 1)
// kanal(8, 2)
// kanal(8, 3)
// kanal(8, 4)
// kanal(8, 5)
// kanal(8, 6)
// kanal(8, 7)


// kanal(9, 1)
// kanal(9, 2)
// kanal(9, 3)
// kanal(9, 4)
// kanal(9, 5)
// kanal(9, 6)
// kanal(9, 7)


// kanal(10, 1)
// kanal(10, 2)
// kanal(10, 3)
// kanal(10, 4)
// kanal(10, 5)
// kanal(10, 6)
// kanal(10, 7)


// kanal(11, 1)
// kanal(11, 2)
// kanal(11, 3)
// kanal(11, 4)
// kanal(11, 5)
// kanal(11, 6)
// kanal(11, 7)


// kanal(12, 1)
// kanal(12, 2)
// kanal(12, 3)
// kanal(12, 4)
// kanal(12, 5)
// kanal(12, 6)
// kanal(12, 7)


/*
Import i query z sortowaniem po id programu

mongoimport -h ds163054.mlab.com:63054 -d tvui -c tvui1 -u nabu -p kupa1312 --file 1.json --jsonArray
*/
