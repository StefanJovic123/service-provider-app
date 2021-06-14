import { map, reduce } from '../../common/utils';

export const BadErrorMessage = 'Something went wrong';

const TestUseCase = {
  execute: (query) => {
    if (query.limit === 10) {
      throw new Error(BadErrorMessage);
    }
    return 1;
  },
};
const controllerTestFactory = (
  factories,
  {
    name,
    req: { errorReq, successReq },
    factory,
    UseCaseMock,
    expectedReturnValue,
    expectedError,
    UseCasesMocks,
    responseHandler, // one of next, sendRes, sendEmpty, sendHtml, sendDataAndCount
    responseHandlerParams, // used if not next or send res
  },
) =>
  describe(name, () => {
    let useCasesGroups = [];
    if (!name && !UseCaseMock && UseCasesMocks) {
      // it expects array of arrays of objects where each object is { name, UseCaseMock }
      // example [[{ name: 'GetAll', UseCaseMock: {} }], { name: 'GetAll', UseCaseMock: {} }}
      // will give use two groups of use cases with the result
      // { GetAll }, { GetAll }
      useCasesGroups = map(UseCasesMocks, (group) =>
        reduce(
          group,
          (acc, curr) => {
            acc[curr.name] = curr.mock || TestUseCase;
            return acc;
          },
          {},
        ),
      );
    }
    if (name) {
      // if there is only one use case expected
      useCasesGroups.push({ [name]: UseCaseMock || TestUseCase });
    }

    it('should catch an error if something bad happened', async () => {
      const next = jest.fn((error) =>
        expect(error.toString()).toContain(expectedError || BadErrorMessage),
      );

      const handler = factories[factory](...useCasesGroups);

      await handler(errorReq, null, next);
    });

    it('should call send if all went well', async () => {
      const nextOld = jest.fn((error) => expect(error).toBeUndefined());
      const next = jest.fn();
      const res = {
        sendRes: jest.fn((data) => expect(data).toEqual(expectedReturnValue)),
        sendEmpty: jest.fn((data) => expect(data).toEqual(expectedReturnValue)),
        sendDataAndCount: jest.fn((data) => expect(data).toEqual(expectedReturnValue)),
        sendHtml: jest.fn((data) => expect(data).toEqual(expectedReturnValue)),
      };
      const handler = factories[factory](...useCasesGroups);

      await handler(successReq, res, responseHandler ? next : nextOld);
      if (responseHandler) {
        if (responseHandler === 'next') {
          expect(next).toBeCalledWith(undefined);
        } else if (responseHandler === 'sendEmpty') {
          expect(res[responseHandler]).toBeCalledWith(undefined);
        } else {
          expect(res[responseHandler]).toBeCalledWith(...(responseHandlerParams || []));
        }
      }
    });
  });

export default controllerTestFactory;
