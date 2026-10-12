import { useState } from "react";

import { useForm } from "react-hook-form";

import StatusMessage from "../components/StatusMessage.jsx";

import { createUser } from "../services/users.service.js";

function Register() {
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      birthDate: "",
      province: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      setStatus({
        type: "",
        message: "",
      });

      const { repeatPassword, ...userData } = data;

      await createUser({
        ...userData,

        createdAt: new Date().toISOString(),
      });

      setStatus({
        type: "success",

        message: "Registro exitoso. El usuario se guardó en MockAPI.",
      });

      reset();
    } catch (error) {
      setStatus({
        type: "error",

        message: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="form-page">
      <section className="form-section">
        <h1>Crear cuenta</h1>

        <p className="form-intro">
          Registrate para recibir novedades, ofertas y beneficios exclusivos.
        </p>

        <StatusMessage type={status.type}>{status.message}</StatusMessage>

        <form
          className="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label htmlFor="name">Nombre completo</label>

          <input
            id="name"
            type="text"
            placeholder="Ingresá tu nombre completo"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />

          {errors.name && (
            <small className="field-error">{errors.name.message}</small>
          )}

          <label htmlFor="email">Correo electrónico</label>

          <input
            id="email"
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

          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            {...register("password", {
              required: "La contraseña es obligatoria",

              minLength: {
                value: 6,

                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />

          {errors.password && (
            <small className="field-error">{errors.password.message}</small>
          )}

          <label htmlFor="repeatPassword">Repetir contraseña</label>

          <input
            id="repeatPassword"
            type="password"
            placeholder="Repetí tu contraseña"
            {...register("repeatPassword", {
              required: "Repetí la contraseña",

              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />

          {errors.repeatPassword && (
            <small className="field-error">
              {errors.repeatPassword.message}
            </small>
          )}

          <label htmlFor="birthDate">Fecha de nacimiento</label>

          <input
            id="birthDate"
            type="date"
            {...register("birthDate", {
              required: "La fecha de nacimiento es obligatoria",
            })}
          />

          {errors.birthDate && (
            <small className="field-error">{errors.birthDate.message}</small>
          )}

          <label htmlFor="province">Provincia o país</label>

          <select
            id="province"
            {...register("province", {
              required: "Seleccioná una opción",
            })}
          >
            <option value="">Seleccioná una opción</option>

            <option value="Buenos Aires">Buenos Aires</option>

            <option value="Córdoba">Córdoba</option>

            <option value="Santa Fe">Santa Fe</option>

            <option value="Mendoza">Mendoza</option>

            <option value="Entre Ríos">Entre Ríos</option>

            <option value="Otro país">Otro país</option>
          </select>

          {errors.province && (
            <small className="field-error">{errors.province.message}</small>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Registrando..." : "Registrarme"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
