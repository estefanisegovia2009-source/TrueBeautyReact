import { useState } from "react";

import { useForm } from "react-hook-form";

import StatusMessage from "../components/StatusMessage.jsx";

function Login() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login demo:", data);

    setMessage(
      "Datos enviados. Revisá la consola del navegador para ver el resultado.",
    );
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Iniciar sesión</h1>

        <StatusMessage type="success">{message}</StatusMessage>

        <form
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label htmlFor="loginEmail">Correo electrónico</label>

          <input
            id="loginEmail"
            type="email"
            placeholder="ejemplo@gmail.com"
            {...register("email", {
              required: "El email es obligatorio",

              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                message: "Ingresá un email válido",
              },
            })}
          />

          {errors.email && (
            <small className="field-error">{errors.email.message}</small>
          )}

          <label htmlFor="loginPassword">Contraseña</label>

          <input
            id="loginPassword"
            type="password"
            placeholder="Ingresá tu contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",

              minLength: {
                value: 6,

                message: "Mínimo 6 caracteres",
              },
            })}
          />

          {errors.password && (
            <small className="field-error">{errors.password.message}</small>
          )}

          <button type="submit">Ingresar</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
