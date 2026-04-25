import { useEffect, useState } from "react";
import type { User } from "../Utilities/Type";
import { Container } from "react-bootstrap";
export const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User[]>([]);

  //   To Get User Data From LocalStorage ON Start
  useEffect(() => {
    const savedUser = localStorage.getItem("User");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function RegisterFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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

    console.log(updatedUser);
    // Store In Local Storage
    localStorage.setItem("User", JSON.stringify(updatedUser));
  }

  return (
    <>
      <Container>
        <section id="RegisterPage">
          <h1>Register Page</h1>
          <form onSubmit={RegisterFunction} action="">
            {/* User Name Input Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                User Name
              </label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                className="form-control"
                id="UserName"
                required
              />
            </div>
            {/* Email Input Field */}
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
                required
              />
            </div>
            {/* Password Input Field */}
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
                required
              />
            </div>
            {/* Buttons */}
            <div className="btn_box">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open("/login", "_self");
                }}
                className="btn loginBtn"
              >
                <span>Login</span>
              </button>
              <button type="submit" className="btn RegisterBtn">
                <span>Register</span>
              </button>
            </div>
          </form>
        </section>
      </Container>
    </>
  );
};
