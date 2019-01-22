const arr = [
  { name: '001', age: 1 },
  { name: '100', age: 3 },
  { name: '010', age: 2 }
]
console.log ('arr PRZED =', arr)

const arrByAge = arr.sort ((a, b) => a.age - b.age ) // liczby

console.log ('\narrByAge = ', arrByAge)

const arrByName = arr.sort((a, b) => a.name.localeCompare(b.name)) // stringif

console.log ('\narrByName = ', arrByName)

