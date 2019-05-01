/**
 * This file contains an interceptor that can access the input and response after it is processed by the handlers..
 */

import { HandlerInput, ResponseInterceptor as CoreResponseInterceptor } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import util from "util";

import { config } from "../Constants";

export const ResponseInterceptor: CoreResponseInterceptor = {
  process: async (input: HandlerInput, response?: Response): Promise<void> => {
    if (!config.silent) {
      // tslint:disable-next-line:no-console
      console.log(util.inspect(response, { depth: null }));
    }
  },
};
