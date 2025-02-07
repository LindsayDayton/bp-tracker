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
      antacid: { taken: false }
    },
    yesterday: {
      trazodone: { taken: false, dose: '50mg' },
      cbd: { taken: false, dose: '15mg' },
      alcohol: { consumed: false, amount: '' },
      exercise: { done: false, duration: '', type: '' }
    },
    today: {
      coffee: { consumed: false, amount: '' },
      exercise: { done: false, duration: '', type: '' },
      food: { consumed: false, details: '' }
    }
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
        antacid: { taken: false }
      },
      yesterday: {
        trazodone: { taken: false, dose: '50mg' },
        cbd: { taken: false, dose: '15mg' },
        alcohol: { consumed: false, amount: '' },
        exercise: { done: false, duration: '', type: '' }
      },
      today: {
        coffee: { consumed: false, amount: '' },
        exercise: { done: false, duration: '', type: '' },
        food: { consumed: false, details: '' }
      }
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

  const handleYesterdayChange = (field, value, subfield = null) => {
    setNewReading(prev => ({
      ...prev,
      yesterday: {
        ...prev.yesterday,
        [field]: subfield 
          ? { ...prev.yesterday[field], [subfield]: value }
          : value
      }
    }));
  };

  const handleTodayChange = (field, value, subfield = null) => {
    setNewReading(prev => ({
      ...prev,
      today: {
        ...prev.today,
        [field]: subfield 
          ? { ...prev.today[field], [subfield]: value }
          : value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h2 className="text-xl font-semibold text-white">Blood Pressure Tracker</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Readings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={newReading.timestamp}
                onChange={e => setNewReading(prev => ({ ...prev, timestamp: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md"
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
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Medications Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Daily Medications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(newReading.medications).map(([med, details]) => (
                <div key={med} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={details.taken}
                    onChange={e => handleMedicationChange(med, e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">
                    {med.charAt(0).toUpperCase() + med.slice(1)}
                    {details.dose && ` (${details.dose})`}
                  </span>
                  {details.dose && (
                    <select
                      value={details.dose}
                      onChange={e => handleMedicationChange(med, e.target.value, 'dose')}
                      className="ml-2 p-1 border border-gray-300 rounded-md text-sm"
                      disabled={!details.taken}
                    >
                      <option value="20mg">20mg</option>
                      <option value="40mg">40mg</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Yesterday Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Yesterday</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(newReading.yesterday)
                .filter(([key]) => key !== 'exercise')
                .map(([item, details]) => (
                  <div key={item} className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={details.taken || details.consumed}
                        onChange={e => handleYesterdayChange(item, e.target.checked, details.taken !== undefined ? 'taken' : 'consumed')}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </span>
                    </label>
                    {(details.taken || details.consumed) && details.amount !== undefined && (
                      <input
                        type="text"
                        placeholder="Amount"
                        value={details.amount}
                        onChange={e => handleYesterdayChange(item, e.target.value, 'amount')}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    )}
                  </div>
              ))}
              
              {/* Yesterday's Exercise */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.yesterday.exercise.done}
                    onChange={e => handleYesterdayChange('exercise', e.target.checked, 'done')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Exercise</span>
                </label>
                {newReading.yesterday.exercise.done && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Duration (minutes)"
                      value={newReading.yesterday.exercise.duration}
                      onChange={e => handleYesterdayChange('exercise', e.target.value, 'duration')}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Type of exercise"
                      value={newReading.yesterday.exercise.type}
                      onChange={e => handleYesterdayChange('exercise', e.target.value, 'type')}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Today Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Today</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coffee */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.today.coffee.consumed}
                    onChange={e => handleTodayChange('coffee', e.target.checked, 'consumed')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Coffee</span>
                </label>
                {newReading.today.coffee.consumed && (
                  <input
                    type="text"
                    placeholder="How many ounces?"
                    value={newReading.today.coffee.amount}
                    onChange={e => handleTodayChange('coffee', e.target.value, 'amount')}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                )}
              </div>

              {/* Today's Exercise */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.today.exercise.done}
                    onChange={e => handleTodayChange('exercise', e.target.checked, 'done')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Exercise</span>
                </label>
                {newReading.today.exercise.done && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Duration (minutes)"
                      value={newReading.today.exercise.duration}
                      onChange={e => handleTodayChange('exercise', e.target.value, 'duration')}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Type of exercise"
                      value={newReading.today.exercise.type}
                      onChange={e => handleTodayChange('exercise', e.target.value, 'type')}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Food */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.today.food.consumed}
                    onChange={e => handleTodayChange('food', e.target.checked, 'consumed')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Food</span>
                </label>
                {newReading.today.food.consumed && (
                  <input
                    type="text"
                    placeholder="What did you eat?"
                    value={newReading.today.food.details}
                    onChange={e => handleTodayChange('food', e.target.value, 'details')}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Reading
          </button>
        </form>

       {/* Chart Section */}
        {readings.length > 0 && (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={readings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis yAxisId="bp" domain={[40, 200]} />
                <YAxis yAxisId="hr" orientation="right" domain={[40, 120]} />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                  formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Legend />
                <Line
                  yAxisId="bp"
                  type="monotone"
                  dataKey="systolic"
                  stroke="#ef4444"
                  name="Systolic"
                  dot={true}
                />
                <Line
                  yAxisId="bp"
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#3b82f6"
                  name="Diastolic"
                  dot={true}
                />
                <Line
                  yAxisId="hr"
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#10b981"
                  name="Heart Rate"
                  dot={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
