import { Typography, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
function AccessDenied() {
  const history = useHistory();
  const goToHomePage = () => {
    history.push("/Commercial/dashboard");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 10,
        }}
      >
        <Typography variant="h4" color="primary" align="center">
          Access Denied...
        </Typography>
        <Typography variant="h5" color="primary" align="center">
          You don't have permission to access this page.
        </Typography>

        <Button
          variant="contained"
          onClick={goToHomePage}
          size="small"
          color="primary"
        >
          Go to The Home page
        </Button>
      </div>
    </div>
  );
}

export default AccessDenied;
