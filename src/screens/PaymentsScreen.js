import React, {useState, useCallback} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {PaymentItem} from '../components/PaymentItem';
import {EmptyState} from '../components/EmptyState';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';
import {getPayments, updatePaymentStatus, removePayment} from '../store/storage';

const FILTERS = ['All', 'Not Got', 'Got'];

export const PaymentsScreen = () => {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('All');

  const loadPayments = useCallback(() => {
    const storedPayments = getPayments();
    setPayments(storedPayments);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPayments();
    }, [loadPayments]),
  );

  const filteredPayments = payments.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Got') return p.status === 'got';
    if (filter === 'Not Got') return p.status === 'not_got';
    return true;
  });

  const handleToggle = paymentId => {
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      const newStatus = payment.status === 'got' ? 'not_got' : 'got';
      updatePaymentStatus(paymentId, newStatus);
      loadPayments();
    }
  };

  const handleRemove = paymentId => {
    removePayment(paymentId);
    loadPayments();
  };

  const renderItem = useCallback(
    ({item}) => (
      <PaymentItem
        payment={item}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    ),
    [],
  );

  const renderFilterTab = (tab, index) => {
    const isActive = filter === tab;
    return (
      <TouchableOpacity
        key={index}
        style={[styles.filterTab, isActive && styles.filterTabActive]}
        onPress={() => setFilter(tab)}
        activeOpacity={0.7}>
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {FILTERS.map(renderFilterTab)}
      </View>
      <FlatList
        data={filteredPayments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          filteredPayments.length === 0 && styles.emptyContainer
        ]}
        ListEmptyComponent={
          <EmptyState message="No payments yet. Add notes to leads to track payments." />
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[2],
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing[2],
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.accent + '20',
    borderColor: colors.accent,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.accent,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: spacing[4],
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});