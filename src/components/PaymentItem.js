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
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing[3],
    marginHorizontal: spacing[3],
    marginVertical: spacing[2],
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: spacing[1],
  },
  phone: {
    ...typography.phone,
    color: colors.textSecondary,
    marginBottom: spacing[1],
  },
  time: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: spacing[3],
  },
  statusBadge: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: 6,
    marginBottom: spacing[2],
  },
  gotBadge: {
    backgroundColor: colors.success + '20',
  },
  notGotBadge: {
    backgroundColor: colors.muted + '30',
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
  },
  gotText: {
    color: colors.success,
  },
  notGotText: {
    color: colors.textSecondary,
  },
  removeButton: {
    paddingVertical: spacing[1],
  },
  removeText: {
    ...typography.caption,
    color: colors.danger,
  },
});