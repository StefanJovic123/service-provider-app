import validate from './index';

describe('validate', () => {
  const error = 'Something is not ok';
  const scheme = {
    validate: (data) => {
      if (data.isOk) {
        return {};
      }
      return { error };
    },
  };

  it('should return not ok and errors if validation failed', () => {
    const data = { test: true };

    const validated = validate(data, scheme);

    expect(validated).toBeTruthy();
    expect(validated.ok).toBeFalsy();
    expect(validated.errors).toEqual(error);
  });

  it('should return ok if validation passed', () => {
    const data = { isOk: true };

    const validated = validate(data, scheme);

    expect(validated).toBeTruthy();
    expect(validated.errors).toBeFalsy();
    expect(validated.ok).toEqual(true);
  });
});
