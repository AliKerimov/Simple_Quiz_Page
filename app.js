const addScore = document.querySelector(".add-score");
const question = document.querySelector(".question");
const API =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";
const countQuest = document.querySelector(".count-quest");
const loading = document.querySelector(".loading");
const score = document.querySelector(".score");
const answers = document.querySelector("ul");
const span = document.querySelector(".count");
// const res=document.querySelector(".modal");
const resText = document.querySelector(".result");
const button = document.querySelector("button");
// res.style.display="none";
// window.addEventListener("mouseup", function (event) {
//   if (event.target != res && event.target.parentNode != res) {
//     res.style.display = "none";
//     // this.window.onload;
//   }
// });
let i = 0;
let coun = 1;
window.addEventListener("load", () => {
  getData();
});
async function getData() {
  try {
    let getFetch = await fetch(API);
    let data = await getFetch.json();

    question.innerHTML = `${data.results[i].question}`;
    let correctans = [];
    data.results.forEach((el) => {
      correctans.push(el.correct_answer);
    });
    //   console.log(`Correct answer function: ${correctans[0]}`);
    let incorrans = [];
    data.results[i].incorrect_answers.forEach((el) => {
      incorrans.push(el);
    });
    let array = [...incorrans, correctans[i]];
    shuffle(array);
    addList(array);
    const list = document.querySelectorAll("li");
    addUi(list, correctans);
  } catch {
    resText.textContent=`Congarts you have ${coun-1} correct answer.`

  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addList(array) {
  answers.textContent = "";
  array.forEach((el) => {
    let li = document.createElement("li");
    li.innerHTML = `${el}`;
    answers.appendChild(li);
  });
}
function addUi(list, correctans) {
  list.forEach((li) => {
    li.addEventListener("click", () => {
      let div = document.createElement("div");
      loading.appendChild(div);
      div.classList.add("pink");
      if (li.textContent.trim() === correctans[i].trim()) {
        li.setAttribute("id", "success");
        span.textContent = `${coun}`;
        coun++;
      } else {
        li.setAttribute("id", "wrong");
        list.forEach((el) => {
          if (el.textContent.trim() === correctans[i].trim()) {
            el.setAttribute("id", "success");
          }
        });
      }
      i++;
      getData();
    });
  });
}
// getData();
