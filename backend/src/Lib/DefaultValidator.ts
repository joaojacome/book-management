export default class DefaultValidator {

  rules = {};

  validate(input):boolean {
    let valid = true;

    Object.keys(input).forEach((field) => {
      if (typeof(this.rules[field]) !== 'undefined') {
        valid = valid && this.rules[field](input[field]);
      }
    });

    return valid;
  }
}
