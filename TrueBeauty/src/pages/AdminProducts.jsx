import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import Loader from "../components/Loader.jsx";

import StatusMessage from "../components/StatusMessage.jsx";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/products.service.js";

import { formatDate, formatPrice } from "../utils/format.js";

import { resolveImage } from "../utils/image.js";

const emptyValues = {
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: emptyValues,
  });

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      setStatus({
        type: "error",

        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const startCreate = () => {
    setSelectedProduct(null);

    reset(emptyValues);

    setStatus({
      type: "",
      message: "",
    });
  };

  const startEdit = (product) => {
    setSelectedProduct(product);

    reset({
      name: product.name ?? "",

      price: product.price ?? "",

      description: product.description ?? "",

      image: product.image ?? "",

      category: product.category ?? "",
    });

    setStatus({
      type: "",
      message: "",
    });

    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({
        behavior: "smooth",

        block: "start",
      }),
    );
  };

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      setStatus({
        type: "",
        message: "",
      });

      const payload = {
        name: data.name.trim(),

        price: Number(data.price),

        description: data.description.trim(),

        image: data.image.trim(),

        category: data.category,

        createdAt: selectedProduct?.createdAt || new Date().toISOString(),
      };

      if (selectedProduct) {
        const updated = await updateProduct(selectedProduct.id, payload);

        setProducts((current) =>
          current.map((product) =>
            product.id === selectedProduct.id ? updated : product,
          ),
        );

        setStatus({
          type: "success",

          message: "Producto actualizado correctamente en MockAPI.",
        });
      } else {
        const created = await createProduct(payload);

        setProducts((current) => [created, ...current]);

        setStatus({
          type: "success",

          message: "Producto creado correctamente en MockAPI.",
        });
      }

      setSelectedProduct(null);

      reset(emptyValues);
    } catch (error) {
      setStatus({
        type: "error",

        message: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${product.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setStatus({
        type: "",
        message: "",
      });

      await deleteProduct(product.id);

      setProducts((current) =>
        current.filter((item) => item.id !== product.id),
      );

      if (selectedProduct?.id === product.id) {
        startCreate();
      }

      setStatus({
        type: "success",

        message: "Producto eliminado correctamente de MockAPI.",
      });
    } catch (error) {
      setStatus({
        type: "error",

        message: error.message,
      });
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-title">
        <h1>Administrador de productos</h1>

        <p>Gestioná los productos cargados en True Beauty.</p>
      </section>

      <StatusMessage type={status.type}>{status.message}</StatusMessage>

      <section className="admin-section">
        <div className="admin-section-heading">
          <h2>Listado de productos</h2>

          <button
            className="secondary-btn"
            type="button"
            onClick={loadProducts}
          >
            Actualizar lista
          </button>
        </div>

        {loading ? (
          <Loader text="Cargando productos..." />
        ) : (
          <div className="table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Foto</th>

                  <th>Nombre</th>

                  <th>Categoría</th>

                  <th>Descripción</th>

                  <th>Fecha</th>

                  <th>Precio</th>

                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7">No hay productos cargados.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={resolveImage(product.image)}
                          alt={product.name}
                          onError={(event) => {
                            event.currentTarget.src =
                              "/images/placeholder-product.svg";
                          }}
                        />
                      </td>

                      <td>{product.name}</td>

                      <td>{product.category}</td>

                      <td className="description-cell">
                        {product.description}
                      </td>

                      <td>{formatDate(product.createdAt)}</td>

                      <td>{formatPrice(product.price)}</td>

                      <td className="actions">
                        <button
                          className="edit-btn"
                          type="button"
                          onClick={() => startEdit(product)}
                        >
                          Editar
                        </button>

                        <button
                          className="delete-btn"
                          type="button"
                          onClick={() => handleDelete(product)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section" ref={formRef}>
        <h2>
          {selectedProduct
            ? `Editar: ${selectedProduct.name}`
            : "Cargar nuevo producto"}
        </h2>

        <form
          className="admin-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="productName">Nombre del producto</label>

            <input
              id="productName"
              type="text"
              placeholder="Ej: Máscara de pestañas"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
            />

            {errors.name && (
              <small className="field-error">{errors.name.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Precio</label>

            <input
              id="productPrice"
              type="number"
              min="0"
              step="1"
              placeholder="Ej: 8500"
              {...register("price", {
                required: "El precio es obligatorio",

                min: {
                  value: 0,

                  message: "El precio no puede ser negativo",
                },

                valueAsNumber: true,
              })}
            />

            {errors.price && (
              <small className="field-error">{errors.price.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productDescription">Descripción</label>

            <textarea
              id="productDescription"
              placeholder="Escribí una descripción del producto"
              {...register("description", {
                required: "La descripción es obligatoria",
              })}
            />

            {errors.description && (
              <small className="field-error">
                {errors.description.message}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productCategory">Categoría</label>

            <select
              id="productCategory"
              {...register("category", {
                required: "La categoría es obligatoria",
              })}
            >
              <option value="">Seleccioná una categoría</option>

              <option value="Rostro">Rostro</option>

              <option value="Labios">Labios</option>

              <option value="Accesorios">Accesorios</option>

              <option value="Labios / Rostro">Labios / Rostro</option>
            </select>

            {errors.category && (
              <small className="field-error">{errors.category.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productImage">Imagen URL o nombre local</label>

            <input
              id="productImage"
              type="text"
              placeholder="Ej: https://... o Base.png"
              {...register("image", {
                required: "La imagen es obligatoria",
              })}
            />

            {errors.image && (
              <small className="field-error">{errors.image.message}</small>
            )}

            <small className="form-help">
              Si usás una imagen local, guardala en public/images y escribí solo
              el nombre del archivo.
            </small>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving
                ? "Guardando..."
                : selectedProduct
                  ? "Guardar cambios"
                  : "Guardar producto"}
            </button>

            {selectedProduct && (
              <button
                type="button"
                className="cancel-btn"
                onClick={startCreate}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

export default AdminProducts;
