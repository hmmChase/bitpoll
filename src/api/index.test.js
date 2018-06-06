import { doFetch, cleanContributors, parseLinkHeader } from './index';

describe('doFetch', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );
  });

  it('calls fetch with correct params', async () => {
    const url = 'www.google.com';

    await doFetch(url);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenLastCalledWith(url);
  });

  it('throws an error if response.ok is false', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        ok: false,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );

    const expected = Error(`Network request failed. (error: 500)`);
    await expect(doFetch()).rejects.toEqual(expected);
  });

  it('throws an error if fetch fails', async () => {
    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(Error('mock error')));
    const expected = Error('Network request failed. (error: mock error)');

    await expect(doFetch()).rejects.toEqual(expected);
  });
});

describe('cleanContributors', () => {
  it('converts an array to an object with id as key', () => {
    const contributors = [
      {
        login: 'laanwj',
        id: 126646
      }
    ];
    const expected = {
      '126646': {
        id: 126646,
        login: 'laanwj'
      }
    };

    expect(cleanContributors(contributors)).toEqual(expected);
  });
});

describe('parseLinkHeader', () => {
  it('throws error if header length equals 0', () => {
    const header = [];

    const expected = 'input must not be of zero length';

    expect(() => parseLinkHeader(header)).toThrow(expected);
  });

  it('parses a header string into an object', () => {
    const header =
      '<https://api.github.com/repositories/1181927/contributors?per_page=100&page=2>; rel="next", <https://api.github.com/repositories/1181927/contributors?per_page=100&page=4>; rel="last"';

    const expected = {
      last:
        'https://api.github.com/repositories/1181927/contributors?per_page=100&page=4',
      next:
        'https://api.github.com/repositories/1181927/contributors?per_page=100&page=2'
    };

    expect(parseLinkHeader(header)).toEqual(expected);
  });
});
