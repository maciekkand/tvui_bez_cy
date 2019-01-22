/* const currentDay = Date.now()
const dayStringFull = new Date(currentDay).toDateString()
const dayStringShort = new Date(currentDay).toDateString().slice(4, 10)

const dateFull = new Date(currentDay).toISOString()
const dateShort = new Date(currentDay).toISOString().slice(0, 10)

console.log('dayStringFull = ', dayStringFull)
console.log('dayStringShort = ', dayStringShort)

console.log('currentDay = ', currentDay) // 1548181565740

console.log('dateShort = ', dateShort)
console.log('dateFull = ', dateFull)
 */
const todayMidniteTimestamp = new Date().setUTCHours(0, 0, 0, 0)
console.log('todayMidniteTimestamp = ', todayMidniteTimestamp)

const todayMidniteString = new Date(todayMidniteTimestamp)
console.log('todayMidniteString = ', todayMidniteString)
