import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return navigate("/admin/login");

      try {
        await axios.get("/api/admin/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVerified(true);
      } catch (error) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    };
    verifyToken();
  }, [navigate]);

  return verified ? children : null;
};

export default ProtectedRoute;
