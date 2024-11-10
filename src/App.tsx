import { BrowserRouter, Routes as Wrapper, Route } from "react-router-dom";
import "./App.css";
import LongestSubstringCalculator from "./features/LongestSubstringCalculator";
import UnauthorizedRoute from "./router/UnauthorizedRoute";
import AuthorizedRoute from "./router/AuthorizedRoute";
import { Routes } from "./router/routes";
import CommonAuthPage from "./auth/CommonAuthPage";
import BinaryTree from "./features/binary-tree/BinaryTree";
import { useEffect } from "react";
import { setTokenOnRefresh } from "./store/auth/slice";

function App() {
  useEffect(() => {
    setTokenOnRefresh();
  }, []);

  return (
    // create two types of router: 1. Unauthorized {signin page, Signup page}; 2: Authorized {All Other}
    <BrowserRouter>
      <Wrapper>
        <Route element={<UnauthorizedRoute />}>
          <Route path={Routes.SIGN_IN} element={<CommonAuthPage />} />
          <Route path={Routes.SIGN_UP} element={<CommonAuthPage />} />
        </Route>
        <Route element={<AuthorizedRoute />}>
          <Route
            path={Routes.SUBSTRING}
            element={<LongestSubstringCalculator />}
          />
          <Route path={Routes.BINARY_TREE} element={<BinaryTree />} />
        </Route>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
