import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {LeadCard} from '../components/LeadCard';
import {NoteModal} from '../components/NoteModal';
import {EditNameModal} from '../components/EditNameModal';
import {EmptyState} from '../components/EmptyState';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';
import {getLeads, updateLead, updateLeadName, deleteLead} from '../store/storage';
import {addPayment} from '../utils/callLogSync';

export const LeadsScreen = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
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
    setNoteModalVisible(true);
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

  const handleEditPress = lead => {
    setSelectedLead(lead);
    setEditNameModalVisible(true);
  };

  const handleNameSave = newName => {
    if (selectedLead && newName) {
      updateLeadName(selectedLead.id, newName);
      loadLeads();
    }
  };

  const handleDelete = lead => {
    Alert.alert(
      'Delete Lead',
      `Are you sure you want to delete "${lead.name || lead.phone}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteLead(lead.id);
            loadLeads();
          },
        },
      ],
    );
  };

  const renderItem = useCallback(
    ({item}) => (
      <LeadCard
        lead={item}
        onNotePress={handleNotePress}
        onEditPress={handleEditPress}
        onDelete={handleDelete}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search leads..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
            selectionColor={colors.accent}
          />
        </View>
      </View>
      <FlatList
        data={filteredLeads}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          filteredLeads.length === 0 && styles.emptyContainer,
        ]}
        ListEmptyComponent={
          <EmptyState message="No leads yet. Promote calls to create leads." />
        }
      />
      <NoteModal
        visible={noteModalVisible}
        note={selectedLead?.note || ''}
        onSave={handleNoteSave}
        onClose={() => {
          setNoteModalVisible(false);
          setSelectedLead(null);
        }}
      />
      <EditNameModal
        visible={editNameModalVisible}
        name={selectedLead?.name || ''}
        onSave={handleNameSave}
        onClose={() => {
          setEditNameModalVisible(false);
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
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.background,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing[3],
    height: 48,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    padding: 0,
  },
  listContent: {
    paddingBottom: spacing[4],
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});