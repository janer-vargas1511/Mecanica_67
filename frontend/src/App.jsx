import { useEffect, useState } from "react";
import "./original.css";
import "./App.css";
import Login from "./components/Login";
import apiRequest from "./services/api";
import AdminDashboard from "./components/AdminDashboard";
import Chatbot from "./components/Chatbot";


const categories = [
  {
    id: "motores",
    name: "Motores",
    image: "motores.jpg",
    description: "Componentes internos y motores completos certificados.",
  },
  {
    id: "frenos",
    name: "Frenos",
    image: "frenos.jpg",
    description: "Discos, pastillas y sistemas de frenado de alto rendimiento.",
  },
  {
    id: "suspension",
    name: "Suspensión",
    image: "suspension.jpg",
    description: "Amortiguadores y terminales para un manejo preciso.",
  },
  {
    id: "iluminacion",
    name: "Iluminación",
    image: "iluminacion.jpg",
    description: "Faros LED y sistemas eléctricos de última generación.",
  },
];


const services = [
  {
    icon: "🔧",
    name: "Mecánica General",
    description: "Sincronización y reparación de motores para garantizar potencia y eficiencia en cada trayecto.",
  },
  {
    icon: "🛑",
    name: "Frenos y Seguridad",
    description: "Mantenimiento preventivo de sistemas de frenado para su total tranquilidad en la vía.",
  },
  {
    icon: "💻",
    name: "Diagnóstico Técnico",
    description: "Escaneo computarizado avanzado para identificar y solucionar fallas electrónicas con precisión.",
  },
];

const contacts = [
  {
    image: "contacto-1.jpg",
    type: "ATENCIÓN AL CLIENTE",
    name: "Contacto Six-seven",
    description: "Atención para consultas generales, cotizaciones y disponibilidad de repuestos.",
    phone: "+57 301 710 6808",
    link: "573017106808",
  },
  {
    image: "contacto-2.jpg",
    type: "REPUESTOS",
    name: "Ventas y Cotizaciones",
    description: "Información sobre precios, disponibilidad y pedidos de repuestos para tu vehículo.",
    phone: "+57 3XX XXX XXXX",
  },
  {
    image: "contacto-3.jpg",
    type: "SERVICIO TÉCNICO",
    name: "Taller Six-seven",
    description: "Agenda mantenimiento, diagnóstico y servicios de mecánica para tu vehículo.",
    phone: "+57 3XX XXX XXXX",
  },
  {
    image: "contacto-4.jpg",
    type: "CONTACTO COMERCIAL",
    name: "Atención Comercial",
    description: "Información comercial, alianzas y atención para empresas.",
    phone: "+57 30X XXX XXXX",
  },
];

const questions = [
  {
    question: "¿Qué tipos de repuestos ofrecen?",
    answer: "Contamos con un amplio catálogo de repuestos originales y homologados de alta calidad para las principales marcas de vehículos en Colombia, garantizando durabilidad y rendimiento.",
  },
  {
    question: "¿Qué incluye el servicio de mantenimiento?",
    answer: "Nuestros servicios van desde cambios de aceite y filtros hasta reparaciones de motor y sistemas de frenos, realizados por técnicos expertos con tecnología de punta.",
  },
  {
    question: "¿Realizan envíos a todo el país?",
    answer: "Sí. Distribuimos repuestos a nivel nacional con tiempos de entrega optimizados para que tu taller o vehículo no se detenga.",
  },
  {
    question: "¿Tienen garantía en los servicios?",
    answer: "Todos nuestros servicios de mantenimiento y los repuestos que instalamos cuentan con garantía respaldada por Mecánicas Six-seven.",
  },
];

