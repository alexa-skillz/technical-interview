'use strict';

const APP_ID = undefined;
const AlexaSkill = require('./AlexaSkill.js');

const TechQuestion = function() {
  AlexaSkill.call(this, APP_ID);
};

// Requiring in technical questions from lib directory to be used here.
const TECHQUESTIONS = require('./lib/tech-questions');
console.log(TECHQUESTIONS);

TechQuestion.prototype = Object.create(AlexaSkill.prototype);
TechQuestion.prototype.constructor = TechQuestion;

TechQuestion.prototype.eventHandlers.onSessionStarted = function() {
  // TODO: takes 2 parms of sessionStartedRequest and session
};

TechQuestion.prototype.eventHandlers.onLaunch = function() {
  // TODO: takes 3 params of LaunchRequest, session, and response
};

TechQuestion.prototype.eventHandlers.onSessionStarted = function() {
  // TODO: takes 2 parms of sessionEndedRequest and session
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

exports.handler = function(event, context) {
  let question = new TechQuestion();
  question.execute(event, context);
};
