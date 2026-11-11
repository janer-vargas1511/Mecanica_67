
import "./Privacy.css";

function Privacy() {
  return (
    <main className="privacy-page">
      <div className="privacy-container">

        <header className="privacy-header">
          <span className="privacy-brand">
            MECÁNICAS SIX-SEVEN
          </span>

          <h1>Política de Privacidad</h1>

          <p>
            Conoce cómo recopilamos, utilizamos, almacenamos
            y protegemos tus datos personales al utilizar
            nuestra plataforma.
          </p>

          <span className="privacy-update">
            Última actualización: noviembre de 2026
          </span>
        </header>

        <nav className="privacy-navigation">
          <a href="#responsable">Responsable</a>
          <a href="#datos">Datos recopilados</a>
          <a href="#finalidades">Finalidades</a>
          <a href="#tratamiento">Tratamiento</a>
          <a href="#terceros">Terceros</a>
          <a href="#derechos">Tus derechos</a>
          <a href="#procedimiento">Solicitudes</a>
          <a href="#seguridad">Seguridad</a>
        </nav>

        <section id="responsable" className="privacy-section">
          <h2>1. Responsable del tratamiento</h2>

          <p>
            El responsable del tratamiento de los datos
            personales recopilados mediante esta plataforma
            es Mecánicas Six-Seven.
          </p>

          <ul>
            <li>
              <strong>Razón social o titular:</strong>{" "}
              Janer Vargas
            </li>
            <li>
              <strong>Domicilio:</strong>{" "}
              Barranquilla, Atlántico, Colombia
            </li>
            <li>
              <strong>Correo electrónico:</strong>{" "}
              Janer.vargas1511@gmail.com
            </li>
            <li>
              <strong>Teléfono:</strong>{" "}
              +57 301 710 6808
            </li>
          </ul>
        </section>

        <section id="datos" className="privacy-section">
          <h2>2. Datos personales que recopilamos</h2>

          <p>
            Dependiendo de las funcionalidades utilizadas,
            Mecánicas Six-Seven puede recopilar las siguientes
            categorías de información:
          </p>

          <ul>
            <li>
              <strong>Datos de identificación:</strong>{" "}
              nombre proporcionado durante el registro o
              mediante los formularios de contacto.
            </li>
            <li>
              <strong>Datos de contacto:</strong>{" "}
              dirección de correo electrónico y demás
              información que el usuario decida proporcionar.
            </li>
            <li>
              <strong>Datos de autenticación:</strong>{" "}
              credenciales necesarias para acceder a una
              cuenta. Las contraseñas se almacenan mediante
              mecanismos de hash y no como texto legible.
            </li>
            <li>
              <strong>Datos de solicitudes:</strong>{" "}
              asunto, mensajes y contenido enviado mediante
              el formulario de contacto.
            </li>
            <li>
              <strong>Datos de interacción:</strong>{" "}
              consultas y mensajes introducidos en el chatbot.
            </li>
            <li>
              <strong>Datos de cotización:</strong>{" "}
              información del usuario y productos incluidos
              en una solicitud preparada para enviarse
              mediante WhatsApp.
            </li>
          </ul>

          <p>
            Se recomienda no introducir datos sensibles,
            información financiera ni información privada
            de terceros en los formularios o en el chatbot.
          </p>
        </section>

        <section id="finalidades" className="privacy-section">
          <h2>3. Finalidades del tratamiento</h2>

          <p>
            Los datos personales podrán ser utilizados
            para las siguientes finalidades:
          </p>

          <ul>
            <li>Crear y administrar cuentas de usuario.</li>
            <li>Permitir el inicio y cierre de sesión.</li>
            <li>Atender consultas, solicitudes y mensajes.</li>
            <li>Gestionar solicitudes de cotización.</li>
            <li>Facilitar la comunicación mediante WhatsApp.</li>
            <li>Procesar las consultas realizadas al chatbot.</li>
            <li>Mejorar el funcionamiento y la experiencia de la plataforma.</li>
            <li>Atender obligaciones legales y requerimientos de autoridades competentes.</li>
          </ul>
        </section>

        <section id="tratamiento" className="privacy-section">
          <h2>4. Tratamiento de la información</h2>

          <p>
            El tratamiento de los datos puede comprender
            su recolección, almacenamiento, consulta,
            utilización, circulación y supresión, de acuerdo
            con las finalidades informadas y la autorización
            correspondiente.
          </p>

          <p>
            La información de las cuentas y los formularios
            puede almacenarse en sistemas tecnológicos
            utilizados para el funcionamiento de la plataforma.
          </p>

          <p>
            Los mensajes enviados al chatbot pueden ser
            procesados por servicios externos de inteligencia
            artificial para generar respuestas.
          </p>
        </section>

        <section id="terceros" className="privacy-section">
          <h2>5. Servicios de terceros</h2>

          <p>
            Para operar la plataforma pueden utilizarse
            proveedores tecnológicos encargados de servicios
            como alojamiento web, almacenamiento de datos,
            infraestructura del servidor y procesamiento de
            consultas mediante inteligencia artificial.
          </p>

          <p>
            Asimismo, cuando el usuario decide continuar
            una cotización por WhatsApp, puede ser dirigido
            a dicha plataforma y la información incluida
            en el mensaje será tratada conforme a sus
            propias condiciones y políticas de privacidad.
          </p>

          <p>
            La información personal no deberá comercializarse
            ni compartirse con terceros para finalidades
            distintas de las informadas, salvo autorización
            del titular o los casos permitidos por la ley.
          </p>
        </section>

        <section id="derechos" className="privacy-section">
          <h2>6. Derechos de los titulares</h2>

          <p>
            De acuerdo con la legislación colombiana, los
            titulares de datos personales tienen derecho a:
          </p>

          <ul>
            <li>Conocer, actualizar y rectificar sus datos personales.</li>
            <li>Solicitar prueba de la autorización otorgada.</li>
            <li>Conocer el uso que se ha dado a su información.</li>
            <li>Presentar consultas y reclamos relacionados con sus datos.</li>
            <li>Solicitar la supresión de sus datos cuando sea procedente.</li>
            <li>Revocar la autorización en los casos permitidos por la ley.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC), una vez agotado el trámite correspondiente ante el responsable.</li>
          </ul>
        </section>

        <section id="procedimiento" className="privacy-section">
          <h2>7. Consultas y reclamos</h2>

          <p>
            Para ejercer sus derechos, los usuarios podrán
            presentar una solicitud mediante el correo
            electrónico de contacto:
          </p>

          <p>
            <strong>
              contacto@mecanicassixseven.com
            </strong>
          </p>

          <p>
            La solicitud deberá incluir la identificación
            del titular, una descripción clara de lo solicitado
            y los datos necesarios para responder.
          </p>

          <p>
            Las consultas serán atendidas dentro de los
            diez (10) días hábiles siguientes a su recepción.
            Cuando no sea posible responder en ese plazo,
            se informarán los motivos y la nueva fecha,
            conforme a los límites legales.
          </p>

          <p>
            Los reclamos serán tramitados de acuerdo con
            el procedimiento y los plazos establecidos
            en la Ley 1581 de 2012.
          </p>
        </section>

        <section id="seguridad" className="privacy-section">
          <h2>8. Seguridad de la información</h2>

          <p>
            Mecánicas Six-Seven implementa medidas técnicas
            y organizativas orientadas a proteger la
            información personal contra el acceso,
            modificación, pérdida o uso no autorizado.
          </p>

          <p>
            Sin embargo, ningún sistema tecnológico puede
            garantizar una seguridad absoluta. Por ello,
            los usuarios también deben proteger sus
            credenciales y evitar compartirlas con terceros.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Conservación de los datos</h2>

          <p>
            Los datos personales se conservarán durante
            el tiempo necesario para cumplir las finalidades
            informadas, atender obligaciones legales o
            contractuales y resolver posibles solicitudes
            relacionadas con el tratamiento.
          </p>

          <p>
            Cuando la información deje de ser necesaria
            y no exista una obligación legal que exija
            conservarla, se procederá conforme a las
            reglas aplicables para su supresión.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Modificaciones de esta política</h2>

          <p>
            Mecánicas Six-Seven podrá actualizar esta
            Política de Privacidad cuando existan cambios
            en sus procesos, servicios o disposiciones
            legales aplicables.
          </p>

          <p>
            Las modificaciones serán publicadas en esta
            misma página para conocimiento de los usuarios.
          </p>
        </section>

        <footer className="privacy-footer">
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

export default Privacy;
