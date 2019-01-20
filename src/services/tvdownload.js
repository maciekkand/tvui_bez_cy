const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const fileChannels = './channels.json'
const fileTimeTable = './timeTableTop10.json'
const urlPrefix = 'https://programtv.onet.pl/?dzien='

const listaKanalow = () => {
  const listaKanalow = []

  fs.writeFileSync(fileChannels, '')

  axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data)
      for (let index = 1; index < 21; index++) {
        const stacja = $(`#boxTVHolder${index}`)
          .find('.tvName')
          .text()
          .replace(/\t/g, '')
          .replace(/\n/g, '')

        console.log('stacja =', stacja)
        listaKanalow.push(stacja)
      }

      fs.appendFileSync(fileChannels, JSON.stringify(listaKanalow))
    })

    .catch(err => console.log('Erorek:', err))
}

const kanal = (day, page) => {
//const kanal = () => {
  const currentDay = Date.now() + day * 1000 * 60 * 60 * 24
  const date = new Date(currentDay).toDateString().slice(0, 10)
  console.log('date = ', date)
  const url = `${urlPrefix + day}&strona=${page}`

  //fs.writeFileSync(fileTimeTable, '')

  axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data)

      for (let channelNo = 1; channelNo < 21; channelNo++) {
        const channelName = $(`#boxTVHolder${channelNo}`)
          .find('span.tvName')
          .text()
          .replace(/\t/g, '')
          .replace(/\n/g, '')

        console.log('day = ', `${day} page = ${page} channel = `, channelNo)

        const channels = $(`#boxTVHolder${channelNo} li`)

        channels.each((i, el) => {
          const hour = $(el).find('.hour').text().replace(/\t/g, '')
            .replace(/\n/g, '')
          const title = $(el).find('.title a').text().replace(/\t/g, '')
            .replace(/\n/g, '')
          const type = $(el).find('.type').text().replace(/\t/g, '')
            .replace(/\n/g, '')

          //const seans = { date, day, page, channelNo, channelName, hour, title, type }
          const seans = {
            date, channelName, hour, title, type
          }

          fs.appendFileSync(fileTimeTable, `${JSON.stringify(seans)},\n`)
        })
      }
    })
    .catch(err => console.log('Erorek:', err))
}

const listaProgramow = () => {
  for (let index = 1; index < 3; index++) {
    kanal(url, `TV${index}`)
  }
}

const getAllChannels = () => {
  for (let day = 0; day < 7; day++) { // 6  7    0-7
    for (let page = 0; page < 1; page++) { // 7  4-7  5-5 6-6
      kanal(day, page)
    }
  }
}

getAllChannels()
