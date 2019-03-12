// This file exports a controller for providing audio play/stop functionality.

import { HandlerInput, ImageHelper, ResponseFactory } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

// Retrieve the audio stream url by pulling it out of the context.
// Use this when the session is not available.
export function getStreamURLFromContext(input: HandlerInput): string {
  let url;
  try {
    url = input.requestEnvelope.context.AudioPlayer.token;
  } catch (e) {
    // do nothing
  }
  return url;
}

interface AudioOptions {
  backgroundImageURL?: string;
  text?: string;
}

type AudioStopOptions = AudioOptions;

interface AudioPlayOptions extends AudioOptions {
  url: string;
}

class AudioController {
  public play({ backgroundImageURL, url, text }: AudioPlayOptions, input?: HandlerInput): Response {
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
    result.addAudioPlayerPlayDirective("REPLACE_ALL", url, url, 0).withShouldEndSession(true);

    if (text) {
      result.speak(text);
    }

    if (backgroundImageURL) {
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

  public playLater({ url, text }: AudioPlayOptions, input?: HandlerInput): Response {
    /*
      https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
      REPLACE_ENQUEUED: Replace all streams in the queue. This does not impact the currently playing stream.
    */
    const result = ResponseFactory.init();

    // we are using url as token as they are all unique
    result.addAudioPlayerPlayDirective("REPLACE_ENQUEUED", url, url, 0).withShouldEndSession(true);

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
