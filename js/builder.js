var buildquiz = (function (e) {

	function loadButton(){
		document.getElementById('add_button').style.display = "";
		document.getElementById('finish_button').style.display = "";
		document.getElementById('back_button').style.display = "";
		document.getElementById('delete_button').style.display = "";
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

	function updateSavedQuizzes(name){
		if (name !== null){
			var saved_folder = document.getElementById('saved-quizzes');
			var input = document.createElement('input');
			var label = document.createElement('label');
			input.type = "radio";
			input.name = "built_quiz";
			label.id = name;
			input.value = name;
			label.appendChild(input);
			label.innerHTML += name;
			saved_folder.appendChild(label);
		}
	}

	function deleteQuiz(){
		var index = -1;
		var name = null;
		var saved_folder = document.getElementById('saved-quizzes');
		for (var i = 0; i < savedquizzes.length; i++){
			if (saved_folder.elements['built_quiz'].value === savedquizzes[i].name){
			index = i;
			name = saved_folder.elements['built_quiz'].value;
			}
		}
		savedquizzes.splice(index, 1);
		localStorage.savedQuizData = JSON.stringify(savedquizzes);
		var deletedquiz = document.getElementById(name);
		deletedquiz.remove();
	}

	function returnToMain(){
		document.getElementById('add_button').style.display = "none";
		document.getElementById('finish_button').style.display = "none";
		document.getElementById('back_button').style.display = "none";
		document.getElementById('delete_button').style.display = "none";
		document.getElementById('quiz-builder-form').style.display = "none";
		document.getElementById("front-page-button").style.visibility = "visible";
	}

	function listener(){
		console.log("hey!!");
		var add = document.getElementById('add_button');
		var save = document.getElementById('finish_button');
		var deleteB = document.getElementById('delete_button');
		var back = document.getElementById('back_button');
		add.onclick = function (e){
			e.preventDefault();
			addQuestion();
		};
		save.onclick = function (e){
			e.preventDefault();
			addQuestion();
			saveQuiz(updateSavedQuizzes);
		}
		deleteB.onclick = function (e) {
			e.preventDefault();
			deleteQuiz();
		}
		back.onclick = function (e) {
			returnToMain();
		}
	}

	function init(){

		if(typeof(Storage) !== "undefined") {
	        if (localStorage.savedQuizData) {
	            savedquizzes = JSON.parse(localStorage.savedQuizData);
	        } else {
	            localStorage.savedQuizData = [];
	        }
	    }
	    var builder_form = document.getElementById('quiz-builder-form');
		builder_form.style.display = "";
		loadButton();
		listener();
	}
	var savedquizzes = [];
	var allQuestions = [];
	init();
});