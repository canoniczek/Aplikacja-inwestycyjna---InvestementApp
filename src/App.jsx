import SignIn from "./SignIn.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Middleware from "./Middleware.jsx";
import AddFunds from "./AddFunds.jsx";
import ShowFunds from "./ShowFunds.jsx";
import MainPanel from "./MainPanel.jsx";
import CompareValues from "./CompareValues.jsx";
import InvestmentBranches from "./InvestmentBranches.jsx";
import GetSavingHistory from "./GetSavingHistory.jsx";
import SignOut from "./SignOut.jsx";
import SignUp from "./SignUp.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/sign-out" element={<SignOut />} />
        <Route path="" element={<Middleware />}>
          <Route index element={<ShowFunds />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/show-funds" element={<ShowFunds />} />
          <Route path="/main-panel" element={<MainPanel />} />
          <Route path="/compare-values" element={<CompareValues />} />
          <Route path="/investment-branches" element={<InvestmentBranches />} />
          <Route path="/get-saving-history" element={<GetSavingHistory />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;