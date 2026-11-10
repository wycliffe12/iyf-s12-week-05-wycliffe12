
// DAY 1: COLOR CHANGER

document.getElementById("color-button")
.addEventListener("click", function() {

    const headings = document.querySelectorAll("h1, h2, h3");

    headings.forEach(heading => {
        const randomColor = "#" +
            Math.floor(Math.random() * 16777215)
            .toString(16).padStart(6, "0");

        heading.style.color = randomColor;
    });
});


// DAY 2: DYNAMIC ELEMENT CREATOR

let paragraphCount = 0;

document.getElementById("add-paragraph")
.addEventListener("click", function() {

    paragraphCount++;

    const paragraph = document.createElement("p");
    paragraph.textContent = "Paragraph " + paragraphCount;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
        paragraph.remove();
    });

    paragraph.appendChild(deleteButton);

    document.getElementById("paragraph-container")
        .appendChild(paragraph);
});


// DAY 3: IMAGE REMOVER

document.getElementById("remove-images")
.addEventListener("click", function() {
    document.querySelectorAll("img").forEach(image => {
        image.remove();
    });
});

// Bonus: Hide and show images
document.getElementById("toggle-images")
.addEventListener("click", function() {
    document.querySelectorAll("img").forEach(image => {
        image.hidden = !image.hidden;
    });
});


// DAY 4: CONTENT COPIER

const source = document.getElementById("source");
const target = document.getElementById("target");

document.getElementById("copy-button")
.addEventListener("click", function() {
    target.textContent = source.textContent;
});

// Bonus: Drag and drop
source.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text/plain", source.textContent);
});

target.addEventListener("dragover", function(event) {
    event.preventDefault();
});

target.addEventListener("drop", function(event) {
    event.preventDefault();
    target.textContent = event.dataTransfer.getData("text/plain");
});


// DAY 5: DARK MODE TOGGLE

const darkButton = document.getElementById("dark-button");

// Load saved preference
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

darkButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});
