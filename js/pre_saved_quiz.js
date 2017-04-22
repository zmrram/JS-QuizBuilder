/*
	This is just a pre-saved quiz, hold basic info such as quiz name, and
	all the question/answers in the quiz. 
*/
var frenchQuiz = (function () {
    var allQuestions = [];
	function quiz_question(question,choices,correctAnswer){
		this.question = question;
		this.choices = choices;
		this.correctAnswer = correctAnswer;
	}
	allQuestions.push(new quiz_question("Who is Prime Minister of the United Kingdom?",["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],"David Cameron"));
	allQuestions.push(new quiz_question("What's my name",["Tin","Eric","Kuan","John"], "Tin"));
	var quiz = {
		name : "presaved quiz",
		content: allQuestions
	};
	return quiz;
})();

