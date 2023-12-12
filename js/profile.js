import { fetchWithToken } from "./fetchWitchToken.js";


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

    const editButton = document.createElement("h1");
    editButton.innerHTML = "Edit";
    const aEditButton = document.createElement("a");
    aEditButton.href = `post.html?id=${id}&edit=1`;
    aEditButton.appendChild(editButton);
    div.appendChild(aEditButton);

    // <button type="submit" class="btn btn-light text-uppercase float-end" id="submit-edit-post-form">Update</button>
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

    div.appendChild(deleteButton);
    container.appendChild(div);
}

main();