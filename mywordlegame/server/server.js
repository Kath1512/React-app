const express = require('express')
const path = require('path')
const app = express()

app.use(express.json());
// app.use(cors({origin: 'http://localhost:5173'}))

const API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words'

const fetchWord = async () => {
    try {
        const res = await fetch(API_URL);
        const response = await res.json();
        return response
    }
    catch (err) {
        console.error("Erorr: ", err)
    }
}
app.get('/api/word', (req, res) => {
    fetchWord()
        .then(data => res.json(data))
        .catch(err => console.error('Error fetching: ', err))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Server started at', PORT));