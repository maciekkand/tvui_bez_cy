/* eslint-disable */
export default (text) => {
  const templateParams = {
    name: 'James',
    notes: text,
  }

  emailjs.send('gmail', 'tv', templateParams)
    .then(res => {
      console.log('SUCCESS!', res.status, res.text)
    })
    .catch(err => console.log('EMAIL FAILED:', err))
}