const money = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [sessionLoading, setSessionLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactSending, setContactSending] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("mec67_token");

    if (!token) {
      setSessionLoading(false);
      return;
    }

    let active = true;

    apiRequest("/auth/me")
      .then((data) => {
        if (active) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {
        sessionStorage.removeItem("mec67_token");
        if (active) {
          setCurrentUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setSessionLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setProductsLoading(true);
        setProductsError("");

        const data = await apiRequest("/products");

        if (active) {
          setProducts(data.products || []);
        }
      } catch (error) {
        if (active) {
          setProductsError(
            error.message || "No fue posible cargar los productos."
          );
        }
      } finally {
        if (active) {
          setProductsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const visibleProducts =
    activeCategory === "todos"
      ? products
      : products.filter((product) => product.category === activeCategory);

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.name === product.name);

      if (found) {
        return current.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setToast(`${product.name} fue añadido al carrito.`);
    window.setTimeout(() => setToast(""), 2500);
  }

  function removeFromCart(name) {
    setCart((current) => current.filter((item) => item.name !== name));
  }

  async function handleContactSubmit(event) {
    event.preventDefault();

    setContactSending(true);

    try {
      const data = await apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(contactForm),
      });

      setToast(data.message || "Mensaje enviado correctamente.");

      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setToast(error.message || "No se pudo enviar el mensaje.");
    } finally {
      setContactSending(false);
      window.setTimeout(() => setToast(""), 3000);
    }
  }


  function checkout() {
    if (cart.length === 0) {
      setToast("Primero añade productos al carrito.");
      window.setTimeout(() => setToast(""), 2500);
      return;
    }

    // Exigir autenticación antes de continuar.
    if (!currentUser) {
      setCartOpen(false);
      setLoginOpen(true);

      setToast("Inicia sesión para continuar con tu pedido.");
      window.setTimeout(() => setToast(""), 3000);

      return;
    }

    const lines = cart.map(
      (item) =>
        `- ${item.name} x${item.quantity}: ${money(item.price * item.quantity)}`
    );

    const message = [
      "Hola, Mecánicas Six-seven. Quiero solicitar una cotización:",
      "",
      ...lines,
      "",
      `Cliente: ${currentUser.name}`,
      `Correo: ${currentUser.email}`,
      `Total aproximado: ${money(cartTotal)}`,
    ].join("\n");

    window.open(
      `https://api.whatsapp.com/send?phone=573017106808&text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }


  function selectCategory(category) {
    setActiveCategory(category);
    document.getElementById("productos")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      <header className="header" id="inicio">
        <div className="container navbar">
          <a href="#inicio" className="logo">
            <span className="logo-main">MECÁNICA</span>
            <span className="logo-sub">SIX-SEVEN</span>
          </a>

          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            {[
              ["Inicio", "#inicio"],
              ["Repuestos", "#categorias"],
              ["Productos", "#productos"],
              ["Servicios", "#servicios"],
              ["Ofertas", "#ofertas"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>

          {!sessionLoading && !currentUser && (
            <button
              className="login-nav-button"
              onClick={() => setLoginOpen(true)}
            >
              Iniciar sesión
            </button>
          )}

          {currentUser?.role === "admin" && (
            <button
              className="login-nav-button"
              onClick={() => setAdminOpen(true)}
            >
              Panel de administrador
            </button>
          )}

          {currentUser && (
            <button
              className="login-nav-button"
              onClick={() => {
                sessionStorage.removeItem("mec67_token");
                setCurrentUser(null);
              }}
            >
              Cerrar sesión
            </button>
          )}

          <div className="nav-actions">
            <button
              className="cart-button"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrito"
            >
              🛒 <span>{cartCount}</span>
            </button>

            <button
              className="menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Abrir menú"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <img
            src="/img/hero.jpg"
            alt="Mecánica Six-seven"
            className="hero-image"
          />
          <div className="hero-overlay" />

          <div className="container hero-content">
            <div className="hero-text">
              <span className="eyebrow">MECÁNICA SIX-SEVEN</span>
              <h1>
                Potencia y Precisión
                <span>para tu motor</span>
              </h1>
              <p>
                Importamos repuestos de la más alta gama para garantizar el
                óptimo rendimiento, seguridad y durabilidad de tu vehículo.
                Envíos nacionales ultra rápidos.
              </p>

              <div className="hero-actions">
                <a href="#productos" className="btn btn-primary">
                  Ver catálogo
                </a>
                <a href="#categorias" className="btn btn-outline">
                  Explorar repuestos
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section categories-section" id="categorias">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">NUESTRO CATÁLOGO</span>
              <h2>Categorías de Repuestos</h2>
              <p>
                Encuentra componentes de alta calidad para mantener tu
                vehículo funcionando al máximo.
              </p>
            </div>

            <div className="categories-grid">
              {categories.map((category) => (
                <article className="category-card" key={category.id}>
                  <div className="category-image">
                    <img
                      src={`/img/categories/${category.image}`}
                      alt={category.name}
                    />
                  </div>
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <button
                      className="category-link"
                      onClick={() => selectCategory(category.id)}
                    >
                      Explorar →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section products-section" id="productos">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">PRODUCTOS</span>
              <h2>Productos Destacados</h2>
              <p>
                Repuestos de alta precisión para el máximo rendimiento de tu
                vehículo en Colombia.
              </p>
            </div>

            <div className="products-grid">
              {productsLoading ? (
                <p className="products-message">
                  Cargando productos...
                </p>
              ) : productsError ? (
                <p className="products-message">
                  {productsError}
                </p>
              ) : visibleProducts.length === 0 ? (
                <p className="products-message">
                  No hay productos disponibles en esta categoría.
                </p>
              ) : (
                visibleProducts.map((product) => (
                  <article className="product-card" key={product._id}>
                    <div className="product-image">
                      <div className="product-placeholder">
                        <img
                          src={`/img/productos/${product.image}`}
                          alt={product.name}
                        />
                      </div>

                      {product.featured && (
                        <span className="product-badge">
                          DESTACADO
                        </span>
                      )}
                    </div>

                    <div className="product-content">
                      <span className="product-category">
                        {product.label}
                      </span>

                      <h3>{product.name}</h3>

                      <p>{product.description}</p>

                      <div className="product-footer">
                        <strong>{money(product.price)}</strong>

                        <button
                          className="add-cart"
                          onClick={() => addToCart(product)}
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="section services-section" id="servicios">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">SERVICIOS</span>
              <h2>Servicios de Mantenimiento</h2>
              <p>
                Soluciones integrales de mecánica especializada para carros y
                motos con respaldo técnico en Colombia.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.name}>
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>

            <div className="services-action">
              <a
                className="btn btn-primary"
                href="https://api.whatsapp.com/send?phone=573017106808&text=Hola,%20quiero%20agendar%20una%20cita."
                target="_blank"
                rel="noreferrer"
              >
                Agendar cita por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="offers-banner" id="ofertas">
          <div className="container">
            <div className="offer-content">
              <div>
                <span className="offer-small">DESCUENTOS DEL MES</span>
                <h2>Ofertas Imbatibles en Repuestos y Mecánica</h2>
                <p>
                  Asegura el rendimiento de tu vehículo con los mejores
                  precios de Colombia. Descuentos exclusivos en frenos,
                  suspensión y cambio de aceite este mes.
                </p>
              </div>
              <a className="btn btn-light" href="#productos">
                Ver ofertas
              </a>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">CONTÁCTANOS</span>
              <h2>Nuestro equipo</h2>
              <p>
                Comunícate directamente con nuestro equipo para solicitar
                información, cotizaciones o agendar tu servicio.
              </p>
            </div>

            <div className="contacts-list">
              {contacts.map((contact) => (
                <article className="contact-card" key={contact.name}>
                  <div className="contact-photo">
                    <img
                      src={`/img/contactos/${contact.image}`}
                      alt={contact.name}
                    />
                  </div>
                  <div className="contact-card-content">
                    <span className="section-tag">{contact.type}</span>
                    <h3>{contact.name}</h3>
                    <p>{contact.description}</p>
                    <div className="contact-phone">
                      <span>📞 {contact.phone}</span>
                      {contact.link && (
                        <a
                          href={`https://wa.me/${contact.link}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          💬 WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="contact-general">
              <div className="contact-general-item">
                <span>📍</span>
                <div>
                  <strong>Ubicación</strong>
                  <p>Bogotá, Colombia</p>
                </div>
              </div>
              <div className="contact-general-item">
                <span>✉️</span>
                <div>
                  <strong>Correo electrónico</strong>
                  <p>contacto@mecanicassixseven.com</p>
                </div>
              </div>
              <div className="contact-general-item">
                <span>🕐</span>
                <div>
                  <strong>Horario</strong>
                  <p>Lunes - Sábado</p>
                </div>
              </div>
              <div className="contact-form-container">
                <div className="section-heading">
                  <span className="section-tag">ESCRÍBENOS</span>
                  <h2>¿Necesitas ayuda?</h2>
                  <p>
                    Envíanos tus consultas y nuestro equipo se pondrá en contacto contigo.
                  </p>
                </div>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Nombre completo</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      minLength={2}
                      maxLength={80}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Correo electrónico</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, email: e.target.value })
                      }
                      maxLength={254}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">Asunto</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, subject: e.target.value })
                      }
                      minLength={3}
                      maxLength={120}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Mensaje</label>
                    <textarea
                      id="contact-message"
                      rows="5"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, message: e.target.value })
                      }
                      minLength={10}
                      maxLength={2000}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={contactSending}
                  >
                    {contactSending ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container">
            <div className="faq">
              <span className="section-tag">PREGUNTAS FRECUENTES</span>
              <h2>¿Tienes alguna duda?</h2>

              {questions.map((item, index) => (
                <div
                  className={`faq-item ${activeQuestion === index ? "active" : ""}`}
                  key={item.question}
                >
                  <button
                    className="faq-question"
                    onClick={() =>
                      setActiveQuestion(
                        activeQuestion === index ? null : index
                      )
                    }
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon">
                      {activeQuestion === index ? "−" : "+"}
                    </span>
                  </button>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="logo" href="#inicio">
              <span className="logo-main">MECÁNICA</span>
              <span className="logo-sub">SIX-SEVEN</span>
            </a>
            <p>
              Especialistas en repuestos y mantenimiento automotriz en
              Colombia. Calidad y confianza para su vehículo.
            </p>
          </div>

          <div className="footer-column">
            <h3>Navegación</h3>
            {[
              ["Inicio", "#inicio"],
              ["Repuestos", "#categorias"],
              ["Productos", "#productos"],
              ["Servicios", "#servicios"],
              ["Ofertas", "#ofertas"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </div>

          <div className="footer-column">
            <h3>Contacto</h3>
            <p>Bogotá, Colombia</p>
            <p>+57 301 710 6808</p>
            <p>contacto@mecanicassixseven.com</p>
          </div>

          <div className="footer-column">
            <h3>Síguenos</h3>
            <div className="social-links">
              <a href="#contacto" aria-label="Facebook">f</a>
              <a href="#contacto" aria-label="Instagram">ig</a>
              <a href="#contacto" aria-label="TikTok">tk</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p>© 2026 Mecánicas Six-seven. Todos los derechos reservados.</p>
            <div>
              <a href="#contacto">Política de Privacidad</a>
              <a href="#contacto">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>

      <div
        className={`cart-overlay ${cartOpen ? "active" : ""}`}
        onClick={() => setCartOpen(false)}
      />

      <aside className={`cart-panel ${cartOpen ? "active" : ""}`}>
        <div className="cart-header">
          <h2>Tu carrito</h2>
          <button onClick={() => setCartOpen(false)}>×</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{money(item.price)} × {item.quantity}</p>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(item.name)}
                  aria-label={`Eliminar ${item.name}`}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>{money(cartTotal)}</strong>
          </div>
          <button className="checkout-button" onClick={checkout}>
            Solicitar cotización
          </button>
        </div>
      </aside>

      {toast && <div className="toast show">{toast}</div>}

      {loginOpen && (
        <Login
          onClose={() => setLoginOpen(false)}
          onLogin={(user) => setCurrentUser(user)}
        />
      )}

      {adminOpen && currentUser?.role === "admin" && (
        <AdminDashboard
          onClose={() => setAdminOpen(false)}
        />
      )}

      <Chatbot />

    </>
  );
}

export default App;
