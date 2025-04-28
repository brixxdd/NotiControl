import { ArticlesTable } from '../components/admin/ArticlesTable';

export const Admin = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Panel de Administración</h1>
      <div className="space-y-8">
        <ArticlesTable />
      </div>
    </div>
  );
}; 