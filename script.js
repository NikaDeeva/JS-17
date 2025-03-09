"use strict";
class NewApiService {
    constructor() {
        this.page = 1;
    }

    fetchArticles() {
        console.log("Actual page:", this.page);
        const url = `https://pixabay.com/api/?key=49254268-45b5e08446b5492288f1f5615&per_page=10&page=${this.page}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Data", data.hits);
                this.incrementPage();
                return data.hits || [];
            });
    }

    incrementPage() {
        this.page += 1;
    }
}

const gallery = document.querySelector(".gallery");
const btn = document.querySelector("#load-more-btn");
const resetBtn = document.querySelector("#reset");
const newApiService = new NewApiService();

btn.addEventListener("click", onLoad);
function onLoad() {
    newApiService.fetchArticles().then(articleMarkup);
}
function articleMarkup(images) {
    const markUp = images
        .map(
            image => `
        <div class="img-wrap">
            <img src="${image.webformatURL}" alt="">
        </div>`
        )
        .join("");

    gallery.insertAdjacentHTML("beforeend", markUp);
}

resetBtn.addEventListener("click", () => {
    gallery.innerHTML = "";
    newApiService.page = 1;
});
