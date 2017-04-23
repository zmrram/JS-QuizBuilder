/*
	return the quiz that was selected to be load. The reason I make a seperate
	module for this because I use this function for both the loader and the grade
	so it's better than having the same code in both module.
*/
var myQuiz = (function (){
	var savedQuizzes = document.getElementById('saved-quizzes');
	var saved_quizzes = [];
	if(typeof(Storage) !== "undefined") {
        if (localStorage.savedQuizData) {
            saved_quizzes = JSON.parse(localStorage.savedQuizData);
        } 
    }else {
    	alert("Browser doesn't support web storage")
    }
	return{
		getQuiz : function (){
			var quiz = null;
			if (savedQuizzes.elements['built_quiz'].value === frenchQuiz.name){
				quiz = frenchQuiz;
			}
			else{
				for (var i = 0; i < saved_quizzes.length; i++){
					if (savedQuizzes.elements['built_quiz'].value === saved_quizzes[i].name){
						quiz = saved_quizzes[i];
					}
				}
			}
			if(savedQuizzes.elements['built_quiz'].value == ""){
				alert("No quiz was chosen, load the presaved quiz");
				quiz = frenchQuiz;
			}
			return quiz;
		}
	};
}());