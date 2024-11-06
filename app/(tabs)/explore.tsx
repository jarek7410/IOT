import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, PermissionsAndroid} from 'react-native';
import MapView, {Circle, Marker, UrlTile} from 'react-native-maps';
import {ColorsTransparent} from "@/assets/ColorsTransparent";
import rnSoundLevelMonitor, {
    SoundLevelResultType
} from 'react-native-sound-level-monitor';
import soundLevelMonitor from "react-native-sound-level-monitor";


const MONITOR_INTERVAL = 500 // in ms

export default function App() {
const [state, setState] = useState([
  { position: { latitude: 50.066803, longitude: 19.914906 }, intensity: 'low' },
  { position: { latitude: 50.066803, longitude: 19.914906 + 0.002 }, intensity: 'low' },
  { position: { latitude: 50.066803, longitude: 19.914906 - 0.002 }, intensity: 'low' },
  { position: { latitude: 50.066803 + 0.002, longitude: 19.914906 }, intensity: 'low' },
  { position: { latitude: 50.066803 - 0.002, longitude: 19.914906 }, intensity: 'low' },
  { position: { latitude: 50.066803 + 0.002, longitude: 19.914906 + 0.002 }, intensity: 'low' },
  { position: { latitude: 50.066803 - 0.002, longitude: 19.914906 - 0.002 }, intensity: 'medium' },
  { position: { latitude: 50.066803 + 0.002, longitude: 19.914906 - 0.002 }, intensity: 'medium' },
  { position: { latitude: 50.066803 - 0.002, longitude: 19.914906 + 0.002 }, intensity: 'medium' },
  { position: { latitude: 50.066803 + 0.003, longitude: 19.914906 }, intensity: 'high' },
  { position: { latitude: 50.066803 - 0.003, longitude: 19.914906 }, intensity: 'high' },
]);
    const [soundLevelText, setSoundLevelText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [soundLevel, setSoundLevel] = useState(0);

    async function start_measuring() {try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'sound check level for cool people',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
                // rnSoundLevelMonitor(monitorInterval);
                // you may also specify a monitor interval (default is 250ms)
            soundLevelMonitor(250).start();
            // soundLevelMonitor().start();
            const removeThisListener = soundLevelMonitor().addListener(
                (data: SoundLevelResultType) => {
                    setSoundLevelText(data.value+" "+data);
                    console.log('new frame', data);
                }
            );
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        console.warn(err);
    }

    }
    useEffect(() => {
        return () => {
            // don't forget to stop it
            soundLevelMonitor().stop();
        }
    }, [])

return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            initialRegion={{
              latitude: 50.066833,
              longitude: 19.912806,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        >
            {state.map((point, index) => (
                <Circle
                    key={index}
                    center={point.position}
                    radius={200}
                    strokeWidth={0}
                    fillColor={point.intensity==='low'?ColorsTransparent.low:point.intensity==='medium'?ColorsTransparent.medium:ColorsTransparent.high}
                />
            ))}
            <UrlTile
                /**
                 * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
                 * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
                 */
                urlTemplate={"http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                /**
                 * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
                 * MKTileOverlay. iOS only.
                 */
                maximumZ={19}
                /**
                 * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
                 * to be used. Its default value is false.
                 */
                flipY={false}
            />
        </MapView>
          <View>

              <Text>poziom dzwiekuuuuuu{soundLevelText}</Text>
          </View>
          <Button title={"mesure"} onPress={start_measuring}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: 500,
  },
});
