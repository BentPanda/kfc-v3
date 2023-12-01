export const groupBy = (arr, callbackFn) =>
  arr.reduce((groups, item, index, array) => {
    (groups[callbackFn(item, index, array)] ||= []).push(item);
    return groups;
  }, {});
