import fetch from 'cross-fetch';

export const postJSON = async (endpoint, body, headers = {}) => (
   fetch(`${process.env.API_URL}/${endpoint}`, {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        headers: {
            ...headers,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    })
);

export const getJSON = async (endpoint, headers = {}) => (
   fetch(`${process.env.API_URL}/${endpoint}`, {
        credentials: 'include',
        method: 'GET',
        mode: 'cors',
        headers: {
            ...headers,
            Accept: 'application/json',
        },
    })
);

export const awaitJSON = async (promise) => {
  const result = await promise;
  const json = await result.json();

  if (result.status >= 200 && result.status < 300) {
    return json;
  } else {
    const err = new Error(`HTTP ${json.error.statusCode}: ${json.error.message}`);
    throw err;
  }
};