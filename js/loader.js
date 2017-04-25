/*
	This is a closure of the loader.js, inside this closure I will be doing
	loading the customize quizes from a localStorage that was build or just load
	pre-made quiz from pre_saved_quiz.js
*/
var loadquiz = (function(){

	//load prev and next button to traverse through the quiz
	function loadButton(){
		document.getElementById("quiz-taking-button").style.display = "";
	}

	/*
		Load all the quiz question into the quiz-container div but have them
	  	hidden so that we can pull them up one by one later.
	*/
	function loadQuiz (callback){
		var quizbox = document.getElementById('quiz-container');
		for (var i = 0 ; i < quiz.content.length; i++){
			var form = document.createElement('form');
			form.innerHTML = (i+1) + ". " + quiz.content[i].question;
			for (var j = 0; j < quiz.content[i].choices.length; j++){
				var choice = document.createElement('label');
				var input = document.createElement('input');
				input.type = "radio";
				input.name = "choice";
				input.value = quiz.content[i].choices[j];
				choice.appendChild(input);
				choice.innerHTML += quiz.content[i].choices[j];
				form.appendChild(choice);
			}
			form.style.display = "none";
			quizbox.appendChild(form);
		}
		quizbox.children[0].style.display = "";
		callback(0);
	}

	function updateScore(score,size) {
		alert ("YOU GOT " + score + " OUT OF " + size + " QUESTIONS");
		document.getElementById("quiz-taking-button").style.display = "none";
		document.getElementById('front-page-button').style.visibility = "visible";
		document.getElementById("saved-quizzes").style.display = "";
	}

	/*
		Flip through each question on the quiz. Only one question will be shown at a time.
	*/
	function listener(index){
		var currentQuestionIndex = index;
		var quizbox = document.getElementById('quiz-container');
		var next = document.getElementById('next_button');
		var prev = document.getElementById('prev_button');
		var done = document.getElementById('done_button');
		var answerArr = Array.apply(null, Array(quizbox.children.length)).map(String.prototype.valueOf,"");
		next.onclick = function (e){
			e.preventDefault();
			if ((currentQuestionIndex + 1) < quizbox.children.length){
				//hide the current question
				quizbox.children[currentQuestionIndex].style.display = "none";
				//update the answer;
				answerArr[currentQuestionIndex] = quizbox.children[currentQuestionIndex].elements['choice'].value;
				//display the next one
				quizbox.children[currentQuestionIndex + 1].style.display = "";
				currentQuestionIndex += 1;
			}
		};
		prev.onclick = function (e){
			e.preventDefault();
			if ((currentQuestionIndex - 1) >= 0){
				//hide the current question
				quizbox.children[currentQuestionIndex].style.display = "none";
				//update the answer;
				answerArr[currentQuestionIndex] = quizbox.children[currentQuestionIndex].elements['choice'].value;
				//display the previous one
				quizbox.children[currentQuestionIndex - 1].style.display = "";
				currentQuestionIndex -= 1;
			}
		};
		done.onclick = function (e) {
			e.preventDefault();
			//update the current question's answer, as I only update answer when Prev or Next is clicked
			answerArr[currentQuestionIndex] = quizbox.children[currentQuestionIndex].elements['choice'].value;
			//remove the quiz from the page
			while (quizbox.hasChildNodes()) {
    			quizbox.removeChild(quizbox.lastChild);
			}
			updateScore(gradeQuiz.grade(quiz,answerArr),answerArr.length);
		}
	}

	function init(){
		quiz = myQuiz.getQuiz();
		loadButton();
		loadQuiz(listener);
	}

	var quiz; 
	init();
});