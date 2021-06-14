const defaultFields = [
  'id',
  'email',
  'firstName',
  'lastName',
  'password',
  'skillSet',
  'skills'
];

export default {
  read: {
    defaultFields
  },
  create: {
    returnFields: defaultFields
  },
  update: {
    returnFields: defaultFields
  },
};
