
import React from "react";
import Typography from "./components/typography/Typography";
import RadioGroup from "./components/radiogroup/RadioGroup";
import { genderLkp, roleLkp } from "./utils/testData";

const App = () => {
  const [selectedGender, setSelectedGender] = React.useState({ genderId: 3 });
  const [selectedRole, setSelectedRole] = React.useState({ roleId: 0 });

  return (
    <>
      <Typography variant="h4">
        Gender RadioGroup Component: {selectedGender.genderName}
      </Typography>

      <RadioGroup
        name="gender"
        label="Gender"
        options={genderLkp}
        valueKey="genderId"
        labelKey="genderName"
        value={selectedGender.genderId}
        onChange={setSelectedGender}
      />

      <>
        <Typography variant="h4">
          Role RadioGroup Component : {selectedRole.roleName}
        </Typography>
      </>

      <RadioGroup
        name="role"
        label="Role"
        options={roleLkp}
        valueKey="roleId"
        labelKey="roleName"
        value={selectedRole.roleId}
        onChange={setSelectedRole}
      />
    </>
  );
};

export default App;
