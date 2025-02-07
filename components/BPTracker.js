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
      medications: {
        trazodone: { taken: false, dose: '50mg' },
        cbd: { taken: false, dose: '15mg' }
      },
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
        medications: {
          trazodone: { taken: false, dose: '50mg' },
          cbd: { taken: false, dose: '15mg' }
        },
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
{/* Yesterday Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Yesterday</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Trazodone with dose selection */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newReading.medications.trazodone.taken}
                  onChange={e => handleMedicationChange('trazodone', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Trazodone</span>
                <select
                  value={newReading.medications.trazodone.dose}
                  onChange={e => handleMedicationChange('trazodone', e.target.value, 'dose')}
                  className="ml-2 p-1 border border-gray-300 rounded-md text-sm"
                  disabled={!newReading.medications.trazodone.taken}
                >
                  <option value="50mg">50mg</option>
                  <option value="100mg">100mg</option>
                </select>
              </div>

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
                    placeholder="How many units?"
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
                  <span className="text-gray-700">Exercise</span>
                </label>
                {newReading.exercise.yesterday.done && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Duration (minutes)"
                      value={newReading.exercise.yesterday.duration || ''}
                      onChange={e => setNewReading(prev => ({
                        ...prev,
                        exercise: {
                          ...prev.exercise,
                          yesterday: { ...prev.exercise.yesterday, duration: e.target.value }
                        }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Type of exercise"
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
                    placeholder="How many ounces?"
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
                  <span className="text-gray-700">Exercise</span>
                </label>
                {newReading.exercise.today.done && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Duration (minutes)"
                      value={newReading.exercise.today.duration || ''}
                      onChange={e => setNewReading(prev => ({
                        ...prev,
                        exercise: {
                          ...prev.exercise,
                          today: { ...prev.exercise.today, duration: e.target.value }
                        }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Type of exercise"
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
                  </div>
                )}
              </div>

              {/* Food */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newReading.food?.consumed}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      food: { ...prev.food, consumed: e.target.checked }
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Food</span>
                </label>
                {newReading.food?.consumed && (
                  <input
                    type="text"
                    placeholder="What did you eat?"
                    value={newReading.food?.details || ''}
                    onChange={e => setNewReading(prev => ({
                      ...prev,
                      food: { ...prev.food, details: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                )}
              </div>
            </div>
          </div>
