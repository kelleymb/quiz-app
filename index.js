//creating the variable quizScore and questionNumber and setting their starting value to 0
let quizScore = 0;
let questionNumber = 0;

//create a function that handles the quiz start button and starts quiz,
//submit choices for each quiz question with submit button
//display next quiz question when user clicks the next question button
function startQuiz() {
    $('#startButton').on('click', function (event) {
        event.preventDefault();
        quizDisplay();
    });

    $('body').on('submit', '.quizQuestions', function (event) {
        event.preventDefault();
        feedbackDisplay();
    }); 

    $('body').on('click', '.next', function (event) {
        console.log('nextbutton is working');
        if (questionNumber < STORE.length - 1) {
            questionNumber += 1;
            $('.responseContainer').hide();
            quizDisplay();
        console.log('nextbutton has intitiated quizDisplay()');
        } else if (questionNumber === STORE.length -1) {
            finalScore();
            $('.responseContainer').hide();
        }
        console.log('finalScore is being called by nextbutton')
    });

    $('body').on('click', '#restartButton', function (event) {
        //reset quizScore and quizNumber
        quizScore = 0;
        questionNumber = 0;
        currentQuestionAndScore();
        //hide restart container
        $('.questionContainer').show();
        $('.restartContainer').hide();
        quizDisplay();
        console.log('restartbutton is working');
    });
    console.log('startQuiz is working');
}

//create a function that will update
//the current score and quiz question for the questionInfo class
function currentQuestionAndScore() {
    $('.questionNumber').html(questionNumber + 1);
    $('.quizScore').html(quizScore);
    console.log('currentScoreAndQuestion is working');
}

//create a function that will display the current quiz question and choices
//allow for user to submit the userAnswer with a submit button
//update current question and current score of user
function quizDisplay() {
    $('.quizBox').hide();
    currentQuestionAndScore();
    const question = STORE[questionNumber];
    const questionHtml = $(`<form class="quizQuestions">
        <fieldset>
            <legend><span>${question.question}</span></legend>
            <input type="radio" name="choices" value="${question.choices[0]}"/>
            <label for="optionOne">${question.choices[0]}</label><br>
            <input type="radio" name="choices" value="${question.choices[1]}"/>
            <label for="optionTwo">${question.choices[1]}</label><br>
            <input type="radio" name="choices" value="${question.choices[2]}"/>
            <label for="optionThree">${question.choices[2]}</label><br>
            <input type="radio" name="choices" value="${question.choices[3]}"/>
            <label for="optionFour">${question.choices[3]}</label><br><br>
            <button type="submit" class="submit" id="submitButton">Submit</button>
        </fieldset>
    </form>`);
    $('.questionContainer').html(questionHtml).show();
    console.log('quizDisplay is working');
}

//create a function that updates the current user score
//and displays that current score on the DOM
function updateScore() {
    quizScore++;
    $('.quizScore').text(quizScore);
    console.log('the score is:', quizScore);
}

//create a function that generates html for positive feedback
//updates the user's score when answered correctly
//display next question button
function correctFeedback() {
    updateScore();
    $('.questionContainer').hide();
    $('.responseContainer').html(`<h3>Correct!</h3>
    <button type="button" class="next" id="nextButton">Next</button>`);
    console.log('correctFeedback is working');
}

//create a function that generates html with the correct answer
//display next question button
function incorrectFeedback() {
    $('.questionContainer').hide();
    $('.responseContainer').html(`<h3>Incorrect! The correct answer is ${STORE[questionNumber].correctAnswer}</h3>
    <button type="button" class="next" id="nextButton">Next</button>`);
    console.log('incorrectFeedback is working');
}

//create a function to display 
//correct or incorrect feedback based on the user choice
function feedbackDisplay() {
    let userAnswer = $('input[name="choices"]:checked').val();
    console.log('userAnswer is working',userAnswer);

    if (userAnswer) {
        if (userAnswer === STORE[questionNumber].correctAnswer) {
            correctFeedback();
            $('.responseContainer').show();
        } else {
            incorrectFeedback();
            $('.responseContainer').show();
        } 
    }
    console.log('feedbackDisplay is working'); 
}

//create a function that will display the overall score screen
//along with a restart button 
function finalScore() {
    $('.responseContainer').hide();
    $('.restartContainer').html(`
        <section class="restartContainer">
            <h3>How much do you know about Greek Mythology?</h3>
            <h3>Your total score is ${quizScore * 10 + '%'}</h3>
            <label for="restartButton">Let's try that again!</label><br>
            <br><button type="button" id="restartButton">Restart</button>
        </section>`);
}

$(startQuiz);