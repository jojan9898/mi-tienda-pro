import React from 'react';
import Layout from '../../components/layout/Layout';
import { BarChart } from 'lucide-react';

const ReportsPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <BarChart size={64} className="text-primary mb-4" />
        <h1 className="text-4xl font-display font-extrabold text-text-primary">
          Reportes y Analíticas
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          Próximamente: Aquí podrás ver gráficos de ventas y mucho más.
        </p>
      </div>
    </Layout>
  );
};

export default ReportsPage;