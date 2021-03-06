import $ from 'jquery'

$(document).ready(() => {
  getTopWord();
  $("#break-down").on("click", () => {submitString()});
})

const getTopWord = () => {
  let url = `https://wordwatch-api.herokuapp.com/api/v1/top_word`

  return fetch(url)
    .then(response => response.json())
    .then(result => renderTopWord(result))
    .catch(error => console.error({ error }))
}

const postString = (string) => {
  let url = `https://wordwatch-api.herokuapp.com/api/v1/words`
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: { value: string } })
  }

  return fetch(url, options)
    .then(response => response.json())
    .then(result => { addWordFeedback(result.message) })
    .catch(error => { addWordFeedback({ error })})
}

const renderTopWord = (apiResponse) => {
  let word = Object.keys(apiResponse.word)[0];
  let count = apiResponse.word[word];

  $("#top-word-value").text(word)
  $("#top-word-count").text(count)
}

async function submitString() {
  let wordArray = parseString($("#word-text-area").val())
  wordArray.forEach(word => {
    postString(word);
  })
  await addWordFeedback($("#word-text-area").val());
  $("#word-text-area").val("");
  getTopWord();
}

const parseString = (string) => {
  let words = string.replace(/[^\w\s]/gi, '');
  return words.trim().split(' ');
}

const addWordFeedback = (string) => {
  $("#add-word-feedback").text(string)
}