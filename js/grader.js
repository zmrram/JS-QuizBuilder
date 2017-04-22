/*
	Quiz grader, called by using gradeQuiz.grade(and array of answers)
	Will traverse through that array and compare with the answer in the
	quiz bank.
*/
var gradeQuiz = (function (){
	var quiz = myQuiz.getQuiz();
	return {
		grade : function(answerArr){
			var correctCounter = 0;
			for (var i = 0; i < answerArr.length; i++){
				if (answerArr[i] === quiz.content[i].correctAnswer){
					correctCounter++;
				}
			}
			return correctCounter;
		}
	};
}());