import mockResource from './resource.json';

export const getAllItems = () => {
  return new Promise((resolve) => {
    setTimeout(resolve(mockResource), 200);
  });
};

export const filterItems = (q) => {
  return new Promise((resolve) => {
    setTimeout(
      resolve(mockResource.filter((mr) => JSON.stringify(mr).includes(q))),
    );
  });
};
