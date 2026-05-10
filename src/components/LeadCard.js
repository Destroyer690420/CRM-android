import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing} from '../theme/spacing';
import {truncateText} from '../utils/formatters';

export const LeadCard = ({lead, onNotePress}) => {
  const handleWhatsApp = () => {
    const cleanPhone = lead.phone.replace(/[\s\-]/g, '');
    Linking.openURL(`https://wa.me/${cleanPhone}`);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${lead.phone}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {lead.name || 'Unknown'}
        </Text>
        <Text style={styles.phone}>{lead.phone}</Text>
        {lead.note ? (
          <Text style={styles.note} numberOfLines={1}>
            {truncateText(lead.note, 40)}
          </Text>
        ) : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.whatsappBtn]}
          onPress={handleWhatsApp}
          activeOpacity={0.7}>
          <Text style={styles.actionText}>WA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.callBtn]}
          onPress={handleCall}
          activeOpacity={0.7}>
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.noteBtn]}
          onPress={() => onNotePress(lead)}
          activeOpacity={0.7}>
          <Text style={styles.actionText}>Note</Text>
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
  note: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing[3],
    gap: spacing[2],
  },
  actionBtn: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: 6,
  },
  whatsappBtn: {
    backgroundColor: colors.success + '20',
  },
  callBtn: {
    backgroundColor: colors.accent + '20',
  },
  noteBtn: {
    backgroundColor: colors.muted + '30',
  },
  actionText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});