
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const facebook = document.getElementById('fb');
const twitter = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const preQuote = document.getElementById('pre-quote');
const loader = document.getElementById('loader');


let apiQuote = [];           //use let to initialize the array
                            //set const if we dont want to change the variable
let quote;
const rand = [];
//to show a quote 


function a_new_quote() {
    loading();
    const x = Math.floor(Math.random() * apiQuote.length)
    quote = apiQuote[x];  //call a random element in the array
    author.textContent = quote.author;
    rand.push(x)
   // if (x.text.length > 100)
     //   quoteText.classList.add('long-quote');
    //else {
       // quoteText.classList.remove('long-quote');
    //}

    //set quote, hide loader
    quoteText.textContent = quote.text;
    
    complete();
}

function get_prev_quote() {
    loading();
    quote = apiQuote[rand.slice(-2,-1)];
    author.textContent = quote.author;
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl)        //response variable will fecth apiUrl
        apiQuote = await response.json();           //turn the list of quotes from the website into a json object (array) 
        a_new_quote();
        } catch (error){   //this is to catch error
        alert(error)
        }
}

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;   //meaning that when it is loading, we dont see anything else but loader
}

//hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false; 
}

//post to Facebook
function postOnF() {
    const fUrl = `https://www.facebook.com/dialog/share?text=${quoteText.textContent} - ${author.textContent}app_id=145634995501895&display=popup &href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`;
    window.open(fUrl, '_blank');
}

function tweeting() {
    const fUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}app_id=145634995501895&display=popup &href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`;
    window.open(fUrl, '_blank');
}

newQuote.addEventListener('click', a_new_quote);
preQuote.addEventListener('click', get_prev_quote )
facebook.addEventListener('click',postOnF );
twitter.addEventListener('click',tweeting );


getQuotes();









// function newQuote() {
//     const x = localQuotes[Math.floor(Math.random() * localQuotes.length)];  //call a random element in the array
//     console.log(x);
// }