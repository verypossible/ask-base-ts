/**
 * This file exports handlers/*.ts along with
 * functions and interfaces of this domain.
 */

import { HandlerInput } from "ask-sdk";
import { Response } from "ask-sdk-model";

/**
 * Does the request support Display aka providing a background image.
 */
export function deviceHasDisplaySupport(input: HandlerInput): boolean {
  let hasDisplaySupport: boolean;
  try {
    hasDisplaySupport = Object.prototype.hasOwnProperty.call(
      input.requestEnvelope.context.System.device.supportedInterfaces,
      "Display"
    );
  } catch (e) {
    hasDisplaySupport = false;
  }
  return hasDisplaySupport;
}

export interface IHandler {
  [key: string]: (handlerInput: HandlerInput) => Promise<Response>;
}

export { AudioHandler } from "./AudioHandlers";
export { CustomIntentHandler } from "./CustomIntentHandlers";
export { ErrorHandler } from "./ErrorHandlers";
export { IntentHandler } from "./IntentHandlers";
export { LaunchRequestHandler } from "./LaunchRequestHandlers";
export { PlaybackControllerHandler } from "./PlaybackControllerHandlers";
export { SystemHandler } from "./SystemHandlers";
