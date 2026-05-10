import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing} from '../theme/spacing';

export const NoteModal = ({visible, note, onSave, onClose}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(note || '');
  }, [note, visible]);

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Note</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Add a note..."
            placeholderTextColor={colors.textSecondary}
            multiline
            autoFocus
          />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surfaceElevated,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: spacing[4],
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    ...typography.body,
    padding: spacing[3],
    minHeight: 120,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing[4],
    gap: spacing[3],
  },
  cancelButton: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  cancelText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  saveButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    borderRadius: 8,
  },
  saveText: {
    ...typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});