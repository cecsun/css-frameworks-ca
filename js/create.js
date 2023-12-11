import { fetchWithToken } from "./fetchWitchToken";

const POSTS_API_URL = `${BASE_API_URL}/social/posts`;

const addPostForm = document.querySelector('#newPost');

const title = document.querySelector('#inputTitle');
const body = document.querySelector('#inputDescription');
// const media = document.querySelector('#inputMedia');

async function handleAddPost() {
    const post = {
        title: inputTitle.value,
        body: inputDescription.value,
    }
    const response = await fetchWithToken(
        POSTS_API_URL, 
        { method: 'POST', body: JSON.stringify(post) }, 
        true,
    );
    console.log(response);
}

addPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    handleAddPost();
});

export { handleAddPost };