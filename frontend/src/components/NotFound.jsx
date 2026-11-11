import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-content">
        <span className="not-found-brand">
          MECÁNICA SIX-SEVEN
        </span>

        <h1>404</h1>

        <h2>¡Página fuera de servicio!</h2>

        <p>
          Parece que esta pieza no existe en nuestro catálogo.
          La dirección que buscas no está disponible o ha sido
          movida.
        </p>

        <a href="/" className="not-found-button">
          Volver al inicio
        </a>

        <span className="not-found-footer">
          ERROR 404 · MECÁNICA SIX-SEVEN
        </span>
      </div>
    </main>
  );
}

export default NotFound;
