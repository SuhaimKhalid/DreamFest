import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import type { User } from "../Utilities/Type";
import "../Style/formPages.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

type LoginErrors = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { setCurrentUser } = context;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<LoginErrors>({});
  useEffect(() => {
    const savedUser = localStorage.getItem("User");
    if (savedUser) {
      setAllUsers(JSON.parse(savedUser));
    }
    console.log(savedUser);
  }, []);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form_col",
        {
          opacity: 0,
          y: 90,
        },
        {
          opacity: 1,
          y: 0,
          duration: 2.4,
          delay: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    });

    return () => ctx.revert();
  }, []);

  function LoginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrors({
        email: !email.trim() ? "Email is required." : "",
        password: !password.trim() ? "Password is required." : "",
      });
      return;
    }

    setErrors({});

    const currentUser = allUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!currentUser) {
      alert("User Is Not Found");
      setEmail("");
      setPassword("");
      return;
    }
    setCurrentUser(currentUser);
    localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
    navigate("/dashboard");
  }

  return (
    <>
      {
        <section id="LoginPage">
          <Row>
            <Container>
              <div className=" form_col">
                <h1 style={{ textAlign: "center" }}> Login </h1>
                <form onSubmit={LoginHandler}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      type="email"
                      className="form-control"
                      id="email"
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      type="password"
                      className="form-control"
                      id="password"
                    />
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>

                  <div className="btn_box">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("/", "_self");
                      }}
                      className="btn"
                    >
                      <span>Cancel</span>
                    </button>
                    <button type="submit" className="btn LoginBtn">
                      <span>Login</span>
                    </button>
                  </div>
                </form>
              </div>
            </Container>
          </Row>
        </section>
      }
    </>
  );
};
