/**
 * Validate function that accepts schema with validate method and data, and formats output to {ok, errors, value} format
 * @param data Data to be validated.
 * @param scheme Schema to be validated against. Must contain validate method.
 * @returns {{ok: boolean, errors, value}}
 */
const validate = (data, scheme) => {
  const { error, value } = scheme.validate(data);

  return { ok: !error, errors: error, value };
};

export default validate;
