import {NativeModules} from 'react-native';
import {
  getCalls,
  addCall,
  saveCalls,
  getLastCallSync,
  setLastCallSync,
  addPayment,
} from '../store/storage';

import CallLogs from 'react-native-call-log';

export {addPayment};

export const syncCallLog = async () => {
  try {
    let systemCalls = [];

    if (CallLogs) {
      const calls = await CallLogs.load(100);
      if (calls && Array.isArray(calls)) {
        systemCalls = calls.map(call => ({
          id: `call_${call.dateTimestamp || Date.now()}`,
          name: call.name || call.phoneNumber || 'Unknown',
          phone: call.phoneNumber || '',
          type: mapCallType(call.type),
          duration: call.duration || 0,
          timestamp: call.dateTimestamp || Date.now(),
          status: 'pending',
        }));
      }
    } else {
      console.log('CallLog native module not available - using mock');
      systemCalls = getMockCalls();
    }

    const lastSync = getLastCallSync();
    const existingCalls = getCalls();

    const newCalls = systemCalls.filter(sc => {
      if (sc.timestamp <= lastSync) {
        return false;
      }
      const exists = existingCalls.some(
        ec => ec.phone === sc.phone && ec.timestamp === sc.timestamp,
      );
      return !exists;
    });

    if (newCalls.length > 0) {
      const allCalls = [...newCalls, ...existingCalls];
      saveCalls(allCalls);

      const latestTimestamp = Math.max(...newCalls.map(c => c.timestamp));
      setLastCallSync(latestTimestamp);
    }

    return newCalls.length;
  } catch (error) {
    console.error('Error syncing call log:', error);
    return 0;
  }
};

const mapCallType = type => {
  const typeStr = String(type).toLowerCase();
  if (typeStr === 'incoming' || typeStr === '1') {
    return 'INCOMING';
  }
  if (typeStr === 'outgoing' || typeStr === '2') {
    return 'OUTGOING';
  }
  if (typeStr === 'missed' || typeStr === '3') {
    return 'MISSED';
  }
  return 'INCOMING';
};

const getMockCalls = () => {
  const now = Date.now();
  return [
    {
      id: `call_${now - 60000}`,
      name: 'Demo Contact',
      phone: '+919999999999',
      type: 'INCOMING',
      duration: 45,
      timestamp: now - 60000,
      status: 'pending',
    },
  ];
};

export const promoteCallToLead = call => {
  return {
    id: `lead_${Date.now()}`,
    name: call.name,
    phone: call.phone,
    createdAt: Date.now(),
    note: '',
    inPayments: false,
  };
};

export const syncCallLogBackground = async () => {
  try {
    let systemCalls = [];

    if (CallLogs) {
      const calls = await CallLogs.load(10);
      if (calls && Array.isArray(calls)) {
        systemCalls = calls.map(call => ({
          id: `call_${call.dateTimestamp || Date.now()}`,
          name: call.name || call.phoneNumber || 'Unknown',
          phone: call.phoneNumber || '',
          type: mapCallType(call.type),
          duration: call.duration || 0,
          timestamp: call.dateTimestamp || Date.now(),
          status: 'pending',
        }));
      }
    }

    if (systemCalls.length === 0) {
      return 0;
    }

    const lastSync = getLastCallSync();
    const existingCalls = getCalls();

    const newCalls = systemCalls.filter(sc => {
      if (sc.timestamp <= lastSync) {
        return false;
      }
      const exists = existingCalls.some(
        ec => ec.phone === sc.phone && ec.timestamp === sc.timestamp,
      );
      return !exists;
    });

    if (newCalls.length > 0) {
      const allCalls = [...newCalls, ...existingCalls];
      saveCalls(allCalls);

      const latestTimestamp = Math.max(...newCalls.map(c => c.timestamp));
      setLastCallSync(latestTimestamp);
    }

    return newCalls.length;
  } catch (error) {
    console.error('Background sync error:', error);
    return 0;
  }
};