export const ColleagueInfo = {
  getLoggedInColleagueUserName: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );

      const firstName =
        ColleagueInfo && ColleagueInfo.data && ColleagueInfo.data.FirstName
          ? ColleagueInfo.data.FirstName
          : "";
      const lastName =
        ColleagueInfo && ColleagueInfo.data && ColleagueInfo.data.LastName
          ? ColleagueInfo.data.LastName
          : "";
      return firstName + " " + lastName;
    } else {
      return "";
    }
  },
  getLoggedInColleagueBusineesunitName: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );

      const businessUnit =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.colleagueLocationData &&
        ColleagueInfo.data.colleagueLocationData.businessUnit
          ? ColleagueInfo.data.colleagueLocationData.businessUnit
          : "";
      return businessUnit;
    } else {
      return "";
    }
  },
  getLoggedInColleaguedepartmentName: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const department =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.colleagueLocationData &&
        ColleagueInfo.data.colleagueLocationData.department
          ? ColleagueInfo.data.colleagueLocationData.department
          : "";
      return department;
    } else {
      return "";
    }
  },
  getLoggedInColleaguedivisionName: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const division =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.colleagueLocationData &&
        ColleagueInfo.data.colleagueLocationData.division
          ? ColleagueInfo.data.colleagueLocationData.division
          : "";
      return division;
    } else {
      return "";
    }
  },
  getLoggedInColleaguegroupName: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const group =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.colleagueLocationData &&
        ColleagueInfo.data.colleagueLocationData.group
          ? ColleagueInfo.data.colleagueLocationData.group
          : "";
      return group;
    } else {
      return "";
    }
  },
  getLoggedInColleaguelocationNameName: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const locationName =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.colleagueLocationData &&
        ColleagueInfo.data.colleagueLocationData.locationName
          ? ColleagueInfo.data.colleagueLocationData.locationName
          : "";
      return locationName;
    } else {
      return "";
    }
  },
  getLoggedInColleagueregionName: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const region =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.colleagueLocationData &&
        ColleagueInfo.data.colleagueLocationData.region
          ? ColleagueInfo.data.colleagueLocationData.region
          : "";
      return region;
    } else {
      return "";
    }
  },
  getLoggedInColleagueemployeeId: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const employeeId =
        ColleagueInfo && ColleagueInfo.data && ColleagueInfo.data.employeeId
          ? ColleagueInfo.data.employeeId
          : "";
      return employeeId;
    } else {
      return "";
    }
  },
  getLoggedInColleagueemployee_status: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const employee_status =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.employee_status
          ? ColleagueInfo.data.employee_status
          : "";
      return employee_status;
    } else {
      return "";
    }
  },
  getLoggedInColleaguehireDate: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const hireDate =
        ColleagueInfo && ColleagueInfo.data && ColleagueInfo.data.hireDate
          ? ColleagueInfo.data.hireDate
          : "";
      return hireDate;
    } else {
      return "";
    }
  },
  getLoggedInColleaguegrade: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const grade =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.jobRole &&
        ColleagueInfo.data.jobRole.grade
          ? ColleagueInfo.data.jobRole.grade
          : "";
      return grade;
    } else {
      return "";
    }
  },
  getLoggedInColleaguejobCode: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const jobCode =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.jobRole &&
        ColleagueInfo.data.jobRole.jobCode
          ? ColleagueInfo.data.jobRole.jobCode
          : "";
      return jobCode;
    } else {
      return "";
    }
  },
  getLoggedInColleaguejobTitle: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const jobTitle =
        ColleagueInfo &&
        ColleagueInfo.data &&
        ColleagueInfo.data.jobRole &&
        ColleagueInfo.data.jobRole.jobTitle
          ? ColleagueInfo.data.jobRole.jobTitle
          : "";
      return jobTitle;
    } else {
      return "";
    }
  },
  getLoggedInColleaguestatus: () => {
    if (localStorage && localStorage.getItem("_Colresponse")) {
      const ColleagueInfo = JSON.parse(
        localStorage && localStorage.getItem("_Colresponse")
      );
      const status =
        ColleagueInfo && ColleagueInfo.data && ColleagueInfo.data.status
          ? ColleagueInfo.data.status
          : "";
      return status;
    } else {
      return "";
    }
  },
};
