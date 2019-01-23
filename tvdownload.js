/* eslint-disable */
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

// const fileTimeTable = "./tv1.json";
const fileTimeTable = './tv11.json'
const urlPrefix = "https://programtv.onet.pl/?dzien=";

function categoryCheck(type) {
  const arraySerial = ["serial"];
  const arrayTelenowela = ["telenowela"];
  const arrayFilm = ["film", "komedi", "dramat", "horror", "thriller"];
  const arrayEntertainment = ["rozrywk", "teleturniej", "show", "muzycz"];
  const arrayNews = ["informac", "publicysty"];
  const arraySport = ["sport"];

  const isFilm = arrayFilm.map(el => type.includes(el)).includes(true);
  const isSerial = arraySerial.map(el => type.includes(el)).includes(true);
  const isTelenowela = arrayTelenowela.map(el => type.includes(el)).includes(true);
  const isEntertainment = arrayEntertainment.map(el => type.includes(el)).includes(true);
  const isSport = arraySport.map(el => type.includes(el)).includes(true);
  const isNews = arrayNews.map(el => type.includes(el)).includes(true);

  /* #region  */

  if (isSerial) {
    return "serial";
  } else if (isTelenowela) {
    return "telenowela"
  } else if (isFilm) {
    return "film"
  } else if (isEntertainment) {
    return "rozrywka";
  } else if (isSport) {
    return "sport";
  } else if (isNews) {
    return "wiadomosci";
  } else return "inne";
}
/* #endregion */

const kanal = (day, page) => {
  const currentDay = Date.now() + day * 1000 * 60 * 60 * 24;
  const dayString = new Date(currentDay).toDateString().slice(4, 10);

  const date = new Date(currentDay).toISOString().slice(0, 10);
  const url = `${urlPrefix + day}&strona=${page}`;

  console.log('day = ', day + '  date = ' + date + '  dayString = ', dayString)

  /* #region  */
  //*
  axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data)

      for (let channelNo = 1; channelNo < 21; channelNo++) { // 1-4
        const channel = $(`#boxTVHolder${channelNo}`)
          .find('span.tvName')
          .text()
          .replace(/\t/g, '')
          .replace(/\n/g, '')

        const channels = $(`#boxTVHolder${channelNo} li`)

        channels.each((i, el) => {
          const id = day.toString().padStart(2, '0') + channelNo.toString().padStart(2, '0') + i.toString().padStart(2, '0')
          const time = $(el).find('.hour').text().replace(/\t/g, '').replace(/\n/g, '').split(':')
          const timestampTodayMidnight = new Date().setUTCHours(0, 0, 0, 0) + day * 1000 * 60 * 60 * 24

          let hours = time[0]
          let minutes = time[1]
          // tvHour = tvHour < 3 ? tvHour + 24 : tvHour

          const milliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000)
          const timestamp = timestampTodayMidnight + milliseconds + parseInt(Math.random() * 1000)
          const dateTimestamp = new Date(timestamp).toISOString().slice(0, 16).replace('T', ' ')

          const link = '<a href=\"https://programtv.onet.pl' + $(el).find('.title').find('a').attr('href') + '\">Link</a>'
          const title = $(el).find('.title a').text().replace(/\t/g, '').replace(/\n/g, '')
          const type = $(el).find('.type').text().replace(/\t/g, '').replace(/\n/g, '')

          const category = categoryCheck(type)

          /* const seans = {
            id,
            channel,
            dayString,
            time: hours + ':' + minutes,
            date,
            title,
            category,
            type,
            dateTimestamp,
            timestamp,
            link
          } */

          const seans = { channel }

          fs.appendFileSync(fileTimeTable, `${JSON.stringify(seans)},\n`)
        })
      }
    })
    .catch(err => console.log('Erorek:', err))
};

const getAllChannels = () => {
  for (let day = 0; day < 1; day++) { // 0-3
    for (let page = 1; page < 8; page++) { // 1-2
      kanal(day, page)
    }
  }
  console.log("Skończyłem i zapisałem do pliku: ", fileTimeTable);
};

getAllChannels();

// kanal(0, 1)  // day, page

/*
Import i query z sortowaniem po id programu

mongoimport -h ds163054.mlab.com:63054 -d tvui -c tvui1 -u nabu -p kupa1312 --file tv1.json --jsonArray

https://api.mlab.com/api/1/databases/tvui/collections/tvui1?s={id:1}&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI

mongoimport --db local --collection tv1 --type json --file tv1.json -h 127.0.0.1:27017 --jsonArray

*/
