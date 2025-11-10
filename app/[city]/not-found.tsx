import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-dark dark:text-white">Город не найден</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          К сожалению, страница для этого города пока не доступна.
        </p>
        <Link
          href="/"
          className="button-gradient inline-block px-6 py-3"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
