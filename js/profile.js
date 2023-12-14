import { fetchWithToken } from "./fetchWitchToken.js";

/**
 * Displays the posts on the profile page of the logged in user
 */

async function main() {

    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    const username = document.getElementById("username");
    username.innerHTML = name;


    const API_BASE_URL = 'https://api.noroff.dev';
    const postDatas = await fetchWithToken(API_BASE_URL + `/api/v1/social/posts?_author=true&limit=4` +"&_tag=" + email);
    console.log(postDatas);

    for (const post of postDatas) {
        createProfilePost(post);
    }
}

const container = document.querySelector("#post-container");

/**
 * The user can create a post, and also edit and delete the post on their profile page
 * @param {*} post 
 */

function createProfilePost(post) {
    const { title, media, id } = post;

    const img = document.createElement("img");
    img.src = media && media.length ? media : "images/post2.jpg";
    img.classList.add("img-thumbnail")
    img.alt = "post";

    const a = document.createElement("a");
    a.href = `post.html?id=${id}`;
    a.appendChild(img);

    const div = document.createElement("div");
    div.classList.add("col-lg-3");

    div.appendChild(a)

    const buttonContainer = document.createElement("div");

    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";
    const editButton = document.createElement("button");
    editButton.type = "submit";
    editButton.classList.add("btn");
    editButton.classList.add("btn-light");
    editButton.classList.add("text-uppercase");
    editButton.classList.add("float-end");
    editButton.id = "submit-edit-post";
    editButton.innerHTML = "Edit";
    editButton.addEventListener("click", async (event) => {
        event.preventDefault();
        window.location = `post.html?id=${id}&edit=1`;
    });

    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "submit";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-light");
    deleteButton.classList.add("text-uppercase");
    deleteButton.classList.add("float-end");
    deleteButton.id = "submit-delete-post";
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const API_BASE_URL = 'https://api.noroff.dev';
        await fetchWithToken(API_BASE_URL + `/api/v1/social/posts/${id}`, { method: "DELETE"});
        location.reload();
    });

    buttonContainer.appendChild(deleteButton);
    div.appendChild(buttonContainer);
    container.appendChild(div);
}

main();