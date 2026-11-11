
import { useState } from "react";
import apiRequest from "../services/api";
import "./Login.css";

function Login({ onClose, onLogin }) {
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function changeMode(newMode) {
    setMode(newMode);
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
    setAcceptedPrivacy(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }

      if (!acceptedPrivacy) {
        setError("Debes aceptar la Política de Privacidad para registrarte.");
        return;
        }

      if (password.length < 10 || password.length > 72) {
        setError("La contraseña debe tener entre 10 y 72 caracteres.");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "register") {
        await apiRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        // El registro no devuelve un token.
        // Iniciamos sesión con las credenciales recién creadas.
        const loginData = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        sessionStorage.setItem("mec67_token", loginData.token);
        onLogin(loginData.user);
        onClose();

        return;
      }

      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      sessionStorage.setItem("mec67_token", data.token);

      onLogin(data.user);
      onClose();
    } catch (err) {
      setError(err.message || "No fue posible completar la operación.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-overlay" onClick={onClose}>
      <section
        className="login-card"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="login-close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          ×
        </button>

        <span className="login-tag">MECÁNICA SIX-SEVEN</span>

        <h2>
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h2>

        <p>
          {mode === "login"
            ? "Accede a tu cuenta de Mec67."
            : "Regístrate para disfrutar de nuestros servicios."}
        </p>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label htmlFor="register-name">Nombre completo</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Tu nombre"
                autoComplete="name"
                minLength={2}
                maxLength={80}
                required
              />
            </>
          )}

          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@correo.com"
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mínimo 10 caracteres"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            minLength={mode === "register" ? 10 : undefined}
            maxLength={72}
            required
          />

          {mode === "register" && (
            <>
              <label htmlFor="confirm-password">
                Confirmar contraseña
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
                minLength={10}
                maxLength={72}
                required
              />

              {mode === "register" && (
                <label className="privacy-acceptance">
                  <input
                    type="checkbox"
                    checked={acceptedPrivacy}
                    onChange={(event) =>
                      setAcceptedPrivacy(event.target.checked)
                    }
                    required
                  />

                  <span>
                    He leído y acepto la{" "}
                    <a
                      href="/politica-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de Privacidad
                    </a>
                    .
                  </span>
                </label>
              )}
            </>
          )}

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          <button
            className="login-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Procesando..."
              : mode === "login"
                ? "Ingresar"
                : "Crear cuenta"}
          </button>
        </form>

        <div className="login-switch">
          {mode === "login" ? (
            <>
              ¿No tienes una cuenta?
              <button type="button" onClick={() => changeMode("register")}>
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?
              <button type="button" onClick={() => changeMode("login")}>
                Inicia sesión
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Login;
