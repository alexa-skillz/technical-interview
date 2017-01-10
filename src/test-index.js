'use strict';
const debug = require ('debug')('tech:index');

// App ID for the skill.
var APP_ID = undefined;

// Array containing behavioral questions.
var QUESTIONS = [
  'Tell me about a time when your project failed.',
  'Tell me about a time when you were struggling to meet a deadline.'
];

// Require the AlexaSkill prototype and helper functions.
var AlexaSkill = require('./test-AlexaSkill');

// interviewTechQuestions is a child of AlexaSkill via inheritance.
var TechQuestion = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
TechQuestion.prototype = Object.create(AlexaSkill.prototype);
TechQuestion.prototype.constructor = TechQuestion;

TechQuestion.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  debug('TechQuestion.eventHandlers.onSessionStarted ------- sessionStartedRequest\r\n\r\n', sessionStartedRequest);
  debug('TechQuestion.eventHandlers.onSessionStarted ------- session\r\n\r\n', session);
  console.log('onSessionStarted requestId: ' + sessionStartedRequest.requestId + ', sessionId: ' + session.sessionId);
  // any initialization logic goes here
};

TechQuestion.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  debug('TechQuestion.eventHandlers.onLaunch ------- launchRequest\r\n\r\n', launchRequest);
  debug('TechQuestion.eventHandlers.onLaunch ------- session\r\n\r\n', session);
  debug('TechQuestion.eventHandlers.onLaunch ------- response\r\n\r\n', response);
  handleNewTechQuestionRequest(response);
};

// Overridden to show that a subclass can override this function to teardown session state.
TechQuestion.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  debug('TechQuestion.eventHandlers.onSessionEnded ------- sessionEndedRequest\r\n\r\n', sessionEndedRequest);
  debug('TechQuestion.eventHandlers.onSessionEnded ------- session\r\n\r\n', session);
  console.log('onSessionEnded requestId: ' + sessionEndedRequest.requestId + ', sessionId: ' + session.sessionId);
  // any cleanup logic goes here
};

TechQuestion.prototype.intentHandlers = {
  'GetQuestionIntent': function (intent, session, response) {
    debug('TechQuestion.intentHandlers.GetQuestionIntent ------- intent\r\n\r\n', intent);
    debug('TechQuestion.intentHandlers.GetQuestionIntent ------- session\r\n\r\n', session);
    debug('TechQuestion.intentHandlers.GetQuestionIntent ------- response\r\n\r\n', response);
    handleNewTechQuestionRequest(response);
  },

  'AMAZON.HelpIntent': function (intent, session, response) {
    debug('TechQuestion.intentHandlers.AMAZON.HelpIntent ------- intent\r\n\r\n', intent);
    debug('TechQuestion.intentHandlers.AMAZON.HelpIntent ------- session\r\n\r\n', session);
    debug('TechQuestion.intentHandlers.AMAZON.HelpIntent ------- response\r\n\r\n', response);
    response.ask('You can say give me a behavioral question, or, you can say exit... What can I help you with?", "What can I help you with?');
  },

  'AMAZON.StopIntent': function (intent, session, response) {
    debug('TechQuestion.intentHandlers.AMAZON.StopIntent ------- intent\r\n\r\n', intent);
    debug('TechQuestion.intentHandlers.AMAZON.StopIntent ------- session\r\n\r\n', session);
    debug('TechQuestion.intentHandlers.AMAZON.StopIntent ------- response\r\n\r\n', response);
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  },

  'AMAZON.CancelIntent': function (intent, session, response) {
    debug('TechQuestion.intentHandlers.AMAZON.CancelIntent ------- intent\r\n\r\n', intent);
    debug('TechQuestion.intentHandlers.AMAZON.CancelIntent ------- session\r\n\r\n', session);
    debug('TechQuestion.intentHandlers.AMAZON.CancelIntent ------- response\r\n\r\n', response);
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  }
};

// Gets a random new behavioral question from the list and returns to the user.
function handleNewTechQuestionRequest(response) {
  debug('handleNewTechQuestionRequest ------- response\r\n\r\n', response);
  // Get a random interview behavioral question from the interview behavioral question list
  var questionsIndex = Math.floor(Math.random() * QUESTIONS.length);
  var randomTechQuestion = QUESTIONS[questionsIndex];

  // Create speech output
  var speechOutput = 'Here is your question: ' + randomTechQuestion;
  var cardTitle = 'Your TechQuestional Interview Question';
  response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  debug('handler ------- event\r\n\r\n', event);
  debug('handler ------- context\r\n\r\n', context);
  // Create an instance of the interviewTechQuestions skill.
  var behavior = new TechQuestion();
  debug('handler ------- behavior\r\n\r\n', behavior);
  debug('handler ------- behavior.execute\r\n\r\n', behavior.execute);
  behavior.execute(event, context);
};
