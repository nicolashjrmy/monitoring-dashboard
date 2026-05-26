'use client';

import { useState, useMemo, type Dispatch, type SetStateAction } from 'react';
import { AlertCircle, CheckCircle, Users, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// All debtor data from Excel
const allDebtorData = [
  { id: 1, name: 'Siti Aminah', account: '100001', rm: 'Rina', outstanding: 15000000, status: 'Sudah Dikunjungi', payment: 'Lancar', days: 0, condition: 'Stabil', promise: 'Tepat Waktu', collateral: 'Layak', risk: 'Low' },
  { id: 2, name: 'Eko Prasetyo', account: '100002', rm: 'Dedi', outstanding: 25000000, status: 'Sudah Dikunjungi', payment: 'Telat 20 Hari', days: 20, condition: 'Menurun', promise: 'Pending', collateral: 'Layak', risk: 'Medium' },
  { id: 3, name: 'Budi Santoso', account: '100003', rm: 'Rina', outstanding: 30000000, status: 'Sudah Dikunjungi', payment: 'Telat 45 Hari', days: 45, condition: 'Berhenti', promise: 'Gagal', collateral: 'Bermasalah', risk: 'High' },
  { id: 4, name: 'Agus Wijaya', account: '100004', rm: 'Dedi', outstanding: 35000000, status: 'Belum Dikunjungi', payment: 'Telat 35 Hari', days: 35, condition: 'Berhenti', promise: 'Gagal', collateral: 'Bermasalah', risk: 'High' },
  { id: 5, name: 'Dewi Lestari', account: '100005', rm: 'Rina', outstanding: 18000000, status: 'Sudah Dikunjungi', payment: 'Lancar', days: 0, condition: 'Stabil', promise: 'Tepat Waktu', collateral: 'Layak', risk: 'Low' },
  { id: 6, name: 'Toni Saputra', account: '100006', rm: 'Dedi', outstanding: 22000000, status: 'Sudah Dikunjungi', payment: 'Telat 5 Hari', days: 5, condition: 'Menurun', promise: 'Tertunda', collateral: 'Layak', risk: 'Medium' },
  { id: 7, name: 'Lina Hartati', account: '100007', rm: 'Rina', outstanding: 28000000, status: 'Sudah Dikunjungi', payment: 'Telat 60 Hari', days: 60, condition: 'Berhenti', promise: 'Gagal', collateral: 'Bermasalah', risk: 'High' },
  { id: 8, name: 'Andi Kurniawan', account: '100008', rm: 'Dedi', outstanding: 40000000, status: 'Sudah Dikunjungi', payment: 'Telat 90 Hari', days: 90, condition: 'Berhenti', promise: 'Gagal', collateral: 'Bermasalah', risk: 'High' },
  { id: 9, name: 'Maya Sari', account: '100009', rm: 'Rina', outstanding: 12000000, status: 'Sudah Dikunjungi', payment: 'Lancar', days: 0, condition: 'Stabil', promise: 'Tepat Waktu', collateral: 'Layak', risk: 'Low' },
  { id: 10, name: 'Joko Purnomo', account: '100010', rm: 'Dedi', outstanding: 27000000, status: 'Sudah Dikunjungi', payment: 'Telat 15 Hari', days: 15, condition: 'Menurun', promise: 'Pending', collateral: 'Layak', risk: 'Medium' },
  { id: 11, name: 'Rudi Hartono', account: '100011', rm: 'Rina', outstanding: 33000000, status: 'Sudah Dikunjungi', payment: 'Telat 40 Hari', days: 40, condition: 'Berhenti', promise: 'Gagal', collateral: 'Bermasalah', risk: 'High' },
  { id: 12, name: 'Sari Dewanti', account: '100012', rm: 'Dedi', outstanding: 19000000, status: 'Sudah Dikunjungi', payment: 'Telat 70 Hari', days: 70, condition: 'Berhenti', promise: 'Gagal', collateral: 'Bermasalah', risk: 'High' },
  { id: 13, name: 'Bayu Pradana', account: '100013', rm: 'Rina', outstanding: 21000000, status: 'Sudah Dikunjungi', payment: 'Lancar', days: 0, condition: 'Stabil', promise: 'Tepat Waktu', collateral: 'Layak', risk: 'Low' },
  { id: 14, name: 'Fitri Handayani', account: '100014', rm: 'Dedi', outstanding: 26000000, status: 'Sudah Dikunjungi', payment: 'Telat 25 Hari', days: 25, condition: 'Menurun', promise: 'Pending', collateral: 'Layak', risk: 'Medium' },
  { id: 15, name: 'Wahyu Setiawan', account: '100015', rm: 'Rina', outstanding: 32000000, status: 'Sudah Dikunjungi', payment: 'Telat 50 Hari', days: 50, condition: 'Berhenti', promise: 'Gagal', collateral: 'Bermasalah', risk: 'High' },
];

const riskDistribution = [
  { name: 'Low', value: 65, color: '#22c55e' },
  { name: 'Medium', value: 25, color: '#f59e0b' },
  { name: 'High', value: 10, color: '#ef4444' },
];

export function CreditMonitoringDashboard() {
  const [selectedRM, setSelectedRM] = useState('Semua RM');
  const [selectedRisk, setSelectedRisk] = useState('Pilih Risiko');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('Semua Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter logic
  const filteredData = useMemo(() => {
    return allDebtorData.filter((debtor) => {
      const rmMatch = selectedRM === 'Semua RM' || debtor.rm === selectedRM;
      const riskMatch = selectedRisk === 'Pilih Risiko' || debtor.risk === selectedRisk;
      const paymentMatch = 
        selectedPaymentStatus === 'Semua Status' ||
        (selectedPaymentStatus === 'Lancar' && debtor.days === 0) ||
        (selectedPaymentStatus === 'Telat < 30 Hari' && debtor.days > 0 && debtor.days < 30) ||
        (selectedPaymentStatus === 'Telat > 30 Hari' && debtor.days >= 30);
      
      return rmMatch && riskMatch && paymentMatch;
    });
  }, [selectedRM, selectedRisk, selectedPaymentStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to first page when filters change
  const handleFilterChange = (setter: Dispatch<SetStateAction<string>>, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const totalDebtors = allDebtorData.length;
  const overdueCount = allDebtorData.filter(d => d.days >= 30).length;
  const completedVisits = Math.round((allDebtorData.filter(d => d.status === 'Sudah Dikunjungi').length / totalDebtors) * 100);
  const ckpnRatio = 4.5;

  return (
    <div className="min-h-screen bg-white pt-6 px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#003c7a]">Micro Credit Monitoring</h1>
        <p className="text-gray-500 text-sm mt-2">Monitor and manage your credit portfolio</p>
      </div>

      {/* Main Content */}
      <div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Total Debitur Aktif</p>
                <h2 className="text-3xl font-bold text-[#003c7a] mt-3">{totalDebtors.toLocaleString()}</h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-[#003c7a]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Tunggakan &gt; 30 Hari</p>
                <h2 className="text-3xl font-bold text-red-600 mt-3">{overdueCount}</h2>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Kunjungan Selesai</p>
                <h2 className="text-3xl font-bold text-green-600 mt-3">{completedVisits}%</h2>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">CKPN Ratio</p>
                <h2 className="text-3xl font-bold text-[#0052cc] mt-3">{ckpnRatio.toFixed(1)}%</h2>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-[#0052cc]" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2">Nama RM</label>
              <select value={selectedRM} onChange={(e) => handleFilterChange(setSelectedRM, e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003c7a] focus:ring-1 focus:ring-[#003c7a] text-sm text-gray-700 bg-white">
                <option>Semua RM</option>
                <option>Rina</option>
                <option>Dedi</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2">Status Risiko</label>
              <select value={selectedRisk} onChange={(e) => handleFilterChange(setSelectedRisk, e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003c7a] focus:ring-1 focus:ring-[#003c7a] text-sm text-gray-700 bg-white">
                <option>Semua Risiko</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2">Status Pembayaran</label>
              <select value={selectedPaymentStatus} onChange={(e) => handleFilterChange(setSelectedPaymentStatus, e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003c7a] focus:ring-1 focus:ring-[#003c7a] text-sm text-gray-700 bg-white">
                <option>Semua Status</option>
                <option>Lancar</option>
                <option>Telat &lt; 30 Hari</option>
                <option>Telat &gt; 30 Hari</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Daftar Debitur</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Nama Debitur</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status Kunjungan</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Tunggakan</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Janji Bayar</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Risiko</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedData.map((debtor) => (
                      <tr key={debtor.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{debtor.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{debtor.status}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{debtor.days === 0 ? 'Lancar' : `${debtor.days} Hari`}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{debtor.promise}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            debtor.risk === 'Low' ? 'bg-green-100 text-green-700' :
                            debtor.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {debtor.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? 'bg-[#003c7a] text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Risiko</h3>
            <div className="flex justify-center mb-6">
              <ResponsiveContainer width="100%" height={280}>
                <RechartsPieChart>
                  <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
