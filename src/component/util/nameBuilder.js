import { format } from "date-fns";

export const nameBuilder = {
  addDepartmentToName: (rangeResetName, department) => {
    let nameArray = rangeResetName ? rangeResetName.split("_") : [];
    nameArray[0] = department !== "None" ? department : "";
    nameArray[1] = "";
    const newRangeResetName = nameArray.join("_");
    return newRangeResetName;
  },
  addCategoryToName: (rangeResetName, category) => {
    let nameArray = rangeResetName ? rangeResetName.split("_") : [];
    nameArray[1] = category !== "None" ? category : "";
    const newRangeResetName = nameArray.join("_");
    return newRangeResetName;
  },
  addTargetLaunchDateToName: (rangeResetName, targetLaunchDate) => {
    let nameArray = rangeResetName ? rangeResetName.split("_") : [];
    let targetDate = "";
    try {
      targetDate = targetLaunchDate
        ? format(new Date(targetLaunchDate), "dd/MM/yyyy")
        : "NA";
    } catch (e) {
      console.log("Inavlid target date");
    }
    nameArray[2] = targetDate !== "NA" ? targetDate : "";
    const newRangeResetName = nameArray.join("_");
    return newRangeResetName;
  },
};
