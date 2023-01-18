import React from "react";
import Box from "@mui/material/Box";

interface Props {
  children: React.ReactNode;
  value: Number;
  index: Number;
}

const TabPanel: React.FC<Props> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
