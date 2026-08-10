export class SopError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "SopError";
    this.code = code;
    this.details = Object.freeze({ ...details });
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      ...this.details,
    };
  }
}

export function fail(code, message, details) {
  throw new SopError(code, message, details);
}
