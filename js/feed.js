const API_BASE_URL = 'https://api.noroff.dev';

// const json = response.json();
// console.log(json);

const viewPosts = document.querySelector(".feed-posts");


// json.forEach((postData) => {
//     let postElement = postTemplate.cloneNode(true);

//     postElement.querySelector(".form-label").innerText = postData.title;
//     postElement.querySelector(".img-thumbnail").innerText = postData.media;

//     viewPosts.appendChild(postElement);
// });

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
            let media = element.media;
            if (media == null || media == "") {
                continue;
            }
            let title = element.title;
            const postTemplate = document.querySelector(".post-template");
            let post = postTemplate.cloneNode(true);
            let img = post.querySelector("img");
            img.src = media;
            let username = post.querySelector("label");
            username.innerHTML = title;
            let a = post.querySelector("a");
            a.href = "post.html?id=" + element.id;

            // post.style.display = "unset";
            viewPosts.appendChild(post);
        }

    

        


        // const postMedia = post.querySelector(".img-thumbnail");
        // let media = postMedia.cloneNode(true);


        
        viewPosts.appendChild(post);

    } catch (error) {
        console.log(error);
    }
}
fetchWithToken(API_BASE_URL + '/api/v1/social/posts');
  