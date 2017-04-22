
//Add an event listener (onclick) onto the [Start New Quiz] button
document.getElementById("start_quiz").onclick =  function (e){
	e.preventDefault;
	//Hide the 2 buttons
	document.getElementById("start_quiz").style.display = "none";
	document.getElementById("build_quiz").style.display = "none";
	document.getElementById("saved-quizzes").style.display = "none";
	//Run the javascript code in the module loader.js
	loadquiz();
};

/*
	This is a closure of the loader.js, inside this closure I will be doing
	loading the customize quizes from a localStorage that was build or just load
	pre-made quiz from pre_saved_quiz.js
*/
var loadquiz = (function(){

	//load prev and next button to traverse through the quiz
	function loadButton(){
		var prev = document.createElement("button");
		var next = document.createElement("button");
		var done = document.createElement("button");
		prev.id = "prev_button";
		next.id = "next_button";
		done.id = "done_button";
		prev.innerHTML = "Prev";
		next.innerHTML = "Next";
		done.innerHTML = "Done";
		var div = document.getElementById('content-container');
		div.appendChild(prev);
		div.appendChild(next);
		div.appendChild(done);
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
		document.getElementById('next_button').remove();
		document.getElementById('prev_button').remove();
		document.getElementById('done_button').remove();
		document.getElementById("start_quiz").style.display = "";
		document.getElementById("build_quiz").style.display = "";
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
			updateScore(gradeQuiz.grade(answerArr),answerArr.length);
		}
	}

	function init(){
		loadButton();
		loadQuiz(listener);
	}

	var quiz = myQuiz.getQuiz(); 
	init();
});