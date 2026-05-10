import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing} from '../theme/spacing';
import {formatDuration, formatRelativeTime} from '../utils/formatters';

export const CallItem = ({call, onTick, onCross}) => {
  const getCallTypeLabel = type => {
    switch (type) {
      case 'INCOMING':
        return 'IN';
      case 'OUTGOING':
        return 'OUT';
      case 'MISSED':
        return 'MISSED';
      default:
        return type;
    }
  };

  const getCallTypeColor = type => {
    switch (type) {
      case 'INCOMING':
        return colors.success;
      case 'OUTGOING':
        return colors.accent;
      case 'MISSED':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {call.name || 'Unknown'}
          </Text>
          <View
            style={[
              styles.typeBadge,
              {backgroundColor: getCallTypeColor(call.type) + '20'},
            ]}>
            <Text
              style={[styles.typeText, {color: getCallTypeColor(call.type)}]}>
              {getCallTypeLabel(call.type)}
            </Text>
          </View>
        </View>
        <Text style={styles.phone}>{call.phone}</Text>
        <Text style={styles.details}>
          {formatDuration(call.duration)} - {formatRelativeTime(call.timestamp)}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.tickButton]}
          onPress={() => onTick(call)}
          activeOpacity={0.7}>
          <Text style={styles.tickText}>Tick</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.crossButton]}
          onPress={() => onCross(call.id)}
          activeOpacity={0.7}>
          <Text style={styles.crossText}>X</Text>
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
  },
  leftContent: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  name: {
    ...typography.heading,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing[2],
  },
  typeBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    ...typography.caption,
    fontWeight: '600',
  },
  phone: {
    ...typography.phone,
    color: colors.textSecondary,
    marginBottom: spacing[1],
  },
  details: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing[3],
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing[2],
  },
  tickButton: {
    backgroundColor: colors.success + '20',
  },
  tickText: {
    color: colors.success,
    fontWeight: '600',
    fontSize: 14,
  },
  crossButton: {
    backgroundColor: colors.danger + '20',
  },
  crossText: {
    color: colors.danger,
    fontWeight: '600',
    fontSize: 14,
  },
});