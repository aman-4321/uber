import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { setUser } = context;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setUser(response.data);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/login");
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
