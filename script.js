async function getAlerts() {
  const url = 'https://weatherapi-com.p.rapidapi.com/alerts.json?q=Texas';

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'YOUR_KEY_HERE',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getAlerts();
