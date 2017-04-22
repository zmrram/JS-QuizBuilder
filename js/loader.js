
//Add an event listener (onclick) onto the [Start New Quiz] button
document.getElementById("start_quiz").onclick =  function (e){
	e.preventDefault;
	//Hide the 2 buttons
	document.getElementById("start_quiz").style.display = "none";
	document.getElementById("build_quiz").style.display = "none";
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
		prev.id = "prev_button";
		next.id = "next_button";
		prev.innerHTML = "Prev";
		next.innerHTML = "Next";
		var div = document.getElementById('content-container');
		div.appendChild(prev);
		div.appendChild(next);
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

	function listener(index){
		var currentQuestionIndex = index;
		var quizbox = document.getElementById('quiz-container');
		var next = document.getElementById('next_button');
		var prev = document.getElementById('prev_button');
		next.onclick = function (e){
			e.preventDefault();
			if ((currentQuestionIndex + 1) < quizbox.children.length){
				quizbox.children[currentQuestionIndex].style.display = "none";
				quizbox.children[currentQuestionIndex + 1].style.display = "";
				currentQuestionIndex += 1;
			}
		};
		prev.onclick = function (e){
			e.preventDefault();
			if ((currentQuestionIndex - 1) >= 0){
				quizbox.children[currentQuestionIndex].style.display = "none";
				quizbox.children[currentQuestionIndex - 1].style.display = "";
				currentQuestionIndex -= 1;
			}
		};
	}

	function init(){
		loadButton();
		loadQuiz(listener);
	}
	var quiz = frenchQuiz;
	init();
});