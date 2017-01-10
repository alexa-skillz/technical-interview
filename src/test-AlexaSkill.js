'use strict';
const debug = require ('debug')('tech:AlexaSkill');

function AlexaSkill(appId) {
  debug('AlexaSkill ------- appId', appId);
  this._appId = appId;
}

AlexaSkill.speechOutputType = {
  PLAIN_TEXT: 'PlainText',
  SSML: 'SSML'
};


AlexaSkill.prototype.requestHandlers = {
  LaunchRequest: function (event, context, response) {
    debug('AlexaSkill.requestHandlers.LaunchRequest ------- event\r\n\r\n', event);
    debug('AlexaSkill.requestHandlers.LaunchRequest ------- context\r\n\r\n', context);
    debug('AlexaSkill.requestHandlers.LaunchRequest ------- response\r\n\r\n', response);
    debug('AlexaSkill.requestHandlers.LaunchRequest ------- this\r\n\r\n', this);
    debug('AlexaSkill.requestHandlers.LaunchRequest ------- event.request\r\n\r\n', event.request);
    debug('AlexaSkill.requestHandlers.LaunchRequest ------- event.session\r\n\r\n', event.session);
    this.eventHandlers.onLaunch.call(this, event.request, event.session, response);
  },

  IntentRequest: function (event, context, response) {
    debug('AlexaSkill.requestHandlers.IntentRequest ------- event\r\n\r\n', event);
    debug('AlexaSkill.requestHandlers.IntentRequest ------- context\r\n\r\n', context);
    debug('AlexaSkill.requestHandlers.IntentRequest ------- response\r\n\r\n', response);
    debug('AlexaSkill.requestHandlers.IntentRequest ------- this\r\n\r\n', this);
    debug('AlexaSkill.requestHandlers.IntentRequest ------- event.request\r\n\r\n', event.request);
    debug('AlexaSkill.requestHandlers.IntentRequest ------- event.session\r\n\r\n', event.session);
    this.eventHandlers.onIntent.call(this, event.request, event.session, response);
  },

  SessionEndedRequest: function (event, context) {
    debug('AlexaSkill.requestHandlers.SessionEndedRequest ------- event\r\n\r\n', event);
    debug('AlexaSkill.requestHandlers.SessionEndedRequest ------- context\r\n\r\n', context);
    debug('AlexaSkill.requestHandlers.SessionEndedRequest ------- event.request\r\n\r\n', event.request);
    debug('AlexaSkill.requestHandlers.SessionEndedRequest ------- event.session\r\n\r\n', event.session);
    this.eventHandlers.onSessionEnded(event.request, event.session);
    context.succeed();
  }
};

 // Override any of the eventHandlers as needed
AlexaSkill.prototype.eventHandlers = {
  // Called when the session starts. Subclasses could have overriden this function to open any necessary resources.
  onSessionStarted: function (sessionStartedRequest, session) {
    debug('AlexaSkill.eventHandlers.onSessionStarted ------- sessionStartedRequest\r\n\r\n', sessionStartedRequest);
    debug('AlexaSkill.eventHandlers.onSessionStarted ------- session\r\n\r\n', session);
  },

  // Called when the user invokes the skill without specifying what they want. The subclass must override this function and provide feedback to the user.
  onLaunch: function (launchRequest, session, response) {
    debug('AlexaSkill.eventHandlers.onLaunch ------- launchRequest\r\n\r\n', launchRequest);
    debug('AlexaSkill.eventHandlers.onLaunch ------- session\r\n\r\n', session);
    debug('AlexaSkill.eventHandlers.onLaunch ------- response\r\n\r\n', response);
    throw 'onLaunch should be overriden by subclass';
  },

  // Called when the user specifies an intent.
  onIntent: function (intentRequest, session, response) {
    var intent = intentRequest.intent,
      intentName = intentRequest.intent.name,
      intentHandler = this.intentHandlers[intentName];
    debug('AlexaSkill.eventHandlers.onIntent ------- intent\r\n\r\n', intent);
    debug('AlexaSkill.eventHandlers.onIntent ------- intentName\r\n\r\n', intentName);
    debug('AlexaSkill.eventHandlers.onIntent ------- intentHandler\r\n\r\n', intentHandler);
    if (intentHandler) {
      debug('AlexaSkill.eventHandlers.onIntent.IF ------- intentName\r\n\r\n', intentName);
      console.log('dispatch intent = ' + intentName);
      intentHandler.call(this, intent, session, response);
    } else {
      debug('AlexaSkill.eventHandlers.onIntent.ELSE ------- intentName\r\n\r\n', intentName);
      throw 'Unsupported intent = ' + intentName;
    }
  },

  // Called when the user ends the session. Subclasses could have overriden this function to close any open resources.
  onSessionEnded: function (sessionEndedRequest, session) {
    debug('AlexaSkill.eventHandlers.onSessionEnded ------- sessionEndedRequest\r\n\r\n', sessionEndedRequest);
    debug('AlexaSkill.eventHandlers.onSessionEnded ------- session\r\n\r\n', session);
  }
};

