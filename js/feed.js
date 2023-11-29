const API_BASE_URL = 'https://api.noroff.dev';

async function fetchWithToken(url) {
    try {
        const token = localStorage.getItem('accessToken');
        const getData = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        };
        const response = await fetch(url, getData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        // Logs:
        // 0: {title: 'test', body: 'test', tags: Array(0), media: '', created: '2022-09-18T08:04:05.484Z', …}
        // 1: {title: 'This is a new post', body: 'This is updated text', tags: Array(1), media: 'whatevs', created: '2022-09-17T13:17:01.133Z', …}
        // ... More array values
    } catch (error) {
        console.log(error);
    }
}
fetchWithToken(API_BASE_URL + '/api/v1/social/posts');
  