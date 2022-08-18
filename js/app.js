const time = document.querySelector('.time')
const mainDate = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const textLS = document.querySelector('.name')
const lang = navigator.language.split('-')[0]
const timeOfDay = {
    'en': ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
    'ru': ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи'],
    'pl': ['Добрай раніцы', 'Добры дзень', 'Добры вечар', 'Дабранач']
}

const getTime = () =>{
    setInterval(()=>{
        const now = new Date();
        const text = document.querySelector('.name').value
      
        
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
        if(localStorage.getItem("text") !== text)
            setLocalStorage(text)
    }, 1000)
}

const getTimeOfDay = (e) => greeting.innerHTML = timeOfDay[lang][e] 

const setLocalStorage = event =>{
    localStorage.setItem('text', event)
    console.log('complete', localStorage.getItem("text"))
}

const getDate = () =>{
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    mainDate.innerHTML = now.toLocaleDateString(lang, options)
}

function app(){
    getTime()
    getDate()
    textLS.placeholder = "Type name here..";
    textLS.value = localStorage.getItem("text")
}
app()