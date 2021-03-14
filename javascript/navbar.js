function hideMenu() {
    let menuOpen = document.getElementById('nav-check').checked;


    if (menuOpen === true) {
        document.getElementById('nav-check').checked = false;
        document.getElementById('horizontalLine').style.display = 'none';
    }
}

window.addEventListener("scroll", hideMenu);