console.log('Client side Javascript is loaded')


const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#one')
const messageTwo = document.querySelector('#two')



weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading Message'
    messageTwo.textContent = ''

    fetch("http://localhost:3000/weather?address="+ location).then((res) => {
    res.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
        }
    })
})

   
})