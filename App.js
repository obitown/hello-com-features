import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      location: null
    }
  }

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        this.setState({
          image: result,
        })
      }
    }
  }

  takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        this.setState({
          image: result,
        })
      }
    }
  }

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});

      if (result) {
        this.setState({
          location: result,
        })
      }
    }
  }

  render() {
    return (
      <View style={styles.container} >
        {
          this.state.image &&
          <Image
            source={{ uri: this.state.image.uri }}
            style={{ width: 200, height: 200 }} />
        }
        {
          this.state.location &&
          <MapView
            style={{ width: 300, height: 200 }}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        }

        < Button
          title='pick an image from the library'
          onPress={this.pickImage}
        />

        <Button
          title='take a photo'
          onPress={this.takePhoto}
        />

        <Button
          title='get my location'
          onPress={this.getLocation}
        />

      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
