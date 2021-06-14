import * as factories from './handlerFactory';
import controllerTestGenerator, { BadErrorMessage } from './controllerTestGenerator';

const instance = {
  message: 'this is instance',
};
const instances = [instance, instance];
const useCases = [
  {
    name: 'GetOne',
    factory: 'getOne',
    expectedReturnValue: instance,
    req: {
      errorReq: { params: { id: -1 } },
      successReq: { params: { id: 1 } },
    },
    UseCaseMock: {
      execute: (id) => {
        if (id < 0) {
          throw new Error(BadErrorMessage);
        }
        return instance;
      },
    },
  },
  {
    name: 'GetAll',
    factory: 'getAll',
    expectedReturnValue: instances,
    req: {
      errorReq: { query: { offset: -1 } },
      successReq: { query: { limit: 100 } },
    },
    UseCaseMock: {
      execute: (query) => {
        if (query.offset < 0) {
          throw new Error(BadErrorMessage);
        }
        return instances;
      },
    },
  },
  {
    name: 'Create',
    factory: 'createOne',
    expectedReturnValue: instance,
    req: {
      errorReq: { body: { invalidField: true } },
      successReq: { body: { validField: true } },
    },
    UseCaseMock: {
      execute: (body) => {
        if (body.invalidField) {
          throw new Error(BadErrorMessage);
        }
        return instance;
      },
    },
  },
  {
    name: 'Update',
    factory: 'updateOne',
    expectedReturnValue: instance,
    req: {
      errorReq: { body: { invalidField: true }, params: { id: 0 } },
      successReq: { body: { validField: true }, params: { id: 1 } },
    },
    UseCaseMock: {
      execute: (body, { id }) => {
        if (body.invalidField && id === 0) {
          throw new Error(BadErrorMessage);
        }
        return instance;
      },
    },
  },
  {
    name: 'Delete',
    factory: 'deleteOne',
    expectedReturnValue: true,
    req: {
      errorReq: { query: { hardDelete: true }, params: { id: 0 } },
      successReq: { query: { hardDelete: true }, params: { id: 1 } },
    },
    UseCaseMock: {
      execute: (id, hardDelete) => {
        if (hardDelete && id === 0) {
          throw new Error(BadErrorMessage);
        }
        return true;
      },
    },
  },
];

useCases.map((useCase) => controllerTestGenerator(factories, useCase));
