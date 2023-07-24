import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../../components/styles/Login-Register.scss"

import { request } from "../../server/request";
import { toast } from "react-toastify";

const RegisterP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit1 = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      setLoading(true);

      await request.post("auth/register", user);

      setIsAuthenticated(true);

      navigate("/login");
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
          <h1>Register</h1>
          {loading ? (
            <Spin style={{display: "flex", justifyContent: "center", paddingBottom: "50px"}} indicator={antIcon} />
          ) : (
            <form onSubmit={submit1} >
              <div className="inputs">
                <input
                  type="text"
                  onChange={handleChange}
                  value={user.first_name}
                  placeholder="Firstname"
                  name="first_name"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  value={user.last_name}
                  placeholder="Lastname"
                  name="last_name"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  value={user.username}
                  placeholder="Username"
                  name="username"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  value={user.password}
                  placeholder="Password"
                  name="password"
                />
              <button className="button" type="submit">
                Register
              </button>
              </div>
            </form>
          )}
        </section>
  );
};

export default RegisterP;

// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { Spin } from "antd";

// import { request } from "../../server/request";

// const RegisterP = () => {
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);
//   const [user, setUser] = useState({
//     username: "",
//     password: "",
//     first_name: "",
//     last_name: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const submit1 = async (e) => {
//     e.preventDefault();
//     console.log(user);
//     try {
//       setLoading(true);

//       await request.post("auth/register", user);

//       setIsAuthenticated(true);

//       navigate("/login");
//     } catch (err) {
//       console.log(err); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section>
//       <div className="RegisterFlex">
//         <section className="loginpage">
//           <h1>Register</h1>
//           {loading ? (
//             <Spin
//               size="large"
//               style={{
//                 fontSize: "50px",
//                 color: "blue",
//                 fontWeight: "bold",
//               }}
//             />
//           ) : (
//             <form onSubmit={submit1}>
//               <input
//                 type="text"
//                 onChange={handleChange}
//                 value={user.first_name}
//                 placeholder="Firstname"
//                 name="first_name"
//               />
//               <input
//                 type="text"
//                 onChange={handleChange}
//                 value={user.last_name}
//                 placeholder="Lastname"
//                 name="last_name"
//               />
//               <input
//                 type="text"
//                 onChange={handleChange}
//                 value={user.username}
//                 placeholder="Username"
//                 name="username"
//               />
//               <input
//                 type="text"
//                 onChange={handleChange}
//                 value={user.password}
//                 placeholder="Password"
//                 name="password"
//               />
//               {/* <input
//                 type="text"
//                 onChange={handleChange}
//                 value={user.password}
//                 placeholder="Confirm password"
//                 name="password"
//               /> */}
//               <button className="button" type="submit">
//                 Register
//               </button>
//             </form>
//           )}
//         </section>
//       </div>
//     </section>
//   );
// };

// export default RegisterP;