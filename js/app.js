const time = document.querySelector('.time')
const mainDate = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const textLS = document.querySelector('.name')
const textCity = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon')
const lang = navigator.language.split('-')[0]
const timeOfDay = {
    'en': ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
    'ru': ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи'],
    'pl': ['Добрай раніцы', 'Добры дзень', 'Добры вечар', 'Дабранач']
}
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '88ac635dd6msh5e71c8b0bc6ad3ep1d67cajsnf9070ab93bf8',
		'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
	}
};


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

const setTextLocalStorage = event =>{
    localStorage.setItem('text', event)
    console.log('complete text', localStorage.getItem("text"))
}
const setCityLocalStorage = event =>{
    localStorage.setItem('city', event)
    console.log('complete city', localStorage.getItem("city"))
}

const getDate = () =>{
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    mainDate.innerHTML = now.toLocaleDateString(lang, options)
}

function app(){
    fetch('http://api.weatherstack.com/current?access_key=bcd4c9e2298e5fe6d8112c0dd5a95dc3&query=Minsk')
	.then(response => response.json())
	.then(response => {
        
        console.log(response.current.weather_descriptions[0])
        if(response.current.weather_descriptions[0] === "Sunny")
            weatherIcon.classList.add('owf-800')
    })
	.catch(err => console.error(err));


    getTime()
    getDate()
    textLS.placeholder = "Type name here..";
    textLS.value = localStorage.getItem("text")
    textCity.value = "Minsk"
    
}
app()