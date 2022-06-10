document.querySelector('#exerciseSearch').addEventListener('click', searchWorkout)
const myKey = config.rapidKey
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
		'X-RapidAPI-Key': myKey
	}
};

let exerciseArr = ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist']
let ul = document.querySelector('.exerciseData')
let li
let img
let imgBtn
let addBtn

async function searchWorkout(){
    let exercise = document.querySelector('#exerciseInput').value
    let equipment = document.querySelector('#exerciseEquipment').value
    let exerciseName = ''
    ul.innerHTML = ''
    ul.style.display = 'none'
    
    if(exercise == '' || !exerciseArr.includes(exercise)){
        alert('Please search for a body part listed.')
    }
    else{
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
                
                    imgBtn = document.createElement('button')
                    imgBtn.setAttribute('class', 'imgHider')
                    imgBtn.innerText = 'See example'

                    addBtn = document.createElement('button')
                    addBtn.setAttribute('class', 'addToList')
                    addBtn.innerText = 'Add to list'
                
                    img = document.createElement('img')
                    img.classList.add('gifImg')
                    img.setAttribute('class', 'image-item')
                    img.setAttribute('class', 'hidden')
                    img.setAttribute('alt', el.name)
                    img.src = el.gifUrl
        
                    exerciseName = el.name[0].toUpperCase() + el.name.slice(1, el.name.length)
                    
                    li = document.createElement('li')
                    li.appendChild(document.createTextNode(exerciseName))
                    li.appendChild(imgBtn)
                    li.appendChild(img)
                    li.appendChild(addBtn)
                    
                    ul.appendChild(li)
                    
                    let imgBtns = Array.from(document.querySelectorAll('.imgHider'))

                    imgBtns.forEach(btn => { 
                        btn.setAttribute('class', 'imgBtn')
                    })

                    imgBtns.forEach(btn => btn.addEventListener('click', (e) => {
                        console.log(e.target);
                        e.target.nextElementSibling.classList.toggle('hidden')
                    }))

                    let addBtns = Array.from(document.querySelectorAll('.addToList'))
                    addBtns.forEach(btn => btn.setAttribute('class', 'addBtn'))

                    addBtns.forEach(btn => btn.addEventListener('click', (e) => {
                        let todaysExercise = document.createElement('li')
                        let todaysExerciseList = document.getElementById('todaysExerciseList')

                        todaysExercise.setAttribute('class', 'exercise')
                        todaysExercise.innerText = e.target.parentElement.innerText.slice(0,-22)
                        todaysExerciseList.appendChild(todaysExercise)
                        
                    }))
            }
        })
        }
        catch(error){
            console.log(`Could not fetch results: ${error}`)
        }
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

