const expect = require('chai').expect;
const index = require('../src/index');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe('Testing a session with the RecipeIntent', function() {
  var speechResponse = null;
  var speechError = null;

  before(function(done){
    index.handler({
      'session': {
        'sessionId': 'SessionId.a8c0060e-168c-4e3b-bba5-51a092cab49c',
        'application': {
          'applicationId': 'amzn1.ask.skill.2790171f-24c0-477b-b91f-1cc54e4f7b8a'
        },
        'attributes': {},
        'user': {
          'userId': 'amzn1.ask.account.AE2UEPIGMQPFVXY27G5UJTKHFBYWRPH4G6QBPFUPCOYFL4G2ZBK3SHC5RTYA72ET23L34H6XMUQVR4ZIR6ECJ4KZBHAGWHN6M3ZSC2U3PUAHQ5V3YEXGIYZRZS6EQPU2ET5GZJXJKHKVZNLYVB2LASGFGBPN7M2WZOQTYRQDCHHDPW4FHXZO4T4DCEON2UP7725W3VSH7OM3OPQ'
        },
        'new': true
      },
      'request': {
        'type': 'IntentRequest',
        'requestId': 'EdwRequestId.5e14858e-27c2-42e9-bb9d-ab10c89786aa',
        'locale': 'en-US',
        'timestamp': '2017-01-09T03:43:35Z',
        'intent': {
          'name': 'GetQuestionIntent',
          'slots': {}
        }
      },
      'version': '1.0'
    }, ctx);

    ctx.Promise
      .then(resp => { speechResponse = resp; done(); })
      .catch(err => { speechError = err; done(); });
  });

  describe('The response is structurally correct for Alexa Speech Services', function() {
    it('should not have errored',function() {
      expect(speechError).to.be.null;
    });

    it('should have a version', function() {
      expect(speechResponse.version).not.to.be.null;
    });

    it('should have a speechlet response', function() {
      expect(speechResponse.response).not.to.be.null;
    });

    it('should have a spoken response', () => {
      expect(speechResponse.response.outputSpeech).not.to.be.null;
    });
  });
});
