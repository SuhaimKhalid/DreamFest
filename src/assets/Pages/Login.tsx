import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import type { User } from "../Utilities/Type";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("User");
    if (savedUser) {
      setAllUsers(JSON.parse(savedUser));
    }
    console.log(savedUser);
  }, []);

  function LoginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const currentUser = allUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!currentUser) {
      alert("User Is Not Found");
      setEmail("");
      setPassword("");
      return;
    }

    localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
  }
  return (
    <>
      {
        <Container>
          <section id="LoginPage">
            <h1>Login </h1>
            <form onSubmit={LoginHandler}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="email"
                />
                {/* {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )} */}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="password"
                />
                {/* {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )} */}
              </div>

              <div className="btn_box">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/register", "_self");
                  }}
                  className="btn RegisterBtn"
                >
                  <span>Register</span>
                </button>
                <button type="submit" className="btn LoginBtn">
                  <span>Login</span>
                </button>
              </div>
            </form>
          </section>
        </Container>
      }
    </>
  );
};
