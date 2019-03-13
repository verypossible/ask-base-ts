import { RequestEnvelope } from "ask-sdk-model";

// tslint:disable:object-literal-sort-keys
export const LaunchRequest: RequestEnvelope = {
  version: "1.0",
  session: {
    new: true,
    sessionId: "amzn1.echo-api.session.123",
    application: {
      applicationId: "amzn1.ask.skill.4f09ce31-db14-41b5-8748-4dbd0a785e7d",
    },
    user: {
      userId: "amzn1.ask.account.123",
    },
  },
  context: {
    AudioPlayer: {
      playerActivity: "IDLE",
    },
    System: {
      apiEndpoint: "api.alexa.com",
      application: {
        applicationId: "amzn1.ask.skill.4f09ce31-db14-41b5-8748-4dbd0a785e7d",
      },
      user: {
        userId: "amzn1.ask.account.123",
      },
      device: {
        deviceId: "amzn1.ask.device.abc",
        supportedInterfaces: {
          AudioPlayer: {},
          Display: {},
        },
      },
    },
  },
  request: {
    type: "LaunchRequest",
    requestId: "amzn1.echo-api.request.123",
    timestamp: "2017-03-04T19:02:37Z",
    locale: "en-US",
  },
};
// tslint:enable:object-literal-sort-keys
