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
        contentContainerStyle={filteredPayments.length === 0 && styles.emptyContainer}
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
    padding: spacing[3],
    gap: spacing[2],
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing[2],
    borderRadius: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    flexGrow: 1,
  },
});