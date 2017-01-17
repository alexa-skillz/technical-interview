'use strict';

const APP_ID = 'arn:aws:lambda:us-east-1:862183905867:function:Technical-Interview';
const AlexaSkill = require('./AlexaSkill.js');

const TechQuestion = function() {
  AlexaSkill.call(this, APP_ID);
};

const TECHQUESTIONS = require('./lib/tech-questions');

TechQuestion.prototype = Object.create(AlexaSkill.prototype);
TechQuestion.prototype.constructor = TechQuestion;

TechQuestion.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
  console.log(`sessionStartedRequest ID: ${sessionStartedRequest.requestId} - session started ID: ${session.sessionId}`);
};

TechQuestion.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
  console.log(`launchRequest ID: ${launchRequest.requestId} - session launch ID: ${session.sessionId}`);
  let speechOutput = 'Welcome to the Technical Interview Whiteboaring trainer. Are you ready to get started?';
  let repromptText = 'Are you ready to get started?';
  response.ask(speechOutput, repromptText);
};

TechQuestion.prototype.eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
  console.log(`sessionEndedRequest ID: ${sessionEndedRequest.requestId} - session ended ID: ${session.sessionId}`);
};

TechQuestion.prototype.intentHandlers = {
  'GetQuestionIntent': function(intent, session, response) {
    let speechOutput = 'Here is your question:';
    response.tell(speechOutput, newQuestion(response));
  },
  'DontKnowIntent': function(intent, session, response) {
    let speechOutput = 'Here is your question:';
    response.tell(speechOutput, newQuestion(response));
  },
  // TODO: AMAZON.StartOverIntent
  // 'AMAZON.StartOverIntent': function(intent, session, response) {
  //
  // },
  // TODO: AMAZON.RepeatIntent
  // 'AMAZON.RepeatIntent': function(intent, session, response) {
  //
  // },
  'AMAZON.HelpIntent': function(intent, session, response) {
    let repromptText = 'Are you ready to get started?';
    let speechOutput = 'The Technical Interview Whiteboaring trainer contains a collection of common JavaScript whiteboaring quesitons. You can ask for a question by saying... give me a whiteboarding question. You can also end your current training session at any time by saying stop, cancel, or exit.';
    response.ask(speechOutput, repromptText);
  },
  'AMAZON.NoIntent': function(intent, session, response) {
    let speechOutput = '';
    response.tell(speechOutput);
  },
  'AMAZON.YesIntent': function(intent, session, response) {
    let speechOutput = 'Here is your question:';
    response.tell(speechOutput, newQuestion(response));
  },
  'AMAZON.StopIntent': function(intent, session, response) {
    let speechOutput = '';
    response.tell(speechOutput);
  },
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
  let spokenQuestion = TECHQUESTIONS[randomQuestion].response.outputSpeech.text;
  let cardImage = TECHQUESTIONS[randomQuestion].response.card.image;
  let cardText = TECHQUESTIONS[randomQuestion].response.card.text;
  let cardTitle = TECHQUESTIONS[randomQuestion].response.card.title;
  let speechOutput = `Here is your question:\r\n ${spokenQuestion}`;
  let repromptSpeech = `Here is your question:\r\n ${spokenQuestion}`;

  response.askWithCard(speechOutput, repromptSpeech, cardTitle, cardText, cardImage);
}

exports.handler = function(event, context) {
  let question = new TechQuestion();
  question.execute(event, context);
};
