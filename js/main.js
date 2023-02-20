const mainListItem = document.querySelectorAll(".main_list_item");
const mainInfo = document.querySelectorAll(".main_info");
const picturesTab = document.querySelectorAll(".main_tab_item");
const picturesItem = document.querySelectorAll(".main_pictures_item");
const sliderItem = document.querySelectorAll(".main_slider_item");
const sliderItems = document.querySelectorAll(".main_slider_item_list_item");

const showInfo = (text, tab) => {
    text.forEach(value => {
        value.classList.toggle("active", value.className.includes(tab))
    })
}

const showImages = (text, tab) => {
    text.forEach(value => {
        value.className.includes(tab) ? value.style.display = "block" : value.style.display = "none"
    })
}

const tabAction = (list, text, searchClass) => {
    list.forEach((item, index, array) => {
        item.addEventListener("click", () => {
            let active = document.querySelector(searchClass);
            active.classList.remove("active");
            item.classList.add("active");
            let tab = item.getAttribute("data-tab");
            if (array === picturesTab) {
                showImages(text, tab)
            } else {
                showInfo(text, tab)
            }
        })
    });
}

tabAction(mainListItem, mainInfo, ".main_list_item.active");
tabAction(picturesTab, picturesItem, ".main_tab_item.active");
tabAction(sliderItems, sliderItem, ".main_slider_item_list_item.active");


//Slider Block

// Slider buttons
const buttonSlider = document.querySelectorAll(".main_slider_item_list_button");
let position;


const findPosition = () => {
    sliderItems.forEach((item, index) => {
        if (item.className.includes("active")) {
            position = index;
        }
    })
    sliderItems[position].className = 'main_slider_item_list_item';
}

const getAtt = () => {
    sliderItems[position].classList.add('active');
    let tab = sliderItems[position].getAttribute("data-tab");
    showInfo(sliderItem, tab)
}

const nextSlide = () => {
    findPosition();
    position === sliderItems.length - 1 ? position = 0 : position++
    getAtt()
}

const previousSlide = () => {
    findPosition();
    position === 0 ? position = sliderItems.length - 1 : position--
    getAtt()
}

buttonSlider.forEach(item => {
    item.addEventListener("click", () => {
        if (item.className.includes("next")) {
            nextSlide()
        } else if (item.className.includes("back")) {
            previousSlide()
        }
    })
})


// Slider keydown
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextSlide()
    } else if (e.key === "ArrowLeft") {
        previousSlide()
    }
})


// Slider mousemove
const mainSlider = document.querySelector(".main_slider");
let x1 = null;
let y1 = null;

const handleMouseDown = (e) => {
    x1 = e.clientX;
    y1 = e.clientY;
}

const handleMouseUp = (e) => {
    if (!x1 || !y1) return false;

    let x2 = e.clientX;
    let y2 = e.clientY;
    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if ((xDiff + 200) < 0) {
            nextSlide()
        } else if ((xDiff - 200) > 0) {
            previousSlide()
        }
    }
    x1 = null;
    y1 = null;
}


mainSlider.addEventListener("mousedown", handleMouseDown);
mainSlider.addEventListener("mouseup", handleMouseUp);

mainSlider.onmousedown = new Function("return false;")

// Add images Our Amazing Work
const buttonFirst = document.querySelector(".first");
const none1 = document.querySelectorAll(".none1");
const none2 = document.querySelectorAll(".none2");
const middle = document.querySelector(".middle");
let counter = 2;

const addPictures = (item, item2, num, btn) => {
    if (num <= 1) {
        item2.forEach(element => {
            element.classList.remove("none2");
        })
        middle.classList.add("hidden");
        btn.remove();
    } else {
        item.forEach(element => {
            element.classList.remove("none1");
        });
        middle.classList.add("hidden");
        num--;
    }
    counter = num;
}

buttonFirst.addEventListener("click", () => {
    middle.classList.remove("hidden");
    setTimeout(addPictures, 3000, none1, none2, counter, buttonFirst)
})


// Add images in Gallery of best images
const secondMiddle = document.querySelector(".second_middle");
const buttonSecond = document.querySelector(".second");
const none3 = document.querySelectorAll(".none3");
const grid = document.querySelector(".main_grid");

buttonSecond.addEventListener("click", () => {
    secondMiddle.classList.remove("hidden");
    buttonSecond.remove();
    setTimeout(() => {
        none3.forEach(item => {
            item.classList.remove("none3");
        })
        grid.classList.replace("main_grid", "main_grid_changed")
        secondMiddle.classList.add("hidden");
    }, 3000,)
})
