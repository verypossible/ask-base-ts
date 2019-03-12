/**
 * This file contains handlers to support audio playback by remote.
 * Audio skills must support `PlaybackController` requests.
 */

import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

import { IHandler } from ".";
import * as Strings from "../assets/Strings";
import { requests } from "../Constants";
import { audio, getStreamURLFromContext } from "../controllers/AudioController";

export const PlaybackControllerHandler: IHandler = {
  [requests.PlaybackController.NEXT]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder.getResponse(),

  [requests.PlaybackController.PAUSE]: async (input: HandlerInput): Promise<Response> =>
    audio.stop(),

  [requests.PlaybackController.PLAY]: async (input: HandlerInput): Promise<Response> => {
    const url = getStreamURLFromContext(input);
    if (url) {
      return audio.play({ url });
    }
    return input.responseBuilder.speak(Strings.UNHANDLED_MSG).getResponse();
  },

  [requests.PlaybackController.PREVIOUS]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder.getResponse(),
};
