/**
 * This file contains handlers to support audio playback.
 * Audio skills must support `AudioPlayer` requests.
 */

import { HandlerInput } from "ask-sdk-core";
import { interfaces, Response } from "ask-sdk-model";

import { IHandler } from ".";
import { audio, getAudioTokenFromHandlerInput } from "../controllers/AudioController";

import { requests } from "../Constants";

/**
 * Handle AudioPlayer requests sent notifying our skill about changes to playback state.
 * We can't do anything about them since we aren't storing actual state
 * e.g. what stream a user was listening to.
 * see: https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#requests
 */
export const AudioHandler: IHandler = {
  [requests.AudioPlayer.FAILED]: async (input: HandlerInput): Promise<Response> => {
    const failedRequest = input.requestEnvelope
      .request as interfaces.audioplayer.PlaybackFailedRequest;
    console.log("Playback failed: ", JSON.stringify(failedRequest.error)); // tslint:disable-line:no-console

    const url = getAudioTokenFromHandlerInput(input);
    if (url) {
      return audio.play({ url }, input);
    }

    return input.responseBuilder.getResponse();
  },

  [requests.AudioPlayer.FINISHED]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder.getResponse(),

  [requests.AudioPlayer.NEARLY_FINISHED]: async (input: HandlerInput): Promise<Response> => {
    const url = getAudioTokenFromHandlerInput(input);
    if (url) {
      return audio.playLater({ url });
    }

    return input.responseBuilder.getResponse();
  },

  [requests.AudioPlayer.STARTED]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder.getResponse(),

  /**
   * Do not return a response.
   * see: https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#playbackstopped
   */
  [requests.AudioPlayer.STOPPED]: async (input: HandlerInput): Promise<Response> =>
    input.responseBuilder.getResponse(),
};
