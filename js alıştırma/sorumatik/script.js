
const questions = document.querySelectorAll(".question");

console.log(questions); //liste döndürdü, forEach kullanacağız.

questions.forEach(question => {
    question.addEventListener("click", function () {
        question.classList.toggle("active");
    });
});