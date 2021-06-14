const defaultFields = [
  'id',
  'user_id',
  'experience',
  'skill'
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
  }
};
