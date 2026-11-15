import TwoGridDataHandle from "./pages/employee/TwoGridDataHandle";
import { employeeColumns, employeeRows } from "./pages/employee/employeeHelper";

const App = () => {
  return (
    <div>
      <TwoGridDataHandle rows={employeeRows} columns={employeeColumns} />
    </div>
  );
};

export default App;
