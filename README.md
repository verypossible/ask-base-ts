# ask-base-ts

## `lambda/src` structure

|                            | Description                                                                               | Example                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `assets`                   | Static strings and references that make up your skill's content.                          | - image and audio urls - static tuples                                                                                  |
| `assets/Strings.ts`        | Static strings e.g. text or Alexa markup language                                         | `<audio src="..." />` `"Welcome to our app"`                                                                            |
| `assets/Media.ts`          | URLs to images, playlists, or other non-interactive media                                 | Card or display image, quiz result playlist                                                                             |
| `assets/Speech.ts` (opt)   | URLs to audio blocks that take the place of speech strings                                | A recorded greeting to be used as a welcome message                                                                     |
| `assets/speech/**` (opt)   | A directory for more complex pre-recorded messages                                        | questions, responses, help messages are all pre-recorded                                                                |
| `controllers/*.ts`         | Objects and classes responsible for a single domain but spread across multiple functions. | `AudioController.ts` - issues start and stop playback requests; includes functions specific to playlist streaming; etc. |
| `handlers`                 | Functions that respond to Alexa requests and intents                                      | `LaunchRequest` - `IntentRequest.AMAZON.NoIntent`                                                                       |
| `handlers/index.ts`        | Handles shared code among handlers. Exports handlers from directory.                      |                                                                                                                         |
| `handlers/*Handlers.ts`    | Exports an object that handles one or more requests or intents.                           | `LaunchRequestHandlers` - `CustomIntentHandlers`                                                                        |
| `utils/*.ts`               | Shared functions not specific to a single domain.                                         | A function to randomly sample an array. A function to wrap a string in Alexa markup.                                    |
| `Constants.ts`             | Exports misc. constant values.                                                            | Project settings or shared map keys. Note: probably needs refactoring.                                                  |
| `RequestHandlerBuilder.ts` | Binds handler objects and functions to self, then determines `canHandle` for you.         |                                                                                                                         |
| `index.ts`                 | Lambda entry point. Imports and connects handlers, then exports handler function.         |                                                                                                                         |
