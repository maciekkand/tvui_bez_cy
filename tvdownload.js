/* eslint-disable */
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const fileTimeTable = './tv1.json'
//const fileTimeTable = './tv11.json'
const urlPrefix = 'https://programtv.onet.pl/?dzien='

const kanal = (day, page) => {
  const currentDay = Date.now() + day * 1000 * 60 * 60 * 24
  const dayString = new Date(currentDay).toDateString().slice(4, 10)

  const date = new Date(currentDay).toISOString().slice(0, 10)
  const url = `${urlPrefix + day}&strona=${page}`

  axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data)

      for (let channelNo = 1; channelNo < 3; channelNo++) {   // 1-4
        const channel = $(`#boxTVHolder${channelNo}`)
          .find('span.tvName')
          .text()
          .replace(/\t/g, '')
          .replace(/\n/g, '')

        const channels = $(`#boxTVHolder${channelNo} li`)

        channels.each((i, el) => {
          const id = day.toString().padStart(2, '0') + channelNo.toString().padStart(2, '0') + i.toString().padStart(2, '0')
          const time = $(el).find('.hour').text().replace(/\t/g, '').replace(/\n/g, '').split(':')
          //const timestampTodayMidnight = Date.parse (new Date().toISOString().slice(0, 10))

          const timestampTodayMidnight = new Date().setUTCHours(0, 0, 0, 0) + day * 1000 * 60 * 60 * 24

          let hours = time[0]
          let minutes = time[1]
          // tvHour = tvHour < 3 ? tvHour + 24 : tvHour

          const milliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000)

          const timestamp = timestampTodayMidnight + milliseconds + parseInt(Math.random() * 1000)
          const dateTimestamp = new Date(timestamp).toISOString().slice(0, 16).replace('T', ' ')

          const link = 'https://programtv.onet.pl' + $(el).find('.title').find('a').attr('href')
          const title = $(el).find('.title a').text().replace(/\t/g, '').replace(/\n/g, '')
          const type = $(el).find('.type').text().replace(/\t/g, '').replace(/\n/g, '')

          /*
          if (id === '010136' ) {
            const seans = { day, timestampTodayMidnight, timestamp, dateTimestamp, date, hours, minutes, dayString, id, channel, title  }
            fs.writeFileSync(fileTimeTable, `${JSON.stringify(seans)},`)
            return;
          }
          */

          //const seans = { date, day, page, channelNo, channel, hour, title, type }
          const seans = { id, dayString, date, dateTimestamp, hours, minutes, timestamp, channel, title, type, link,  }
          fs.appendFileSync(fileTimeTable, `${JSON.stringify(seans)},\n`)
        })
      }
    })
    .catch(err => console.log('Erorek:', err))
}

const getAllChannels = () => {
  for (let day = 0; day < 8; day++) {      // 0-3
    for (let page = 1; page < 2; page++) { // 1-2
      kanal(day, page)
    }
  }
  console.log('Skończyłem i zapisałem do pliku: ', fileTimeTable)
}

getAllChannels()

// kanal(0, 1)  // day, page


/*
Import i query z sortowaniem po id programu

mongoimport -h ds163054.mlab.com:63054 -d tvui -c tvui1 -u nabu -p kupa1312 --file tv1.json --jsonArray

https://api.mlab.com/api/1/databases/tvui/collections/tvui1?s={id:1}&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI

*/
