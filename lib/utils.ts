export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const isProduction = () => process.env.NODE_ENV === "production";
export const isBrowser = () => typeof window !== "undefined";

export function printException(e: Error): string {
  const message = e.message || "No error message available";
  const stack = e.stack || "No stack trace available";

  return `${message}\n${stack}`;
}
