import { Route, Routes } from "react-router-dom";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainRiding from "./pages/CaptainRiding";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import Riding from "./pages/Riding";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserSignup from "./pages/UserSignup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="/riding" element={<Riding />}></Route>

        <Route path="/captain-login" element={<CaptainLogin />}></Route>
        <Route path="/captain-signup" element={<CaptainSignup />}></Route>
        <Route path="/captain-riding" element={<CaptainRiding />} />

        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        ></Route>
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        ></Route>
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        ></Route>

        <Route
          path="/captain/logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
