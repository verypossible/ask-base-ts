import "mocha";

import * as assertions from "ask-assertions";
import { ResponseEnvelope } from "ask-sdk-model";
import * as Strings from "../src/assets/Strings";

import executeSkill from "./helpers/executeSkill";
import { LaunchRequest } from "./requests";

let skillResponse: ResponseEnvelope;

describe("LaunchRequest", function testLaunchRequest() {
  before(async () => {
    this.timeout(5000);
    skillResponse = await executeSkill(LaunchRequest);
  });

  it("should keep session open", () => {
    assertions.checkSessionStatus(skillResponse, false);
  });

  it("should play greeting", () => {
    assertions.checkOutputSpeechContains(skillResponse, Strings.WELCOME_MSG);
  });

  it("should not provide an audio directive", () => {
    assertions.checkNoAudioDirective(skillResponse);
  });
});
