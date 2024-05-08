document.addEventListener("DOMContentLoaded", process);
var dictionary;
var totalQuestions, level, pageTitle;
var questionCounter,
  correctAnswers = 0,
  score,
  highestScoreWord,
  correctMeaning;
function process() {
  fetch("../data/baron-753.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dictionary = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  var averagebutton = document.querySelector(".average-button");
  averagebutton.addEventListener("click", buttonClick);
}
function buttonClick() {
  const difficulty = document.querySelector("#difficulty");
  const radioButtons = document.querySelectorAll(".preferences");
  var selectedValue = null;
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      selectedValue = radioButtons[i].value;
      break;
    }
  }
  console.log("Button Click Event...!");
  pageTitle = document.title.split(":")[2];
  console.log(questionCounter);
  console.log(pageTitle);
  if (selectedValue !== null) {
    console.log("Selected value:", selectedValue);
    // console.log("Difficulty Level:", difficulty.value);
    // console.log("Document Title:", document.title);
    totalQuestions = selectedValue;
    questionCounter = totalQuestions;
    level = difficulty.value;
  }
  if (pageTitle == "Index" && questionCounter > 0) {
    // Quiz questions function
    createQuiz();
  } else if (pageTitle == "Quiz" && questionCounter > 0) {
    // Quiz questions function
    checkAnswer(getAnswer());
    nextQuestion();
  } else if (pageTitle == "Quiz" && questionCounter == 0) {
    //Result page function
    showResult();
  } else {
    // Inside result page --> Re-attempt quiz -->
    console.log("Final Else");
    createIndex();
  }
}
function createQuiz() {
  var vocabIntroDiv = document.querySelector(".vocab-app-intro");
  if (vocabIntroDiv) {
    while (vocabIntroDiv.firstChild) {
      vocabIntroDiv.removeChild(vocabIntroDiv.firstChild);
    }
  }
  document.title = "Assignment 5:GUI Testing:Quiz";
  var randomNumber1 = Math.floor(Math.random() * 753) + 1;
  var randomNumber2 = Math.floor(Math.random() * 753) + 1;
  var randomNumber3 = Math.floor(Math.random() * 753) + 1;

  // Creating new DOM Elements
  // Creating the new image
  var image = document.createElement("img");
  image.src = "../others/question_banner.png";
  image.alt = "img failed to load";
  image.className = "word-logo";

  // create the question div
  var answerOptions = document.createElement("div");
  answerOptions.className = "answer-options";

  // Create Title of the Card
  var cardTitle = document.createElement("h6");
  cardTitle.textContent = "Meaning of this Word:";

  // Create div child
  var word = document.createElement("p");
  word.textContent = dictionary.words[randomNumber1].word;
  word.className = "the-word";
  answerOptions.appendChild(word);

  var option1 = document.createElement("input");
  option1.type = "radio";
  option1.name = "option";
  option1.className = "preference";
  option1.id = "preference1";
  answerOptions.appendChild(option1);
  var option1Label = document.createElement("label");
  option1Label.for = "option";
  option1Label.textContent = dictionary.words[randomNumber1].definition;
  answerOptions.appendChild(option1Label);
  var lineBreak1 = document.createElement("br");
  answerOptions.appendChild(lineBreak1);

  var option2 = document.createElement("input");
  option2.type = "radio";
  option2.name = "option";
  option2.className = "preference";
  option2.id = "preference2";
  answerOptions.appendChild(option2);
  var option2Label = document.createElement("label");
  option2Label.for = "option";
  option2Label.textContent = dictionary.words[randomNumber2].definition;
  answerOptions.appendChild(option2Label);
  var lineBreak2 = document.createElement("br");
  // answerOptions.appendChild(lineBreak2);

  answerOptions.appendChild(document.createElement("br"));
  var option3 = document.createElement("input");
  option3.type = "radio";
  option3.name = "option";
  option3.className = "preference";
  option3.id = "preference3";
  answerOptions.appendChild(option3);
  var option3Label = document.createElement("label");
  option3Label.for = "option";
  option3Label.textContent = dictionary.words[randomNumber3].definition;
  answerOptions.appendChild(option3Label);

  // Slider Label
  var sliderLabel = document.createElement("label");
  sliderLabel.for = "difficulty";
  sliderLabel.className = "slider-label";
  sliderLabel.textContent = "Rate this quiz (1-10):";
  // Slider
  var slider = document.createElement("input");
  slider.type = "range";
  slider.id = "rating-input";
  slider.name = "difficulty";
  slider.min = "1";
  slider.max = "3";
  slider.value = "1";

  // answerOptions.appendChild(lineBreak1)
  // answerOptions.appendChild(sliderLabel);
  // answerOptions.appendChild(slider);

  // Creating Button
  var button = document.createElement("button");
  button.className = "average-button";
  button.textContent = "Next";

  // Appending it to the DIV CONTAINER
  vocabIntroDiv.appendChild(image);
  vocabIntroDiv.appendChild(cardTitle);
  vocabIntroDiv.appendChild(answerOptions);
  vocabIntroDiv.appendChild(button);
  vocabIntroDiv.appendChild(sliderLabel);
  vocabIntroDiv.appendChild(slider);

  // Adding an event Listener to the button
  var averagebutton = document.querySelector(".average-button");
  averagebutton.addEventListener("click", buttonClick);
  // App Logic
  correctMeaning = dictionary.words[randomNumber1].definition;
  questionCounter--;
}
function checkAnswer(answer) {
  if (answer == correctMeaning) {
    correctAnswers++;
    console.log("correct");
  } else {
    console.log("wrong");
  }
  console.log(correctAnswers);
}
function getAnswer() {
  const radioButtons = document.querySelectorAll(".preference");
  const labelForButtons = document.querySelectorAll("label");
  var number = 0;
  for (var i = 0; i < radioButtons.length; i++) {
    // console.log(i);
    if (radioButtons[i].checked) {
      number = i;
      console.log(labelForButtons[i].textContent);
      return labelForButtons[i].textContent;
    }
  }
}
function nextQuestion() {
  if (questionCounter == 1) {
    lastQuestion();
  } else {
    var vocabIntroDiv = document.querySelector(".vocab-app-intro");
    if (vocabIntroDiv) {
      while (vocabIntroDiv.firstChild) {
        vocabIntroDiv.removeChild(vocabIntroDiv.firstChild);
      }
    }
    document.title = "Assignment 5:GUI Testing:Quiz";
    var randomNumber1 = Math.floor(Math.random() * 753) + 1;
    var randomNumber2 = Math.floor(Math.random() * 753) + 1;
    var randomNumber3 = Math.floor(Math.random() * 753) + 1;

    // Creating new DOM Elements
    // Creating the new image
    var image = document.createElement("img");
    image.src = "../others/question_banner.png";
    image.alt = "img failed to load";
    image.className = "word-logo";

    // create the question div
    var answerOptions = document.createElement("div");
    answerOptions.className = "answer-options";

    // Create Title of the Card
    var cardTitle = document.createElement("h6");
    cardTitle.textContent = "Meaning of this Word:";

    // Create div child
    var word = document.createElement("p");
    word.textContent = dictionary.words[randomNumber1].word;
    word.className = "the-word";
    answerOptions.appendChild(word);

    var option1 = document.createElement("input");
    option1.type = "radio";
    option1.name = "option";
    option1.className = "preference";
    answerOptions.appendChild(option1);
    var option1Label = document.createElement("label");
    option1Label.for = "option";
    option1Label.textContent = dictionary.words[randomNumber1].definition;
    answerOptions.appendChild(option1Label);
    var lineBreak1 = document.createElement("br");
    answerOptions.appendChild(lineBreak1);

    var option2 = document.createElement("input");
    option2.type = "radio";
    option2.name = "option";
    option2.className = "preference";
    answerOptions.appendChild(option2);
    var option2Label = document.createElement("label");
    option2Label.for = "option";
    option2Label.textContent = dictionary.words[randomNumber2].definition;
    answerOptions.appendChild(option2Label);
    var lineBreak2 = document.createElement("br");
    // answerOptions.appendChild(lineBreak2);

    answerOptions.appendChild(document.createElement("br"));
    var option3 = document.createElement("input");
    option3.type = "radio";
    option3.name = "option";
    option3.className = "preference";
    answerOptions.appendChild(option3);
    var option3Label = document.createElement("label");
    option3Label.for = "option";
    option3Label.textContent = dictionary.words[randomNumber3].definition;
    answerOptions.appendChild(option3Label);

    // Creating Button
    var button = document.createElement("button");
    button.className = "average-button";
    button.textContent = "Next";

    // Slider Label
    var sliderLabel = document.createElement("label");
    sliderLabel.for = "difficulty";
    sliderLabel.className = "slider-label";
    sliderLabel.textContent = "Rate this quiz (1-10):";
    // Slider
    var slider = document.createElement("input");
    slider.type = "range";
    slider.id = "rating-input";
    slider.name = "difficulty";
    slider.min = "1";
    slider.max = "10";
    slider.value = "1";

    // Appending it to the DIV CONTAINER
    vocabIntroDiv.appendChild(image);
    vocabIntroDiv.appendChild(cardTitle);
    vocabIntroDiv.appendChild(answerOptions);
    vocabIntroDiv.appendChild(button);
    vocabIntroDiv.appendChild(sliderLabel);
    vocabIntroDiv.appendChild(slider);

    // Adding an event Listener to the button
    var averagebutton = document.querySelector(".average-button");
    averagebutton.addEventListener("click", buttonClick);
    // App Logic
    correctMeaning = dictionary.words[randomNumber1].definition;
    questionCounter--;
  }
}
function lastQuestion() {
  console.log("Making Last question");
  var vocabIntroDiv = document.querySelector(".vocab-app-intro");
  if (vocabIntroDiv) {
    while (vocabIntroDiv.firstChild) {
      vocabIntroDiv.removeChild(vocabIntroDiv.firstChild);
    }
  }
  document.title = "Assignment 5:GUI Testing:Quiz";
  var randomNumber1 = Math.floor(Math.random() * 753) + 1;
  var randomNumber2 = Math.floor(Math.random() * 753) + 1;
  var randomNumber3 = Math.floor(Math.random() * 753) + 1;

  // Creating new DOM Elements
  // Creating the new image
  var image = document.createElement("img");
  image.src = "../others/question_banner.png";
  image.alt = "img failed to load";
  image.className = "word-logo";

  // create the question div
  var answerOptions = document.createElement("div");
  answerOptions.className = "answer-options";

  // Create Title of the Card
  var cardTitle = document.createElement("h6");
  cardTitle.textContent = "Meaning of this Word:";

  // Create div child
  var word = document.createElement("p");
  word.textContent = dictionary.words[randomNumber1].word;
  word.className = "the-word";
  answerOptions.appendChild(word);

  var option1 = document.createElement("input");
  option1.type = "radio";
  option1.name = "option";
  option1.className = "preference";
  answerOptions.appendChild(option1);
  var option1Label = document.createElement("label");
  option1Label.for = "option";
  option1Label.textContent = dictionary.words[randomNumber1].definition;
  answerOptions.appendChild(option1Label);
  var lineBreak1 = document.createElement("br");
  answerOptions.appendChild(lineBreak1);

  var option2 = document.createElement("input");
  option2.type = "radio";
  option2.name = "option";
  option2.className = "preference";
  answerOptions.appendChild(option2);
  var option2Label = document.createElement("label");
  option2Label.for = "option";
  option2Label.textContent = dictionary.words[randomNumber2].definition;
  answerOptions.appendChild(option2Label);
  var lineBreak2 = document.createElement("br");
  // answerOptions.appendChild(lineBreak2);

  answerOptions.appendChild(document.createElement("br"));
  var option3 = document.createElement("input");
  option3.type = "radio";
  option3.name = "option";
  option3.className = "preference";
  answerOptions.appendChild(option3);
  var option3Label = document.createElement("label");
  option3Label.for = "option";
  option3Label.textContent = dictionary.words[randomNumber3].definition;
  answerOptions.appendChild(option3Label);

  // Slider Label
  var sliderLabel = document.createElement("label");
  sliderLabel.for = "difficulty";
  sliderLabel.className = "slider-label";
  sliderLabel.textContent = "Rate this quiz (1-10):";
  // Slider
  var slider = document.createElement("input");
  slider.type = "range";
  slider.id = "rating-input";
  slider.name = "difficulty";
  slider.min = "1";
  slider.max = "10";
  slider.value = "1";

  // Creating Button
  var button = document.createElement("button");
  button.className = "average-button";
  button.textContent = "See Result";

  // Appending it to the DIV CONTAINER
  vocabIntroDiv.appendChild(image);
  vocabIntroDiv.appendChild(cardTitle);
  vocabIntroDiv.appendChild(answerOptions);
  vocabIntroDiv.appendChild(button);
  vocabIntroDiv.appendChild(sliderLabel);
  vocabIntroDiv.appendChild(slider);

  // Adding an event Listener to the button
  var averagebutton = document.querySelector(".average-button");
  averagebutton.addEventListener("click", buttonClick);
  // App Logic
  correctMeaning = dictionary.words[randomNumber1].definition;
  questionCounter--;
}
function showResult() {
  console.log("Making Last question");
  var vocabIntroDiv = document.querySelector(".vocab-app-intro");
  if (vocabIntroDiv) {
    while (vocabIntroDiv.firstChild) {
      vocabIntroDiv.removeChild(vocabIntroDiv.firstChild);
    }
  }
  document.title = "Assignment 5:GUI Testing:Result";

  // Result Image
  var image = document.createElement("img");
  image.src = "../others/result_art.png";
  image.alt = "image failed to load";
  image.className = "word-logo";

  // Create Card Title
  var cardTitle = document.createElement("h6");
  cardTitle.textcontent = "See How You Did:";

  // Create result DIV
  var resultDiv = document.createElement("div");
  resultDiv.className = "answer-options";
  // Correct
  var correct = document.createElement("p");
  correct.textContent = "Correct: " + correctAnswers;
  correct.className = "the-result";
  // Total
  var total = document.createElement("p");
  total.textContent = "Total: " + totalQuestions;
  total.className = "the-result";
  // Percentage
  var percentage = document.createElement("p");
  percentage.textContent =
    "Percentage: " + (correctAnswers / totalQuestions) * 100;
  percentage.className = "the-result";
  // Checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "preference";
  checkbox.name = "preference";
  checkbox.value = "1";
  // Label for checkbox
  var checkboxLabel = document.createElement("label");
  checkboxLabel.for = "preference";
  checkboxLabel.id = "checkbox-label";
  checkboxLabel.textContent = "Would you recommend this quiz to your friend?";
  // Line break
  var lineBreak = document.createElement("br");
  // Slider Label
  var sliderLabel = document.createElement("label");
  sliderLabel.for = "difficulty";
  sliderLabel.id = "slider-ka-label";
  sliderLabel.textContent = "Rate this quiz (1-10):";
  // Slider
  var slider = document.createElement("input");
  slider.type = "range";
  slider.id = "rating-input";
  slider.name = "difficulty";
  slider.min = "1";
  slider.max = "10";
  slider.value = "1";
  // Adding as DIV child
  resultDiv.appendChild(correct);
  resultDiv.appendChild(total);
  resultDiv.appendChild(percentage);
  resultDiv.appendChild(lineBreak);
  resultDiv.appendChild(sliderLabel);
  resultDiv.appendChild(slider);
  resultDiv.appendChild(lineBreak);
  resultDiv.appendChild(checkbox);
  resultDiv.appendChild(checkboxLabel);

  // button
  var anotherAttemptButton = document.createElement("button");
  anotherAttemptButton.classList = "average-button";
  anotherAttemptButton.textContent = "Take Again";

  // Commit the elements to the DOM
  vocabIntroDiv.appendChild(image);
  vocabIntroDiv.appendChild(cardTitle);
  vocabIntroDiv.appendChild(resultDiv);
  vocabIntroDiv.appendChild(anotherAttemptButton);

  // Adding event listeners
  var averagebutton = document.querySelector(".average-button");
  averagebutton.addEventListener("click", buttonClick);
}
function createIndex() {
  console.log("Making Last question");
  var vocabIntroDiv = document.querySelector(".vocab-app-intro");
  if (vocabIntroDiv) {
    while (vocabIntroDiv.firstChild) {
      vocabIntroDiv.removeChild(vocabIntroDiv.firstChild);
    }
  }
  document.title = "Assignment 5:GUI Testing:Index";
  vocabIntroDiv.innerHTML = `
  <img src="../others/vocab.png" alt="img failed to load" class="logo" />
  <h6>Test Your Vocabulary</h6>
  <label for="difficulty" id="difficulty-label">Difficulty Level:</label>
  <br />
  <span id="low-span">Low</span>
  <input
    type="range"
    id="difficulty"
    name="difficulty"
    min="1"
    max="3"
    value="1"
  />
  <span id="high-span"> High</span>
  <div class="total-questions">
    <p id="total-questions-text">Total Questions:</p>
    <input
      type="radio"
      id="preference1"
      name="preference"
      value="10"
      checked
    />
    <label for="preference1">10 questions</label>

    <input type="radio" id="preference2" name="preference" value="15" />
    <label for="preference2">15 questions</label>

    <input type="radio" id="preference3" name="preference" value="20" />
    <label for="preference3">20 questions</label>
  </div>
  <button class="average-button">Take Quiz</button>
`;
}
