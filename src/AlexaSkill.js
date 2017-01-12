'use strict';

function AlexaSkill(appId) {
  this._appID = appId;
}

AlexaSkill.speechOutputType = {
  PLAIN_TEXT: 'PlainText',
  SSML: 'SSML'
};

AlexaSkill.prototype.requestHandlers = {
  LaunchRequest: function(event, context, response) {
    this.eventHandlers.onLaunch.call(this, event.request, event.session, response);
  },
  IntentRequest: function(event, content, response) {
    this.eventHandlers.onIntent.call(this, event.request, event.session, response);
  },
  SessionEndedRequest: function(event, context) {
    this.eventHandlers.onSessionEnded(event.request, event.session);
    context.succeed();
  }
};

AlexaSkill.prototype.eventHandlers = {
  sessionStartedRequest: function(sessionStartedRequest, session) {
    console.log(`eventHandlers - sessionStartedRequest ID: ${sessionStartedRequest.requestId} - session ID: ${session.sessionId}`);
  },
  onLaunch: function(launchRequest, session, response) {
    console.log(`eventHandlers - launchRequest ID: ${launchRequest.requestId} - session ID: ${session.sessionId} - response: ${response}`);
    throw 'onLaunch should be overriden by a subclass';
  },
  onIntent: function(intentRequest, session, response) {
    let intent = intentRequest.intent;
    let intentName = intentRequest.intent.name;
    let intentHandler = this.intentHandlers[intentName];

    if (intentHandler) {
      console.log(`dispatch intent = ${intentName}`);
      intentHandler.call(this, intent, session, response);
    } else {
      throw `Unsupported intent = ${intentName}`;
    }
  },
  onSessionEnded: function(sessionEndedRequest, session) {
    console.log(`eventHandlers - sessionEndedRequest ID: ${sessionEndedRequest.requestId} - session ID: ${session.sessionId}`);
  }
};

AlexaSkill.prototype.intentHandlers = {};

AlexaSkill.prototype.execute = function (event, context) {
  try {
    console.log(`session applicationId: ${event.session.application.applicationId}`);

    // Validate that this request originated from authorized source.
    if (this._appId && event.session.application.applicationId !== this._appId) {
      console.log(`The applicationIds do not match : ${event.session.application.applicationId} and ${this._appId}`);
      throw 'Invalid applicationId';
    }

    if (!event.session.attributes) {
      event.session.attributes = {};
    }

    if (event.session.new) {
      this.eventHandlers.onSessionStarted(event.request, event.session);
    }

    // Route the request to the proper handler which may have been overriden.
    let requestHandler = this.requestHandlers[event.request.type];
    requestHandler.call(this, event, context, new Response(context, event.session));
  } catch (e) {
    console.log(`Unexpected exception ${e}`);
    context.fail(e);
  }
};

let Response = function (context, session) {
  this._context = context;
  this._session = session;
};

function createSpeechObject(optionsParam) {
  if (optionsParam && optionsParam.type === 'SSML') {
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
  let buildSpeechletResponse = function (options) {
    let alexaResponse = {
      outputSpeech: createSpeechObject(options.output),
      shouldEndSession: options.shouldEndSession
    };
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
    let returnResult = {
      version: '1.0',
      response: alexaResponse
    };
    if (options.session && options.session.attributes) {
      returnResult.sessionAttributes = options.session.attributes;
    }
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
