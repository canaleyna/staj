
const questions = document.querySelectorAll(".question");

console.log(questions); //liste d�nd�rd�, forEach kullanaca��z.

questions.forEach(question => {
    question.addEventListener("click", function () {
        question.classList.toggle("active");
    });
});