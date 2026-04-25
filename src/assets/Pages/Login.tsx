export const Login = () => {
  return (
    <>
      {
        <section id="LoginPage">
          <form action="">
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
                onChange={(e) => setPassword(e.target.value)}
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
                  window.open("/register", "_self");
                }}
                className="btn RegisterStaff_btn"
              >
                <span>Register</span>
              </button>
              <button type="submit" className="btn RegisterStaff_btn">
                <span>Login</span>
              </button>
            </div>
          </form>
        </section>
      }
    </>
  );
};
