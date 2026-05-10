import {createMMKV} from 'react-native-mmkv';

const storage = createMMKV({id: 'personal-crm-storage'});

const KEYS = {
  CALLS: 'calls',
  LEADS: 'leads',
  PAYMENTS: 'payments',
  LAST_CALL_SYNC: 'lastCallSync',
};

export const getCalls = () => {
  const data = storage.getString(KEYS.CALLS);
  return data ? JSON.parse(data) : [];
};

export const saveCalls = calls => {
  storage.set(KEYS.CALLS, JSON.stringify(calls));
};

export const addCall = call => {
  const calls = getCalls();
  calls.unshift(call);
  saveCalls(calls);
};

export const removeCall = callId => {
  const calls = getCalls().filter(c => c.id !== callId);
  saveCalls(calls);
};

export const getLeads = () => {
  const data = storage.getString(KEYS.LEADS);
  return data ? JSON.parse(data) : [];
};

export const saveLeads = leads => {
  storage.set(KEYS.LEADS, JSON.stringify(leads));
};

export const addLead = lead => {
  const leads = getLeads();
  leads.unshift(lead);
  saveLeads(leads);
};

export const updateLead = (leadId, updates) => {
  const leads = getLeads().map(lead =>
    lead.id === leadId ? {...lead, ...updates} : lead,
  );
  saveLeads(leads);
};

export const removeLead = leadId => {
  const leads = getLeads().filter(l => l.id !== leadId);
  saveLeads(leads);
};

export const deleteLead = leadId => {
  const leads = getLeads().filter(l => l.id !== leadId);
  saveLeads(leads);
};

export const updateLeadName = (leadId, newName) => {
  const leads = getLeads().map(lead =>
    lead.id === leadId ? {...lead, name: newName} : lead,
  );
  saveLeads(leads);
};

export const getPayments = () => {
  const data = storage.getString(KEYS.PAYMENTS);
  return data ? JSON.parse(data) : [];
};

export const savePayments = payments => {
  storage.set(KEYS.PAYMENTS, JSON.stringify(payments));
};

export const addPayment = payment => {
  const payments = getPayments();
  payments.unshift(payment);
  savePayments(payments);
};

export const updatePaymentStatus = (paymentId, status) => {
  const payments = getPayments().map(p =>
    p.id === paymentId ? {...p, status} : p,
  );
  savePayments(payments);
};

export const removePayment = paymentId => {
  const payments = getPayments().filter(p => p.id !== paymentId);
  savePayments(payments);
};

export const getLastCallSync = () => {
  return storage.getNumber(KEYS.LAST_CALL_SYNC) || 0;
};

export const setLastCallSync = timestamp => {
  storage.set(KEYS.LAST_CALL_SYNC, timestamp);
};

export const clearAllData = () => {
  storage.remove(KEYS.CALLS);
  storage.remove(KEYS.LEADS);
  storage.remove(KEYS.PAYMENTS);
  storage.remove(KEYS.LAST_CALL_SYNC);
};