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

	function listener(){

	}
	
	function init(){
		loadButton();
		var builder_form = document.getElementById('quiz-builder-form');
		builder_form.style.visibility = "visible";

	}
	init();
});