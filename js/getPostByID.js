const API_BASE_URL = 'https://api.noroff.dev';

async function fetchById(id) {
    const token = localStorage.getItem('accessToken');
    const getData = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        let response = await fetch(`${API_BASE_URL}/api/v1/social/posts/${id}`, getData);
        let json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

function getIdParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return {
        id: urlParams.get("id"),
        edit: urlParams.get("edit")
    };
}

let label = document.createElement('label');
let img = document.createElement('img');


async function main() {
    const {id, edit}= getIdParam();
    const shouldEdit = edit === "1"; 
    const post = await fetchById(id);
    console.log(post);
    let postWrapper = document.getElementById('postWrapper');
    label.for = post.title;
    label.classList.add("form-label");
    label.innerHTML = post.title;
    img.src = post.media;
    img.classList.add("img-thumbnail");
    img.alt = "Post";
    postWrapper.appendChild(label);
    postWrapper.appendChild(img);
    if (shouldEdit) {
        const p = document.createElement("p");
        p.innerHTML = "Should Edit me now ";
        postWrapper.appendChild(p);
    }
}

main();