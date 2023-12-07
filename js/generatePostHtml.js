export function generatePostHtml(post, addAnchor=false) {
    const { title, body, media, id } = post;

    const img = document.createElement('img');
    img.src = media;
    img.classList.add("img-thumbnail");
    img.alt = "Post";

    const label = document.createElement('label');
    label.classList.add("form-label");
    label.innerHTML = title;

    const postWrapper = document.createElement("div");
    postWrapper.appendChild(label);
    if (addAnchor) {
        const a = document.createElement("a");
        a.href = "post.html?id=" + id;
        a.appendChild(img);
        postWrapper.appendChild(a);
    } else {
        postWrapper.appendChild(img);
    }
    return postWrapper;
}


export function generateFeedPostHtml(post) {
    const postWrapper = generatePostHtml(post, true);
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


{/* <div class="container my-4 post-template">
    <div class="row">
        <div class="col-md-3"></div>
            <div class="col-md-6 d-flex justify-content-center">
                <div class="mb-3">
                    <label for="username" class="form-label"><i class="bi bi-person-circle"></i>Username</label>
                    <a href=""><img src="" class="img-thumbnail" alt="post"></a>
                </div>
            </div>
        <div class="col-md-3"></div>
    </div>
</div> */}