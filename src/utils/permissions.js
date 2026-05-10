import {Platform, PermissionsAndroid, Alert, Linking} from 'react-native';

export const requestCallLogPermission = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Permission',
        message:
          'This app needs access to your call log to display incoming, outgoing, and missed calls.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission request error:', err);
    return false;
  }
};

export const requestPhonePermission = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'Phone Permission',
        message: 'This app needs permission to make phone calls.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission request error:', err);
    return false;
  }
};

export const requestPhoneStatePermission = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: 'Phone State Permission',
        message:
          'This app needs to detect when calls end to automatically capture new call entries.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission request error:', err);
    return false;
  }
};

export const requestAllPermissions = async () => {
  const callLog = await requestCallLogPermission();
  const phone = await requestPhonePermission();
  const phoneState = await requestPhoneStatePermission();
  return {callLog, phone, phoneState};
};

export const checkCallLogPermission = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }
  return await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
  );
};

export const showPermissionDeniedAlert = () => {
  Alert.alert(
    'Permission Required',
    'Call log permission is required to display your calls. Please enable it in Settings.',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Open Settings', onPress: () => Linking.openSettings()},
    ],
  );
};