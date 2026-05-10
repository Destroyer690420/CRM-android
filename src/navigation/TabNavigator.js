import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {CallsScreen} from '../screens/CallsScreen';
import {LeadsScreen} from '../screens/LeadsScreen';
import {PaymentsScreen} from '../screens/PaymentsScreen';
import {colors} from '../theme/colors';
import {getCalls} from '../store/storage';

const Tab = createBottomTabNavigator();

const TabIcon = ({name, focused, badge}) => {
  const renderIcon = () => {
    switch (name) {
      case 'Calls':
        return (
          <View style={styles.iconWrapper}>
            <View style={[styles.iconCircle, focused && styles.iconCircleActive]}>
              <View style={[styles.phoneHandle, focused && styles.iconPartActive]} />
            </View>
          </View>
        );
      case 'Leads':
        return (
          <View style={styles.iconWrapper}>
            <View style={[styles.iconSquare, focused && styles.iconSquareActive]}>
              <View style={[styles.userHead, focused && styles.iconPartActive]} />
              <View style={[styles.userBody, focused && styles.iconPartActive]} />
            </View>
          </View>
        );
      case 'Payments':
        return (
          <View style={styles.iconWrapper}>
            <View style={[styles.iconCircle, focused && styles.iconCircleActive]}>
              <Text style={[styles.currencyText, focused && styles.iconPartActive]}>$</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.tabIconContainer}>
      {renderIcon()}
      {badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
    </View>
  );
};

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
          fontWeight: '700',
          letterSpacing: 0.5,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 12,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -4},
          shadowOpacity: 0.2,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tab.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name="Calls" focused={focused} badge={callCount} />
          ),
          tabBarLabel: 'Calls',
        }}
      />
      <Tab.Screen
        name="Leads"
        component={LeadsScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon name="Leads" focused={focused} />,
          tabBarLabel: 'Leads',
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name="Payments" focused={focused} />
          ),
          tabBarLabel: 'Payments',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + '20',
  },
  iconSquare: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconSquareActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + '20',
  },
  iconPartActive: {
    backgroundColor: colors.accent,
    color: colors.accent,
  },
  phoneHandle: {
    width: 10,
    height: 4,
    borderRadius: 1,
    backgroundColor: colors.textSecondary,
    transform: [{rotate: '-45deg'}],
  },
  userHead: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textSecondary,
    marginBottom: 1,
  },
  userBody: {
    width: 10,
    height: 4,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colors.textSecondary,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textSecondary,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: colors.danger,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});