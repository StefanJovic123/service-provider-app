const defaultFields = [
  'id',
  'email',
  'firstName',
  'lastName',
  'password',
  'skillsSet',
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
