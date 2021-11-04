import mockResource from './resource.json';

export const getAllItems = () => {
  return new Promise((resolve) => {
    setTimeout(resolve(mockResource), 200);
  });
};
