import { useState, useEffect } from "react"

const day = new Date().getDate()

function getQuote () {
    if(localStorage.getItem("day") != day){
        localStorage.setItem("day", day)
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0d9f2bfba9msh301dcef72f9f8c6p106322jsn86af5eeabee8',
                'X-RapidAPI-Host': 'bodybuilding-quotes1.p.rapidapi.com'
            }
        };
        fetch('https://bodybuilding-quotes1.p.rapidapi.com/random-quote', options)
            .then(response => response.json())
            .then(response => {
                localStorage.setItem("quote", JSON.stringify(response))
                return response
            })
            .catch(err => console.error(err));
    }
    else {
        const currentQuote = JSON.parse(localStorage.getItem("quote"))
        return currentQuote
    }
}

export default function Footer () {
    const [quote, setQuote] = useState(() => getQuote())

    return (
        <footer>
            <div className="quoteContainer">
                { quote.quote && <p className="quote">{quote.quote}</p> }
                { quote.author && <span className="quoteAuthor">-{quote.author}</span>}
            </div>
        </footer>
    )
}