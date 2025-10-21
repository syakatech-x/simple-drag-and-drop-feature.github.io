const rightBox = document.getElementById("right");
const leftBox = document.getElementById("left");
let lists = document.querySelectorAll(".list");
let selected = null;

// DESKTOP / LAPTOP VERSION
for (let list of lists) {
    list.addEventListener("dragstart", e => {
        selected = e.target;
    });
}
rightBox.addEventListener("dragover", e => {
    e.preventDefault();
});
rightBox.addEventListener("drop", e => {
    e.preventDefault();
    if (selected) {
        rightBox.appendChild(selected);
        selected = null;
    }
});

leftBox.addEventListener("dragover", e => {
    e.preventDefault();
});
leftBox.addEventListener("drop", e => {
    e.preventDefault();
    if (selected) {
        leftBox.appendChild(selected);
        selected = null;
    }
});

// MOBILE VERSION
lists.forEach(list => {
    list.addEventListener("touchstart", () => {
        selected = list;
        selected.classList.add("ondrag");
    });
    list.addEventListener("touchmove", e => {
        let touch = e.touches[0];
        const rightRect = rightBox.getBoundingClientRect();
        const leftRect = leftBox.getBoundingClientRect();

        if (
            touch.clientX > rightRect.left &&
            touch.clientX < rightRect.right &&
            touch.clientY > rightRect.top &&
            touch.clientY < rightRect.bottom
        ) {
            rightBox.style.backgroundColor = "rgba(255,255,255,0.2)";
        } else if (
            touch.clientX > leftRect.left &&
            touch.clientX < leftRect.right &&
            touch.clientY > leftRect.top &&
            touch.clientY < leftRect.bottom
        ) {
            leftBox.style.backgroundColor = "rgba(255,255,255,0.2)";
        } else {
            rightBox.style.backgroundColor = "";
            leftBox.style.backgroundColor = "";
        }
    });
    list.addEventListener("touchend", e => {
        let touch = e.changedTouches[0];
        const rightRect = rightBox.getBoundingClientRect();
        const leftRect = leftBox.getBoundingClientRect();

        if (
            touch.clientX > rightRect.left &&
            touch.clientX < rightRect.right &&
            touch.clientY > rightRect.top &&
            touch.clientY < rightRect.bottom
        ) {
            rightBox.appendChild(selected);
        } else if (
            touch.clientX > leftRect.left &&
            touch.clientX < leftRect.right &&
            touch.clientY > leftRect.top &&
            touch.clientY < leftRect.bottom
        ) {
            leftBox.appendChild(selected);
        }

        rightBox.style.backgroundColor = "";
        leftBox.style.backgroundColor = "";
        selected.classList.remove("ondrag");
        selected = null;
    });
});
