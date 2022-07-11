export class FlagAlreadyExists extends Error {
  constructor() {
    super('Flag already exists');
  }
}

export class ExperimentAlreadyExists extends Error {
  constructor() {
    super('Experiment already exists');
  }
}
