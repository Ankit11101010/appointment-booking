import React, { useState } from 'react';
import { Calendar, Clock, MapPin, IndianRupee, Edit3, Trash2, Plus, Save, X, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

const Slots = () => {
  const [slots, setSlots] = useState([
    {
      id: 1,
      date: '2023-10-15',
      startTime: '09:00',
      endTime: '10:00',
      address: '123 Medical Plaza, Suite 405, Health City, Mumbai',
      fees: 750,
      status: 'available',
      maxBookings: 5,
      currentBookings: 2
    },
    {
      id: 2,
      date: '2023-10-16',
      startTime: '14:00',
      endTime: '15:00',
      address: '123 Medical Plaza, Suite 405, Health City, Mumbai',
      fees: 750,
      status: 'booked',
      maxBookings: 3,
      currentBookings: 3
    },
    {
      id: 3,
      date: '2023-10-17',
      startTime: '11:00',
      endTime: '12:00',
      address: '456 Health Avenue, Clinic No. 12, Delhi',
      fees: 850,
      status: 'available',
      maxBookings: 4,
      currentBookings: 1
    }
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    address: '123 Medical Plaza, Suite 405, Health City, Mumbai',
    fees: '',
    status: 'available',
    maxBookings: 5,
    currentBookings: 0
  });

  const [editedSlot, setEditedSlot] = useState({});

  const handleAddSlot = () => {
    if (newSlot.date && newSlot.startTime && newSlot.endTime && newSlot.fees && newSlot.maxBookings) {
      const slotToAdd = {
        ...newSlot,
        id: Math.max(...slots.map(s => s.id), 0) + 1,
        fees: parseInt(newSlot.fees),
        maxBookings: parseInt(newSlot.maxBookings)
      };
      setSlots([...slots, slotToAdd]);
      setNewSlot({
        date: '',
        startTime: '',
        endTime: '',
        address: '123 Medical Plaza, Suite 405, Health City, Mumbai',
        fees: '',
        status: 'available',
        maxBookings: 5,
        currentBookings: 0
      });
      setIsAdding(false);
    }
  };

  const handleEditSlot = (id) => {
    setIsEditing(id);
    const slotToEdit = slots.find(slot => slot.id === id);
    setEditedSlot({ ...slotToEdit });
  };

  const handleSaveEdit = (id) => {
    setSlots(slots.map(slot => slot.id === id ? { 
      ...editedSlot, 
      fees: parseInt(editedSlot.fees),
      maxBookings: parseInt(editedSlot.maxBookings)
    } : slot));
    setIsEditing(null);
    setEditedSlot({});
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedSlot({});
  };

  const handleDeleteSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      available: 'bg-green-500/20 text-green-400 border-green-500/30',
      booked: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const BookingProgress = ({ current, max }) => {
    const percentage = (current / max) * 100;
    
    return (
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Bookings: {current}/{max}</span>
          <span>{Math.round(percentage)}% filled</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              percentage < 70 ? 'bg-green-500' : 
              percentage < 90 ? 'bg-yellow-500' : 'bg-red-500'
            }`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Manage Appointment Slots</h1>
          <p className="text-gray-400">Create and manage your available time slots for patients</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-teal-500/20 mt-4 md:mt-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Slot</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Slots</p>
              <h3 className="text-2xl font-bold text-white mt-1">{slots.length}</h3>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Available Slots</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {slots.filter(slot => slot.status === 'available').length}
              </h3>
            </div>
            <div className="bg-green-500/20 p-3 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Booked Slots</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {slots.filter(slot => slot.status === 'booked').length}
              </h3>
            </div>
            <div className="bg-amber-500/20 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Slot Form */}
      {isAdding && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md border border-gray-700/30 rounded-2xl p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-teal-400" />
            Add New Time Slot
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input
                type="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
              <input
                type="time"
                value={newSlot.startTime}
                onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
              <input
                type="time"
                value={newSlot.endTime}
                onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fees (₹)</label>
              <input
                type="number"
                value={newSlot.fees}
                onChange={(e) => setNewSlot({...newSlot, fees: e.target.value})}
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                placeholder="500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Bookings</label>
              <input
                type="number"
                value={newSlot.maxBookings}
                onChange={(e) => setNewSlot({...newSlot, maxBookings: e.target.value})}
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                placeholder="5"
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">Clinic Address</label>
              <input
                type="text"
                value={newSlot.address}
                onChange={(e) => setNewSlot({...newSlot, address: e.target.value})}
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setIsAdding(false)}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleAddSlot}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-teal-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Slot</span>
            </button>
          </div>
        </div>
      )}

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <div key={slot.id} className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md border border-gray-700/30 rounded-2xl p-6 transition-all duration-300 hover:border-teal-500/30 hover:shadow-lg relative overflow-hidden">
            {/* Status badge */}
            <div className="absolute top-5 right-5">
              {getStatusBadge(slot.status)}
            </div>
            
            {/* Slot content */}
            <div className="space-y-5">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2.5 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-white font-medium text-lg">{formatDate(slot.date)}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2.5 rounded-xl">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-white text-lg font-medium">
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-amber-500/20 p-2.5 rounded-xl">
                  <IndianRupee className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-white text-lg font-medium">₹{slot.fees}</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-500/20 p-2.5 rounded-xl mt-1">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-gray-300">{slot.address}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-500/20 p-2.5 rounded-xl">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <BookingProgress current={slot.currentBookings} max={slot.maxBookings} />
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end space-x-2 mt-6 pt-5 border-t border-gray-700/30">
              {isEditing === slot.id ? (
                <>
                  <button
                    onClick={() => handleCancelEdit()}
                    className="p-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleSaveEdit(slot.id)}
                    className="p-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 transition-colors"
                  >
                    <Save className="w-4 h-4 text-teal-400" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditSlot(slot.id)}
                    className="p-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 transition-colors"
                    disabled={slot.status === 'booked'}
                  >
                    <Edit3 className="w-4 h-4 text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-colors"
                    disabled={slot.status === 'booked'}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </>
              )}
            </div>
            
            {/* Edit form (shown when editing) */}
            {isEditing === slot.id && (
              <div className="mt-5 pt-5 border-t border-gray-700/30 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Date</label>
                    <input
                      type="date"
                      value={editedSlot.date || ''}
                      onChange={(e) => setEditedSlot({...editedSlot, date: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Fees (₹)</label>
                    <input
                      type="number"
                      value={editedSlot.fees || ''}
                      onChange={(e) => setEditedSlot({...editedSlot, fees: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={editedSlot.startTime || ''}
                      onChange={(e) => setEditedSlot({...editedSlot, startTime: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">End Time</label>
                    <input
                      type="time"
                      value={editedSlot.endTime || ''}
                      onChange={(e) => setEditedSlot({...editedSlot, endTime: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Max Bookings</label>
                  <input
                    type="number"
                    value={editedSlot.maxBookings || ''}
                    onChange={(e) => setEditedSlot({...editedSlot, maxBookings: e.target.value})}
                    className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {slots.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700/30 max-w-md">
            <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold text-white mb-2">No Time Slots</h3>
            <p className="text-gray-400 mb-5">You haven't created any time slots yet. Add your availability to start accepting appointments.</p>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300"
            >
              Add New Slot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slots;