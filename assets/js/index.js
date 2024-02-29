// For Color Mode
var state = localStorage.getItem("mode");
if(state == null || state == "") {
    state = 2;
    localStorage.setItem("mode", state)
}

loadScreen(state);

function loadScreen(state) {
    var mode = document.querySelector("#mode")
    console.log("loadScreen");
    const body = document.querySelector("body")
    if(state == 1) {
        body.classList.remove("light-mode")
        mode.checked = false;

    } else if(state == 2) {
        body.classList.add("light-mode")
        mode.checked = true;
    }
}

function changeMode() {
    state = localStorage.getItem("mode")
    if(state == 1) {
        console.log("darkmode")
        state = 2;
    } else if(state == 2) {
        console.log("lightmode")
        state = 1;
    }
    localStorage.setItem("mode", state)
    loadScreen(state);
    location.reload()
}


// For Title Text Animation
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 9) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    console.log("cursor: ", document.querySelector("#mode").checked)
    if(document.querySelector("#mode").checked) {
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000 }";
    } else {
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }";
    }
    document.body.appendChild(css);
};
