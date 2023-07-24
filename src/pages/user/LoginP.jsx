import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../server/request";
import { AuthContext } from "../../context/AuthContext";
import { setAuthCookies } from "../../utils/setAuthCookies";
import "../../components/styles/Login-Register.scss"
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const LoginP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await request.post("auth/login", user);
      const { role } = data;
      setIsAuthenticated(true);
      setRole(role);
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/my-posts");
      }
      setAuthCookies(data);
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  );
  return (
    <section className="login-page">
      <h1>Login</h1>
      {loading ? (
            <Spin style={{display: "flex", justifyContent: "center", paddingBottom: "50px" }} indicator={antIcon} />
          ) : (
        <form onSubmit={submit}>
          <div className="inputs">
          <input
            type="text"
            onChange={handleChange}
            value={user.username}
            placeholder="username"
            name="username"
          />
          <input
            type="text"
            onChange={handleChange}
            value={user.password}
            placeholder="password"
            name="password"
          />
          <button className="button" type="submit">Send</button>
          </div>
        </form>
      )}
    </section>
  );
};

export default LoginP;
