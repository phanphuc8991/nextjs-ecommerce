
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  // const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        {t('title', { default: 'Page Not Found' })}
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        {t('description', { default: 'The page you are looking for does not exist or has been moved.' })}
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {t('button', { default: 'Back to Home' })}
      </Link> */}
    </div>
  );
}