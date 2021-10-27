const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden= true;
}
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}
//Show new Quote
function newQuote() {
    showLoadingSpinner();
   // Pick a random quote from apiQuotes array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
 // Check if Author field is blank
 if (!quote.author) {
     authorText.textContent = 'Unknown';
 } else {
authorText.textContent = quote.author;
 }
 // Check Qoute length
 if (quote.text.length > 120) {
     quoteText.classList.add('long-quote');
 } else {
quoteText.classList.remove('long-quote'); 
 }
   quoteText.textContent = quote.text;
   removeLoadingSpinner();
}

// Get Qoutes from API 
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
     newQuote();

    } catch (error) {
        //Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl=`https://twitter.com/internet/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
    window.open(twitterUrl, '_blank');
}
// Event Listenner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//getQuotes();
getQuotes();