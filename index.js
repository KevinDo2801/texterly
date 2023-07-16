import { getOpenAI } from "./getOpenAPI.js";

const form = document.querySelector('form');
const textarea = form.querySelector('textarea');
const charactersEl = document.getElementById('characters');
const wordsEl = document.getElementById('words');
const copyText = document.querySelector('.copy-text');
const spinnerEl = document.getElementById('spinner');
const cover = document.querySelector(".cover");
const errorEl = document.getElementById('error');
let isWaiting = false;

function charCount(text) {
    const regex = /\S/g;
    const chars = text.match(regex).length;
    return chars;
}

function wordCount(text) {
    const words = text.trim().split(/\s+/).length;
    return words;
}

async function processText(event) {
    event.preventDefault();

    const formInput = new FormData(form);
    let text = formInput.get("textarea");

    isWaiting = true;
    spinnerEl.style.display = 'block';
    cover.style.display = 'block';
    const realText = await getOpenAI(text);
    spinnerEl.style.display = 'none';
    cover.style.display = 'none';
    isWaiting = false;

    if (realText == null) {
        errorEl.style.display = 'block';
        charactersEl.textContent = "-_-";
        wordsEl.textContent = "-_-";
        return;
    }

    errorEl.style.display = 'none';
    textarea.value = realText;
    charactersEl.textContent = charCount(realText);
    wordsEl.textContent = wordCount(realText);
}

function copyToClipboard() {
    navigator.clipboard.writeText(textarea.value)
        .then(() => {
            setTimeout(() => {
                copyText.innerHTML = `
                <img src="./copy-icon.svg" alt="">
                Copy
            `
                copyText.style.alignItems = "self-start";
            }, 1000)

            copyText.innerHTML = `
            <i class="fa fa-check"></i>
            Copied
        `
            copyText.style.alignItems = "baseline";
        })
        .catch((error) => {
            setTimeout(() => {
                copyText.innerHTML = `
                <img src="./copy-icon.svg" alt="">
                Copy
            `
                copyText.style.alignItems = "self-start";
            }, 1000)

            copyText.innerHTML = `
            <i class="fa fa-times"></i>
            Unable
        `
            copyText.style.alignItems = "baseline";
        });
}

copyText.addEventListener("click", () => copyToClipboard());
form.addEventListener('submit', processText);





