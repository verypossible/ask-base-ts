/**
 * This file exports handlers related to the Alexa system.
 *
 * ex: - exceptions, failures
 */

import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

import { IHandler } from ".";
import * as Strings from "../assets/Strings";
import { requests } from "../Constants";

export const SystemHandler: IHandler = {
  /**
   * No session ended logic.
   * see: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html#sessionendedrequest
   */
  [requests.SESSION_ENDED]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder.getResponse(),

  [requests.SYSTEM_EXCEPTION]: async (input: HandlerInput): Promise<Response> => {
    console.log("\n******************* EXCEPTION **********************"); // tslint:disable-line:no-console
    console.log("\n" + JSON.stringify(input.requestEnvelope, null, 2)); // tslint:disable-line:no-console
    return input.responseBuilder.getResponse();
  },

  Unhandled: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder.speak(Strings.UNHANDLED_MSG).getResponse(),
};
