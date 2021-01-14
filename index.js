
var ans;
var tag;
var pool = [];


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

function getNextQuestion() {
    document.getElementById("next").style.display = "none";
    if (pool.length == 0) {
        setQuestionPool();
        if (pool.length == 0) {
            document.getElementById("question").textContent = "Error: No questions available";
            return;
        }
    }
    var quest = tag[pool[getRndInteger(0, pool.length)]];
    updateQuest(quest["q"], quest["a"], quest["b"], quest["c"], quest["d"], quest["answer"]);
    if (quest["code-sample"] !== "") {
        document.getElementById("code-container").textContent = quest["code-sample"];
    }
    else {
        document.getElementById("code-container").textContent = "";
    }
    if (quest["pic"] !== "") {
        document.getElementById("image-container").innerHTML = "<img style='width: 100%' id='add-image' src='ref-imgx/" + quest["pic"] + "'>";
    }
    else {
        document.getElementById("image-container").innerHTML = "";
    }
    document.getElementById("tips").style.display = "none";
    document.getElementById("tip-cover").style.display = "block";
    document.getElementById("chapter-val").textContent = quest["cpt"];
    document.getElementById("page-val").textContent = quest["page"];
}

function setQuestionPool() {
    var categories = document.getElementsByClassName("src-cpt");
    pool = [];
    var at_least_one = false;
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
            at_least_one = true;
            pool.push(...tag["menu"]["byChapter"][categories[i].value]);
        }
    }
    if (at_least_one == false) {
        pool.push(...tag["menu"]["all"]);
    }
}


function init() {
    setQuestionPool();
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
