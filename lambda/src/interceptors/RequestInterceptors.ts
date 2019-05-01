/**
 * This file contains an interceptor that receives the input before the handlers.
 */
import { HandlerInput, RequestInterceptor as CoreRequestInterceptor } from "ask-sdk-core";
import util from "util";

import { config } from "../Constants";

export const RequestInterceptor: CoreRequestInterceptor = {
  process: async (input: HandlerInput): Promise<void> => {
    if (!config.silent) {
      // tslint:disable-next-line:no-console
      console.log(util.inspect(input.requestEnvelope, { depth: null }));
    }
  },
};
