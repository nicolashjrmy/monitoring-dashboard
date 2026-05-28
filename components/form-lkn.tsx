'use client';

import { useState, useEffect, type ChangeEvent } from 'react';

export function FormLKN() {
  const [activeTab, setActiveTab] = useState('penagihan');

  const [filePreviews, setFilePreviews] = useState<{
    penagihanSelfie: { url: string | null; name: string | null };
    ekspansiSelfie: { url: string | null; name: string | null };
    penyelesaianSelfie: { url: string | null; name: string | null };
    penyelesaianDokumen: { url: string | null; name: string | null };
  }>({
    penagihanSelfie: { url: null, name: null },
    ekspansiSelfie: { url: null, name: null },
    penyelesaianSelfie: { url: null, name: null },
    penyelesaianDokumen: { url: null, name: null },
  });

  const handleFileChange = (
    key: keyof typeof filePreviews,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    setFilePreviews((prev) => {
      const prevUrl = prev[key].url;
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }

      if (!file) {
        return { ...prev, [key]: { url: null, name: null } };
      }

      const url = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      return {
        ...prev,
        [key]: { url, name: file.name },
      };
    });
  };

  useEffect(() => {
    return () => {
      Object.values(filePreviews).forEach((preview) => {
        if (preview.url) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [filePreviews]);

  const tabs = [
    { id: 'penagihan', label: 'Penagihan' },
    { id: 'ekspansi', label: 'Ekspansi' },
    { id: 'penyelesaian', label: 'Penyelesaian Kredit' },
  ];

  const formFields = {
    penagihan: [
      { field: 'Nomor Rekening', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Pokok Pinjaman', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Jumlah Tunggakan', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Jumlah Tagihan', inputType: 'Input angka', opsi: '—' },
      { field: 'Janji Bayar', inputType: 'Date picker', opsi: 'Kalender tanggal' },
      { field: 'Foto Selfie KTP', inputType: 'Auto capture', opsi: 'Kamera + geotag' },
      { field: 'Indikator Risiko', inputType: 'Checklist cepat', opsi: '☐ Penundaan berulang ☐ Usaha tutup ☐ Lainnya' },
      { field: 'Tanggal Tidak Lanjut', inputType: 'Auto generate', opsi: 'Sistem isi otomatis sesuai risiko' },
    ],
    ekspansi: [
      { field: 'Nomor Rekening', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Pokok Pinjaman', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Jumlah Tunggakan', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Kebutuhan Ekspansi', inputType: 'Dropdown', opsi: 'Perpanjangan / Suplesi / Restrukturisasi' },
      { field: 'Cek Kondisi Usaha', inputType: 'Text', opsi: 'Catatan usaha otomatis' },
      { field: 'Verifikasi Arus Kas', inputType: 'Toggle', opsi: 'Ya / Tidak / N/A' },
      { field: 'Status Agunan', inputType: 'Toggle', opsi: 'Layak / Bermasalah' },
      { field: 'Foto Selfie KTP', inputType: 'Auto capture', opsi: 'Kamera + geotag' },
      { field: 'Masukan/Keluhan Nasabah', inputType: 'Text box', opsi: 'Catatan singkat' },
    ],
    penyelesaian: [
      { field: 'Nomor Rekening', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Pokok Pinjaman', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Jumlah Tunggakan', inputType: 'Auto-fill', opsi: '—' },
      { field: 'Kebutuhan Penyelesaian', inputType: 'Dropdown', opsi: 'Damai / Hukum' },
      { field: 'Status Agunan', inputType: 'Toggle', opsi: 'Layak / Bermasalah' },
      { field: 'Verifikasi Dokumen', inputType: 'Auto capture', opsi: 'Foto KTP + geotag' },
      { field: 'Foto Selfie KTP', inputType: 'Auto capture', opsi: 'Kamera + geotag' },
      { field: 'Aset Likuidasi', inputType: 'Text box', opsi: 'Catatan aset' },
      { field: 'Indikator Risiko', inputType: 'Checklist cepat', opsi: '☐ Penundaan berulang ☐ Usaha tutup ☐ Lainnya' },
      { field: 'Tanggal Tidak Lanjut', inputType: 'Auto generate', opsi: 'Sistem isi otomatis sesuai risiko' },
    ],
  };

  const currentFields = formFields[activeTab as keyof typeof formFields];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-6 px-8 mb-8">
        <h1 className="text-4xl font-bold text-[#003c7a]">Form LKN</h1>
        <p className="text-gray-500 text-sm mt-2">Monitor and manage debtor credit information</p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-8 pb-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-white bg-[#003c7a] border-b-2 border-[#003c7a]'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          {/* Penagihan Tab */}
          {activeTab === 'penagihan' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Rekening</label>
                  <input type="text" value="100002" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pokok Pinjaman</label>
                  <input type="text" value="Rp 25.000.000" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Tunggakan</label>
                  <input type="text" value="Rp 2.000.000" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Tagihan</label>
                  <input type="text" value="Rp 2.000.000" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Janji Bayar</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Foto Selfie KTP</label>
                  <label className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#003c7a] text-white rounded-lg cursor-pointer hover:bg-[#002d5a] transition-colors">
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleFileChange('penagihanSelfie', e)}
                    />
                  </label>
                  {filePreviews.penagihanSelfie.name && (
                    <p className="mt-2 text-sm text-gray-600">{filePreviews.penagihanSelfie.name}</p>
                  )}
                  {filePreviews.penagihanSelfie.url && (
                    <img
                      src={filePreviews.penagihanSelfie.url}
                      alt="Selfie preview"
                      className="mt-3 h-32 w-full object-cover rounded-lg border border-gray-200"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Indikator Risiko</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" /> Penundaan berulang
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" /> Usaha tutup
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" /> Lainnya
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Tidak Lanjut</label>
                <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          )}

          {/* Ekspansi Tab */}
          {activeTab === 'ekspansi' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Rekening</label>
                  <input type="text" value="100002" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pokok Pinjaman</label>
                  <input type="text" value="Rp 25.000.000" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Tunggakan</label>
                <input type="text" value="Rp 2.000.000" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kebutuhan Ekspansi</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Perpanjangan</option>
                  <option>Suplesi</option>
                  <option>Restrukturisasi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cek Kondisi Usaha</label>
                <input type="text" placeholder="Catatan usaha otomatis" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verifikasi Arus Kas</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="verifikasi_aruskas" value="ya" /> Ya
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="verifikasi_aruskas" value="tidak" /> Tidak
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="verifikasi_aruskas" value="na" /> N/A
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status Agunan</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status_agunan_exp" value="layak" /> Layak
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status_agunan_exp" value="bermasalah" /> Bermasalah
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto Selfie KTP</label>
                <label className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#003c7a] text-white rounded-lg cursor-pointer hover:bg-[#002d5a] transition-colors">
                  Choose file
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handleFileChange('ekspansiSelfie', e)}
                  />
                </label>
                {filePreviews.ekspansiSelfie.name && (
                  <p className="mt-2 text-sm text-gray-600">{filePreviews.ekspansiSelfie.name}</p>
                )}
                {filePreviews.ekspansiSelfie.url && (
                  <img
                    src={filePreviews.ekspansiSelfie.url}
                    alt="Selfie preview"
                    className="mt-3 h-32 w-full object-cover rounded-lg border border-gray-200"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Masukan/Keluhan Nasabah</label>
                <textarea placeholder="Catatan singkat" className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={3}></textarea>
              </div>
            </div>
          )}

          {/* Penyelesaian Kredit Tab */}
          {activeTab === 'penyelesaian' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Rekening</label>
                  <input type="text" value="100002" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pokok Pinjaman</label>
                  <input type="text" value="Rp 25.000.000" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Tunggakan</label>
                <input type="text" value="Rp 2.000.000" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kebutuhan Penyelesaian</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Damai / Hukum</option>
                  <option>Litigasi</option>
                  <option>Pembayaran Bertahap</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status Agunan</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status_agunan_peny" value="layak" /> Layak
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status_agunan_peny" value="bermasalah" /> Bermasalah
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Verifikasi Dokumen</label>
                  <label className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#003c7a] text-white rounded-lg cursor-pointer hover:bg-[#002d5a] transition-colors">
                    Choose file
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) => handleFileChange('penyelesaianDokumen', e)}
                    />
                  </label>
                  {filePreviews.penyelesaianDokumen.name && (
                    <p className="mt-2 text-sm text-gray-600">{filePreviews.penyelesaianDokumen.name}</p>
                  )}
                  {filePreviews.penyelesaianDokumen.url && (
                    <p className="mt-2 text-sm text-gray-600">Preview not available for this file type.</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Foto Selfie KTP</label>
                  <label className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#003c7a] text-white rounded-lg cursor-pointer hover:bg-[#002d5a] transition-colors">
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleFileChange('penyelesaianSelfie', e)}
                    />
                  </label>
                  {filePreviews.penyelesaianSelfie.name && (
                    <p className="mt-2 text-sm text-gray-600">{filePreviews.penyelesaianSelfie.name}</p>
                  )}
                  {filePreviews.penyelesaianSelfie.url && (
                    <img
                      src={filePreviews.penyelesaianSelfie.url}
                      alt="Selfie preview"
                      className="mt-3 h-32 w-full object-cover rounded-lg border border-gray-200"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aset Likuidasi</label>
                <textarea placeholder="Catatan aset" className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={2}></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Indikator Risiko</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" /> Penundaan berulang
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" /> Usaha tutup
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" /> Lainnya
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Tidak Lanjut</label>
                <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-end">
          <button className="px-6 py-2 bg-gray-300 text-gray-900 font-semibold rounded hover:bg-gray-400 transition-colors">
            Batal
          </button>
          <button className="px-6 py-2 bg-[#003c7a] text-white font-semibold rounded hover:bg-[#002d5a] transition-colors">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
