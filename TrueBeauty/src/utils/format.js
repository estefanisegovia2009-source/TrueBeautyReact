export function formatPrice(value) {
  const number =
    Number(value);

  if (Number.isNaN(number)) {
    return "$0";
  }

  return number.toLocaleString(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }
  );
}

export function formatDate(value) {
  if (!value) {
    return "Sin fecha";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "es-AR"
  ).format(date);
}