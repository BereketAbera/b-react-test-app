import mockResource from './resource.json';

/**
 * Mock api resource
 * @param {*} q
 * @returns
 */
export const getMockItems = (q) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!q) resolve(mockResource);
      else {
        resolve(
          mockResource.filter((mr) =>
            JSON.stringify(mr)
              .replace(/{|}/g, '')
              .toLocaleLowerCase()
              .includes(q.toLocaleLowerCase()),
          ),
        );
      }
    });
  });
};
