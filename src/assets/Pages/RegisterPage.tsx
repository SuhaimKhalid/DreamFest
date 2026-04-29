import { useContext, useEffect, useLayoutEffect, useState } from "react";
import type { User } from "../Utilities/Type";
import { Container, Row } from "react-bootstrap";
import "../Style/formPages.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

type registerErrors = {
  userName?: string;
  email?: string;
  password?: string;
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) return null;
  const { setCurrentUser } = context;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User[]>([]);

  // Error State
  const [errors, setErrors] = useState<registerErrors>({});

  //   To Get User Data From LocalStorage ON Start
  useEffect(() => {
    const savedUser = localStorage.getItem("User");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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

  // Function to store Data in Local Storage
  function RegisterFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userName.trim() || !email.trim() || !password.trim()) {
      setErrors({
        userName: !userName.trim() ? "UserName is required." : "",
        email: !email.trim() ? "Email is required." : "",
        password: !password.trim() ? "Password is required." : "",
      });
      return;
    }
    if (password.length < 6) {
      setErrors({
        userName: "",
        email: "",
        password: "Password must be at least 6 characters.",
      });
      return;
    }
    const exists = user.some((u) => u.email === email);
    if (exists) {
      alert("EmailId already exists!");
      return;
    }

    const newUser: User = {
      userName,
      email,
      password,
    };

    const updatedUser = [...user, newUser];

    setUser(updatedUser);

    setCurrentUser(newUser);
    // Store In Local Storage
    localStorage.setItem("User", JSON.stringify(updatedUser));

    localStorage.setItem("CurrentUser", JSON.stringify(newUser));
    navigate("/dashboard");
  }

  return (
    <>
      <section id="RegisterPage">
        <Row>
          <Container>
            <div className="form_col">
              <h1>Register Page</h1>
              <form onSubmit={RegisterFunction} action="">
                {/* User Name Input Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    User Name
                  </label>
                  <input
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setErrors((prev) => ({ ...prev, userName: "" }));
                    }}
                    type="text"
                    className="form-control"
                    id="UserName"
                  />
                  {errors.userName && (
                    <small className="text-danger">{errors.userName}</small>
                  )}
                </div>
                {/* Email Input Field */}
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
                {/* Password Input Field */}
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
                {/* Buttons */}
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
                  <button type="submit" className="btn RegisterBtn">
                    <span>Register</span>
                  </button>
                </div>
              </form>
            </div>
          </Container>
        </Row>
      </section>
    </>
  );
};
