import { Tabs as MuiTabs, Tab } from "@mui/material";
import { memo } from "react";
import { tabsStyles, tabStyles } from "./tabsStyle";

const Tabs = memo((props) => {
  const { value, onChange, tabs } = props;
  return (
    <MuiTabs value={value} onChange={onChange} sx={tabsStyles}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          icon={tab.icon}
          iconPosition="start"
          label={tab.tabName}
          sx={tabStyles}
          disabled={tab.disabled}
        />
      ))}
    </MuiTabs>
  );
});

export default Tabs;
