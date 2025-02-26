// import node module libraries
import { BrowserRouter as Router } from "react-router-dom";

// import layouts

import AllRoutes from "./Layout/AllRoutes";

// import required stylesheet
import "simplebar/dist/simplebar.min.css";
import "tippy.js/animations/scale.css";
import { UserProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <AllRoutes />
      </UserProvider>
    </Router>
  );
}

export default App;
