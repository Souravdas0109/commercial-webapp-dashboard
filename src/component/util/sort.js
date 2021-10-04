export const sorting = {
  sortByString: (property) => {
    return function (a, b) {
      return a[property].toString().localeCompare(b[property].toString());
    };
  },
  sortByNum: (property) => {
    return function (a, b) {
      return a[property] - b[property].toString();
    };
  },
  sortByValidDepStatus: () => {
    return function (a, b) {
      if (a["isInvalidItemDepCategory"] === true) {
        return 1;
      } else {
        return -1;
      }
    };
  },
  sortByValidItemStatus: () => {
    return function (a, b) {
      if (a["isInvalid"] === true) {
        return 1;
      } else {
        return -1;
      }
    };
  },
};
