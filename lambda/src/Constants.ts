// This file exports constants to help product against developer error.
export * from "ask-constants";

export const config = {
  // are we in debug?
  debug: !!(process.env.DEBUG === "true"),
  silent: !!(process.env.SILENT === "true"),
};
