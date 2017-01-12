'use strict';

const APP_ID = undefined;
const AlexaSkill = require('./AlexaSkill.js');

const TechQuestion = function() {
  AlexaSkill.call(this, APP_ID);
};

// Requiring in technical questions from lib directory to be used here.
const TECHQUESTIONS = require('./lib/tech-questions');

TechQuestion.prototype = Object.create(AlexaSkill.prototype);
TechQuestion.prototype.constructor = TechQuestion;

TechQuestion.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
  // TODO: takes 2 parms of sessionStartedRequest and session
  console.log(`sessionStartedRequest ID: ${sessionStartedRequest.requestId} - session ID: ${session.sessionId}`);
};

TechQuestion.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
  // TODO: takes 3 params of LaunchRequest, session, and response
  console.log(`launchRequest ID: ${launchRequest.requestId} - session ID: ${session.sessionId}`);
  let speechOutput = 'Welcome to the Technical Interview Whiteboaring trainer. Are you ready to get started?';
  let repromptText = 'Are you ready to get started?';
  response.ask(speechOutput, repromptText);
};

TechQuestion.prototype.eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
  // TODO: takes 2 parms of sessionEndedRequest and session
  console.log(`sessionEndedRequest ID: ${sessionEndedRequest.requestId} - session ID: ${session.sessionId}`);
};

TechQuestion.prototype.intentHandlers = {
  // TODO: add GetQuestionIntent
  // TODO: add DontKnowIntent
  // TODO: GiveHintIntent (STRETCH GOAL)
  // TODO: ShowAnswerIntent (STRETCH GOAL)
  // TODO: AMAZON.StartOverIntent
  // TODO: AMAZON.RepeatIntent
  // TODO: AMAZON.HelpIntent
  // TODO: AMAZON.StopIntent
  // TODO: AMAZON.CancelIntent
};

function newQuestion(response) {
  let randomQuestion = Math.floor(Math.random() * TECHQUESTIONS.length);
  let question = TECHQUESTIONS[randomQuestion];
  console.log(question);

  let speechOutput = `Here is your question <break time = \"0.3s\"/> ${question}`;
  let cardTitle = 'Whiteboaring Question';
  response.askWithCard(speechOutput, cardTitle, question);
}

exports.handler = function(event, context) {
  let question = new TechQuestion();
  question.execute(event, context);
};
