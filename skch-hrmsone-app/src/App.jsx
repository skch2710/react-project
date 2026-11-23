import TwoGridDataHandle from "./pages/employee/TwoGridDataHandle";
import { employeeColumns, employeeRows } from "./pages/employee/employeeHelper";
import EmployeePage from "./pages/employee/EmployeePage";

const App = () => {
  return (
    <div>
      <TwoGridDataHandle rows={employeeRows} columns={employeeColumns} />
      {/* <EmployeePage /> */}
    </div>
  );
};

export default App;
