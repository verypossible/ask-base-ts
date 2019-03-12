/**
 * This file exports a custom error handler
 * that implements the ask-sdk-core ErrorHandler
 * interface.
 *
 * Here is where you would do something like hook up sentry.
 */

import { ErrorHandler as CoreErrorHandler, HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const ErrorHandler: CoreErrorHandler = {
  canHandle: (_: HandlerInput): boolean => true,

  handle(input: HandlerInput, error: Error): Response {
    console.log("error handler; request", input.requestEnvelope.request, "context", input.context); // tslint:disable-line:no-console
    console.log(`Error handled: ${error.message}`); // tslint:disable-line:no-console

    return input.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  },
};
