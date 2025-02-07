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
      hydrochlorothiazide: { taken: false, dose: '50mg' },
      amlodipine: { taken: false, dose: '10mg' },
      vyvanse: { taken: false, dose: '20mg' },
      zyrtec: { taken: false },
      antacid: { taken: false },
      trazodone: { taken: false, dose: '50mg' },
      cbd: { taken: false, dose: '15mg' },
      other: { taken: false, name: '', dose: '' }
    },
    consumables: {
      coffee: { consumed: false, amount: '' },
      alcohol: { consumed: false, amount: '' }
    },
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
        hydrochlorothiazide: { taken: false, dose: '50mg' },
        amlodipine: { taken: false, dose: '10mg' },
        vyvanse: { taken: false, dose: '20mg' },
        zyrtec: { taken: false },
        antacid: { taken: false },
        trazodone: { taken: false, dose: '50mg' },
        cbd: { taken: false, dose: '15mg' },
        other: { taken: false, name: '', dose: '' }
      },
      consumables: {
        coffee: { consumed: false, amount: '' },
        alcohol: { consumed: false, amount: '' }
      },
      exercise: {
        yesterday: { done: false, type: '' },
        today: { done: false, type: '' }
      },
      notes: ''
    });
  };

  const handleMedicationChange = (medication, value, field = 'taken') => {
    setNewReading(prev => ({
      ...prev,
      medications: {
        ...prev.medications,
        [medication]: {
          ...prev.medications[medication],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h2 className="text-xl font-semibold text-white">New Reading</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* BP and Heart Rate Inputs */}
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

          {/* Medications Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Daily Medications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Regular Medications */}
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newReading.medications.hydrochlorothiazide.taken}
                  onChange={e => handleMedicationChange('hydrochlorothiazide', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Hydrochlorothiazide (50mg)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newReading.medications.amlodipine.taken}
                  onChange={e => handleMedicationChange('amlodipine', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Amlodipine (10mg)</span>
              </label>
             {/* Vyvanse with dose selection */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newReading.medications.vyvanse.taken}
                  onChange={e => handleMedicationChange('vyvanse', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Vyvanse XR</span>
                <select
                  value={newReading.medications.vyvanse.dose}
                  onChange={e => handleMedicationChange('vyvanse', e.target.value, 'dose')}
                  className="ml-2 p-1 border border-gray-300 rounded-md text-sm"
                  disabled={!newReading.medications.vyvanse.taken}
                >
                  <option value="20mg">20mg</option>
                  <option value="40mg">40mg</option>
                </select>
              </div>

              {/* Zyrtec */}
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newReading.medications.zyrtec.taken}
                  onChange={e => handleMedicationChange('zyrtec', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Zyrtec</span>
              </label>
              {/* CBD with dose selection */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newReading.medications.cbd.taken}
                  onChange={e => handleMedicationChange('cbd', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">CBD</span>
                <select
                  value={newReading.medications.cbd.dose}
                  onChange={e => handleMedicationChange('cbd', e.target.value, 'dose')}
                  className="ml-2 p-1 border border-gray-300 rounded-md text-sm"
                  disabled={!newReading.medications.cbd.taken}
                >
                  <option value="15mg">15mg</option>
                  <option value="30mg">30mg</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consumables Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Consumables</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coffee */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.consumables.coffee.consumed}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      consumables: {
                        ...prev.consumables,
                        coffee: { ...prev.consumables.coffee, consumed: e.target.checked }
                      }
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Coffee</span>
                </label>
                {newReading.consumables.coffee.consumed && (
                  <input
                    type="text"
                    placeholder="How much?"
                    value={newReading.consumables.coffee.amount}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      consumables: {
                        ...prev.consumables,
                        coffee: { ...prev.consumables.coffee, amount: e.target.value }
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                )}
              </div>

              {/* Alcohol */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.consumables.alcohol.consumed}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      consumables: {
                        ...prev.consumables,
                        alcohol: { ...prev.consumables.alcohol, consumed: e.target.checked }
                      }
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Alcohol</span>
                </label>
                {newReading.consumables.alcohol.consumed && (
                  <input
                    type="text"
                    placeholder="How much?"
                    value={newReading.consumables.alcohol.amount}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      consumables: {
                        ...prev.consumables,
                        alcohol: { ...prev.consumables.alcohol, amount: e.target.value }
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Exercise Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Exercise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Yesterday's Exercise */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.exercise.yesterday.done}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      exercise: {
                        ...prev.exercise,
                        yesterday: { ...prev.exercise.yesterday, done: e.target.checked }
                      }
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Exercise Yesterday</span>
                </label>
                  {newReading.exercise.yesterday.done && (
                  <input
                    type="text"
                    placeholder="What type of exercise?"
                    value={newReading.exercise.yesterday.type}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      exercise: {
                        ...prev.exercise,
                        yesterday: { ...prev.exercise.yesterday, type: e.target.value }
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                )}
              </div>

              {/* Today's Exercise */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.exercise.today.done}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      exercise: {
                        ...prev.exercise,
                        today: { ...prev.exercise.today, done: e.target.checked }
                      }
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Exercise Today</span>
                </label>
                {newReading.exercise.today.done && (
                  <input
                    type="text"
                    placeholder="What type of exercise?"
                    value={newReading.exercise.today.type}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      exercise: {
                        ...prev.exercise,
                        today: { ...prev.exercise.today, type: e.target.value }
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Notes</h3>
            <textarea
              value={newReading.notes}
              onChange={e => setNewReading(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Any additional notes..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save Reading
          </button>
        </form>
      </div>

      {/* Visualization Section */}
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
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const reading = payload[0].payload;
                      return (
                        <div className="bg-white p-4 border border-gray-200 rounded shadow-lg">
                          <p className="font-medium">{new Date(label).toLocaleString()}</p>
                          <p className="text-blue-600">Systolic: {reading.systolic}</p>
                          <p className="text-green-600">Diastolic: {reading.diastolic}</p>
                          <p className="text-red-600">Heart Rate: {reading.heartRate}</p>
                          {reading.medications && (
                            <div className="mt-2">
                              <p className="font-medium">Medications:</p>
                              {Object.entries(reading.medications)
                                .filter(([_, med]) => med.taken)
                                .map(([name, med]) => (
                                  <p key={name} className="text-sm">
                                    {name} {med.dose ? `(${med.dose})` : ''}
                                  </p>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
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
