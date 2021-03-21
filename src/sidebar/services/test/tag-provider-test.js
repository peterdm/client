import tagProviderFactory from '../local-tags';

const TAGS_LIST_KEY = 'hypothesis.user.tags.list';
const TAGS_MAP_KEY = 'hypothesis.user.tags.map';

class FakeStorage {
  constructor() {
    this._storage = {};
  }

  getObject(key) {
    return this._storage[key];
  }

  setObject(key, value) {
    this._storage[key] = value;
  }
}

describe('sidebar/services/tag-provider', () => {
  let fakeLocalStorage;
  let tags;

  beforeEach(() => {
    fakeLocalStorage = new FakeStorage();

    const stamp = Date.now();
    const savedTagsMap = {
      foo: {
        text: 'foo',
        count: 1,
        updated: stamp,
      },
      bar: {
        text: 'bar',
        count: 5,
        updated: stamp,
      },
      'bar argon': {
        text: 'bar argon',
        count: 2,
        updated: stamp,
      },
      banana: {
        text: 'banana',
        count: 2,
        updated: stamp,
      },
      future: {
        text: 'future',
        count: 2,
        updated: stamp,
      },
      argon: {
        text: 'argon',
        count: 1,
        updated: stamp,
      },
    };
    const savedTagsList = Object.keys(savedTagsMap);

    fakeLocalStorage.setObject(TAGS_MAP_KEY, savedTagsMap);
    fakeLocalStorage.setObject(TAGS_LIST_KEY, savedTagsList);

    tags = tagProviderFactory(fakeLocalStorage);
  });

  describe('#filter', () => {
    it('returns tags that start with the query string', async () => {
      let suggestions = await tags.filter({ text: 'b' });
      assert.deepEqual(suggestions, ['bar', 'bar argon', 'banana']);
    });

    it('returns tags that have any word starting with the query string', async () => {
      let suggestions = await tags.filter({ text: 'ar' });
      assert.deepEqual(suggestions, ['bar argon', 'argon']);
    });

    it('is case insensitive', async () => {
      let suggestions = await tags.filter({ text: 'Ar' });
      assert.deepEqual(suggestions, ['bar argon', 'argon']);
    });

    it('limits tags when provided a limit value', async () => {
      let one = await tags.filter({ text: 'b' }, 1);
      let two = await tags.filter({ text: 'b' }, 2);
      let tre = await tags.filter({ text: 'b' }, 3);

      assert.deepEqual(one, ['bar']);
      assert.deepEqual(two, ['bar', 'bar argon']);
      assert.deepEqual(tre, ['bar', 'bar argon', 'banana']);
    });
  });
});
