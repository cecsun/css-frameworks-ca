export async function fetchWithToken(url, options) {
    try {
        const token = localStorage.getItem('accessToken');
        const options_with_auth = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch(url, options_with_auth);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}