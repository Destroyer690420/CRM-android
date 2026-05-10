import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {LeadCard} from '../components/LeadCard';
import {NoteModal} from '../components/NoteModal';
import {EmptyState} from '../components/EmptyState';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';
import {getLeads, updateLead} from '../store/storage';
import {addPayment} from '../utils/callLogSync';

export const LeadsScreen = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const loadLeads = useCallback(() => {
    const storedLeads = getLeads();
    setLeads(storedLeads);
    setFilteredLeads(storedLeads);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLeads();
    }, [loadLeads]),
  );

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredLeads(leads);
    } else {
      const query = search.toLowerCase();
      const filtered = leads.filter(
        lead =>
          (lead.name && lead.name.toLowerCase().includes(query)) ||
          (lead.phone && lead.phone.toLowerCase().includes(query)),
      );
      setFilteredLeads(filtered);
    }
  }, [search, leads]);

  const handleNotePress = lead => {
    setSelectedLead(lead);
    setModalVisible(true);
  };

  const handleNoteSave = text => {
    if (selectedLead) {
      const wasInPayments = selectedLead.inPayments;
      updateLead(selectedLead.id, {note: text});

      if (!wasInPayments && text.trim() !== '') {
        updateLead(selectedLead.id, {inPayments: true});
        addPayment({
          id: `pay_${Date.now()}`,
          leadId: selectedLead.id,
          name: selectedLead.name,
          phone: selectedLead.phone,
          status: 'not_got',
          createdAt: Date.now(),
        });
      }

      loadLeads();
    }
  };

  const renderItem = useCallback(
    ({item}) => <LeadCard lead={item} onNotePress={handleNotePress} />,
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredLeads}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={filteredLeads.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <EmptyState message="No leads yet. Promote calls to create leads." />
        }
      />
      <NoteModal
        visible={modalVisible}
        note={selectedLead?.note || ''}
        onSave={handleNoteSave}
        onClose={() => {
          setModalVisible(false);
          setSelectedLead(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: spacing[3],
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    ...typography.body,
    padding: spacing[3],
  },
  emptyContainer: {
    flexGrow: 1,
  },
});