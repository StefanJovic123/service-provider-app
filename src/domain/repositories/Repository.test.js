import _ from 'lodash';
import Repository from './Repository';
import QueryOptions from './QueryOptions';

let records = [
  {
    id: 1,
    someName: 'Man i go',
    typeOfObj: 'test',
  },
  {
    id: 2,
    someName: 'Man i eat',
    typeOfObj: 'test',
  },
  {
    id: 3,
    someName: 'Man i sleep',
    typeOfObj: 'test',
  },
  {
    id: 4,
    someName: ':)',
    typeOfObj: 'test',
  },
  {
    id: 5,
    someName: ':)',
    typeOfObj: 'bulk test',
  },
  {
    id: 6,
    someName: ':)',
    typeOfObj: 'update test',
  },
  {
    id: 7,
    someName: ':)',
    typeOfObj: 'b update test',
  },
  {
    id: 8,
    someName: ':)',
    typeOfObj: 'b update test',
  },
];

const update = jest.fn((values, query) => {
  const found = records.find((record) =>
    _.reduce(
      _.entries(query),
      (acc, [key, value]) => acc && record[_.snakeCase(key)] === value,
      true,
    ),
  );

  const updated = { ...found };

  _.each(_.entries(values), ([key, value]) => {
    updated[_.snakeCase(key)] = value;
  });

  return [updated];
});

const model = {
  getByPrimaryKey: jest.fn((primaryKey) => records.find(({ id }) => id === primaryKey)),
  getAll: jest.fn(() => records),
  create: jest.fn((values) => {
    const instance = {
      ...values,
      id: 1,
      createdAt: 'now',
    };
    records.push(instance);

    return instance;
  }),
  bulkCreate: jest.fn((instances) => {
    const created = [];
    _.each(instances, (values) => {
      const instance = {
        ...values,
        id: 1,
        createdAt: 'now',
      };

      records.push(instance);
      created.push(instance);
    });
    return created;
  }),
  update,
  bulkUpdate: async (valuesQueryPairs) =>
    valuesQueryPairs.map(([values, query]) => update(values, query)),
  delete: jest.fn((id, soft = true) => {
    if (!soft) {
      records = records.filter(({ id: rId }) => rId !== id);
      return;
    }
    const found = records.find(({ id: rId }) => rId === id);
    found.deletedAt = 'now';
  }),
  bulkDelete: jest.fn((ids = [], soft) => {
    ids.forEach((id) => {
      if (!soft) {
        records = records.filter(({ id: rId }) => rId !== id);
        return;
      }
      const found = records.find(({ id: rId }) => rId === id);
      found.deletedAt = 'now';
    });
  }),
};

