export class ExperimentAlreadyExists extends Error {
  constructor() {
    super('Experiment already exists');
  }
}
