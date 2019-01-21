/* eslint-disable */
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const fileTimeTable = './dzis2kanaly2.json'
const urlPrefix = 'https://programtv.onet.pl/?dzien='

const kanal = (day, page) => {
  const currentDay = Date.now() + day * 1000 * 60 * 60 * 24
  const dayString = new Date(currentDay).toDateString().slice(4, 10)

  console.log('dayString = ', dayString)

  const date = new Date(currentDay).toISOString().slice(0, 10)

  const timestampTodayMidnight = Date.parse (new Date().toISOString().slice(0, 10))

  console.log('date = ', date)
  const url = `${urlPrefix + day}&strona=${page}`

  axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data)

      for (let channelNo = 1; channelNo < 2; channelNo++) {
        const channel = $(`#boxTVHolder${channelNo}`)
          .find('span.tvName')
          .text()
          .replace(/\t/g, '')
          .replace(/\n/g, '')

        const channels = $(`#boxTVHolder${channelNo} li`)

        channels.each((i, el) => {
          const hour = $(el).find('.hour').text().replace(/\t/g, '').replace(/\n/g, '')

          const timestampTodayMidnight = Date.parse (new Date().toISOString().slice(0, 10))

          const hourArr = hour.split(':')
          const milliseconds = hourArr[0] * 60 * 60 * 1000 + hourArr[1] * 60 * 1000
          const timestamp = timestampTodayMidnight + milliseconds

          const dateTimestamp = new Date(timestamp).toISOString()
          //console.log('t = ', t)

          const link = 'https://programtv.onet.pl' + $(el).find('.title').find('a').attr('href')
          const title = $(el).find('.title a').text().replace(/\t/g, '').replace(/\n/g, '')
          const type = $(el).find('.type').text().replace(/\t/g, '').replace(/\n/g, '')

          //const seans = { date, day, page, channelNo, channel, hour, title, type }
          const seans = { dayString, date, channel, hour, title, type, link, timestamp, dateTimestamp }
          fs.appendFileSync(fileTimeTable, `${JSON.stringify(seans)},\n`)
        })
      }
    })
    .catch(err => console.log('Erorek:', err))
}

const getAllChannels = () => {
  for (let day = 0; day < 1; day++) {
    for (let page = 1; page < 2; page++) {
      kanal(day, page)
    }
  }
  console.log('Skończyłem i zapisałem do pliku: ', fileTimeTable)
}

getAllChannels()
