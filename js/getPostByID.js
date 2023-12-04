async function fetchById(id) {
    const getData = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        let response = await fetch(`${API_BASE_URL}/social/posts/${id}`, getData);
        let json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}