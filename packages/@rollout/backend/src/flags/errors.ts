export class FlagAlreadyExists extends Error {
  constructor() {
    super('Flag already exists');
  }
}
