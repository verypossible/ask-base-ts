import { HandlerInput, ImageHelper } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

import { deviceHasDisplaySupport, IHandler } from ".";
import * as Media from "../assets/Media";
import * as Strings from "../assets/Strings";
import { requests } from "../Constants";

/**
 * Handle a `LaunchRequest`
 * It also sets our skill background image for show devices
 * if background image is available.
 */
export const LaunchRequestHandler: IHandler = {
  [requests.LAUNCH]: async (input: HandlerInput): Promise<Response> => {
    input.responseBuilder.speak(Strings.WELCOME_MSG).withShouldEndSession(false);

    if (Media.BACKGROUND_IMAGE_URL && deviceHasDisplaySupport(input)) {
      const backgroundImage = new ImageHelper()
        .addImageInstance(Media.BACKGROUND_IMAGE_URL)
        .getImage();

      input.responseBuilder
        .addRenderTemplateDirective({
          backgroundImage,

          backButton: "HIDDEN",
          type: "BodyTemplate6",
        })
        .getResponse();
    }

    return input.responseBuilder.getResponse();
  },
};
