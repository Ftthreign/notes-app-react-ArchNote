import { createContext, useEffect, useState } from "react";
import { getUserLogged, putAccessToken } from "../helpers/network-data";
import PropTypes from "prop-types";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { error, data } = await getUserLogged();
        if (!error) {
          setAuthUser(data);
        }
      } catch (e) {
        console.error("Gagal mengambil data user:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const loginSuccess = async (token) => {
    putAccessToken(token);
    const { data } = await getUserLogged();
    setAuthUser(data);
  };

  const logout = () => {
    setAuthUser(null);
    putAccessToken("");
  };

  return (
    <AuthContext.Provider value={{ authUser, loading, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
