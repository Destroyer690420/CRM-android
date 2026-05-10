import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing} from '../theme/spacing';

export const EmptyState = ({message = 'Nothing here yet'}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.circleLarge} />
        <View style={styles.circleSmall} />
        <Text style={styles.iconText}>∅</Text>
      </View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  iconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  circleLarge: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  circleSmall: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    opacity: 0.5,
  },
  iconText: {
    fontSize: 40,
    color: colors.textSecondary,
    fontWeight: '200',
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 240,
  },
});