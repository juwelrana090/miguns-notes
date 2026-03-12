import { StyleSheet, View } from 'react-native';

import * as NavigationBar from 'expo-navigation-bar';

export default function Home() {

  const visibility = NavigationBar.useVisibility()
  console.log(visibility)
  return (
    <>
      <View style={styles.container}>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
