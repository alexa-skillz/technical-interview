'use strict';

function AlexaSkill(appId) {
  this._appID = appId;
}

AlexaSkill.speechOutputType = {
  PLAIN_TEXT: 'PlainText',
  SSML: 'SSML'
};

AlexaSkill.prototype.requestHandlers = {
  // TODO: LaunchRequest
    // TODO: takes three params of event, context, and response
      /*
      event = will contain an object with information about the request
      context = will represent the state of the Lambda function. The context parameter is also used for sending a response back to the caller.
      response =
      */
    // TODO: calls a method of .call on this.eventHandlers.onLaunch and provides it with 4 params ( this, event.request, event.session, response )
  // TODO: IntentRequest
    // TODO: takes three params of event, context, and response
    // TODO: calls a method of .call on this.eventHandlers.onIntent and provides it with 4 params ( this, event.request, event.session, response )
  // TODO: SessionEndedRequest
    // TODO: takes two params of event, context
    // TODO: calls a method of .call on this.eventHandlers.onSessionEnded and provides it with 2 params ( event.request, event.session )
    // TODO: calls context with a method of succeed that is invoked.
};

AlexaSkill.prototype.eventHandlers = {
  // TODO: onSessionStarted
    // TODO: takes 2 params of sessionStartedRequest and session
    // Called when the session starts. Subclasses could have overriden this function to open any necessary resources.
  // TODO: onLaunch
    // TODO: takes 3 params of launchRequest, session, response
    // Called when the user invokes the skill without specifying what they want. The subclass must override this function and provide feedback to the user.
  // TODO: onIntent
    // TODO: takes 3 params of intentRequest, session, response
      // TODO: creates 3 function scoped vars of intent, intentName, and intentHandler
      // TODO: if intentName is true then invoke the .call method on the intentHandler and pass it 4 params of this, intent, session, and response
      // TODO: if intentName is fall then throw and unsupported intentName
  // TODO: onSessionEnded
};

AlexaSkill.prototype.intentHandlers = {};

AlexaSkill.prototype.execute = function() {
  // TODO: Try
    // TODO: if _appID and applicationId don't equal _appId throw invalid applicationId
    // TODO: if there is no event.session.attributes set attributes to empty object
    // TODO: if event.session.new call this.eventHandlers.onSessionStarted function with params of event.request and event.session
    // TODO: set var of requestHandler to equal this.requestHandlers[event.request.type]
    // TODO: call requestHandler var and pass call method params of this, event, context, new Response constructor. New Response constructor accepts two params - context, event.session

  // TODO: Catch
    // TODO: pass 'e' as params to Catch
    // TODO: call context with a method of fail and pass it e as the params.
};

const Response = function() {
// Response object constructor
  // TODO: takes two params context and session
  /*
  context = will represent the state of the Lambda function. The context parameter is also used for sending a response back to the caller.
  session =
  */
    // TODO: set this._context to equal context
    // TODO: set this._session to equal session
};

// eslint-disable-next-line
function createSpeechObject() {
  // TODO: takes one param of optionsParam
    // TODO: if optionsParam and optionsParam.type are equal to SSML (Speech Synthesis Markup Language)
      // TODO: return and object with properties of type and SSML
        // type = optionsParam.type
        // ssml = optionsParam.speech
    // TODO: if optionsParam and optionsParam.type are not equal to SSML
      // TODO: return and object with properties of type and SSML
        // type = optionsParam.type or 'PlainText'
        // ssml = optionsParam.speech or optionsParam
}

Response.prototype = (function() {
// Response prototype is equal to and IFFE
  // TODO: set a function expression with one param of options
    // TODO: create an object with properties of outputSpeech and shouldEndSession and set it to a var.
      // outputSpeech = createSpeechObject(options.output)
      // shouldEndSession = options.shouldEndSession
    // TODO: if options.reprompt is true then set the object created in the last todo with a property of .reprompt
      // outputSpeech = createSpeechObject(options.reprompt)
    // TODO: options.cardTitle and options.cardContent are true then set the object created with a property of .card with 3 properties of type, title, and content.
    // TODO: create an object with properties of version and response.
      // version = 1.0
      // response = alexaResponse
    // TODO: if options.session and options.session.attributes is true then set returnResult.sessionAttributes to equal options.session.attributes
    // TODO: return returnResult and end function
  // TODO: return out of IFFE with an object that contains the key value pairs with the value equal to a function that builds the speech response.
})();

module.exports = AlexaSkill;
