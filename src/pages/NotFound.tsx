import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-white">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Сторінка не знайдена</h2>
      <p className="mb-8">
        Сторінка яку ви шукаєте не існує або була переміщена.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors"
      >
        На головну
      </Link>
    </div>
  );
}
