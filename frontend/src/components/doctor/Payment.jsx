import React, { useState } from 'react';
import { CreditCard, Landmark, Smartphone, Save, Edit, Plus, Trash2, CheckCircle, X, Shield, QrCode, Banknote } from 'lucide-react';

const PaymentSettings = () => {
  const [paymentMethods, setPaymentMethods] = useState({
    upi: [
      { id: 1, upiId: 'john.doe@upi', isPrimary: true, verified: true },
      { id: 2, upiId: 'john@ybl', isPrimary: false, verified: true }
    ],
    bankAccounts: [
      { 
        id: 1, 
        accountNumber: '1234567890', 
        ifscCode: 'SBIN0001234', 
        bankName: 'State Bank of India', 
        accountHolderName: 'John Doe', 
        branch: 'Mumbai Main', 
        isPrimary: true 
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('upi');
  const [newUpi, setNewUpi] = useState({ upiId: '', isPrimary: false });
  const [newBank, setNewBank] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    accountHolderName: '',
    branch: '',
    isPrimary: false
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateUpi = (upiId) => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    return upiRegex.test(upiId);
  };

  const validateBank = (bankData) => {
    const errors = {};
    if (!bankData.accountHolderName.trim()) errors.accountHolderName = "Account holder name is required";
    if (!bankData.accountNumber.trim() || bankData.accountNumber.length < 9) errors.accountNumber = "Valid account number is required";
    if (!bankData.ifscCode.trim() || bankData.ifscCode.length !== 11) errors.ifscCode = "Valid IFSC code is required";
    if (!bankData.bankName.trim()) errors.bankName = "Bank name is required";
    return errors;
  };

  const addUpiMethod = () => {
    if (!newUpi.upiId) {
      setFormErrors({ upiId: "UPI ID is required" });
      return;
    }
    
    if (!validateUpi(newUpi.upiId)) {
      setFormErrors({ upiId: "Please enter a valid UPI ID" });
      return;
    }
    
    setFormErrors({});
    const updatedUpi = [...paymentMethods.upi];
    
    if (editingId) {
      const index = updatedUpi.findIndex(upi => upi.id === editingId);
      if (index !== -1) {
        if (newUpi.isPrimary) {
          updatedUpi.forEach(upi => upi.isPrimary = false);
        }
        updatedUpi[index] = { 
          ...updatedUpi[index], 
          upiId: newUpi.upiId, 
          isPrimary: newUpi.isPrimary 
        };
      }
    } else {
      if (newUpi.isPrimary) {
        updatedUpi.forEach(upi => upi.isPrimary = false);
      }
      updatedUpi.push({ 
        id: Date.now(), 
        upiId: newUpi.upiId, 
        isPrimary: newUpi.isPrimary, 
        verified: Math.random() > 0.3
      });
    }
    
    setPaymentMethods({ ...paymentMethods, upi: updatedUpi });
    setNewUpi({ upiId: '', isPrimary: false });
    setEditingId(null);
    setShowAddForm(false);
  };

  const addBankAccount = () => {
    const errors = validateBank(newBank);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    const updatedBanks = [...paymentMethods.bankAccounts];
    
    if (editingId) {
      const index = updatedBanks.findIndex(bank => bank.id === editingId);
      if (index !== -1) {
        if (newBank.isPrimary) {
          updatedBanks.forEach(bank => bank.isPrimary = false);
        }
        updatedBanks[index] = { 
          ...updatedBanks[index], 
          ...newBank 
        };
      }
    } else {
      if (newBank.isPrimary) {
        updatedBanks.forEach(bank => bank.isPrimary = false);
      }
      updatedBanks.push({ 
        id: Date.now(), 
        ...newBank 
      });
    }
    
    setPaymentMethods({ ...paymentMethods, bankAccounts: updatedBanks });
    setNewBank({
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountHolderName: '',
      branch: '',
      isPrimary: false
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const setPrimaryMethod = (id, type) => {
    const updatedMethods = { ...paymentMethods };
    if (type === 'upi') {
      updatedMethods.upi = updatedMethods.upi.map(upi => ({
        ...upi,
        isPrimary: upi.id === id
      }));
    } else {
      updatedMethods.bankAccounts = updatedMethods.bankAccounts.map(bank => ({
        ...bank,
        isPrimary: bank.id === id
      }));
    }
    setPaymentMethods(updatedMethods);
  };

  const editMethod = (id, type) => {
    setEditingId(id);
    setShowAddForm(true);
    
    if (type === 'upi') {
      const upi = paymentMethods.upi.find(u => u.id === id);
      if (upi) {
        setNewUpi({ upiId: upi.upiId, isPrimary: upi.isPrimary });
      }
    } else {
      const bank = paymentMethods.bankAccounts.find(b => b.id === id);
      if (bank) {
        setNewBank({ ...bank });
      }
    }
  };

  const deleteMethod = (id, type) => {
    if (!window.confirm("Are you sure you want to delete this payment method?")) return;
    
    const updatedMethods = { ...paymentMethods };
    if (type === 'upi') {
      updatedMethods.upi = updatedMethods.upi.filter(upi => upi.id !== id);
    } else {
      updatedMethods.bankAccounts = updatedMethods.bankAccounts.filter(bank => bank.id !== id);
    }
    setPaymentMethods(updatedMethods);
  };

  const cancelEdit = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormErrors({});
    setNewUpi({ upiId: '', isPrimary: false });
    setNewBank({
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountHolderName: '',
      branch: '',
      isPrimary: false
    });
  };

  return (
    <div className="w-screen min-h-screen text-white p-4 md:p-8 lg:p-12 xl:p-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Payment Settings
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Manage your payment methods and preferences for seamless transactions
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6 md:p-8 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex space-x-2 bg-gray-800/60 p-2 rounded-2xl mb-8 max-w-2xl mx-auto">
            <button
              onClick={() => { setActiveTab('upi'); cancelEdit(); }}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 flex-1 justify-center ${
                activeTab === 'upi' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 border border-blue-500/30 shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeTab === 'upi' ? 'bg-blue-500/20' : 'bg-gray-700/50'}`}>
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="font-medium">UPI</span>
            </button>
            <button
              onClick={() => { setActiveTab('bank'); cancelEdit(); }}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 flex-1 justify-center ${
                activeTab === 'bank' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 border border-blue-500/30 shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeTab === 'bank' ? 'bg-blue-500/20' : 'bg-gray-700/50'}`}>
                <Landmark className="w-5 h-5" />
              </div>
              <span className="font-medium">Bank Accounts</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="flex items-start space-x-4 bg-gray-800/40 p-4 rounded-xl mb-8 border border-gray-700/30">
            <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-400 font-medium">Your financial information is secure</p>
              <p className="text-gray-400 text-sm">We use bank-level encryption to protect your payment methods</p>
            </div>
          </div>

          {/* UPI Methods */}
          {activeTab === 'upi' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">UPI IDs</h2>
                  <p className="text-gray-400">Manage your UPI payment methods</p>
                </div>
                {!showAddForm && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add UPI ID</span>
                  </button>
                )}
              </div>

              {showAddForm && (
                <div className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">
                      {editingId ? 'Edit UPI ID' : 'Add New UPI ID'}
                    </h3>
                    <button 
                      onClick={cancelEdit}
                      className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-700/50 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6 mb-6">
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">UPI ID</label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={newUpi.upiId}
                        onChange={(e) => setNewUpi({ ...newUpi, upiId: e.target.value })}
                        className={`w-full bg-gray-700/50 border ${formErrors.upiId ? 'border-red-500/50' : 'border-gray-600/30'} rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all`}
                      />
                      {formErrors.upiId && <p className="text-red-400 text-sm mt-2">{formErrors.upiId}</p>}
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-gray-700/30 rounded-xl">
                      <input
                        type="checkbox"
                        checked={newUpi.isPrimary}
                        onChange={(e) => setNewUpi({ ...newUpi, isPrimary: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-700/50 focus:ring-blue-500 text-blue-500"
                      />
                      <div>
                        <label className="text-gray-300 font-medium cursor-pointer">Set as primary payment method</label>
                        <p className="text-gray-400 text-sm">This UPI ID will be used as default for transactions</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={addUpiMethod}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex-1 justify-center"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingId ? 'Update UPI ID' : 'Add UPI ID'}</span>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/30 text-gray-300 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex-1 justify-center"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {paymentMethods.upi.length === 0 && !showAddForm ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-800/40 border border-gray-700/30 rounded-2xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6">
                    <QrCode className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">No UPI IDs Added</h3>
                  <p className="text-gray-400 mb-6 max-w-md">Add your UPI ID to start receiving instant payments</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Your First UPI ID</span>
                  </button>
                </div>
              ) : !showAddForm && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paymentMethods.upi.map((upi) => (
                    <div key={upi.id} className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-6 transition-all duration-300 hover:border-gray-600/50 hover:shadow-lg group">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-3 rounded-xl">
                            <Smartphone className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold break-all mb-2">{upi.upiId}</h3>
                            <div className="flex flex-wrap items-center gap-2">
                              {upi.isPrimary && (
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                                  Primary
                                </span>
                              )}
                              {upi.verified ? (
                                <span className="flex items-center space-x-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Verified</span>
                                </span>
                              ) : (
                                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">Pending Verification</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => editMethod(upi.id, 'upi')}
                            className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {!upi.isPrimary && (
                            <button
                              onClick={() => setPrimaryMethod(upi.id, 'upi')}
                              className="text-gray-400 hover:text-gray-300 p-2 rounded-lg hover:bg-gray-500/20 transition-all duration-300"
                              title="Set as Primary"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteMethod(upi.id, 'upi')}
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bank Accounts */}
          {activeTab === 'bank' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Bank Accounts</h2>
                  <p className="text-gray-400">Manage your bank account details</p>
                </div>
                {!showAddForm && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Bank Account</span>
                  </button>
                )}
              </div>

              {showAddForm && (
                <div className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">
                      {editingId ? 'Edit Bank Account' : 'Add New Bank Account'}
                    </h3>
                    <button 
                      onClick={cancelEdit}
                      className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-700/50 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Account Holder Name</label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={newBank.accountHolderName}
                        onChange={(e) => setNewBank({ ...newBank, accountHolderName: e.target.value })}
                        className={`w-full bg-gray-700/50 border ${formErrors.accountHolderName ? 'border-red-500/50' : 'border-gray-600/30'} rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all`}
                      />
                      {formErrors.accountHolderName && <p className="text-red-400 text-sm mt-2">{formErrors.accountHolderName}</p>}
                    </div>
                    
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Account Number</label>
                      <input
                        type="text"
                        placeholder="1234567890"
                        value={newBank.accountNumber}
                        onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value.replace(/\D/g, '') })}
                        className={`w-full bg-gray-700/50 border ${formErrors.accountNumber ? 'border-red-500/50' : 'border-gray-600/30'} rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all`}
                      />
                      {formErrors.accountNumber && <p className="text-red-400 text-sm mt-2">{formErrors.accountNumber}</p>}
                    </div>
                    
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">IFSC Code</label>
                      <input
                        type="text"
                        placeholder="SBIN0001234"
                        value={newBank.ifscCode}
                        onChange={(e) => setNewBank({ ...newBank, ifscCode: e.target.value.toUpperCase() })}
                        className={`w-full bg-gray-700/50 border ${formErrors.ifscCode ? 'border-red-500/50' : 'border-gray-600/30'} rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all`}
                      />
                      {formErrors.ifscCode && <p className="text-red-400 text-sm mt-2">{formErrors.ifscCode}</p>}
                    </div>
                    
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Bank Name</label>
                      <input
                        type="text"
                        placeholder="State Bank of India"
                        value={newBank.bankName}
                        onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })}
                        className={`w-full bg-gray-700/50 border ${formErrors.bankName ? 'border-red-500/50' : 'border-gray-600/30'} rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all`}
                      />
                      {formErrors.bankName && <p className="text-red-400 text-sm mt-2">{formErrors.bankName}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="text-gray-300 text-sm font-medium mb-2 block">Branch Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="Mumbai Main"
                        value={newBank.branch}
                        onChange={(e) => setNewBank({ ...newBank, branch: e.target.value })}
                        className="w-full bg-gray-700/50 border border-gray-600/30 rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div className="md:col-span-2 flex items-center space-x-3 p-4 bg-gray-700/30 rounded-xl">
                      <input
                        type="checkbox"
                        checked={newBank.isPrimary}
                        onChange={(e) => setNewBank({ ...newBank, isPrimary: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-700/50 focus:ring-blue-500 text-blue-500"
                      />
                      <div>
                        <label className="text-gray-300 font-medium cursor-pointer">Set as primary bank account</label>
                        <p className="text-gray-400 text-sm">This account will be used as default for bank transfers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={addBankAccount}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex-1 justify-center"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingId ? 'Update Bank Account' : 'Add Bank Account'}</span>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/30 text-gray-300 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex-1 justify-center"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {paymentMethods.bankAccounts.length === 0 && !showAddForm ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-800/40 border border-gray-700/30 rounded-2xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6">
                    <Landmark className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">No Bank Accounts Added</h3>
                  <p className="text-gray-400 mb-6 max-w-md">Add your bank account to receive direct transfers</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Your First Bank Account</span>
                  </button>
                </div>
              ) : !showAddForm && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paymentMethods.bankAccounts.map((bank) => (
                    <div key={bank.id} className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-6 transition-all duration-300 hover:border-gray-600/50 hover:shadow-lg group">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-3 rounded-xl">
                            <Landmark className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{bank.bankName}</h3>
                            <p className="text-gray-300 text-sm mb-3">A/C: ••••{bank.accountNumber?.slice(-4)}</p>
                            <div className="flex flex-wrap items-center gap-2">
                              {bank.isPrimary && (
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                                  Primary
                                </span>
                              )}
                              <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">{bank.accountHolderName}</span>
                              {bank.branch && (
                                <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">{bank.branch}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => editMethod(bank.id, 'bank')}
                            className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {!bank.isPrimary && (
                            <button
                              onClick={() => setPrimaryMethod(bank.id, 'bank')}
                              className="text-gray-400 hover:text-gray-300 p-2 rounded-lg hover:bg-gray-500/20 transition-all duration-300"
                              title="Set as Primary"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteMethod(bank.id, 'bank')}
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;