import ResourceNotFoundError from '@common/error/DomainError/ResourceNotFoundError';
import Service from './Service';

const findById = jest.fn();
const findAll = jest.fn();
const findAndCountAll = jest.fn();
const save = jest.fn();
const update = jest.fn();
const remove = jest.fn();
const repository = {
  findById,
  findAll,
  findAndCountAll,
  save,
  update,
  delete: remove,
};

describe('Service', () => {
  const service = new Service(repository);

  describe('initialization', () => {
    it('should initialize without error', () => {
      expect(service).toBeDefined();
      expect(service.repository).toMatchObject(repository);
    });
  });

  describe('getById', () => {
    it('should throw ResourceNotFoundError', async () => {
      const id = 99999;
      const options = {};

      try {
        await service.getById(id, options);
      } catch (error) {
        expect(error).toEqual(new ResourceNotFoundError());
      }
    });

    it('should call findById', async () => {
      const id = 5;
      const options = { test: 1 };

      findById.mockResolvedValue({ id });

      await service.getById(id, options);

      expect(findById).toBeCalledWith(id, options);
    });
  });

  describe('getAll', () => {
    it('should call findAll method', async () => {
      const query = { clientId: 1 };
      const options = { limit: 10 };

      await service.getAll(query, options);

      expect(findAll).toBeCalledWith(query, options);
    });
  });

  describe('getAndCountAll', () => {
    it('should call findAndCountAll method', async () => {
      const query = { clientId: 5 };
      const options = { limit: 20 };

      await service.getAndCountAll(query, options);

      expect(findAndCountAll).toBeCalledWith(query, options);
    });
  });

  describe('create', () => {
    it('should call save method', async () => {
      const instance = { firstName: 'test', lastName: 'testing' };
      const options = { someOption: true };

      await service.create(instance, options);

      expect(save).toBeCalledWith(instance, options);
    });
  });

  describe('update', () => {
    it('should call update method', async () => {
      const values = { firstName: 'test', lastName: 'testing' };
      const query = { id: 123 };
      const options = { someOption: true };

      await service.update(values, query, options);

      expect(update).toBeCalledWith(values, query, options);
    });
  });

  describe('delete', () => {
    it('should call delete method', async () => {
      const query = { id: 5 };
      const softDelete = true;
      const options = { option: 'test' };

      await service.delete(query, softDelete, options);

      expect(remove).toBeCalledWith(query, softDelete, options);
    });
  });
});
