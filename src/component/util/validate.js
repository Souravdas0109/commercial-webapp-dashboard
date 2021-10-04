import { NEW, NEW_SETUP } from "./const";
export const validate = {
  textCompare: (textOne = "", textTwo = "") => {
    return textOne.toLowerCase().trim() === textTwo.toLowerCase().trim();
  },
  productsValidate: (products) => {
    console.log("products", products);
    if (!products) {
      return false;
    }
    const productIds = products
      .replace(/\n/g, ",")
      .replace(/\s+/g, ",")
      .split(",");

    const formatedProductIds = productIds.filter(function (min) {
      return min !== "";
    });

    const isValidProductStatus = formatedProductIds
      .map((id) => /^\d{9}$/.test(id))
      .filter((item) => item);
    return formatedProductIds.length !== isValidProductStatus.length
      ? false
      : true;
  },
  minCountValidate: (products) => {
    if (!products) {
      return false;
    }
    let productIds = products
      .replace(/\n/g, ",")
      .replace(/\s+/g, ",")
      .split(",");
    if (productIds.length > 100) {
      return false;
    }
    return true;
  },
  validateDate: (date) => {
    if (date.toString().trim() === "Invalid Date") {
      return false;
    } else {
      return true;
    }
  },
  validateDateForDelist: (date, type) => {
    if (type === "Delist" && date.toString().trim() === "Invalid Date") {
      return false;
    } else {
      return true;
    }
  },
  duplicateProducts: (productIds = "", existingProducts = []) => {
    let productsIdsArray =
      productIds &&
      productIds.replace(/\n/g, ",").replace(/\s+/g, ",").split(",");
    const productsArray =
      productsIdsArray && productsIdsArray.length > 0 ? productsIdsArray : [];
    let duplicateProducts = [];
    existingProducts.forEach((productItem) => {
      if (
        productsArray.findIndex(
          (productId) =>
            parseInt(productId) === parseInt(productItem.itemNumber)
        ) > -1
      ) {
        duplicateProducts.push(productItem.itemNumber);
      }
    });
    return duplicateProducts;
  },
  validateGSCOPDate: (gscopDate, targetLaunchDate, depoClearWeek, type) => {
    const depoClearDays =
      depoClearWeek === "Week-2"
        ? 14
        : depoClearWeek === "Week-4"
        ? 28
        : depoClearWeek === "Week-6"
        ? 42
        : 56;
    var targetdate = new Date(new Date(targetLaunchDate).setHours(0, 0, 0, 0));
    const calculatedValidDate = targetdate.setDate(
      targetdate.getDate() - depoClearDays
    );
    const formatedGscopDate = Date.parse(gscopDate);
    if (type === "Derange" || type === NEW || type === NEW_SETUP) {
      return true;
    } else {
      return calculatedValidDate > formatedGscopDate;
    }
  },
  deRangeStoreInputValidate: (deRangeStoresInput, stores) => {
    if (!deRangeStoresInput) return false;
    const deRangeStore = deRangeStoresInput
      .replace(/\n/g, ",")
      .replace(/\s+/g, ",")
      .split(",");
    const filtereddeRangeStore = deRangeStore.filter(function (el) {
      return el !== "";
    });
    let validStores = [];
    filtereddeRangeStore.forEach((storeId) => {
      if (
        stores.findIndex((storeName) => storeName.name.toString() === storeId) >
        -1
      ) {
        validStores.push(storeId);
      }
    });
    return filtereddeRangeStore.length !== validStores.length ? false : true;
  },
  duplicateStores: (storeIds = "", existingStores = []) => {
    if (!storeIds) return false;
    const storeIdsArray = storeIds
      .replace(/\n/g, ",")
      .replace(/\s+/g, ",")
      .split(",");
    const storessArray = storeIdsArray.filter(function (el) {
      return el !== "";
    });
    let duplicateStores = [];
    existingStores.forEach((storeItem) => {
      if (
        storessArray.findIndex(
          (storeId) => storeId === storeItem.name.toString()
        ) > -1
      ) {
        duplicateStores.push(storeItem);
      }
    });
    return duplicateStores;
  },
  storeAvailableinRangedStores: (rangeResetItemSummary, inputText = "") => {
    const inputs = inputText
      .replace(/\n/g, ",")
      .replace(/\s+/g, ",")
      .split(",");

    const storessArray = inputs.filter(function (el) {
      return el !== "";
    });

    let rangedStores =
      rangeResetItemSummary.rangestatus &&
      rangeResetItemSummary.rangestatus.retail;
    let flag = false;
    let missingStores = [];
    storessArray.forEach((elem) => {
      rangedStores &&
        rangedStores.forEach((storeId) => {
          if (storeId === elem) {
            flag = true;
          }
        });
      if (flag === false) {
        missingStores.push(elem);
      } else {
        flag = false;
      }
    });
    return missingStores;
  },
  validatePurchaseOrderDate: (poDates, gscopDate) => {
    let invalidDates = [];
    try {
      const gscopDateFormated = Date.parse(new Date(gscopDate));
      poDates.forEach((item) => {
        if (item && item.dates && item.dates.POStopDate) {
          const pOStopDate = Date.parse(new Date(item.dates.POStopDate));
          if (pOStopDate >= gscopDateFormated) {
            invalidDates.push(item.locationId);
          }
        }
      });
      return invalidDates;
    } catch (error) {
      console.log(error);
    }
  },
  validateStoreAddedInDerangeItem: (productSearchResults) => {
    let itemsNotDeranged = [];
    productSearchResults.forEach((product) => {
      if (
        product.type === "Derange" &&
        product.derangedLocations.length === 0
      ) {
        itemsNotDeranged.push(product.itemNumber);
      }
    });
    return itemsNotDeranged;
  },

  getDifferenceInWeeksForTargetLaunchDate: (targetDate) => {
    const today = new Date();
    const targetLaunchDate = new Date(targetDate);
    const msPerDay = 24 * 60 * 60 * 1000;
    const msLeft = targetLaunchDate.getTime() - today.getTime();
    let daysLeft = Math.round(msLeft / msPerDay);
    const weeksLeft = Math.floor(daysLeft / 7);
    daysLeft = ((daysLeft % 7) / 7).toFixed(2);
    return weeksLeft + +daysLeft;
  },
};
