/* eslint-disable */
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const fileSave = './tv1.json'
const urlPrefix = 'https://programtv.onet.pl/?dzien='

function categoryCheck(type) {
  /* #region cSpell-disable */

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

  /* #endregion */

  /* #region  */
  if (isKids) {
    return 'dla dzieci'
  } else if (isSport) {
    return 'sport'
  } else if (isNews) {
    return 'wiadomosci'
  } else if (isSerial) {
    return 'serial'
  } else if (isFilm) {
    return 'film'
  } else if (isEntertainment) {
    return 'rozrywka'
  } else return 'inne'
}

/* #endregion */

const changeCategories = () => {
  const data = JSON.parse(fs.readFileSync('./tv1.json'))
  data.map(el => {
    el.category = categoryCheck(el.type)
    fs.appendFileSync('./tvNewCategories.json', JSON.stringify(el) + ',\n')
  })
}

const kanal = (day, page, channelFrom, channelTo) => {
  const url = `${urlPrefix + day}&strona=${page}`
  const config = { headers: { 'User-Agent': 'Mozilla/5.0' } }
  const weekDayNames = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']
  const monthNames = ['Sty', 'Luty', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']


  axios
    .get(url, config)
    //axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data)

      for (let channelNo = channelFrom; channelNo < channelTo + 1; channelNo++) {
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

          let timestamp = timestampTodayMidnight + milliseconds + parseInt(Math.random() * 1000)

          const dateTimestamp = new Date(timestamp)
            .toISOString()
            .slice(0, 16)
            .replace('T', ' ')

          let date = new Date(timestamp).toISOString().slice(0, 10)

          const dayName = weekDayNames[new Date(date).getDay()]
          const dayOfMonth = new Date(date).getDate()
          const monthName = monthNames[new Date(date).getMonth()]
          const dayString = dayName + ', ' + dayOfMonth + ' ' + monthName

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
    })
    .catch(err => {
      fs.appendFileSync(fileSave, err)
      //console.log('Erorek:', err))
    })
}

/*
  Najpierw poszły 4 całe dni, ale potem blokowało mnie
  nawet gdy ścigałem po 1 dniu. Nie pomogła poniższa pętla opóźniająca
  nawet ustawiona na 3s opóźnienie (i=20).
  Pomógł restart smarka, bo złapał nowe IP i ściaganie po 1 dniu
  przy opóźnieniu = 400 ms (i=3)
*/

function delay(day, page, a, b) {
  console.time()
  const rand = Math.round(Math.random() * a + b)
  console.log('day = ' + day + ' page = ' + page + '  rand = ' + rand)
  for (let i = rand * 1e8; i > 0; i--) {}
  console.timeEnd()
}

const getAllChannels = () => {
  for (let day = 6; day < 7; day++) {
    // 0 < 7 - źle, 0-5 ?
    //delay(day, 200, 200)
    for (let page = 1; page < 8; page++) { // 1-7 (czyli < 8)
      delay(day, page, 20, 20)
      kanal(day, page, 1, 20) // 1, 20
    }
  }
  console.log('Skończyłem i zapisałem do pliku: ', fileSave)
}

//changeCategories()

getAllChannels()

/*
Import i query z sortowaniem po id programu

mongoimport -h ds163054.mlab.com:63054 -d tvui -c tvui1 -u nabu -p kupa1312 --file tv1.json --jsonArray

https://api.mlab.com/api/1/databases/tvui/collections/tvui1?s={id:1}&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI

mongoimport --db local --collection tv1 --type json --file tv1.json -h 127.0.0.1:27017 --jsonArray


UWAGA !!
  Jeśli upload się wywala, odszukaj nr rekordu którym wymienia, i wytnij komunikat o błędzie ('Error ...)
  Przy ściaganiu po 1 dniu, ten problem nie wystepuje (może chrome nie zamyka połączenia i stąd mimo delaya, server wie że to cały czas ta pijawa)
*/
