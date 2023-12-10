import { generateFeedPostHtml } from "./generatePostHtml.js";

const API_BASE_URL = 'https://api.noroff.dev';

const viewPosts = document.querySelector(".feed-posts");

const searchFormSbumit = document.querySelector("#search-submit")
searchFormSbumit.addEventListener("click", async (event) => {
    event.preventDefault();
    const search = document.forms["search-form"]["search"].value;
    console.log(search);
    console.log(postDatas);

    viewPosts.innerHTML = "";

    const postDataFiltered = postDatas.filter((post) => post.title.toLowerCase().startsWith(search.toLowerCase().trim()));

    const postDataFilteredSorted = postDataFiltered.sort((postA,postB) => postA.title > postB.title);

    console.log(postDataFilteredSorted);

    for (const post of postDataFilteredSorted) {
        viewPosts.appendChild(generateFeedPostHtml(post));
    }
});


let postDatas = undefined;

async function fetchWithToken(url) {
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
        console.log(response);
        postDatas = await response.json();
        console.log(postDatas);
  

        for (const post of postDatas) {
            const postWrapper = generateFeedPostHtml(post);
            viewPosts.appendChild(postWrapper);
        }

    } catch (error) {
        console.log(error);
    }
}

fetchWithToken(API_BASE_URL + '/api/v1/social/posts');