import { fetchWithToken } from "./fetchWitchToken.js";

const submitNewPostForm = document.querySelector('#submit-new-post-form');

/**
 * Creates and performs post request based on data of new post form
 * @returns the request response
 */
async function createPostRequest() {
    const BASE_API_URL = 'https://api.noroff.dev';
    const POSTS_API_URL = `${BASE_API_URL}/api/v1/social/posts`;
    const post = {
        title: document.forms["new-post-form"]["inputTitle"].value,
        body: document.forms["new-post-form"]["inputDescription"].value,
        media: document.forms["new-post-form"]["inputMedia"].value,
        tags: [localStorage.getItem("email")],
    }
    const response = await fetchWithToken(
        POSTS_API_URL, 
        { method: 'POST', body: JSON.stringify(post) }, 
    );
    return response;
}

submitNewPostForm.addEventListener('click', async (event) => {
    event.preventDefault();
    const response = await createPostRequest();
    location.reload();
});