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
const audio = document.querySelector('.audio')
const musics = document.querySelectorAll('.music')

const quotation = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')
// slider
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
const BackGround = document.body.style.backgroundImage

const bgNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1
HTMLAudioElement.prototype.stop = function()
{
this.pause();
this.currentTime = 0.0;
}
const quotes = [
    { 
     "quote" : "The only sin is ignorance", 
     "source" : "Christopher Marlowe" 
    },
    {
     "quote" : "A man is his own easiest dupe, for what he wishes to be true he generally believes to be true", 
     "source" : "Demosthenes"
    },
    {
     "quote" : "A lie can travel halfway around the world while the truth is putting on its shoes", 
     "source" : "Mark Twain"
    }
   ]
const lang = navigator.language.split('-')[0]
const musicSRC = ['./assets/sounds/Aqua_Caelestis.mp3', './assets/sounds/Ennio_Morricone.mp3', './assets/sounds/River_Flows_In_You.mp3','./assets/sounds/Summer_Wind.mp3']

const musicQueue = {
    queue: [0, 1, 2 ,3 ],
    enqueueEnd: function(item) {this.queue.push(item);},
    dequeueStart: function() { return this.queue.shift();},
    enqueueStart: function(item) {this.queue.unshift(item);},
    dequeueEnd: function() { return this.queue.pop();},
    state: 'next'
}

const bgQueue = {
    queue: [1, 2 ,3 , 4 ,5 ,6 ,7 ,8 , 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    enqueueEnd: function(item) {this.queue.push(item);},
    dequeueStart: function() { return this.queue.shift();},
    enqueueStart: function(item) {this.queue.unshift(item);},
    dequeueEnd: function() { return this.queue.pop();},
    revers: function(number){
        let item 
        if(this.queue[0] !== number)
            {
                item = this.dequeueStart()
                this.enqueueEnd(item)
                this.revers(number)
            }
        
    }
}


 
const timeOfDay = {
    'en': ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
    'ru': ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи'],
    'pl': ['Добрай раніцы', 'Добры дзень', 'Добры вечар', 'Дабранач'],
    'time':['evening', 'afternoon', 'morning', 'night'],
    'state': 0
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
       

        if(hours >= 6  && hours < 12){
                getTimeOfDay(0)
                if(timeOfDay.state !== 0)
                {changeBG(0)
                    timeOfDay.state = 0}
            }
        else if (hours >= 12  && hours < 18){
            getTimeOfDay(1)
            if(timeOfDay.state !== 1)
            {changeBG(1)
                timeOfDay.state = 1}
        }
        else if (hours >= 18  && hours <= 23){
            getTimeOfDay(2)
            if(timeOfDay.state !== 2)
                    {changeBG(2)
                        timeOfDay.state = 2}
        }
        else if (hours >= 0  && hours < 6){
            getTimeOfDay(3)
            if(timeOfDay.state !== 3)
                    {changeBG(3)
                        timeOfDay.state = 3}
        }
        if(hours === 0)
            getDate()
        if(localStorage.getItem("text") !== document.querySelector('.name').value)
            setTextLocalStorage(document.querySelector('.name').value)
        if(localStorage.getItem("city") !== document.querySelector('.city').value)
            setCityLocalStorage(document.querySelector('.city').value)
    }, 1000)
}
// 
const changeBG =  (item) => {
    if(item === 'slide-prev'){
        let next = bgQueue.dequeueEnd()
        bgQueue.enqueueStart(next)
        }
    if(item === 'slide-next'){ 
        let next = bgQueue.dequeueStart()
        bgQueue.enqueueEnd(next)
        }
        // url('https://raw.githubusercontent.com/kitkant/stage1-tasks/main/images
        
    document.body.style.backgroundImage =   `url('./images/${timeOfDay.time[timeOfDay.state]}/${bgQueue.queue[0]}.webp')`

}
const getTimeOfDay = (e) => greeting.innerHTML = timeOfDay[lang][e]
const setTextLocalStorage = event => localStorage.setItem('text', event)
const setCityLocalStorage = event => localStorage.setItem('city', event)
const getQuotes = () =>{
    let random = quotes[Math.floor(Math.random() * quotes.length)];
    quotation.innerText = `“${random.quote}.”`;
    author.innerText = random.source;
}
const getDate = () =>{
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    mainDate.innerHTML = now.toLocaleDateString(lang, options)
}
const getDateWeater = async () =>{
    await fetch(`http://api.weatherstack.com/current?access_key=bcd4c9e2298e5fe6d8112c0dd5a95dc3&query=${localStorage.getItem("city")}`)
	.then(response => response.json())
	.then(response => {
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
const clearActive = () =>{
    musics.forEach(e =>{
        e.classList.remove('active_music')
    })
    
}
const activeMusic = () =>{
    clearActive()
    musics[musicQueue.queue[0]].classList.add('active_music')
}
const playMusic = () =>{
    audio.play()
    playerIcon[1].classList.remove('play') 
    playerIcon[1].classList.add('pause')
}
const pauseMusic = ( ) =>{
    audio.pause()
    playerIcon[1].classList.add('play') 
    playerIcon[1].classList.remove('pause')
}

function app(){
    document.body.style.backgroundImage = `url('./images/${timeOfDay.time[timeOfDay.state]}/${bgNum}.webp')`
    bgQueue.revers(bgNum)
    getTime()
    musics[0].classList.add('active_music')
    let init = musicQueue.dequeueStart()
    audio.src = musicSRC[init]
    musicQueue.enqueueEnd(init)
    getDate()
    getQuotes()
    textLS.placeholder = "Type name here..";
    textLS.value = localStorage.getItem("text")
    if(localStorage.getItem("city") === '')
        setCityLocalStorage('Minsk')
    textCity.value = localStorage.getItem("city")
    getDateWeater()
   
    playerIcon.forEach((event) =>{
        event.addEventListener('click', (e) =>{
            if(e.target.classList[1] === 'play-prev')
               {
                playMusic()
                let next = musicQueue.dequeueEnd()
                
                if(musicQueue.state === 'next')
                    {   
                        musicQueue.enqueueStart(next)
                        next = musicQueue.dequeueEnd()
                        musicQueue.state = 'prev'
                        
                    }
                    clearActive()
                        musics[next].classList.add('active_music')
                audio.stop()    
                audio.src = musicSRC[next]
                musicQueue.enqueueStart(next)
                audio.play()
               }
            if(e.target.classList[1] === 'play-next')
              { 
                playMusic()
                let next = musicQueue.dequeueStart()
                if(musicQueue.state === 'prev')
                {
                    musicQueue.enqueueEnd(next)
                    next = musicQueue.dequeueStart()
                    musicQueue.state = 'next'
                    
                }
                clearActive()
                    musics[next].classList.add('active_music')
                audio.stop()    
                audio.src = musicSRC[next]
                musicQueue.enqueueEnd(next)
                audio.play()
              }
             
            if(e.target.classList[1] === 'play')
                playMusic()
            else if(e.target.classList[1] === 'pause')
                pauseMusic()
           
        })
    })

}

textCity.addEventListener('change', getDateWeater)
changeQuote.addEventListener('click', getQuotes)
slidePrev.addEventListener('click', (e)=> changeBG(e.target.classList[0]))
slideNext.addEventListener('click', (e)=> changeBG(e.target.classList[0]))
app()
