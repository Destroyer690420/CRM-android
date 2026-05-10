import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {CallItem} from '../components/CallItem';
import {EmptyState} from '../components/EmptyState';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {getCalls, removeCall, saveCalls, addLead} from '../store/storage';
import {
  syncCallLog,
  promoteCallToLead,
} from '../utils/callLogSync';
import {
  requestCallLogPermission,
  requestAllPermissions,
  checkCallLogPermission,
  showPermissionDeniedAlert,
} from '../utils/permissions';

export const CallsScreen = () => {
  const [calls, setCalls] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const loadCalls = useCallback(() => {
    const storedCalls = getCalls();
    setCalls(storedCalls);
  }, []);

  const handleSync = useCallback(async () => {
    const permitted = await checkCallLogPermission();
    if (!permitted) {
      const results = await requestAllPermissions();
      if (!results.callLog) {
        showPermissionDeniedAlert();
        setHasPermission(false);
        return;
      }
    }
    setHasPermission(true);
    await syncCallLog();
    loadCalls();
  }, [loadCalls]);

  useFocusEffect(
    useCallback(() => {
      loadCalls();
      handleSync();
    }, [loadCalls, handleSync]),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasPermission) {
        handleSync();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [hasPermission, handleSync]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await handleSync();
    setRefreshing(false);
  }, [handleSync]);

  const handleTick = useCallback(
    call => {
      Alert.alert('Promote to Lead', `Add ${call.name || call.phone} to Leads?`, [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Add',
          onPress: () => {
            const lead = promoteCallToLead(call);
            addLead(lead);
            removeCall(call.id);
            loadCalls();
          },
        },
      ]);
    },
    [loadCalls],
  );

  const handleCross = useCallback(
    callId => {
      Alert.alert('Delete Call', 'Remove this call entry permanently?', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeCall(callId);
            loadCalls();
          },
        },
      ]);
    },
    [loadCalls],
  );

  const renderItem = useCallback(
    ({item}) => (
      <CallItem call={item} onTick={handleTick} onCross={handleCross} />
    ),
    [handleTick, handleCross],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={calls}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={calls.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <EmptyState message="No calls yet. Pull to refresh." />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flexGrow: 1,
  },
});