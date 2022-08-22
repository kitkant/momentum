const time = document.querySelector('.time')
const mainDate = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const textLS = document.querySelector('.name')
const textCity = document.querySelector('.city')
//Weather

const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const weatherError = document.querySelector('.weather-error')

//Audio
const playerIcon = document.querySelectorAll('.player-icon')

const lang = navigator.language.split('-')[0]

const musicQueue = {
    queue: [0, 1, 2, 3],
    enqueue: function(item) {this.queue.push(item);},
    dequeue: function() { return this.queue.shift();}
}

const timeOfDay = {
    'en': ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
    'ru': ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи'],
    'pl': ['Добрай раніцы', 'Добры дзень', 'Добры вечар', 'Дабранач']
}

const APIKEY = 'bcd4c9e2298e5fe6d8112c0dd5a95dc3'
const getTime = () =>{
    setInterval(()=>{
        const now = new Date();
      
      
        
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
    
        const formatted = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
          ].join(':');
          
        time.innerHTML = formatted
       

        if(hours >= 6  && hours < 12)
            getTimeOfDay(0)
        else if (hours >= 12  && hours < 18)
            getTimeOfDay(1)
        else if (hours >= 18  && hours <= 23)
            getTimeOfDay(2)
        else if (hours >= 0  && hours < 6)
            getTimeOfDay(3)
        if(hours === 0)
            getDate()
        if(localStorage.getItem("text") !== document.querySelector('.name').value)
            setTextLocalStorage(document.querySelector('.name').value)
        if(localStorage.getItem("city") !== document.querySelector('.city').value)
            setCityLocalStorage(document.querySelector('.city').value)
    }, 1000)
}

const getTimeOfDay = (e) => greeting.innerHTML = timeOfDay[lang][e] 

const setTextLocalStorage = event => localStorage.setItem('text', event)
const setCityLocalStorage = event => localStorage.setItem('city', event)

const getDate = () =>{
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    mainDate.innerHTML = now.toLocaleDateString(lang, options)
}

const getDateWeater = () =>{
    fetch(`http://api.weatherstack.com/current?access_key=bcd4c9e2298e5fe6d8112c0dd5a95dc3&query=${localStorage.getItem("city")}`)
	.then(response => response.json())
	.then(response => {
        
        console.log(response)
        weatherError.innerHTML = ''
        weatherIcon.src = response.current.weather_icons[0]
        temperature.innerHTML = response.current.temperature + '°C'
        weatherDescription.innerHTML = response.current.weather_descriptions[0]
        wind.innerHTML = 'Wind speed: ' + response.current.wind_speed + 'm/s'
        humidity.innerHTML = 'Humidity: ' + response.current.humidity + '%'
    })
	.catch(err => {
        weatherIcon.src = ''
        temperature.innerHTML = ''
        weatherDescription.innerHTML = ''
        wind.innerHTML = ''
        humidity.innerHTML = ''
        weatherError.innerHTML = `Error! city not found for '${textCity.value}'!`
    });
}

const playMusic = ( ) =>{

}
const pauseMusic = ( ) =>{

}

function app(){
   
    getTime()
    getDate()
    textLS.placeholder = "Type name here..";
    textLS.value = localStorage.getItem("text")
    if(localStorage.getItem("city") === '')
        setCityLocalStorage('Minsk')
    textCity.value = localStorage.getItem("city")
    getDateWeater()
   
    playerIcon.forEach((event) =>{
        event.addEventListener('click', e =>{
           
            if(e.target.classList[1] === 'play')
            { 
                e.target.classList.remove('play') 
                e.target.classList.add('pause')
            } else if(e.target.classList[1] === 'pause')
            {
                e.target.classList.add('play') 
                e.target.classList.remove('pause')
            }
        })
    })

}

textCity.addEventListener('change', getDateWeater)


app()
