
var ans;
var tag;
var choice = "random";
var done = [];


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function updateQuest(q, a, b, c, d, right) {
    document.getElementById("question").textContent = q;
    document.getElementById("a").setAttribute("value", a);
    document.getElementById("b").setAttribute("value", b);
    document.getElementById("c").setAttribute("value", c);
    document.getElementById("d").setAttribute("value", d);
    ans = right;
    var resp = document.getElementsByClassName("cross");
    var buttons = document.getElementsByClassName("choice");
    for (var i=0; i<resp.length; i++) {
        resp[i].style.display = "none";
    }
    for (var i=0; i<buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

function setTips() {
    document.getElementById("tip-cover").style.display = "none";
    document.getElementById("tips").style.display = "block";
}

function checkRight(e) {
    var button = e.target;
    if (button.id === ans) {
        document.getElementById("tic-" + button.id).style.display = "inline-block";
    }
    else {
        document.getElementById("crs-" + button.id).style.display = "inline-block";
        document.getElementById("tic-" + ans).style.display = "inline-block";
    }
    g = document.getElementsByClassName("choice");
    for (i=0; i<4; i++) {
        g[i].disabled = true;
    }
    document.getElementById("next").style.display = "block";
    setTips();
}

function selectQuestion() {
    if (choice === "random") {
        var pool = tag["menu"]["all"];
    }
    else if (choice === "random-cat") {

    }
    return tag[pool[getRndInteger(0, pool.length)]];
}

function getNextQuestion() {
    document.getElementById("next").style.display = "none";
    var quest = selectQuestion();
    updateQuest(quest["q"], quest["a"], quest["b"], quest["c"], quest["d"], quest["answer"]);
    if (quest["pic"] !== "") {
        document.getElementById("question-image").innerHTML = "<img style='width: 100%' id='stimuli' src='ref-imgx/" + quest["pic"] + "'>";
    }
    else {
        document.getElementById("question-image").innerHTML = "";
    }
    document.getElementById("tips").style.display = "none";
    document.getElementById("tip-cover").style.display = "block";
    document.getElementById("chapter-val").textContent = quest["cpt"];
    document.getElementById("page-val").textContent = quest["page"];
}

function init() {
    getNextQuestion();
}


fetch('tag.json')
    .then(response => response.json())
    .then(data => tag = data)
    .then( () => init());


document.getElementById("a").onclick = checkRight;
document.getElementById("b").onclick = checkRight;
document.getElementById("c").onclick = checkRight;
document.getElementById("d").onclick = checkRight;
document.getElementById("next").onclick = getNextQuestion;
document.getElementById("tip-cover").onclick = setTips;
