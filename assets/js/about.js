var tabContent = document.querySelector(".tab-content");
var index = 0;

var list = document.querySelectorAll(".tab-header li");

list.forEach((tab, key) => {
    tab.addEventListener("click", ()=> {
        index = key
        console.log("index: ", index)
    });
});