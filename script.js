async function qshare(quote) {
  try {
    const shareData = {
      title: 'Quotes',
      text: quote,
    }
    await navigator.share(shareData)
  } catch (e) {
    console.log('error')
  }
}
function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s]
  })
}

function hcategory(category) {
  const apiKey = 'Z3Y2fXDC/pfCWw3QzdWYIQ==1q7jD6mOvzNzwnz9'
  let apiUrl = ''
  if (category.length === 0) {
    apiUrl = 'https://api.api-ninjas.com/v1/quotes'
  } else {
    apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=' + category
  }
  const newsList = document.getElementById('list')
  const requestOptions = {
    method: 'GET',
    headers: {
      'X-Api-Key': 'Z3Y2fXDC/pfCWw3QzdWYIQ==1q7jD6mOvzNzwnz9',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  }
  document.getElementById('grid').innerHTML = ''
  for (let i = 0; i < 10; i++) {
    fetching()
  }
  function fetching() {
    try {
      fetch(apiUrl, requestOptions)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          data = data[0]
          // let q = data.quote.replace(/(['"])/g, '\\$1')
          document.getElementById('grid').innerHTML += `
        <div class="details" id="q-details" onclick="qshare('${data.quote.replace(
          /'/g,
          "\\'",
        )}')">
      <h3 id="q-author" class="text-xl font-bold">${data.author}</h3>
      <p id="q-quotes">${data.quote}</p>
      <p id="q-category" class="font-semibold">${data.category}</p>
    </div>
        `
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } catch (e) {
      console.log('catch failed')
    }
  }
}

hcategory('')
