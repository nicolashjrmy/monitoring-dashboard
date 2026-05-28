'use client';

import { Camera, Download } from 'lucide-react';
import Image from 'next/image';

export function FormCKPN() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-6 px-8 mb-8">
        <h1 className="text-4xl font-bold text-[#003c7a]">Form CKPN</h1>
        <p className="text-gray-500 text-sm mt-2">Monitor and manage debtor credit information</p>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-8 pb-8">
        {/* Section 1: Informasi Kredit */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg mb-6">
          <div className="bg-gray-300 px-6 py-3 font-semibold text-gray-800 border-b border-gray-300">
            Informasi Kredit
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Nomor Rekening</label>
                <div className="text-gray-700 font-medium">100002</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Nama Debitur</label>
                  <div className="text-gray-700 font-medium">Eko Prasetyo</div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="bg-yellow-300 px-3 py-1 rounded font-semibold text-sm text-gray-800">
                    Flag Risiko
                  </div>
                  <div className="bg-yellow-400 text-white px-3 py-1 rounded font-bold text-sm">
                    KUNING
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Pokok Pinjaman</label>
                <div className="text-gray-700 font-medium">Rp 25.000.000</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Tenor Pinjaman</label>
                <div className="text-gray-700 font-medium">20 Hari</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Jenis Kunjungan */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-2">Jenis Kunjungan</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:border-[#003c7a] focus:ring-1 focus:ring-[#003c7a]">
            <option>Penagihan</option>
            <option>Monitoring</option>
            <option>Follow-up</option>
          </select>
        </div>

        {/* Section 3: Detail Pemantauan */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg mb-6">
          <div className="bg-gray-300 px-6 py-3 font-semibold text-gray-800 border-b border-gray-300">
            Detail Pemantauan
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Jumlah Tagihan</label>
              <input type="text" defaultValue="Rp 27.500.000" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-3">Janji Bayar</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="janji_bayar" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-700 text-sm font-semibold">Besok</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="janji_bayar" className="w-4 h-4" />
                  <span className="text-gray-700 text-sm font-semibold">Lusa</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="janji_bayar" className="w-4 h-4" />
                  <span className="text-gray-700 text-sm font-semibold">Tidak Ada</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Tanggal Janji Bayar</label>
              <input type="date" defaultValue="2024-04-25" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white" />
            </div>
          </div>
        </div>

        {/* Section 4: Verifikasi Nasabah */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg mb-6">
          <div className="bg-gray-300 px-6 py-3 font-semibold text-gray-800 border-b border-gray-300">
            Verifikasi Nasabah
          </div>
          <div className="p-6">
            <label className="block text-sm font-semibold text-gray-800 mb-4">Foto Nasabah & KTP</label>
            <div className="flex gap-4 mb-4">
              <div className="w-32 h-40 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <div className="w-32 h-40 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold">
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Lokasi Terverifikasi - 24/04/2024 10:15 WIB
            </div>
          </div>
        </div>

        {/* Section 5: Perhitungan CKPN */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg mb-6">
          <div className="bg-gray-300 px-6 py-3 font-semibold text-gray-800 border-b border-gray-300">
            Perhitungan CKPN
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Nilai Agunan</label>
                <input type="text" defaultValue="Rp 10.000.000" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white mb-4" />
                <label className="block text-sm font-semibold text-gray-800 mb-2">PD</label>
                <input type="text" defaultValue="5%" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Recovery Rate</label>
                <input type="text" defaultValue="70%" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white mb-4" />
                <label className="block text-sm font-semibold text-gray-800 mb-2">LGD</label>
                <input type="text" defaultValue="72%" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white" />
              </div>
            </div>
            
            {/* CKPN Result */}
            <div className="text-center mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">CKPN Dinamis</label>
              <div className="text-2xl font-bold text-[#003c7a]">Rp 900.000</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Simpan
              </button>
              <button className="px-8 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors">
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
