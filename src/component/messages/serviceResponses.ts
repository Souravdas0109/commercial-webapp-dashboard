export const serviceResponses = {
  createRangeReset: {
    success: 'Successfully saved to draft',
    error: 'Error while saving range reset',
  },
  updateRangeReset: {
    success: 'Successfully saved to draft',
    error: 'Error while saving range reset',
  },
  confirmRangeReset: {
    success: 'Range Reset Successfully confirmed',
    update: 'Range Reset Successfully updated',
    error: 'Error while confirming range reset',
  },
  deleteRangeReset: {
    success: 'Range Reset Successfully deleted!',
    error: 'Failed to delete range reset. Please try again later!',
  },
  addRangeResetItems: {
    success: 'Successfully added items to range reset',
    error: 'Error while adding items to range reset',
  },
  productDetailsValidation: {
    success: 'Product details validation successful',
    error: 'Product details validation failed.',
    invalid: 'Some products are invalid.',
  },
  addValidRangeResetItems: {
    success: 'Successfully added products to range reset',
    error: 'Error. Please enter valid products',
  },
  deleteRangeResetItems: {
    success: 'Successfully removed products from range reset',
    error: 'Error while deleting products',
    partialSuccess: 'Error while deleting few products',
  },
  updateRangeResetItem: {
    success: 'Successfully updated the item',
    error: 'Error while updating item',
    errorGSCOPValidation:
      'Error while updating item. GSCOP date must be no later than 7 days after depot clear by date',
  },
  getRangeResetItem: {
    success: 'Successfully updated the item',
    error: 'Error while Fetching item summary',
  },
  getAllRangeResets: {
    success: 'Successfully fetched all Range resets',
    error: 'Error while Fetching Range resets',
    noRecords: 'No records found',
  },
  getRangeReset: {
    success: 'Successfully updated the item',
    error: 'Error while fetching range reset',
  },
  app: {
    loading: 'Loading...',
    accessDenied: 'Access Denied',
    noPermMsg: 'You do not have the permission to access this page',
    serviceError:
      'An error occured while connecting to service. Please try again later',
    serviceUnavailable: 'Service not available',
  },
  login: {
    serviceUnavailable: 'Login failed. Service is not available.',
    userNotExist: 'Login failed. Employee does not exist.',
  },
}
