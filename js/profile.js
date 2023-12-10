import { fetchWithToken } from "./fetchWitchToken.js";


async function main() {

    const name = localStorage.getItem('name');
    const API_BASE_URL = 'https://api.noroff.dev';
    const postDatas = await fetchWithToken(API_BASE_URL + `/api/v1/social/posts?_author=true&limit=4` /*+"&_tag=" + name*/);
    console.log(postDatas);

    for (const post of postDatas) {
        createProfilePost(post);
    }
}


const container = document.querySelector("#post-container");

function createProfilePost(post) {
    const { title, media, id } = post;

    const img = document.createElement("img");
    img.src = media.length ? media : "images/post2.jpg";
    img.classList.add("img-thumbnail")
    img.alt = "post";

    const a = document.createElement("a");
    a.href = `post.html?id=${id}&edit=1`;
    a.appendChild(img);

    const div = document.createElement("div");
    div.classList.add("col-lg-3");

    div.appendChild(a)
    // container.appendChild(a);

    container.appendChild(div);
}

main();