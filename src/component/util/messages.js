import {
  errorMessages,
  labels,
  helperText,
  serviceResponses,
  itemSummaryHelperText,
} from "../messages";

export const errorMessage = {
  getErrorMessage: (page, errorCode) => {
    return errorMessages[page][errorCode];
  },
};

export const helperTexts = {
  getHelperText: (page, errorCode) => {
    return helperText[page][errorCode];
  },
};

export const labelMessages = {
  getLabel: (page, errorCode) => {
    return labels[page][errorCode];
  },
};

export const serviceResponse = {
  getMessage: (page, service) => {
    return serviceResponses[page][service];
  },
};

export const itemSummaryHelperTexts = {
  itemSummaryHelperText: (page, fieldName) => {
    return itemSummaryHelperText[page][fieldName];
  },
};