describe('Repository', () => {
  const repository = new Repository(model);
  const assertSave = (instance, values, id) => {
    expect(instance).toBeTruthy();
    expect(instance.someName).toEqual(values.someName);
    expect(instance.typeOfObj).toEqual(values.typeOfObj);
    expect(instance.id).toEqual(id);
    expect(instance.createdAt).toEqual('now');
    expect(model.create).toBeCalledWith(values, null);
  };

  const assertSoftDelete = async (ID) => {
    const deleted = records.find(({ id }) => id === ID);
    expect(deleted).toBeTruthy();
    expect(deleted.deletedAt).toEqual('now');
  };

  const assertHardDelete = async (ID) => {
    const deleted = records.find(({ id }) => id === ID);
    expect(deleted).toBeFalsy();
  };

  describe('findById', () => {
    it('should call model findByPrimaryKey and return one record', async () => {
      const instance = await repository.findById(1);

      expect(model.getByPrimaryKey).toBeCalledWith(1, null);
      expect(model.getByPrimaryKey).toReturn();
      expect(instance).toBeDefined();
      expect(instance.id).toEqual(1);
      expect(instance.someName).toEqual('Man i go');
    });
  });

  describe('findAll', () => {
    it('should return queried records', async () => {
      const options = QueryOptions.paged({ offset: 10, limit: 25 });
      const query = { param1: 1 };
      const instances = await repository.findAll(query, options);

      expect(model.getAll).toBeCalledWith(query, options);
      expect(model.getByPrimaryKey).toReturn();
      expect(instances).toBeDefined();
      _.each(instances, (instance) => {
        const found = records.find(({ id }) => id === instance.id);

        expect(found).toBeTruthy();
        expect(instance.someName).toEqual(found.someName);
        expect(instance.typeOfObj).toEqual(found.typeOfObj);
      });
    });
  });

  describe('save', () => {
    it('should create new record', async () => {
      const values = {
        someName: 'new instance',
        typeOfObj: 'yeees',
      };

      const instance = await repository.save(values);

      assertSave(instance, values, 1);
    });
  });

  describe('bulkSave', () => {
    it('should bulk save records and return them', async () => {
      const values = [
        {
          someName: 'new instance',
          typeOfObj: 'yeees',
        },
        {
          someName: 'new instance 2',
          typeOfObj: 'yeees 2',
        },
        {
          someName: 'new instance 3',
          typeOfObj: 'yeees 3',
        },
      ];

      const instances = await repository.bulkSave(values);

      expect(model.bulkCreate).toBeCalledWith(
        values,
        null,
      );
      _.each(instances, (instance, index) => {
        const value = values[index];
        expect(instance).toBeTruthy();
        expect(instance.someName).toEqual(value.someName);
        expect(instance.typeOfObj).toEqual(value.typeOfObj);
        expect(typeof instance.id === 'number').toBe(true);
        expect(instance.createdAt).toEqual('now');
        expect(instance.some_name).toBeUndefined();
      });
    });
  });

  describe('update', () => {
    it('should update and return record', async () => {
      const toUpdate = _.first(records);
      const values = { typeOfObj: 'test 2' };

      const updated = await repository.update(values, toUpdate);

      expect(updated).toBeTruthy();
      expect(model.update).toBeCalledWith(values, toUpdate, null);
    });
  });

  describe.skip('bulkUpdate', () => {
    it('should bulk update records by passed values and queries', async () => {
      const pairs = [
        [
          {
            someName: 'bulk update',
          },
          { typeOfObj: 'update test' },
        ],
        [
          {
            someName: 'bulk update2',
          },
          { typeOfObj: 'b update test' },
        ],
      ];

      const updatedInstances = await repository.bulkUpdate(pairs);
      _.each(updatedInstances, (instance) => {
        expect([5, 6, 7, 8]).toContain(instance.id);
      });
      // test for 'update test', only records with id 5, 6
      _.each(
        _.filter(updatedInstances, ({ id }) => [5, 6].includes(id)),
        (record) => {
          expect(record.someName).toEqual('bulk update');
          expect(record.typeOfObj).toEqual('update test');
        },
      );
      // test for 'b update test', only records with id 7, 8
      _.each(
        _.filter(updatedInstances, ({ id }) => [7, 8].includes(id)),
        (record) => {
          expect(record.someName).toEqual('bulk update2');
          expect(record.typeOfObj).toEqual('b update test');
        },
      );
    });
  });

  describe('delete', () => {
    it('should soft delete record with specified id', async () => {
      const ID = 1;

      await repository.delete(ID);

      assertSoftDelete(ID);
    });

    it('should hard delete record with specified id', async () => {
      const ID = 2;

      await repository.delete(ID, false);

      assertHardDelete(ID);
    });
  });

  describe.skip('bulkDelete', () => {
    it('should soft delete records with specified ids', async () => {
      const IDS = [3, 4];

      await repository.bulkDelete(IDS);

      IDS.forEach((id) => assertSoftDelete(id));
    });

    it('should hard delete records with specified ids', async () => {
      const IDS = [3, 4];

      await repository.bulkDelete(IDS, false);

      IDS.forEach((id) => assertHardDelete(id));
    });
  });
});
