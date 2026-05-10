import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing} from '../theme/spacing';
import {truncateText, formatRelativeTime} from '../utils/formatters';

export const PaymentItem = ({payment, onToggle, onRemove}) => {
  const isGot = payment.status === 'got';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {payment.name || 'Unknown'}
        </Text>
        <Text style={styles.phone}>{payment.phone}</Text>
        <Text style={styles.time}>
          Added {formatRelativeTime(payment.createdAt)}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={[styles.statusBadge, isGot ? styles.gotBadge : styles.notGotBadge]}
          onPress={() => onToggle(payment.id)}
          activeOpacity={0.7}>
          <Text style={[styles.statusText, isGot ? styles.gotText : styles.notGotText]}>
            {isGot ? 'Got' : 'Not Got'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(payment.id)}
          activeOpacity={0.7}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    padding: spacing[4],
    marginHorizontal: spacing[3],
    marginVertical: spacing[2],
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing[1],
  },
  phone: {
    ...typography.phone,
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing[2],
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    opacity: 0.7,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: spacing[3],
  },
  statusBadge: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: 10,
    marginBottom: spacing[2],
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 90,
    alignItems: 'center',
  },
  gotBadge: {
    backgroundColor: colors.success + '15',
    borderColor: colors.success + '30',
  },
  notGotBadge: {
    backgroundColor: colors.muted + '20',
    borderColor: colors.border,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  gotText: {
    color: colors.success,
  },
  notGotText: {
    color: colors.textSecondary,
  },
  removeButton: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
  },
  removeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.danger,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});