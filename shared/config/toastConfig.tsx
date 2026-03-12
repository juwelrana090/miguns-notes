import { Text, View } from 'react-native';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#00D4AA',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: '#00D4AA',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '600',
        color: '#1a1a1a',
        fontFamily: 'Inter_600SemiBold',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#6b6b6b',
        fontFamily: 'Inter_400Regular',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#FF6B6B',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: '#FF6B6B',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '600',
        color: '#1a1a1a',
        fontFamily: 'Inter_600SemiBold',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#6b6b6b',
        fontFamily: 'Inter_400Regular',
      }}
    />
  ),
  /*
    Overwrite 'info' type,
    by modifying the existing `InfoToast` component
  */
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: '#4ECDC4',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: '#4ECDC4',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '600',
        color: '#1a1a1a',
        fontFamily: 'Inter_600SemiBold',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#6b6b6b',
        fontFamily: 'Inter_400Regular',
      }}
    />
  ),
  /*
    Custom warning toast
  */
  warning: ({ text1, text2, props }: any) => (
    <View
      style={{
        height: 70,
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderLeftColor: '#FFB800',
        borderLeftWidth: 7,
        borderRightColor: '#FFB800',
        borderRightWidth: 7,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          color: '#1a1a1a',
          fontFamily: 'Inter_600SemiBold',
          marginBottom: 4,
        }}>
        {text1}
      </Text>
      {text2 && (
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#6b6b6b',
            fontFamily: 'Inter_400Regular',
          }}>
          {text2}
        </Text>
      )}
    </View>
  ),
};
