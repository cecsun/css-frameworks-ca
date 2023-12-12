import { generateFeedPostHtml } from "./generatePostHtml.js";
import { fetchWithToken } from "./fetchWitchToken.js";
// import { handleAddPost } from "./create.js";
const API_BASE_URL = 'https://api.noroff.dev';

const viewPosts = document.querySelector(".feed-posts");

const searchFormSubmit = document.querySelector("#search-submit")
searchFormSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const search = document.forms["search-form"]["search"].value;
    // Clear previous posts displayed on page 
    viewPosts.innerHTML = "";

    // Filter by search term. Only true cases remains in resulting array
    const postDataFiltered = postDatas.filter((post) => post.title.toLowerCase().startsWith(search.toLowerCase().trim()));

    // Sort alphabetically 
    const postDataFilteredSorted = postDataFiltered.sort((postA,postB) => postA.title > postB.title);

    for (const post of postDataFilteredSorted) {
        viewPosts.appendChild(generateFeedPostHtml(post));
    }
});


const sortNewButton = document.getElementById("sort-new");
sortNewButton.addEventListener("click", async (event) => {
    event.preventDefault();
    viewPosts.innerHTML = "";
    const postDataSorted = postDatas.sort((postA, postB) => {
        return postA.created < postB.created;
    });
    for (const post of postDataSorted) {
        viewPosts.appendChild(generateFeedPostHtml(post));
    }
});

const sortOldButton = document.getElementById("sort-old");
sortOldButton.addEventListener("click", async (event) => {
    event.preventDefault();
    viewPosts.innerHTML = "";
    const postDataSorted = postDatas.sort((postA, postB) => {
        return postA.created > postB.created;
    });
    for (const post of postDataSorted) {
        viewPosts.appendChild(generateFeedPostHtml(post));
    }
});

let postDatas = undefined;

async function main() {
    postDatas = await fetchWithToken(API_BASE_URL + '/api/v1/social/posts?_author=true', {method: "GET"});
    console.log(postDatas)
    for (const post of postDatas) {
        const postWrapper = generateFeedPostHtml(post);
        viewPosts.appendChild(postWrapper);
    }
}

main();