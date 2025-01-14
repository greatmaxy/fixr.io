import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MaintenancePortal from '../src/components/MaintenancePortal'
import MachineProfile from '../src/components/MachineProfile'
import MachineSearch from '../src/components/MachineSearch'
import DashBoardPortal from '../src/components/DashBoardPortal'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DashBoardPortal />} />
      <Route path="/machine-profile" element={<MachineProfile />} />
    </Routes>
  </Router>
);

export default App;