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
        return 'INCOMING';
      case 'OUTGOING':
        return 'OUTGOING';
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
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {call.name || 'Unknown'}
          </Text>
          <View
            style={[
              styles.typeBadge,
              {backgroundColor: getCallTypeColor(call.type) + '15'},
            ]}>
            <Text
              style={[styles.typeText, {color: getCallTypeColor(call.type)}]}>
              {getCallTypeLabel(call.type)}
            </Text>
          </View>
        </View>
        <Text style={styles.phone}>{call.phone}</Text>
        <View style={styles.footer}>
          <Text style={styles.details}>
            {formatDuration(call.duration)}
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.details}>
            {formatRelativeTime(call.timestamp)}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.tickButton]}
          onPress={() => onTick(call)}
          activeOpacity={0.7}>
          <View style={styles.tickIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.crossButton]}
          onPress={() => onCross(call.id)}
          activeOpacity={0.7}>
          <Text style={styles.crossText}>×</Text>
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
  },
  leftContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  name: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    marginRight: spacing[2],
  },
  typeBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  phone: {
    ...typography.phone,
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing[2],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  dot: {
    marginHorizontal: spacing[1],
    color: colors.textSecondary,
    opacity: 0.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing[3],
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing[2],
    borderWidth: 1,
  },
  tickButton: {
    backgroundColor: colors.success + '15',
    borderColor: colors.success + '30',
  },
  tickIcon: {
    width: 12,
    height: 8,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: colors.success,
    transform: [{rotate: '-45deg'}],
    marginTop: -2,
  },
  crossButton: {
    backgroundColor: colors.danger + '15',
    borderColor: colors.danger + '30',
  },
  crossText: {
    color: colors.danger,
    fontSize: 22,
    fontWeight: '400',
    marginTop: -2,
  },
});