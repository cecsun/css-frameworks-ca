import { generateFeedPostHtml } from "./generatePostHtml.js";

const API_BASE_URL = 'https://api.noroff.dev';

const viewPosts = document.querySelector(".feed-posts");

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
        const json = await response.json();
        console.log(json);
  

        for (let i = 0; i < json.length; i++) {
            let element = json[i];
            const postWrapper = generateFeedPostHtml(element);
            

            viewPosts.appendChild(postWrapper);
        }

        // viewPosts.appendChild(post);

    } catch (error) {
        console.log(error);
    }
}

fetchWithToken(API_BASE_URL + '/api/v1/social/posts');

// let posts = [];
// const searchInput = document.querySelector('#search-input');

// searchInput.addEventListener('input', () => {
//     displayPosts(posts, filterPostsHandler);
// });

// function filterPostsHandler( post, index ) {
//     if (post.title.toLowerCase().startsWith(searchInput.value.toLowerCase().trim())) {
//         return true;
//     }
// }

// // const postsContainer = document.querySelector('#posts-display');

// // function sortCallback(a, b) {
// //     if (a.title < b.title) {
// //         return -1;
// //     } else if (a.title > b.title) {
// //         return 1;
// //     } 
// //     return 0;
// // }

// async function displayPosts(posts, filterCallback) {
//     postsContainer.textContent = '';
//     posts.filter(filterCallback).sort(sortCallback).forEach((post) => {
//             const currentPost = generatePostHtml(post);
//             postsContainer.appendChild(currentPost);
//         });
// }