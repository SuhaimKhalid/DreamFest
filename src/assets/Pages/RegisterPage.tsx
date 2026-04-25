import { useState } from "react";
import type { User } from "../Utilities/Type";
export const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User[]>([]);

  function RegisterFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser: User = {
      userName,
      email,
      password,
    };

    const updatedUser = { ...user, newUser };
    setUser(updatedUser);
    // Store In Local Storage
    localStorage.setItem("User", JSON.stringify(updatedUser));
  }

  return (
    <>
      <section id="RegisterPage">
        <h1>Regiister Page</h1>
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
    </>
  );
};
