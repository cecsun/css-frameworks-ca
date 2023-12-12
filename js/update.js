import { fetchWithToken } from "./fetchWitchToken.js";

const POSTS_API_URL = `${BASE_API_URL}/social/posts`;

const addPostForm = document.querySelector('#newPost');

const inputTitle = document.querySelector('#inputTitle');
const inputDescription = document.querySelector('#inputDescription');
const inputMedia = document.querySelector('#inputMedia');

export async function handleAddPost() {

}

addPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    handleAddPost();
});