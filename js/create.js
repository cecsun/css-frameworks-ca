import { fetchWithToken } from "./fetchWitchToken.js";

const submitNewPostForm = document.querySelector('#submit-new-post-form');

/**
 * A form where you can create a new post
 */

export async function handleAddPost() {
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
    console.log(response);
}

submitNewPostForm.addEventListener('click', async (event) => {
    event.preventDefault();
    await handleAddPost();
    location.reload();
});