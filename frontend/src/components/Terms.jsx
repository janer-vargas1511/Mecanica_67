
import "./Terms.css";

function Terms() {
  return (
    <main className="terms-page">
      <div className="terms-container">

        <header className="terms-header">
          <span className="terms-brand">
            MECÁNICAS SIX-SEVEN
          </span>

          <h1>Términos y Condiciones</h1>

          <p>
            Conoce las condiciones que regulan el uso
            de nuestra plataforma y nuestros servicios.
          </p>

          <span className="terms-update">
            Última actualización: noviembre de 2026
          </span>
        </header>

        <nav className="terms-navigation">
          <a href="#aceptacion">Aceptación</a>
          <a href="#servicios">Servicios</a>
          <a href="#cuentas">Cuentas</a>
          <a href="#productos">Productos</a>
          <a href="#cotizaciones">Cotizaciones</a>
          <a href="#responsabilidad">Responsabilidad</a>
          <a href="#privacidad">Privacidad</a>
        </nav>

        <section id="aceptacion" className="terms-section">
          <h2>1. Aceptación de los términos</h2>

          <p>
            Al acceder y utilizar el sitio web de Mecánicas
            Six-Seven, el usuario acepta estos Términos y
            Condiciones. Si no está de acuerdo con ellos,
            deberá abstenerse de utilizar la plataforma.
          </p>
        </section>

        <section id="servicios" className="terms-section">
          <h2>2. Descripción de los servicios</h2>

          <p>
            Mecánicas Six-Seven es una plataforma destinada
            a la presentación y consulta de productos
            relacionados con el sector automotriz.
          </p>

          <p>
            Entre sus funcionalidades se encuentran:
          </p>

          <ul>
            <li>Consulta del catálogo de productos.</li>
            <li>Exploración de categorías automotrices.</li>
            <li>Registro e inicio de sesión de usuarios.</li>
            <li>Solicitud de cotizaciones.</li>
            <li>Comunicación mediante los canales de contacto.</li>
          </ul>
        </section>

        <section id="cuentas" className="terms-section">
          <h2>3. Registro y cuentas de usuario</h2>

          <p>
            Algunas funcionalidades requieren que el usuario
            tenga una cuenta registrada.
          </p>

          <p>
            El usuario se compromete a proporcionar información
            veraz y mantener la confidencialidad de sus
            credenciales de acceso.
          </p>

          <p>
            Cada usuario es responsable de las actividades
            realizadas desde su cuenta y deberá informar
            cualquier uso no autorizado.
          </p>
        </section>

        <section id="productos" className="terms-section">
          <h2>4. Información de los productos</h2>

          <p>
            La información, imágenes, descripciones y precios
            publicados en el catálogo tienen fines informativos
            y comerciales.
          </p>

          <p>
            La disponibilidad, las características y los precios
            pueden cambiar. Por ello, se recomienda confirmar
            la información antes de realizar una compra.
          </p>
        </section>

        <section id="cotizaciones" className="terms-section">
          <h2>5. Cotizaciones y solicitudes de compra</h2>

          <p>
            Las solicitudes realizadas mediante el carrito
            o los canales de contacto constituyen solicitudes
            de cotización y no representan, por sí solas,
            una compra confirmada.
          </p>

          <p>
            Las condiciones definitivas de una operación,
            incluidos el precio, la disponibilidad, el pago
            y la entrega, deberán ser confirmadas con
            Mecánicas Six-Seven.
          </p>
        </section>

        <section id="responsabilidad" className="terms-section">
          <h2>6. Uso adecuado de la plataforma</h2>

          <p>
            El usuario se compromete a utilizar la plataforma
            de manera responsable y legal.
          </p>

          <ul>
            <li>No intentar acceder sin autorización a cuentas o sistemas.</li>
            <li>No proporcionar información falsa o engañosa.</li>
            <li>No realizar actividades que afecten el funcionamiento del sitio.</li>
            <li>No utilizar la plataforma para actividades ilícitas.</li>
          </ul>
        </section>

        <section id="privacidad" className="terms-section">
          <h2>7. Protección de datos personales</h2>

          <p>
            La información personal proporcionada durante
            el registro, las solicitudes de contacto y otras
            interacciones será tratada conforme a la política
            de privacidad de Mecánicas Six-Seven y la
            normativa aplicable.
          </p>

          <p>
            Los usuarios podrán consultar los mecanismos
            disponibles para ejercer sus derechos sobre
            sus datos personales.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Modificaciones</h2>

          <p>
            Mecánicas Six-Seven podrá actualizar estos
            Términos y Condiciones cuando sea necesario.
            Las modificaciones serán publicadas en esta
            misma página.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Contacto</h2>

          <p>
            Para consultas relacionadas con estos términos,
            los usuarios podrán comunicarse mediante los
            canales de contacto disponibles en el sitio web.
          </p>
        </section>

        <footer className="terms-footer">
          <a href="/">Volver al inicio</a>

          <p>
            © 2026 Mecánicas Six-Seven.
            Todos los derechos reservados.
          </p>
        </footer>

      </div>
    </main>
  );
}

export default Terms;
