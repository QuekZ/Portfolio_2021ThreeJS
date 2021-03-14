let myWords = [
    "Web Design",
    "Graphic Design",
    "Computer Graphics"
];


setInterval(
    function generateWord() {
        let randomWord = myWords[Math.floor(Math.random() * myWords.length)];
        document.getElementById("changeWord").innerHTML = randomWord;
        document.getElementById("changeWord").style.backgroundColor = "#000";
        document.getElementById("changeWord").style.color = "#fff";
        console.log(randomWord);

    },
    3000
);