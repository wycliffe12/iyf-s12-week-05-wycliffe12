
// ===================================
// LESSON 9: UNDERSTANDING THE DOM
// ===================================

// TASK 9.1: Selecting Elements

const header = document.getElementById("main-header");
const contents = document.getElementsByClassName("content");
const paragraphs = document.getElementsByTagName("p");
const firstLink = document.querySelector(".nav-link");
const allLinks = document.querySelectorAll(".nav-link");

const heading = document.querySelector("h1");
const contactForm = document.querySelector("#contact-form");
const emailInput = document.querySelector("#email");
const navItems = document.querySelectorAll(".nav-list li");
const lastParagraph = document.querySelector("footer p");

console.log("Header:", header);
console.log("Contents:", contents);
console.log("Paragraphs:", paragraphs);
console.log("First link:", firstLink);
console.log("All links:", allLinks);
console.log("Heading:", heading);
console.log("Form:", contactForm);
console.log("Email:", emailInput);
console.log("Navigation items:", navItems);
console.log("Last paragraph:", lastParagraph);


// TASK 9.2: Traversing the DOM

const nav = document.querySelector("nav");

console.log("Nav parent:", nav.parentElement);
console.log("Nav children:", nav.children);
console.log("First child:", nav.firstElementChild);
console.log("Last child:", nav.lastElementChild);

const article = document.querySelector("article");

console.log("Next sibling:", article.nextElementSibling);
console.log("Previous sibling:", article.previousElementSibling);

console.log("Header navigation:", header.querySelector("nav"));
console.log("First link parent:", firstLink.parentElement);
console.log("List children:", document.querySelector(".nav-list").children);

let footerParent = document.querySelector("footer");
while (footerParent && footerParent.tagName !== "BODY") {
    footerParent = footerParent.parentElement;
}
console.log("Footer's body:", footerParent);


// TASK 9.3: Modifying Content

console.log("Text content:", heading.textContent);
console.log("Inner text:", heading.innerText);

heading.textContent = "DOM Manipulation Practice";

const articleContent = document.querySelector("article");
console.log("Article HTML:", articleContent.innerHTML);

// Safe text demonstration
const userInput = "<b>Hello</b>";
const safeParagraph = document.createElement("p");
safeParagraph.textContent = userInput;
articleContent.appendChild(safeParagraph);

// Attributes
console.log(firstLink.getAttribute("href"));
console.log(firstLink.href);
firstLink.setAttribute("href", "https://developer.mozilla.org");
console.log(firstLink.hasAttribute("target"));
firstLink.removeAttribute("target");

// Data attributes
firstLink.dataset.id = "123";
console.log(firstLink.dataset.id);

// Styles using classes
document.querySelector(".container").classList.add("highlight");
document.querySelector(".container").classList.remove("highlight");
document.querySelector(".container").classList.toggle("highlight");


// TASK 9.4: Adding and Removing Elements

const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph!";
newParagraph.classList.add("content", "highlight");

articleContent.appendChild(newParagraph);

const firstParagraph = articleContent.querySelector("p");

const anotherParagraph = document.createElement("p");
anotherParagraph.textContent = "Inserted before the first paragraph.";
articleContent.insertBefore(anotherParagraph, firstParagraph);

const extraParagraph = document.createElement("p");
extraParagraph.textContent = "Added using prepend.";
articleContent.prepend(extraParagraph);

// Clone navigation item
const navItem = firstLink.parentElement;
const clone = navItem.cloneNode(true);
clone.querySelector("a").textContent = "New Link";
clone.querySelector("a").href = "#new";
document.querySelector(".nav-list").appendChild(clone);

// Add navigation items dynamically
function addNavItem(text, href) {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.textContent = text;
    link.href = href;
    link.classList.add("nav-link");

    li.appendChild(link);
    document.querySelector(".nav-list").appendChild(li);
}

addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");


// ===================================
// LESSON 10: EVENTS & INTERACTION
// ===================================

// TASK 10.1: Event Listeners

const counterDisplay = document.getElementById("count");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const resetButton = document.getElementById("reset");

let count = 0;

function updateCounter() {
    counterDisplay.textContent = count;
}

increaseButton.addEventListener("click", function() {
    count++;
    updateCounter();
});

decreaseButton.addEventListener("click", function() {
    if (count > 0) {
        count--;
    }
    updateCounter();
});

resetButton.addEventListener("click", function() {
    count = 0;
    updateCounter();
});


// TASK 10.2: Event Object

document.addEventListener("click", function(event) {
    console.log("Target:", event.target);
    console.log("Current target:", event.currentTarget);
    console.log("Event type:", event.type);
    console.log("Mouse position:", event.clientX, event.clientY);
});

document.addEventListener("keydown", function(event) {
    console.log("Key:", event.key);
    console.log("Code:", event.code);
    console.log("Shift:", event.shiftKey);
    console.log("Ctrl:", event.ctrlKey);
    console.log("Alt:", event.altKey);

    // Ctrl + S shortcut
    if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        alert("Saved!");
    }

    // Escape clears form inputs
    if (event.key === "Escape") {
        document.querySelectorAll("input").forEach(input => {
            input.value = "";
        });
    }

    // Ctrl + Enter submits the contact form
    if (event.ctrlKey && event.key === "Enter") {
        contactForm.requestSubmit();
    }
});


// TASK 10.3: Event Bubbling

const grandparent = document.createElement("div");
grandparent.id = "grandparent";
grandparent.textContent = "Grandparent";

const parent = document.createElement("div");
parent.id = "parent";
parent.textContent = "Parent";

const child = document.createElement("div");
child.id = "child";
child.textContent = "Child";

grandparent.appendChild(parent);
parent.appendChild(child);
document.body.appendChild(grandparent);

grandparent.addEventListener("click", () => {
    console.log("Grandparent clicked");
});

parent.addEventListener("click", () => {
    console.log("Parent clicked");
});

child.addEventListener("click", () => {
    console.log("Child clicked");
});

// Clicking Child logs:
// Child -> Parent -> Grandparent


// Event Delegation: ONE listener on the parent UL

const practiceList = document.getElementById("practice-list");
const practiceInput = document.getElementById("practice-task");
const addPracticeButton = document.getElementById("add-practice-task");

addPracticeButton.addEventListener("click", function() {
    const text = practiceInput.value.trim();

    if (text === "") return;

    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");

    span.textContent = text;
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";

    li.appendChild(span);
    li.appendChild(deleteButton);
    practiceList.appendChild(li);

    practiceInput.value = "";
});

// ONE click listener handles all current and future list items
practiceList.addEventListener("click", function(event) {
    const li = event.target.closest("li");

    if (!li) return;

    if (event.target.dataset.action === "delete") {
        li.remove();
    } else {
        li.classList.toggle("completed");
    }
});


// TASK 10.4: Form Handling

const nameInput = document.getElementById("name");
const message = document.getElementById("form-message");

function showError(input, text) {
    input.classList.add("error");
    message.textContent = text;
}

function clearError(input) {
    input.classList.remove("error");
    message.textContent = "";
}

nameInput.addEventListener("input", function() {
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, "Name must be at least 2 characters.");
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener("input", function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, "Please enter a valid email.");
    } else {
        clearError(emailInput);
    }
});

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (data.name.trim().length < 2) {
        showError(nameInput, "Name must be at least 2 characters.");
        return;
    }

    if (!emailRegex.test(data.email)) {
        showError(emailInput, "Please enter a valid email.");
        return;
    }

    clearError(nameInput);
    clearError(emailInput);

    message.textContent = "Form submitted successfully!";
    console.log("Form data:", data);

    contactForm.reset();
});
