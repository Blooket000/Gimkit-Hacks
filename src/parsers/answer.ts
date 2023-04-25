import { WebSocketData } from "../websocket";

const getCorrectIndex = function(ovrQuestion?: any) {
  const question = ovrQuestion ?? getQuestion();
  const correct = getCorrect(question.answers);
  const choices = getChoices();
  if(question.type === "text") return {
    index: -1,
    type: "input",
    text: correct.text,
    choice: correct,
    element: null
  }
  for(const choice of choices) {
    const text = choice.textContent;
    const img = choice.getElementsByTagName("img")[0]?.src ?? "";
    // create 'validate' parameter; add second loop here to check if the choice(element) is one of the question.answers
    // then add 1 to score if true, and return the end value (hopefully 4, however depends on question type)
    if((correct.text || "") === text && (correct.image || "") === img) {
      return {
        index: choices?.indexOf(choice),
        type: "text",
        text: correct.text ?? "",
        choice: correct,
        element: choice
      }
    }
  }
  return { type: null }
}
const getCorrect = function(choices: any) {

  for(const choice of choices ?? []) {
    if(choice.correct) {
      let type = "text";
      if(!choice.text) type = "image";
      choice.type = type;
      return choice;
    }
  }
  return { type: null }
}
const getChoices = function() {
  return Array.from(document.querySelector(".sc-hKFoFe")?.children ?? []);
}
const getQuestion = function() {
  const questionList = WebSocketData.GAME_QUESTIONS;
  const details = getQuestionElement();
  if(!details || !questionList) return { type: null };

  let questions = [];
  for(const question of questionList) {
    if(details.img === question.image && details.text === question.text) {
      questions.push(question);
    }
  }

  for(const question of questions) {
    const data = getCorrectIndex(question);
    if(data?.type) return question;
  }

  return { type: null };
}
const getQuestionElement = function() {

  const question = document.querySelector(".notranslate.lang-en") || document.querySelector("img[alt=Question]");
  if(question) {
    const img = (document.querySelector("img[alt=Question]") as HTMLImageElement)?.src ?? "";
    const text = question.textContent;
    return { img, text }
  }else return { type: null }
}

export { getCorrectIndex, getCorrect, getChoices, getQuestion, getQuestionElement };