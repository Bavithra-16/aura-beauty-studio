import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerLogin.css";

function OwnerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/owner/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      sessionStorage.setItem("ownerToken", data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="owner-login">
      <div className="login-container">

        {/* Left Branding Section */}
        <div className="login-brand">
          <div className="brand-content">
            <p className="brand-small">WELCOME TO</p>

            <h1>Aura</h1>
            <h2>Beauty Studio</h2>

            <div className="brand-line"></div>

            <p className="brand-description">
              A beautiful space to manage your studio,
              appointments and customer experiences.
            </p>
          </div>

          <p className="brand-footer">
            OWNER PORTAL
          </p>
        </div>

        {/* Login Section */}
        <div className="login-box">

          <div className="login-heading">
            <p className="login-label">AURA BEAUTY STUDIO</p>

            <h2>Owner Login</h2>

            <p>
              Sign in to access your studio dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">
                <span className="input-icon">●</span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <p className="login-note">
            Authorized studio owner access only
          </p>

        </div>
      </div>
    </section>
  );
}

export default OwnerLogin;
