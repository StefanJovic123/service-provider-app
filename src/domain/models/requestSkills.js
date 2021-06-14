const defaultFields = [
  'id',
  'request_id',
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
