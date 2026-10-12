function Loader({
  text = "Cargando...",
}) {
  return (
    <div
      className="loader-box"
      role="status"
      aria-live="polite"
    >
      <span
        className="loader-spinner"
        aria-hidden="true"
      />

      <span>
        {text}
      </span>
    </div>
  );
}

export default Loader;