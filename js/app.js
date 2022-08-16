const time = document.querySelector('.time')
const mainDate = document.querySelector('.date')
const d = new Date()
 


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
        if(hours === 0)
            getDate()
    }, 1000)
}
const getDate = () =>{
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    mainDate.innerHTML = d.toLocaleDateString( 'en',options)
}
function app(){
    getTime()
    getDate()
}
app()