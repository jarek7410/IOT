import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {ColorsTransparent} from "@/assets/ColorsTransparent";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">This application allows you to see the noise on the map</ThemedText>
        <ThemedText>
          Just change screens to see map with the colors circles!
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.stepContainer,{backgroundColor:"#000000",padding:8,borderRadius:10}]}>
        {/*<ThemedText type="subtitle">Step 2: Explore</ThemedText>*/}
          <ThemedText style={{color:ColorsTransparent.high}}>
              red - high noise level
          </ThemedText>
          <ThemedText style={{color:ColorsTransparent.medium}}>
              yellow - medium noise level
          </ThemedText>
          <ThemedText style={{color:ColorsTransparent.low}}>
              green - low noise level
          </ThemedText>
      </ThemedView>
        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">If u allow it u can send your data too!</ThemedText>
            {/*<ThemedText>Thank you for using our app!</ThemedText>*/}
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Enjoy!</ThemedText>
            <ThemedText>Thank you for using our app!</ThemedText>
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
