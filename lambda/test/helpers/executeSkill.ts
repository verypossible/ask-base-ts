import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";
import { handler as skill } from "../../src/index";

export default function executeSkill(skillRequest: RequestEnvelope): Promise<ResponseEnvelope> {
  return new Promise(resolve => {
    skill(skillRequest, null, (_, responseEnvelope) => {
      return resolve(responseEnvelope);
    });
  });
}
