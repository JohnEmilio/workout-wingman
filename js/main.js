document.querySelector('#exerciseSearch').addEventListener('click', searchWorkout)
const myKey = config.rapidKey
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
		'X-RapidAPI-Key': myKey
	}
};
let ul = document.querySelector('.exerciseData')
let li
let img
let btn
async function searchWorkout(){
    let exercise = document.querySelector('#exerciseInput').value
    let equipment = document.querySelector('#exerciseEquipment').value
    let exerciseName = ''
    ul.innerHTML = ''
    ul.style.display = 'none'
    exercise = exercise.split(' ').join('%20')
    try{
        let resp = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exercise}`, options)
        if(!resp.ok){
            throw new Error(`HTTP error: ${resp.status}`)
        }
        let json = await resp.json()
        console.log(json)
        json.forEach(el => {
            if(el.equipment == equipment){
                ul.style.display = 'block'
                
                Array.from(document.querySelectorAll('.gifImg')).forEach(el => el.style.display = 'none')
                
                btn = document.createElement('button')
                btn.classList.add('gifBtns')
                btn.innerText = 'Click to see example'
                
                img = document.createElement('img')
                img.classList.add('gifImg')
                img.setAttribute('class', 'image-item')
                img.setAttribute('class', 'hidden')
                img.setAttribute('alt', el.name)
                img.src = el.gifUrl
                // img.style.display = 'none'
                exerciseName = el.name[0].toUpperCase() + el.name.slice(1, el.name.length)
                
                li = document.createElement('li')
                btn.setAttribute('class', 'imgHider')
                li.appendChild(document.createTextNode(exerciseName))
                li.appendChild(btn)
                li.appendChild(img)
                
                ul.appendChild(li)
                
                let btns = Array.from(document.querySelectorAll('.imgHider'))
                btns.forEach(el => { 
                    el.setAttribute('class', 'imgBtn')
                })
                btns.forEach(el => el.addEventListener('click', (e) => {
                console.log(e.target);
                e.target.nextElementSibling.classList.toggle('hidden')
                }))
        }
    })
    }
    catch(error){
        console.log(`Could not fetch results: ${error}`)
    }
    
}


document.querySelector('#quoteOfTheDay').innerHTML = `${localStorage.getItem('quote')}<br>${localStorage.getItem('author')}`
if(localStorage.today != new Date().getDay()){
    document.querySelector('#quoteOfTheDay').innerHTML = ''
    localStorage.author = ''
    localStorage.quote = ''
    getQuote()
}
localStorage.setItem('today', new Date().getDay())
async function getQuote(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'bodybuilding-quotes1.p.rapidapi.com',
            'X-RapidAPI-Key': myKey
        }
    };
    try{
        let resp = await fetch('https://bodybuilding-quotes1.p.rapidapi.com/random-quote', options)
        let json = await resp.json()
        console.log(json)
        let author = await json.author
        let quote = await json.quote
        localStorage.setItem('today', new Date().getDay())
        localStorage.setItem('quote', quote)
        localStorage.setItem('author', author)

        document.querySelector('#quoteOfTheDay').innerHTML = `${localStorage.getItem('quote')} <br>${localStorage.getItem('author')}`
    }
    catch(err){
        console.error(err)
    };
    
};

