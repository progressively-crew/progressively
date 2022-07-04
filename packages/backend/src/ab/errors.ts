export class ExperimentAlreadyExists extends Error {
  constructor() {
    super('Experiment already exists');
  }
}

export class VariantAlreadyExists extends Error {
  constructor() {
    super('Variant already exists');
  }
}
