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
  'GetQuestionIntent': function(intent, session, response) {
    let speechOutput = 'Here is your question:';
    response.tell(speechOutput);
    newQuestion(response);
  },
  // TODO: add DontKnowIntent
  'DontKnowIntent': function(intent, session, response) {
    newQuestion(response);
  },
  // TODO: AMAZON.StartOverIntent
  // 'AMAZON.StartOverIntent': function(intent, session, response) {
  //
  // },
  // TODO: AMAZON.RepeatIntent
  // 'AMAZON.RepeatIntent': function(intent, session, response) {
  //
  // },
  // TODO: AMAZON.HelpIntent
  'AMAZON.HelpIntent': function(intent, session, response) {
    let repromptText = 'Are you ready to get started?';
    let speechOutput = 'The Technical Interview Whiteboaring trainer contains a collection of common JavaScript whiteboaring quesitons. You can ask for a question by saying <break time = \"0.3s\"/> give me a whiteboarding question. You can also end your current training session at any time by saying stop, cancel, or exit.';
    response.ask(speechOutput, repromptText);
  },
  // TODO: AMAZON.NoIntent
  'AMAZON.NoIntent': function(intent, session, response) {
    let speechOutput = '';
    response.tell(speechOutput);
  },
  // TODO: AMAZON.YesIntent
  'AMAZON.YesIntent': function(intent, session, response) {
    let speechOutput = 'Here is your question:';
    response.tell(speechOutput);
    newQuestion(response);
  },
  // TODO: AMAZON.StopIntent
  'AMAZON.StopIntent': function(intent, session, response) {
    let speechOutput = '';
    response.tell(speechOutput);
  },
  // TODO: AMAZON.CancelIntent
  'AMAZON.CancelIntent': function(intent, session, response) {
    let speechOutput = '';
    response.tell(speechOutput);
  },
  'AMAZON.ExitIntent': function(intent, session, response) {
    let speechOutput = '';
    response.tell(speechOutput);
  }
  // TODO: GiveHintIntent (STRETCH GOAL)
  // TODO: ShowAnswerIntent (STRETCH GOAL)
};

function newQuestion(response) {
  let randomQuestion = Math.floor(Math.random() * TECHQUESTIONS.length);
  let spokenQuestion = Object.keys(TECHQUESTIONS[randomQuestion])[0];

  console.log(spokenQuestion);

  let speechOutput = `Here is your question <break time = \"0.3s\"/> ${spokenQuestion}`;
  let cardTitle = 'Whiteboaring Question';
  response.askWithCard(speechOutput, cardTitle, spokenQuestion);
}

exports.handler = function(event, context) {
  let question = new TechQuestion();
  question.execute(event, context);
};
