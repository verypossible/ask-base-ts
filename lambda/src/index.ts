/**
 * Our lambda entry point. It builds and exports handlers across all domains.
 *
 * We import each handler individually to ensure explicit understanding.
 */

import * as Alexa from "ask-sdk-core";

import {
  AudioHandler,
  CustomIntentHandler,
  ErrorHandler,
  IntentHandler,
  LaunchRequestHandler,
  PlaybackControllerHandler,
  SystemHandler,
} from "./handlers";
import { RequestInterceptor, ResponseInterceptor } from "./interceptors";
import { RequestHandler } from "./RequestHandlerBuilder";

const skillBuilder = Alexa.SkillBuilders.custom();

export const handler = skillBuilder
  .addRequestHandlers(
    RequestHandler.builder()
      .withHandlers({
        ...LaunchRequestHandler,
        // if using custom handlers
        // ...CustomIntentHandler,
        ...IntentHandler,
        ...SystemHandler,
      })
      // If building an audio skill.
      // .withHandlers({
      //   ...AudioHandler,
      //   ...PlaybackControllerHandler,
      // })
      .build()
  )
  // if using request or response interceptors
  // .addRequestInterceptors(RequestInterceptor)
  // .addResponseInterceptors(ResponseInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();
