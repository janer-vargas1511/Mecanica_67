import { useEffect, useState } from "react";
import apiRequest from "../services/api";
import "./AdminDashboard.css";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  category: "motores",
  label: "Motor",
  image: "",
  stock: "",
  featured: false,
  active: true,
};

function AdminDashboard({ onClose }) {
  // Navegación del panel
  const [activeTab, setActiveTab] = useState("contacts");

  // Mensajes
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  // Productos
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingProduct, setEditingProduct] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);

  // Estado general
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // MENSAJES DE CONTACTO
  // ==========================================

  async function loadContacts() {
    try {
      setContactsLoading(true);
      setError("");

      const data = await apiRequest("/admin/contacts");
      setContacts(data.contacts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setContactsLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      setError("");

      await apiRequest(`/admin/contacts/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      await loadContacts();
    } catch (err) {
      setError(err.message);
    }
  }

  // ==========================================
  // GESTIÓN DE PRODUCTOS
  // ==========================================

  async function loadProducts() {
    try {
      setProductsLoading(true);
      setError("");

      const data = await apiRequest("/admin/products");
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setProductsLoading(false);
    }
  }

  function handleProductChange(e) {
    const { name, value, type, checked } = e.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetProductForm() {
    setProductForm(emptyProduct);
    setEditingProduct(null);
  }

  function startEditing(product) {
    setEditingProduct(product._id);

    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      label: product.label,
      image: product.image,
      stock: product.stock ?? "",
      featured: product.featured,
      active: product.active,
    });

    setSuccess("");
    setError("");
  }

  async function saveProduct(e) {
    e.preventDefault();

    try {
      setSavingProduct(true);
      setError("");
      setSuccess("");

      const productData = {
        ...productForm,
        price: Number(productForm.price),
        stock:
          productForm.stock === ""
            ? null
            : Number(productForm.stock),
      };

      const endpoint = editingProduct
        ? `/admin/products/${editingProduct}`
        : "/admin/products";

      await apiRequest(endpoint, {
        method: editingProduct ? "PUT" : "POST",
        body: JSON.stringify(productData),
      });

      setSuccess(
        editingProduct
          ? "Producto actualizado correctamente."
          : "Producto creado correctamente."
      );

      resetProductForm();
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingProduct(false);
    }
  }

  async function deactivateProduct(id) {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas desactivar este producto?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await apiRequest(`/admin/products/${id}`, {
        method: "DELETE",
      });

      setSuccess("Producto desactivado correctamente.");
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  // Cargar datos iniciales
  useEffect(() => {
    loadContacts();
  }, []);

  // Cargar productos al entrar en su pestaña
  useEffect(() => {
    if (activeTab === "products") {
      loadProducts();
    }
  }, [activeTab]);

  return (
    <div className="admin-overlay">
      <section className="admin-panel">
        {/* ENCABEZADO */}
        <header className="admin-header">
          <div>
            <span>MEC67 / ADMINISTRACIÓN</span>
            <h2>Panel de administrador</h2>
          </div>

          <button onClick={onClose}>×</button>
        </header>

        {/* NAVEGACIÓN */}
        <nav className="admin-tabs">
          <button
            className={activeTab === "contacts" ? "active" : ""}
            onClick={() => setActiveTab("contacts")}
          >
            Mensajes
          </button>

          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            Productos
          </button>
        </nav>

        <div className="admin-content">
          {error && <p className="admin-error">{error}</p>}
          {success && <p className="admin-success">{success}</p>}

          {/* ================================== */}
          {/* PESTAÑA DE MENSAJES */}
          {/* ================================== */}

          {activeTab === "contacts" && (
            <>
              <h3>Mensajes de contacto</h3>

              {contactsLoading && <p>Cargando mensajes...</p>}

              {!contactsLoading && contacts.length === 0 && (
                <p>No hay mensajes registrados.</p>
              )}

              {contacts.map((contact) => (
                <article className="admin-contact" key={contact._id}>
                  <div>
                    <h4>{contact.name}</h4>
                    <p>{contact.email}</p>
                    <p>{contact.subject}</p>
                    <p>{contact.message}</p>

                    <small>
                      Estado: {contact.status || "new"}
                    </small>
                  </div>

                  <select
                    value={contact.status || "new"}
                    onChange={(e) =>
                      updateStatus(contact._id, e.target.value)
                    }
                  >
                    <option value="new">Nuevo</option>
                    <option value="read">Leído</option>
                    <option value="resolved">Resuelto</option>
                  </select>
                </article>
              ))}
            </>
          )}

          {/* ================================== */}
          {/* PESTAÑA DE PRODUCTOS */}
          {/* ================================== */}

          {activeTab === "products" && (
            <>
              <h3>Gestión de productos</h3>

              {/* FORMULARIO */}
              <form
                className="admin-product-form"
                onSubmit={saveProduct}
              >
                <h4>
                  {editingProduct
                    ? "Editar producto"
                    : "Registrar producto"}
                </h4>

                <label>Nombre del producto</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  maxLength={120}
                  required
                />

                <label>Descripción</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  maxLength={500}
                  required
                />

                <div className="admin-form-row">
                  <div>
                    <label>Precio (COP)</label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductChange}
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label>Existencias</label>
                    <input
                      type="number"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleProductChange}
                      min="0"
                      placeholder="Sin especificar"
                    />
                  </div>
                </div>

                <label>Categoría</label>
                <select
                  name="category"
                  value={productForm.category}
                  onChange={(e) => {
                    const labels = {
                      motores: "Motor",
                      frenos: "Frenos",
                      suspension: "Suspensión",
                      iluminacion: "Eléctrico",
                    };

                    setProductForm((previous) => ({
                      ...previous,
                      category: e.target.value,
                      label: labels[e.target.value],
                    }));
                  }}
                >
                  <option value="motores">Motores</option>
                  <option value="frenos">Frenos</option>
                  <option value="suspension">Suspensión</option>
                  <option value="iluminacion">Iluminación</option>
                </select>

                <label>Nombre del archivo de imagen</label>
                <input
                  type="text"
                  name="image"
                  value={productForm.image}
                  onChange={handleProductChange}
                  placeholder="Ejemplo: producto.jpg"
                  required
                />

                <small>
                  La imagen debe estar en public/img/productos/.
                </small>

                <div className="admin-checkboxes">
                  <label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={productForm.featured}
                      onChange={handleProductChange}
                    />
                    Producto destacado
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="active"
                      checked={productForm.active}
                      onChange={handleProductChange}
                    />
                    Producto activo
                  </label>
                </div>

                <div className="admin-form-actions">
                  <button
                    type="submit"
                    disabled={savingProduct}
                  >
                    {savingProduct
                      ? "Guardando..."
                      : editingProduct
                        ? "Guardar cambios"
                        : "Crear producto"}
                  </button>

                  {editingProduct && (
                    <button
                      type="button"
                      onClick={resetProductForm}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              {/* LISTADO */}
              <div className="admin-products-list">
                <h4>Productos registrados ({products.length})</h4>

                {productsLoading && <p>Cargando productos...</p>}

                {!productsLoading && products.length === 0 && (
                  <p>No hay productos registrados.</p>
                )}

                {products.map((product) => (
                  <article
                    className="admin-product"
                    key={product._id}
                  >
                    <div>
                      <h4>{product.name}</h4>

                      <p>{product.category}</p>

                      <strong>
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        }).format(product.price)}
                      </strong>

                      <small>
                        {product.active ? "Activo" : "Inactivo"}
                        {product.featured ? " · Destacado" : ""}
                      </small>
                    </div>

                    <div className="admin-product-actions">
                      <button
                        type="button"
                        onClick={() => startEditing(product)}
                      >
                        Editar
                      </button>

                      {product.active && (
                        <button
                          type="button"
                          onClick={() =>
                            deactivateProduct(product._id)
                          }
                        >
                          Desactivar
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;