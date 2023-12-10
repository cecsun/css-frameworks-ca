export async function fetchWithToken(url) {
    try {
        const token = localStorage.getItem('accessToken');
        console.log(token);
            const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, getData);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}