import $ from 'jquery'

$(document).ready(() => {
  getTopWord();
})

const getTopWord = () => {
  let url = `https://wordwatch-api.herokuapp.com/api/v1/top_word`

  return fetch(url)
    .then(response => response.json())
    .then(result => renderTopWord(result))
    .catch(error => console.error({ error }))
}

const renderTopWord = (apiResponse) => {
  let word = Object.keys(apiResponse.word)[0];
  let count = apiResponse.word[word];

  $("#top-word-value").text(word)
  $("#top-word-count").text(count)
}
