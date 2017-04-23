var buildquiz = (function (e) {

	function loadButton(){
		var add = document.createElement("button");
		var finish = document.createElement("button");
		add.id = "add_button";
		finish.id = "finish_button";
		add.innerHTML = "Add Question";
		finish.innerHTML = "Finish & Save";
		var div = document.getElementById('content-container');
		div.appendChild(add);
		div.appendChild(finish);
	}

	function addQuestion(){
		var answer = "";
		var form = document.getElementById('quiz-builder-form');
		var option1 = form.elements['option-1'].value;
		var option2 = form.elements['option-2'].value;
		var option3 = form.elements['option-3'].value;
		var option4 = form.elements['option-4'].value;
		var correct_option = form.elements['answer-choices'].options[form.elements['answer-choices'].selectedIndex].value;
		switch(parseInt(correct_option)){
			case 1:
				answer = option1;
				break;
			case 2:
				answer = option2;
				break;
			case 3:
				answer = option3;
				break;
			default:
				answer = option4;
		}
		var quiz_question = {
			question : form.elements['question-input'].value,
			choices : [option1,option2,option3,option4],
			correctAnswer : answer
		};
		allQuestions.push(quiz_question);
		form.reset();
	}

	function saveQuiz(callback){
		var quiz_name = "";
		while (quiz_name == ""){
			quiz_name = prompt("Enter quiz name", "EX: Physic_Quiz");
		}
		var quiz = {
			name : quiz_name,
			content : allQuestions
		};
		savedquizzes.push(quiz);
		localStorage.savedQuizData = JSON.stringify(savedquizzes);
		console.log(savedquizzes);
		callback(quiz_name);
	}

	function updatePage(name){
		document.getElementById('add_button').style.display = "none";
		document.getElementById('finish_button').style.display = "none";
		var builder_form = document.getElementById('quiz-builder-form');
		builder_form.style.visibility = "hidden";
		var saved_folder = document.getElementById('saved-quizzes');
		var input = document.createElement('input');
		var label = document.createElement('label');
		input.type = "radio";
		input.name = "built_quiz";
		input.value = name;
		label.appendChild(input);
		label.innerHTML += name;
		saved_folder.appendChild(label);
		document.getElementById("start_quiz").style.display = "";
		document.getElementById("build_quiz").style.display = "";
		document.getElementById("saved-quizzes").style.display = "";
	}

	function listener(){
		var add = document.getElementById('add_button');
		var save = document.getElementById('finish_button');
		add.onclick = function (e){
			e.preventDefault();
			addQuestion();
		};
		save.onclick = function (e){
			e.preventDefault();
			addQuestion();
			saveQuiz(updatePage);
		}
	}

	function init(){
		savedquizzes = [];
		allQuestions = [];
		if(typeof(Storage) !== "undefined") {
	        if (localStorage.savedQuizData) {
	            savedquizzes = JSON.parse(localStorage.savedQuizData);
	        } else {
	            localStorage.savedQuizData = [];
	        }
	    }
		loadButton();
		var builder_form = document.getElementById('quiz-builder-form');
		builder_form.style.visibility = "visible";
		listener();
	}
	var savedquizzes;
	var allQuestions;
	init();
});