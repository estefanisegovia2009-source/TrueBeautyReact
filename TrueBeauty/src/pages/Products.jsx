import { useEffect, useMemo, useState } from "react";

import Loader from "../components/Loader.jsx";

import ProductCard from "../components/ProductCard.jsx";

import StatusMessage from "../components/StatusMessage.jsx";

import { getProducts } from "../services/products.service.js";

function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [category, setCategory] = useState("all");

  const [priceRange, setPriceRange] = useState("all");

  const [sort, setSort] = useState("recent");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((product) =>
        String(product.category).toLowerCase().includes(category),
      );
    }

    if (priceRange === "low") {
      result = result.filter((product) => Number(product.price) <= 6000);
    }

    if (priceRange === "mid") {
      result = result.filter(
        (product) =>
          Number(product.price) > 6000 && Number(product.price) <= 10000,
      );
    }

    if (priceRange === "high") {
      result = result.filter((product) => Number(product.price) > 10000);
    }

    if (sort === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sort === "recent") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [products, category, priceRange, sort]);

  return (
    <main className="products-page">
      <aside className="filters">
        <h2>Filtros</h2>

        <div className="filter-group">
          <h3>Categoría</h3>

          <label>
            <input
              type="radio"
              name="category"
              checked={category === "all"}
              onChange={() => setCategory("all")}
            />
            Todas
          </label>

          <label>
            <input
              type="radio"
              name="category"
              checked={category === "rostro"}
              onChange={() => setCategory("rostro")}
            />
            Rostro
          </label>

          <label>
            <input
              type="radio"
              name="category"
              checked={category === "labios"}
              onChange={() => setCategory("labios")}
            />
            Labios
          </label>

          <label>
            <input
              type="radio"
              name="category"
              checked={category === "accesorios"}
              onChange={() => setCategory("accesorios")}
            />
            Accesorios
          </label>
        </div>

        <div className="filter-group">
          <h3>Precio</h3>

          <label>
            <input
              type="radio"
              name="price"
              checked={priceRange === "all"}
              onChange={() => setPriceRange("all")}
            />
            Todos
          </label>

          <label>
            <input
              type="radio"
              name="price"
              checked={priceRange === "low"}
              onChange={() => setPriceRange("low")}
            />
            Hasta $6.000
          </label>

          <label>
            <input
              type="radio"
              name="price"
              checked={priceRange === "mid"}
              onChange={() => setPriceRange("mid")}
            />
            $6.000 a $10.000
          </label>

          <label>
            <input
              type="radio"
              name="price"
              checked={priceRange === "high"}
              onChange={() => setPriceRange("high")}
            />
            Más de $10.000
          </label>
        </div>

        <div className="filter-group">
          <h3>Ordenar</h3>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="recent">Más recientes</option>

            <option value="price-asc">Menor precio</option>

            <option value="price-desc">Mayor precio</option>
          </select>
        </div>
      </aside>

      <section className="catalog">
        <div className="catalog-header">
          <h1>Catálogo de productos</h1>

          <p>Elegí tus productos favoritos de maquillaje.</p>
        </div>

        {loading && <Loader text="Cargando catálogo..." />}

        <StatusMessage type="error">{error}</StatusMessage>

        {!loading && !error && visibleProducts.length === 0 && (
          <StatusMessage>
            No hay productos que coincidan con los filtros.
          </StatusMessage>
        )}

        {!loading && !error && visibleProducts.length > 0 && (
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