// Subclasses should override the intentHandlers with the functions to handle specific intents.
AlexaSkill.prototype.intentHandlers = {};

AlexaSkill.prototype.execute = function (event, context) {
  try {
    debug('AlexaSkill.execute ------- event\r\n\r\n', event);
    debug('AlexaSkill.execute ------- context\r\n\r\n', context);
    debug('AlexaSkill.execute ------- event.session.application.applicationId\r\n\r\n', event.session.application.applicationId);
    console.log('session applicationId: ' + event.session.application.applicationId);

    // Validate that this request originated from authorized source.
    if (this._appId && event.session.application.applicationId !== this._appId) {
      debug('AlexaSkill.execute.IF');
      console.log('The applicationIds do not match : ' + event.session.application.applicationId + ' and '
                + this._appId);
      throw 'Invalid applicationId';
    }

    if (!event.session.attributes) {
      debug('AlexaSkill.execute.IF ------- event.session.attributes\r\n\r\n', event.session.attributes);
      event.session.attributes = {};
    }

    if (event.session.new) {
      debug('AlexaSkill.execute.IF ------- event.session.new\r\n\r\n', event.session.new);
      this.eventHandlers.onSessionStarted(event.request, event.session);
    }

    // Route the request to the proper handler which may have been overriden.
    var requestHandler = this.requestHandlers[event.request.type];
    debug('AlexaSkill.execute ------- requestHandler\r\n\r\n', requestHandler);
    requestHandler.call(this, event, context, new Response(context, event.session));
  } catch (e) {
    debug('AlexaSkill.execute.Catch ------- e\r\n\r\n', e);
    console.log('Unexpected exception ' + e);
    context.fail(e);
  }
};

var Response = function (context, session) {
  debug('Response ------- context\r\n\r\n', context);
  debug('Response ------- session\r\n\r\n', session);
  debug('Response ------- this\r\n\r\n', this);
  debug('Response ------- this._context\r\n\r\n', this._context);
  debug('Response ------- this._session\r\n\r\n', this._session);
  this._context = context;
  this._session = session;
};

function createSpeechObject(optionsParam) {
  if (optionsParam && optionsParam.type === 'SSML') {
    debug('createSpeechObject.IF ------- optionsParam\r\n\r\n', optionsParam);
    return {
      type: optionsParam.type,
      ssml: optionsParam.speech
    };
  } else {
    return {
      type: optionsParam.type || 'PlainText',
      text: optionsParam.speech || optionsParam
    };
  }
}

Response.prototype = (function () {
  var buildSpeechletResponse = function (options) {
    debug('Response.buildSpeechletResponse ------- options\r\n\r\n', options);
    var alexaResponse = {
      outputSpeech: createSpeechObject(options.output),
      shouldEndSession: options.shouldEndSession
    };
    debug('Response.buildSpeechletResponse ------- alexaResponse\r\n\r\n', alexaResponse);
    if (options.reprompt) {
      alexaResponse.reprompt = {
        outputSpeech: createSpeechObject(options.reprompt)
      };
    }
    if (options.cardTitle && options.cardContent) {
      alexaResponse.card = {
        type: 'Simple',
        title: options.cardTitle,
        content: options.cardContent
      };
    }
    var returnResult = {
      version: '1.0',
      response: alexaResponse
    };
    if (options.session && options.session.attributes) {
      returnResult.sessionAttributes = options.session.attributes;
    }
    debug('Response.buildSpeechletResponse ------- returnResult\r\n\r\n', returnResult);
    return returnResult;
  };

  return {
    tell: function (speechOutput) {
      this._context.succeed(buildSpeechletResponse({
        session: this._session,
        output: speechOutput,
        shouldEndSession: true
      }));
    },
    tellWithCard: function (speechOutput, cardTitle, cardContent) {
      this._context.succeed(buildSpeechletResponse({
        session: this._session,
        output: speechOutput,
        cardTitle: cardTitle,
        cardContent: cardContent,
        shouldEndSession: true
      }));
    },
    ask: function (speechOutput, repromptSpeech) {
      this._context.succeed(buildSpeechletResponse({
        session: this._session,
        output: speechOutput,
        reprompt: repromptSpeech,
        shouldEndSession: false
      }));
    },
    askWithCard: function (speechOutput, repromptSpeech, cardTitle, cardContent) {
      this._context.succeed(buildSpeechletResponse({
        session: this._session,
        output: speechOutput,
        reprompt: repromptSpeech,
        cardTitle: cardTitle,
        cardContent: cardContent,
        shouldEndSession: false
      }));
    }
  };
})();

module.exports = AlexaSkill;
