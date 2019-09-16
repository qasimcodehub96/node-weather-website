const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mesageOne = document.querySelector('#message-1')
const mesageTwo = document.querySelector('#message-2')

//mesageOne.textContent = 'From JavaScript'



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    mesageOne.textContent = 'Loading...'
    mesageTwo.textContent = ''

    fetch(`http://localhost:3306/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mesageOne.textContent = data.error
            } else {
                mesageOne.textContent = data.location
                mesageTwo.textContent = data.forecast
            }
        })
    })



})