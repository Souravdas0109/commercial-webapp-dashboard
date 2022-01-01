export const avtarInfo = {
  getLoggedInAvtarName: () => {
    if (localStorage && localStorage.getItem("_Gresponse")) {
      const userInfo = JSON.parse(
        localStorage && localStorage.getItem("_Gresponse")
      );
      const firstName =
        userInfo && userInfo.profileObj && userInfo.profileObj.givenName
          ? userInfo.profileObj.givenName.charAt(0).toUpperCase()
          : "";
      const lastName =
        userInfo && userInfo.profileObj && userInfo.profileObj.familyName
          ? userInfo.profileObj.familyName.charAt(0).toUpperCase()
          : "";
      return firstName + " " + lastName;
    } else {
      return "";
    }
  },
};
