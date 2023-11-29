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

        const postTemplate = document.querySelector(".post-template");
        let post = postTemplate.cloneNode(true);
        post.(".form-label")


        viewPosts.appendChild(post);

        // let pathLike = document.createElement('path');
        // pathLike.d = "M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z";
        // let svgLike = document.createElement('svg');
        // svgLike.xmlns = "http://www.w3.org/2000/svg";



    } catch (error) {
        console.log(error);
    }
}
fetchWithToken(API_BASE_URL + '/api/v1/social/posts');
  