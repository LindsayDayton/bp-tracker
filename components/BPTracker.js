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
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 p-4 border rounded">
          <div>
            <label className="block text-sm font-medium mb-1">Date & Time</label>
            <input
              type="datetime-local"
              value={newReading.timestamp}
              onChange={e => setNewReading(prev => ({ ...prev, timestamp: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Systolic</label>
              <input
                type="number"
                value={newReading.systolic}
                onChange={e => setNewReading(prev => ({ ...prev, systolic: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Diastolic</label>
              <input
                type="number"
                value={newReading.diastolic}
                onChange={e => setNewReading(prev => ({ ...prev, diastolic: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Heart Rate</label>
              <input
                type="number"
                value={newReading.heartRate}
                onChange={e => setNewReading(prev => ({ ...prev, heartRate: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-medium mb-3">Daily Medications</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2">
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
                  className="w-4 h-4"
                />
                <span>Hydrochlorothiazide (50mg)</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
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
                  className="w-4 h-4"
                />
                <span>Amlodipine (10mg)</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Reading
        </button>
      </form>

      {readings.length > 0 && (
        <div className="mt-8 p-4 border rounded">
          <h3 className="font-medium mb-4">Blood Pressure History</h3>
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
                <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" />
                <Line type="monotone" dataKey="heartRate" stroke="#ff7300" name="Heart Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
