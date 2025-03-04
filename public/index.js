document.getElementById('getstarted').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('readmore').addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('.review').scrollIntoView({ behavior: 'smooth' });
})

document.querySelector('.btn-2').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('dial').addEventListener('click', function () {
  window.location.href = "tel:+919330378959";
})


var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
let resultArea = document.querySelector(".comment");

modalContent = document.querySelector(".modal-content");
modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];


function calculate() {

  if (age.value == '' || height.value == '' || weight.value == '' || (male.checked == false && female.checked == false)) {
    modal.style.display = "block";
    modalText.innerHTML = `All fields are required!`;

  } else {
    countBmi();
  }

}


function countBmi() {
  var p = [age.value, height.value, weight.value];
  if (male.checked) {
    p.push("male");
  } else if (female.checked) {
    p.push("female");
  }

  var bmi = Number(p[2]) / (Number(p[1]) / 100 * Number(p[1]) / 100);

  var result = '';
  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = 'Healthy';
  } else if (25 <= bmi && bmi <= 29.9) {
    result = 'Overweight';
  } else if (30 <= bmi && bmi <= 34.9) {
    result = 'Obese';
  } else if (35 <= bmi) {
    result = 'Extremely obese';
  }



  resultArea.style.display = "block";
  document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}</span>`;
  document.querySelector("#result").innerHTML = bmi.toFixed(2);

}


function toggleMenu() {
  const navLinks = document.querySelector(".nav-item");
  navLinks.classList.toggle("active");
  toggleCross();
}

function toggleCross() {
  const cross = document.querySelector(".cross");
  if (cross.classList.contains("active")) {
    cross.classList.remove("active");
  } else {
    setTimeout(() => {
      cross.classList.add("active");
    }, 900);
  }
}

function toggleExercise(event) {
  const button = event.target;
  const exerciseCard = button.closest(".ExerciseCard");
  const exerciseDescription = exerciseCard.querySelector(".exerciseDescription");
  exerciseDescription.classList.toggle("active");
}

function toggleexit(event) {
  const closeButtons = event.target;
  const exerciseDescription = closeButtons.closest(".exerciseDescription");
  exerciseDescription.classList.remove("active");
}

function ProfileIcon() {
  const profileimg = document.querySelector('.profile-info');
  profileimg.classList.toggle('active');
}

// function toggleExercise(event) {
//   const exerciseCard = event.target.closest(".ExerciseCard");
//   if (!exerciseCard) return;

//   const descExercise = exerciseCard.querySelector(".exerciseDescription");
//   descExercise.classList.toggle("active");
// }

// function toggleexit(event) {
//   const exerciseCard = event.target.closest(".ExerciseCard");
//   if (!exerciseCard) return;

//   const descExercise = exerciseCard.querySelector(".exerciseDescription");
//   descExercise.classList.remove("active");
// }



// -----------lifo prinicple----------------

const container = document.querySelector(".testimonials");
const cards = Array.from(document.querySelectorAll(".testimonials-card"));
let position = 0;

function moveCards() {
  card.forEach((card, index) => {
    card.style.transform = `translateX(${(index - position) * 100}%)`;
  });

  if (position >= cards.length) {
    const lastcard = testimonials - card.pop();
    container.appendChild(lastcard);
    cards.unshift(lastcard);
    position = 0;

  }
  position++;
}
setInterval(moveCards, 1000);