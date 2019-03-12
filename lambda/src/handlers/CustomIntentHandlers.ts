/**
 * This file should export custom intents such as "Maybe" or "PlayRadio".
 */

import { HandlerInput } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";

import { IHandler } from ".";
import { audio } from "../controllers/AudioController";

export const CustomIntentHandler: IHandler = {
  // Ex:
  // [intents.custom.PLAY_RADIO]: async (input: HandlerInput): Promise<Response> =>
  //   audio.play({
  //     url: "some/playlist/url.pls",
  //   }),
};
