/**
 * This file exports handlers needed to support intent handlers
 * required for custom alexa skills.
 *
 * NOTE:  It does NOT include `LaunchRequest` because of the custom question behavior.
 */
import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

import { IHandler } from ".";
import * as Strings from "../assets/Strings";
import { intents, requests } from "../Constants";
import { audio, getAudioTokenFromHandlerInput } from "../controllers/AudioController";
import { LaunchRequestHandler } from "./LaunchRequestHandlers";

export const IntentHandler: IHandler = {
  // Yes and No intents provide answers to our quiz
  [intents.AMAZON.NO]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder
      .speak("You responded with NO")
      .withShouldEndSession(false)
      .getResponse(),

  [intents.AMAZON.YES]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder
      .speak("You responded with YES")
      .withShouldEndSession(false)
      .getResponse(),

  // Other AMAZON.* intents we must support
  [intents.AMAZON.CANCEL]: async (input: HandlerInput): Promise<Response> => {
    // if building an audio skill, use this instead
    // return audio.stop();
    return input.responseBuilder
      .speak("Goodbye")
      .withShouldEndSession(true)
      .getResponse();
  },

  [intents.AMAZON.FALLBACK]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder
      .speak("I could not understand what you said")
      .withShouldEndSession(false)
      .getResponse(),

  [intents.AMAZON.HELP]: async (input: HandlerInput): Promise<Response> => {
    return input.responseBuilder.speak(Strings.HELP_MSG).getResponse();
  },

  [intents.AMAZON.REPEAT]: async (input: HandlerInput): Promise<Response> => {
    return input.responseBuilder.speak("I forgot what I said").getResponse();
  },

  [intents.AMAZON.START_OVER]: async (input: HandlerInput): Promise<Response> => {
    return LaunchRequestHandler[requests.LAUNCH](input);
  },

  // Common built in intents for audio skills.
  // [intents.AMAZON.LOOP_OFF]: async (input: HandlerInput): Promise<Response> => {
  //   return input.responseBuilder.speak(Strings.NO_LOOP_OFF_MSG).getResponse();
  // },

  // [intents.AMAZON.LOOP_ON]: async (input: HandlerInput): Promise<Response> => {
  //   return input.responseBuilder.speak(Strings.NO_LOOP_ON_MSG).getResponse();
  // },

  // [intents.AMAZON.NEXT]: async (input: HandlerInput): Promise<Response> => {
  //   return input.responseBuilder.speak(Strings.NO_NEXT_MSG).getResponse();
  // },

  // [intents.AMAZON.PAUSE]: async (input: HandlerInput): Promise<Response> => {
  //   return audio.stop();
  // },

  // [intents.AMAZON.PREVIOUS]: async (input: HandlerInput): Promise<Response> => {
  //   return input.responseBuilder.speak(Strings.NO_PREV_MSG).getResponse();
  // },

  // [intents.AMAZON.RESUME]: async (input: HandlerInput): Promise<Response> => {
  //   const url = getAudioTokenFromHandlerInput(input);
  //   return audio.play({ url });
  // },

  // [intents.AMAZON.SHUFFLE_OFF]: async (input: HandlerInput): Promise<Response> => {
  //   return input.responseBuilder.speak(Strings.NO_SHUFFLE_OFF_MSG).getResponse();
  // },

  // [intents.AMAZON.SHUFFLE_ON]: async (input: HandlerInput): Promise<Response> => {
  //   return input.responseBuilder.speak(Strings.NO_SHUFFLE_ON_MSG).getResponse();
  // },

  // [intents.AMAZON.STOP]: async (input: HandlerInput): Promise<Response> => {
  //   return audio.stop();
  // },
};
