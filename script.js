
var ans;
var tag;
var choice = "random";

fetch('tag.json')
    .then(response => response.json())
    .then(data => tag = data);


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
    for (i=0; i<resp.length; i++) {
        resp[i].style.display = "none";
    }
    for (i=0; i<buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

function checkRight(e) {
    console.log("hi");
    console.log(ans);
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
}

function selectQuestion() {
    var pool = tag["menu"];
    if (choice === "random") {
        return tag[pool["all"][getRndInteger(0, pool["all"].length)]];
    }
}

function getNextQuestion() {
    document.getElementById("next").style.display = "none";
    var quest = selectQuestion();
    updateQuest(quest["q"], quest["a"], quest["b"], quest["c"], quest["d"], quest["answer"]);
    if (quest["pic"] !== "") {
        document.getElementById("question-image").innerHTML = "<img style='width: 100%' id='stimuli' src='/ref-imgx/" + quest["pic"] + "'>";
    }
    else {
        document.getElementById("question-image").innerHTML = "";
    }
}


updateQuest("What is 2 + 2 = ?", "00asd sdjansdawdn dawndawiodn awwdmawkd wajkdnawjdna", "1", "2", "4", "d");

document.getElementById("a").onclick = checkRight;
document.getElementById("b").onclick = checkRight;
document.getElementById("c").onclick = checkRight;
document.getElementById("d").onclick = checkRight;
document.getElementById("next").onclick = getNextQuestion;
