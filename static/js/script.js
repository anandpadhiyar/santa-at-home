

const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('nav-open');
    if (nav.className == 'nav-open') {
        setTimeout(() => {
            document.querySelector('.nav-open ul').style.visibility = "visible";
        }, 500);
    }
    else {
        document.querySelector('nav ul').style.visibility = "hidden";
    }
});



document.getElementById('book-now').addEventListener('click', () => {
    location.href = "/contact";
});
