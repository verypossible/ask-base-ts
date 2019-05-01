// This file exports a controller for providing audio play/stop functionality.

import { HandlerInput, ImageHelper, ResponseFactory } from "ask-sdk-core";
import { interfaces, Response } from "ask-sdk-model";

import { deviceHasDisplaySupport } from "../handlers";

// Retrieve an audio token from the handler input
export function getAudioTokenFromHandlerInput(input: HandlerInput): string {
  let token: string;

  try {
    if (input.requestEnvelope.request.type.startsWith("AudioPlayer")) {
      token = (input.requestEnvelope.request as interfaces.audioplayer.PlaybackFailedRequest).token;
    } else {
      token = input.requestEnvelope.context.AudioPlayer.token;
    }
  } catch (e) {
    // do nothing
  }

  return token;
}

interface AudioOptions {
  backgroundImageURL?: string;
  text?: string;
}

type AudioStopOptions = AudioOptions;

interface AudioPlayOptions extends AudioOptions {
  offset?: number;
  token?: string;
  url: string;
}

class AudioController {
  public play(
    { backgroundImageURL, offset, text, token, url }: AudioPlayOptions,
    input: HandlerInput
  ): Response {
    /*
     *  Using the function to begin playing audio when:
     *    Play Audio intent invoked.
     *    Resuming audio when stopped/paused.
     *    Next/Previous commands issued.
     */

    /*
       https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
       REPLACE_ALL: Immediately begin playback of the specified stream, and replace current and enqueued streams.
    */
    const result = ResponseFactory.init();

    // we are using url as token as they are all unique
    result
      .addAudioPlayerPlayDirective("REPLACE_ALL", url, token || url, offset || 0)
      .withShouldEndSession(true);

    if (text) {
      result.speak(text);
    }

    if (backgroundImageURL && deviceHasDisplaySupport(input)) {
      const backgroundImage = new ImageHelper().addImageInstance(backgroundImageURL).getImage();

      return result
        .addRenderTemplateDirective({
          backButton: "HIDDEN",
          backgroundImage,
          type: "BodyTemplate6",
        })
        .getResponse();
    }

    return result.getResponse();
  }

  public playLater({ text, token, url }: AudioPlayOptions, input?: HandlerInput): Response {
    /*
      https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
      REPLACE_ENQUEUED: Replace all streams in the queue. This does not impact the currently playing stream.
    */
    const result = ResponseFactory.init();

    // we are using url as token as they are all unique
    result
      .addAudioPlayerPlayDirective("REPLACE_ENQUEUED", url, token || url, 0)
      .withShouldEndSession(true);

    if (text) {
      result.speak(text);
    }

    return result.getResponse();
  }

  public stop({ text }: AudioStopOptions = {}): Response {
    /*
     *  Issuing AudioPlayer.Stop directive to stop the audio.
     *  Attributes already stored when AudioPlayer.Stopped request received.
     */
    const result = ResponseFactory.init();
    result.addAudioPlayerStopDirective();

    if (text) {
      result.speak(text);
    }

    return result.getResponse();
  }
}

export const audio = new AudioController();
