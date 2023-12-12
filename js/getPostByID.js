import { fetchWithToken } from "./fetchWitchToken.js";
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

const editPostForm = document.getElementById("edit-post-form");


const submitEditFormPost = document.getElementById("submit-edit-post-form");
submitEditFormPost.addEventListener("click", async (event) => {
    const {id} = getIdParam();
    event.preventDefault();
    const BASE_API_URL = 'https://api.noroff.dev';
    const POSTS_API_URL = `${BASE_API_URL}/api/v1/social/posts/${id}`;
    const post = {
        title: document.forms["edit-post-form"]["inputTitle"].value,
        body: document.forms["edit-post-form"]["inputDescription"].value,
        media: document.forms["edit-post-form"]["inputMedia"].value,
        tags: [localStorage.getItem("email")],
    };
    const response = await fetchWithToken(
        POSTS_API_URL, 
        { method: 'PUT', body: JSON.stringify(post) }, 
    );
    console.log(response);
    location.reload();
});

async function main() {
    const {id, edit}= getIdParam();
    const shouldEdit = edit === "1"; 
    const post = await fetchById(id);
    const { title, media, body } = post;
    console.log(post);
    let postWrapper = document.getElementById('postWrapper');
    if (shouldEdit) {
        editPostForm.style.display = "block";
        const inputTitle = document.getElementById("inputTitle");
        inputTitle.value = title;

        const inputDescription = document.getElementById("inputDescription");
        inputDescription.value = body

        const inputMedia = document.getElementById("inputMedia");
        inputMedia.value = media;
        // return;
    }
    label.for = title;
    label.classList.add("form-label");
    label.innerHTML = title;
    img.src = media && media.length ? media : "/images/post2.jpg";
    img.classList.add("img-thumbnail");
    img.alt = "Post";
    postWrapper.appendChild(label);
    postWrapper.appendChild(img);

}

main();