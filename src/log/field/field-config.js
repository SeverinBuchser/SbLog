/**
 * @module sb-log.log.field.field-config
 */

module.exports = {

  /**
   * Configuration to log something which was added. The output will read:<br>
   * `ADDED    dark theme`,<br>
   * where the word "ADDED" is green.
   * @constant {object} add
   */
  add: {
    name: "ADDED",
    fields: [
      "what"
    ],
    format: "success"
  },

  /**
   * Configuration to log something which was compiled in how many milliseconds.
   * The output will read:<br>
   * `COMPILED dark theme in 1000ms`,<br>
   * where the word "COMPILED" is green.
   * @constant {object} compile
   */
  compile: {
    name: "COMPILED",
    fields: [
      "what",
      { name: "in", readonly: true },
      "timeDiff"
    ],
    format: "success"
  },

  /**
   * Configuration to log something which was started at some point in time. The
   * output will read:<br>
   * `STARTED  building process at 02:16:21`,<br>
   * where the word "STARTED" is cyan.
   * @constant {object} start
   */
  start: {
    name: "STARTED",
    fields: [
      "what",
      { name: "at", readonly: true },
      { name: "time", transform: "toTime"}
    ],
    format: "primary"
  },

  /**
   * Configuration to log something which was ended at some point in time. The
   * output will read:<br>
   * `ENDED    building process at 02:16:21`,<br>
   * where the word "ENDED" is cyan.
   * @constant {object} end
   */
  end: {
    name: "ENDED",
    fields: [
      "what",
      { name: "at", readonly: true },
      { name: "time", transform: "toTime"}
    ],
    format: "primary"
  },

  /**
   * Configuration to log an entry file. The output will read:<br>
   * `ENTRY    ./dark.scss`,<br>
   * where the word "ENTRY" is cyan.
   * @constant {object} entry
   */
  entry: {
    name: "ENTRY",
    fields: [
      "file"
    ],
    format: "primary",
    multiple: true
  },

  /**
   * Configuration to log a copied file, which includes the source and the
   * destination. The output will read:<br>
   * `COPY     ./dark.css  to ./dist/dark.css`,<br>
   * where the word "COPY" is green.
   * @constant {object} copy
   */
  copy: {
    name: "COPY",
    fields: [
      "fileSrc",
      { name: "to", readonly: true },
      "fileDest"
    ],
    format: "success",
    multiple: true
  },

  /**
   * Configuration to log a created file and its size. The output will read:<br>
   * `CREATED  ./dark.css  size: 100kb`,<br>
   * where the word "CREATED" is green.
   * @constant {object} create
   */
  create: {
    name: "CREATED",
    fields: [
      "file",
      { name: "size:", readonly: true },
      "size"
    ],
    format: "success",
    multiple: true
  },

  /**
   * Configuration to log a deleted file. The output will read:<br>
   * `DELETED  ./dark.css`,<br>
   * where the word "DELETED" is red.
   * @constant {object} delete
   */
  delete: {
    name: "DELETED",
    fields: [
      "file"
    ],
    format: "fail",
    multiple: true
  },

  /**
   * Configuration to log an error. The output will read:<br>
   * `ERROR    There has been an error!`,<br>
   * where the word "ERROR" and the sentence after are red.
   * @constant {object} error
   */
  error: {
    name: "ERROR",
    fields: [
      { name: "message", format: "fail" }
    ],
    format: "fail"
  },

  /**
   * Configuration to log an information. The output will read:<br>
   * `INFO     There is an information, like something is deprecated.`,<br>
   * where the word "INFO" is bold.
   * @constant {object} inform
   */
  inform: {
    name: "INFO",
    fields: [
      { name: "message" }
    ],
    format: "bold"
  },

  /**
   * Configuration to log a warning. The output will read:<br>
   * `WARNING  There is an important warning!`,<br>
   * where the word "WARNING" and the sentence after are yellow.
   * @constant {object} warn
   */
  warn: {
    name: "WARNING",
    fields: [
      { name: "message", format: "warn" }
    ],
    format: "warn"
  }
}
