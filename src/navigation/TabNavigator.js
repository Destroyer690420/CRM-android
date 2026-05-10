import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, StyleSheet} from 'react-native';
import {CallsScreen} from '../screens/CallsScreen';
import {LeadsScreen} from '../screens/LeadsScreen';
import {PaymentsScreen} from '../screens/PaymentsScreen';
import {colors} from '../theme/colors';
import {getCalls} from '../store/storage';

const Tab = createBottomTabNavigator();

const TabIcon = ({label, focused, badge}) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
      {label}
    </Text>
    {badge > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
      </View>
    )}
  </View>
);

export const TabNavigator = () => {
  const [callCount, setCallCount] = useState(0);

  useEffect(() => {
    const updateBadge = () => {
      const calls = getCalls();
      setCallCount(calls.length);
    };
    updateBadge();
    const interval = setInterval(updateBadge, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
          fontSize: 18,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
      }}>
      <Tab.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon label="Calls" focused={focused} badge={callCount} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon label="Leads" focused={focused} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon label="Payments" focused={focused} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tabLabelFocused: {
    color: colors.accent,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -12,
    backgroundColor: colors.danger,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});