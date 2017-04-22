/*
	return the quiz that was selected to be load. The reason I make a seperate
	module for this because I use this function for both the loader and the grade
	so it's better than having the same code in both module.
*/
var myQuiz = (function (){
	var savedQuizzes = document.getElementById('saved-quizzes');
	return{
		getQuiz : function (){
			var quiz = null;
			if (savedQuizzes.elements['built_quiz'].value === frenchQuiz.name){
				quiz = frenchQuiz;
			}
			if(savedQuizzes.elements['built_quiz'].value == ""){
				alert("No quiz was chosen, load the presaved quiz");
				quiz = frenchQuiz;
			}
			return quiz;
		}
	};
}());