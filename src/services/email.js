/* eslint-disable */
export default (text) => {
  const params = {
    notes: text
  }

  emailjs.send('gmail', 'tv', params)
    .then(res => {
      console.log('SUCCESS!', res.status, res.text)
    })
    .catch(err => console.log('EMAIL FAILED:', err))
}
