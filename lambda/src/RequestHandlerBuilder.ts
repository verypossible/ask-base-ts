/* tslint:disable:max-classes-per-file */

/**
 * These classes allow us to logically separate our handlers
 * within our directory, then build them all together inside
 * of index.ts at our lambda entry point.
 *
 * This works because our handlers are just async functions
 * that provide the required "handle" function for each Handler,
 * while these builders use each Handler's name to provide the
 * required "canHandle" function.
 *
 * If you look in index.ts, you'll see it is still possible to
 * use Handlers that provide their own canHandle.. handlers/ErrorHandlers.ts
 * is an example of that usage.
 */

import { HandlerInput, RequestHandler as CoreRequestHandler } from "ask-sdk";
import { IntentRequest, Response } from "ask-sdk-model";
import { requests } from "./Constants";
import { IHandler } from "./handlers/";

const getTargetHandlerName = (input: HandlerInput) =>
  input.requestEnvelope.request.type === requests.INTENT
    ? (input.requestEnvelope.request as IntentRequest).intent.name
    : input.requestEnvelope.request.type;

export class RequestHandler implements CoreRequestHandler {
  public static builder(): RequestHandlerBuilder {
    return new RequestHandlerBuilder();
  }

  protected handlers: IHandler;

  constructor(builder: RequestHandlerBuilder) {
    this.handlers = builder.handlers;
  }

  public async canHandle(input: HandlerInput): Promise<boolean> {
    const targetHandlerName = getTargetHandlerName(input);

    return Object.prototype.hasOwnProperty.call(this.handlers, targetHandlerName);
  }

  public handle(input: HandlerInput): Promise<Response> {
    const targetHandlerName = getTargetHandlerName(input);

    return this.handlers[targetHandlerName](input);
  }
}

export class RequestHandlerBuilder {
  protected $handlers: IHandler;

  constructor() {
    this.$handlers = {};
  }

  public get handlers(): IHandler {
    return this.$handlers;
  }

  public withHandlers(handlers: IHandler): this {
    this.$handlers = { ...this.$handlers, ...handlers };

    return this;
  }

  public build(): RequestHandler {
    return new RequestHandler(this);
  }
}
