

import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  PieChart, 
  ArrowUpRight,
  Wallet,
  Receipt,
  BadgeDollarSign
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">Panel Financiero</h1>
          <p className="text-teal-600 text-lg">Gestiona tus finanzas y métricas de ventas</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Ingresos Totales', amount: '$45,289.00', icon: DollarSign, change: '+12.5%' },
            { title: 'Ventas del Mes', amount: '1,234', icon: TrendingUp, change: '+8.2%' },
            { title: 'Transacciones', amount: '2,456', icon: CreditCard, change: '+15.3%' },
            { title: 'Beneficio Neto', amount: '$12,345.00', icon: PieChart, change: '+10.8%' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <span className="flex items-center text-emerald-500 text-sm font-medium">
                  {stat.change}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </span>
              </div>
              <h3 className="text-gray-600 font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.amount}</p>
            </div>
          ))}
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="col-span-2 bg-white rounded-xl p-6 shadow-lg border border-teal-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Transacciones Recientes</h2>
              <button className="text-teal-600 hover:text-teal-700 font-medium">Ver todas</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Venta #1234', amount: '$299.00', type: 'Ropa', status: 'Completado' },
                { name: 'Venta #1235', amount: '$199.00', type: 'Electrónica', status: 'Pendiente' },
                { name: 'Venta #1236', amount: '$499.00', type: 'Accesorios', status: 'Completado' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-teal-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4">
                    <Receipt className="w-10 h-10 text-teal-600 bg-teal-100 p-2 rounded-lg" />
                    <div>
                      <p className="font-medium text-gray-800">{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{transaction.amount}</p>
                    <span className={`text-sm ${
                      transaction.status === 'Completado' ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Billetera', icon: Wallet, color: 'bg-teal-100 text-teal-600' },
                { name: 'Pagos', icon: BadgeDollarSign, color: 'bg-emerald-100 text-emerald-600' },
                { name: 'Reportes', icon: PieChart, color: 'bg-cyan-100 text-cyan-600' },
                { name: 'Facturas', icon: Receipt, color: 'bg-teal-100 text-teal-600' },
              ].map((action, index) => (
                <button
                  key={index}
                  className="p-4 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors text-center group"
                >
                  <div className={`mx-auto w-12 h-12 ${action.color} rounded-lg p-2.5 mb-2 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-full h-full" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;