'use client';

import { useState } from 'react';
import { AlertCircle, AlertTriangle, ChevronRight } from 'lucide-react';

interface Notification {
  id: number;
  type: 'medium' | 'high';
  title: string;
  debtor: string;
  details: string;
  action: string;
  buttonText: string;
  read: boolean;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    type: 'medium',
    title: 'Medium Risk Follow-Up!',
    debtor: 'Eko Prasetyo',
    details: 'Jadwalkan Kunjungan Ulang dalam 14 hari. Perbarui Form LKN setelah kunjungan.',
    action: 'Lihat Detail',
    buttonText: 'Lihat Detail',
    read: false,
  },
  {
    id: 2,
    type: 'high',
    title: 'High Risk Alert!',
    debtor: 'Budi Santoso',
    details: 'Segera Koordinasi dengan CRR untuk Penagihan. Update data di Form LKN sesegera mungkin.',
    action: 'Tindak Lanjut',
    buttonText: 'Tindak Lanjut',
    read: false,
  },
  {
    id: 3,
    type: 'high',
    title: 'High Risk Alert!',
    debtor: 'Agus Wijaya',
    details: 'Perlu tindakan koleksi segera. Status pembayaran belum dikunjungi dalam 35 hari.',
    action: 'Tindak Lanjut',
    buttonText: 'Tindak Lanjut',
    read: false,
  },
  {
    id: 4,
    type: 'medium',
    title: 'Medium Risk Follow-Up!',
    debtor: 'Joko Purnomo',
    details: 'Rencana kunjungan lanjutan dalam 15 hari. Pastikan pembayaran cicilan terpenuhi.',
    action: 'Lihat Detail',
    buttonText: 'Lihat Detail',
    read: false,
  },
  {
    id: 5,
    type: 'high',
    title: 'High Risk Alert!',
    debtor: 'Lina Hartati',
    details: 'Kolateral perlu verifikasi ulang. Tunggakan 60 hari memerlukan eskalasi.',
    action: 'Tindak Lanjut',
    buttonText: 'Tindak Lanjut',
    read: false,
  },
  {
    id: 6,
    type: 'high',
    title: 'High Risk Alert!',
    debtor: 'Andi Kurniawan',
    details: 'Segera Koordinasi dengan CRR untuk Penagihan. Tunggakan 90 hari sangat serius.',
    action: 'Tindak Lanjut',
    buttonText: 'Tindak Lanjut',
    read: false,
  },
];

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const mediumRiskCount = notifications.filter(n => n.type === 'medium' && !n.read).length;
  const highRiskCount = notifications.filter(n => n.type === 'high' && !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDetailClick = (notification: Notification) => {
    setSelectedNotification(notification);
    handleMarkAsRead(notification.id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-6 px-8 mb-8">
        <h1 className="text-4xl font-bold text-[#003c7a]">Notifications</h1>
        <p className="text-gray-500 text-sm mt-2">Manage reminders and follow-ups</p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        {/* Notification Summary */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Total Notifications</p>
            <p className="text-3xl font-bold text-[#003c7a] mt-2">{unreadCount}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Medium Risk</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">{mediumRiskCount}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">High Risk</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{highRiskCount}</p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Reminder & Follow-Up</h2>
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {unreadCount}
              </span>
            </div>
          </div>

          {/* Notifications */}
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {notifications.filter(n => !n.read).length > 0 ? (
              notifications.map((notification) => (
                !notification.read && (
                  <div
                    key={notification.id}
                    className={`p-6 ${
                      notification.type === 'medium'
                        ? 'bg-yellow-50'
                        : 'bg-red-50'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 pt-1">
                        {notification.type === 'medium' ? (
                          <AlertCircle className="w-6 h-6 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold mb-2 ${
                            notification.type === 'medium'
                              ? 'text-yellow-700'
                              : 'text-red-700'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-800 mb-1">
                          <strong>{notification.debtor}:</strong> {notification.details}
                        </p>
                        <button
                          onClick={() => handleDetailClick(notification)}
                          className={`inline-flex items-center gap-1 px-4 py-2 rounded text-white text-sm font-semibold transition-colors ${
                            notification.type === 'medium'
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {notification.buttonText}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p className="text-sm">No unread notifications</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.filter(n => !n.read).length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 text-center">
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm font-medium text-gray-600 hover:text-[#003c7a] transition-colors"
              >
                Mark All as Read
              </button>
            </div>
          )}
        </div>

        {/* Read Notifications Section */}
        {notifications.filter(n => n.read).length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Read Notifications</h3>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
                {notifications.map((notification) => (
                  notification.read && (
                    <div
                      key={notification.id}
                      className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex gap-3 items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          {notification.type === 'medium' ? (
                            <AlertCircle className="w-5 h-5 text-gray-400" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700">
                            {notification.title} - {notification.debtor}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {notification.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
