import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import DropDown from "./components/dropdown/DropDown";
import { skills } from "./utils/testData";

const roles = [
  { roleId: 1, roleName: "Admin" },
  { roleId: 2, roleName: "Super Admin" },
  { roleId: 3, roleName: "User" },
];

// const skills = [
//   {
//     skillId: 1,
//     skillName: "Java With Advanced Java With Advanced Java With Advanced",
//   },
//   { skillId: 2, skillName: "Spring Boot With Security" },
//   { skillId: 3, skillName: "React JS with MUI Library" },
//   { skillId: 4, skillName: "Git and Github Desktop" },
//   { skillId: 5, skillName: "DevOps with Kubernatis" },
//   { skillId: 6, skillName: "Gen AI with Agentic AI" },
// ];

const App = () => {
  const [role, setRole] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  selectedSkills.map((obj) => console.log(">>>>", obj));

  return (
    <Box sx={{ width: "50%" }}>
      <p>Selected Role : {role?.roleName || "None"}</p>

      <p>
        Selected Skills:{" "}
        {selectedSkills.length > 0
          ? selectedSkills.map((obj) => obj.skillId).join(", ")
          : "None"}
      </p>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <DropDown
            options={roles}
            value={role}
            onChange={setRole}
            placeholder="Select a role"
            labelKey="roleName"
            valueKey="roleId"
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <DropDown
            multiple
            options={skills}
            value={selectedSkills}
            onChange={setSelectedSkills}
            placeholder="Select skills"
            labelKey="skillName"
            valueKey="skillId"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
