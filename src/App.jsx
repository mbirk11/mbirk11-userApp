/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import UsersTable from "./pages/userTable/index.jsx";
import UserRegistrationForm from "./pages/userRegistrationForm/index.jsx";
import UserDataProvider from "./userDataProvider.jsx";

function App() {
  return (
    <>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<UsersTable />} />
          <Route path="/userRegistration" element={<UserRegistrationForm />} />
        </Routes>
      </UserDataProvider>
    </>
  );
}

export default App;
