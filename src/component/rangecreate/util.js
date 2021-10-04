import { sorting } from "../util/sort";
import { nameBuilder } from "../util/nameBuilder";
import { errorMessage } from "../util/messages";

const util = {
  getDepartments: (data) => {
    const divisions = data.divisions.map((division) => {
      return division;
    });

    const groups = divisions.map((item) => {
      return item.division.groups;
    });

    let groupsList = [];
    groups.forEach((item) => {
      const groupArray = item.map((group) => {
        return group.group;
      });
      groupsList = [...groupsList, ...groupArray];
    });
    return groupsList
      .filter(
        (department) =>
          !(
            department.name.toLowerCase().startsWith("department sale") ||
            department.name.toLowerCase().startsWith("gibraltar")
          )
      )
      .map((department) => {
        return {
          id: department.id,
          name: department.name,
          categories: department.departments
            .map((category) => {
              return {
                department: {
                  classes: category.department.classes,
                  name: category.department.name,
                  id: category.department.id,
                },
                name: category.department.name,
              };
            })
            .sort(sorting.sortByString("name")),
        };
      })
      .sort(sorting.sortByString("name"));
  },
  validateFileExtension: (inputFileName, extns) => {
    return new RegExp(
      "(" + extns.join("|").replace(/\./g, "\\.") + ")$",
      "i"
    ).test(inputFileName);
  },
  getRangeResetName: (rangeResetName, fieldValue, field) => {
    let newRangeResetName = rangeResetName;
    switch (field) {
      case "department":
        newRangeResetName = nameBuilder.addDepartmentToName(
          rangeResetName,
          fieldValue
        );
        return newRangeResetName;
      case "category":
        newRangeResetName = nameBuilder.addCategoryToName(
          rangeResetName,
          fieldValue
        );
        return newRangeResetName;
      case "targetLaunchDate":
        newRangeResetName = nameBuilder.addTargetLaunchDateToName(
          rangeResetName,
          fieldValue
        );
        return newRangeResetName;
      default:
        return rangeResetName;
    }
  },
  validateTargetDateForMondayandTwentyEightWeeks: (targetDate) => {
    let warningMessage = "";
    if (targetDate) {
      const currentDate = new Date(Date.now());
      const twentyEightWeeksinDays = 195;
      const twentyEightWeeksinDate = new Date(
        currentDate.setDate(currentDate.getDate() + twentyEightWeeksinDays)
      );

      if (new Date(targetDate).getDay() !== 1) {
        warningMessage = errorMessage.getErrorMessage(
          "createRangeReset",
          "targetDateMismatchDayWarning"
        );
      }

      if (targetDate > twentyEightWeeksinDate) {
        if (warningMessage) {
          warningMessage = errorMessage.getErrorMessage(
            "createRangeReset",
            "targetDateMismatchDayAndDateWarning"
          );
        } else {
          warningMessage = errorMessage.getErrorMessage(
            "createRangeReset",
            "targetDateMismatchDateWarning"
          );
        }
      }
    }
    return warningMessage;
  },
  getFileExtension: (fileName) => {
    return fileName.split(".").pop();
  },
  getProductListFromExcelFile: (productsData) => {
    let productsList = [];
    productsData.forEach((row) => {
      if (row[0]) {
        if (
          productsList.findIndex(
            (obj) => parseInt(obj.prodMinCode) === parseInt(row[0])
          ) > -1
        ) {
          let index = productsList.findIndex(
            (obj) => parseInt(obj.prodMinCode) === parseInt(row[0])
          );
          if (!isNaN(parseInt(row[1]))) {
            if (
              productsList[index].storeIds.findIndex(
                (id) => parseInt(id) === parseInt(row[1])
              ) === -1
            ) {
              productsList[index].storeIds.push(parseInt(row[1]));
            }
          }
        } else {
          let stores = [];
          if (!isNaN(parseInt(row[1]))) {
            stores.push(parseInt(row[1]));
          }
          productsList.push({
            prodMinCode: parseInt(row[0]),
            storeIds: stores,
          });
        }
      }
    });
    return productsList;
  },
  getProductListFromCsvFile: (newLinebrk) => {
    let productsList = [];
    for (let i = 0; i < newLinebrk.length; i++) {
      let rowData = newLinebrk[i] ? newLinebrk[i].split(",") : [];
      if (rowData[0]) {
        if (
          productsList.findIndex(
            (obj) => parseInt(obj.prodMinCode) === parseInt(rowData[0])
          ) > -1
        ) {
          let index = productsList.findIndex(
            (obj) => parseInt(obj.prodMinCode) === parseInt(rowData[0])
          );
          if (!isNaN(parseInt(rowData[1]))) {
            if (
              productsList[index].storeIds.findIndex(
                (id) => parseInt(id) === parseInt(rowData[1])
              ) === -1
            ) {
              productsList[index].storeIds.push(parseInt(rowData[1]));
            }
          }
        } else {
          let stores = [];
          if (!isNaN(parseInt(rowData[1]))) {
            stores.push(parseInt(rowData[1]));
          }
          productsList.push({
            prodMinCode: parseInt(rowData[0]),
            storeIds: stores,
          });
        }
      }
    }
    return productsList;
  },
  getDuplicateProductList: (duplicateMinCodes, prodList) => {
    let duplicateProdList = [];
    prodList.forEach((row) => {
      if (
        duplicateMinCodes.findIndex(
          (minCode) => parseInt(minCode) === row.prodMinCode
        ) > -1
      ) {
        duplicateProdList.push(row);
      }
    });
    return duplicateProdList;
  },
  getNewProductList: (duplicateMinCodes, prodList) => {
    let newProdList = [];
    prodList.forEach((row) => {
      if (
        duplicateMinCodes.findIndex(
          (minCode) => parseInt(minCode) === row.prodMinCode
        ) === -1
      ) {
        newProdList.push(row);
      }
    });
    return newProdList;
  },
  getExistingMins: (products) => {
    const mins = (products || []).map((item) => {
      return item && item.itemNumber;
    });
    return mins;
  },
};

export { util };
