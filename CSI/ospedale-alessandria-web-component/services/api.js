export const getFetch = async (url, type) => {
  try {
    const response = await fetch(url, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (type && type == 'text') {
      return await response.text();
    }
    else {
      return await response.json();
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const postFetch = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error('Errore nell\'invio del form.');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}