/**
 * Displays the post with a title, date and image
 * @param {*} post 
 * @returns 
 */

export function generatePostHtml(post) {
    const { title, body, media, id, created } = post;
    const createdDatetime = new Date(created);

    const img = document.createElement('img');
    img.src = media && media.length ? media : "./images/post2.jpg";
    img.classList.add("img-thumbnail");
    img.alt = "Post";

    const label = document.createElement('label');
    label.classList.add("form-label");
    label.innerHTML = title + " - " + `${createdDatetime.getFullYear()}/${createdDatetime.getMonth()+1}/${createdDatetime.getDate()}`;

    const postWrapper = document.createElement("div");
    postWrapper.appendChild(label);
    const a = document.createElement("a");
    a.href = "post.html?id=" + id;
    a.appendChild(img);
    postWrapper.appendChild(a);

    return postWrapper;
}

/**
 * 
 * @param {*} post 
 * @returns 
 */

export function generateFeedPostHtml(post) {
    const postWrapper = generatePostHtml(post);
    postWrapper.classList.add("mb-3");

    const columnCenter = document.createElement("div");
    columnCenter.classList.add("col-md-6");
    columnCenter.classList.add("d-flex");
    columnCenter.classList.add("justify-content-center");
    columnCenter.appendChild(postWrapper);

    const columnLeft = document.createElement("div");
    columnLeft.classList.add("col-md-3");

    const columnRight = document.createElement("div");
    columnRight.classList.add("col-md-3");

    const row = document.createElement("div");
    row.classList.add("row");
    row.appendChild(columnLeft);
    row.appendChild(columnCenter);
    row.appendChild(columnRight);

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-4");
    container.appendChild(row);

    return container;
}
