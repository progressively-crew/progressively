export class VariantAlreadyExists extends Error {
  constructor() {
    super('Variant already exists');
  }
}
