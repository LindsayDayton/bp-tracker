'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BPTracker() {
  const [readings, setReadings] = useState([]);
  const [newReading, setNewReading] = useState({
    timestamp: new Date().toISOString().slice(0, 16),
    systolic: '',
    diastolic: '',
    heartRate: '',
    medications: {
      hydrochlorothiazide: false,
      amlodipine: false,
      vyvanse: false,
      zyrtec: false,
      antacid: false,
      trazodone: { taken: false, dose: '50mg' },
      cbd: { taken: false, dose: '15mg' }
    },
    coffee: { consumed: false, amount: '' },
    alcohol: { consumed: false, amount: '' },
    exercise: {
      yesterday: { done: false, type: '' },
      today: { done: false, type: '' }
    },
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setReadings(prev => [...prev, { ...newReading, id: Date.now() }]);
    setNewReading({
      timestamp: new Date().toISOString().slice(0, 16),
      systolic: '',
      diastolic: '',
      heartRate: '',
      medications: {
        hydrochlorothiazide: false,
        amlodipine: false,
        vyvanse: false,
        zyrtec: false,
        antacid: false,
        trazodone: { taken: false, dose: '50mg' },
        cbd: { taken: false, dose: '15mg' }
      },
      coffee: { consumed: false, amount: '' },
      alcohol: { consumed: false, amount: '' },
      exercise: {
        yesterday: { done: false, type: '' },
        today: { done: false, type: '' }
      },
      notes: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h2 className="text-xl font-semibold text-white">New Reading</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={newReading.timestamp}
                onChange={e => setNewReading(prev => ({ ...prev, timestamp: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Systolic
                </label>
                <input
                  type="number"
                  value={newReading.systolic}
                  onChange={e => setNewReading(prev => ({ ...prev, systolic: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diastolic
                </label>
                <input
                  type="number"
                  value={newReading.diastolic}
                  onChange={e => setNewReading(prev => ({ ...prev, diastolic: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heart Rate
                </label>
                <input
                  type="number"
                  value={newReading.heartRate}
                  onChange={e => setNewReading(prev => ({ ...prev, heartRate: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Daily Medications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newReading.medications.hydrochlorothiazide}
                  onChange={e => setNewReading(prev => ({
                    ...prev,
                    medications: {
                      ...prev.medications,
                      hydrochlorothiazide: e.target.checked
                    }
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Hydrochlorothiazide (50mg)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newReading.medications.amlodipine}
                  onChange={e => setNewReading(prev => ({
                    ...prev,
                    medications: {
                      ...prev.medications,
                      amlodipine: e.target.checked
                    }
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Amlodipine (10mg)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save Reading
          </button>
        </form>
      </div>

      {readings.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Blood Pressure History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={timestamp => new Date(timestamp).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={timestamp => new Date(timestamp).toLocaleString()}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#2563eb" 
                  name="Systolic"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#16a34a" 
                  name="Diastolic"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#dc2626" 
                  name="Heart Rate"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
