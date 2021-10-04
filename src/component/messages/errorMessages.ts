export const errorMessages = {
  createRangeReset: {
    name: "This field is required",
    buyerName: "This field is required",
    category: "This field is required",
    department: "This field is required",
    targetLaunchDate: "This field is required",
    inValidDate: "Add valid date",
    products: "This field is required",
    invalidProducts: "Some of the MINs are invalid, please check!",
    duplicateProducts:
      "Some products already exist. Please remove those product mins to proceed",
    minCountLessThanHundred:
      "The number of min codes should be less than 100. Please remove some min code",
    invalidGSCOPDate: "GSCOP Date is invalid for following min codes: ",
    invaliddeRangeStores: "All store ids entered are not valid, please check!",
    duplicatedeRangeStores:
      "Stores already exists for following ids: {0}.Please remove those stores to proceed",
    invalidFileExtensions:
      "Invalid file uploaded!. Please upload files with extension(s): .xls, .xlsx, .csv",
    rangedStoreNotExist:
      "Some of the stores that you are trying to enter: {0} is not in ranged store",
    invalidProduct:
      "Some products entered are not valid, may be invalid product min code or they doesn't match to selected department and category, please check !",
    invalidGscopDateItem: "GSCOP Date is invalid",
    invalidProductInConfirmed:
      "Some products entered are not valid, may be invalid product min code or they doesn't match to selected department and category, please change the status of those product min to 'Cancel' to proceed.",
    itemsNotDeranged:
      "Please select the stores to derange for this products: {0}",
    supplyChainSpName: "This field is required",
    targetDateMismatchDayWarning: "The selected date is not Monday",
    targetDateMismatchDateWarning: "The date selected is beyond week-28",
    targetDateMismatchDayAndDateWarning:
      "The selected date is not Monday and the date selected is beyond week-28",
    invalidProductCount: "Please enter a valid product count, max 500",
    minMinCountForConfirm:
      "You cannot confirm a reset without at least 1 valid item",
  },
  itemSummary: {
    inValidDate: "Add valid date",
    productEndDate: "This field is required",
    gscopDate: "This field is required",
    invalidGSCOPDate: "GSCOP Date is invalid",
    inValidPODates:
      "Please enter valid PO dates for the following depot ids: {0}",
  },
};
