import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing} from '../theme/spacing';
import CallIconSvg from '../../icons/call.svg';
import WhatsAppIconSvg from '../../icons/whatsapp.svg';
import NotesIconSvg from '../../icons/notes.svg';

const EditIcon = () => (
  <View style={styles.editIconContainer}>
    <Text style={styles.editIconText}>✏️</Text>
  </View>
);

export const LeadCard = ({lead, onNotePress, onEditPress, onDelete}) => {
  const handleWhatsApp = () => {
    const cleanPhone = lead.phone.replace(/[\s\-]/g, '');
    Linking.openURL(`https://wa.me/${cleanPhone}`);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${lead.phone}`);
  };

  const handleLongPress = () => {
    if (onDelete) {
      onDelete(lead);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleLongPress}
      activeOpacity={0.9}
      delayLongPress={500}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {lead.name || 'Unknown'}
            </Text>
            {lead.inPayments && (
              <View style={styles.paymentBadge}>
                <Text style={styles.paymentBadgeText}>$</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => onEditPress && onEditPress(lead)}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <EditIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.phone}>{lead.phone}</Text>

        <View style={styles.noteContainer}>
          <View style={styles.noteHeader}>
            <NotesIconSvg width={14} height={14} />
            <Text style={styles.noteLabel}>Note:</Text>
          </View>
          <Text style={styles.note} numberOfLines={3}>
            {lead.note || 'No note added'}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.whatsappBtn]}
          onPress={handleWhatsApp}
          activeOpacity={0.7}>
          <WhatsAppIconSvg width={18} height={18} />
          <Text style={[styles.actionText, {color: '#25D366'}]}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.callBtn]}
          onPress={handleCall}
          activeOpacity={0.7}>
          <CallIconSvg width={18} height={18} />
          <Text style={[styles.actionText, {color: colors.accent}]}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.noteBtn]}
          onPress={() => onNotePress(lead)}
          activeOpacity={0.7}>
          <NotesIconSvg width={18} height={18} />
          <Text style={[styles.actionText, {color: '#F59E0B'}]}>Note</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    padding: spacing[4],
    marginHorizontal: spacing[3],
    marginVertical: spacing[2],
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  content: {
    marginBottom: spacing[4],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  editIconContainer: {
    marginLeft: spacing[2],
    padding: spacing[1],
  },
  editIconText: {
    fontSize: 16,
  },
  paymentBadge: {
    backgroundColor: colors.success + '20',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing[2],
  },
  paymentBadgeText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '900',
  },
  phone: {
    ...typography.phone,
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: spacing[3],
  },
  noteContainer: {
    backgroundColor: colors.surface,
    padding: spacing[3],
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
    gap: spacing[1],
  },
  noteLabel: {
    ...typography.caption,
    color: '#F59E0B',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  note: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    borderRadius: 10,
    borderWidth: 1,
    gap: spacing[1],
  },
  whatsappBtn: {
    backgroundColor: '#25D36615',
    borderColor: '#25D36640',
  },
  callBtn: {
    backgroundColor: colors.accent + '15',
    borderColor: colors.accent + '40',
  },
  noteBtn: {
    backgroundColor: '#F59E0B15',
    borderColor: '#F59E0B40',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});