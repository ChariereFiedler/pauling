/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner, Text, Toast } from 'native-base';
import Camera from 'react-native-camera';
import Config from 'react-native-config';
import Reactotron from 'reactotron-react-native';

import { colors } from '../settings';
import Fetching from './Fetching';
import styles from './styles';
import type { NavigationOptions } from '../types';

type Props = {
  onValidPaulingQRCodeRead: Function,
};

type State = {
  hasReadValidQR: boolean,
}

type BarCodeData = {
  data: string,
  type: string,
};


class QRScan extends Component {

  props: Props;
  state: State;

  static navigationOptions = (): NavigationOptions => ({
    title: 'New poster',
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      hasReadValidQR: false,
    };
  }

  isValidPaulingUrl(url: string) {
    // Url segments
    const apiServerUrl = Config.API_SERVER_URL || 'http://pauling.lelab.tailordev.fr';
    const endpoint = 'posters';
    const uuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
    const pattern = `${apiServerUrl}/${endpoint}/${uuidPattern}`;

    // Build the regex
    const re = RegExp(pattern);

    // Test the url
    return re.test(url);
  }

  onBarCodeRead = (data: BarCodeData) => {

    const paulingUrl = data.data;

    if(this.isValidPaulingUrl(paulingUrl)) {
      this.setState({
        hasReadValidQR: true,
      });
      this.props.onValidPaulingQRCodeRead(paulingUrl);
    } else {
      Toast.show({
        text: 'Invalid QR code. Please try again.',
        position: 'bottom',
        buttonText: 'Dismiss'
      });
    }
  }

  render() {
    return (
      <View style={styles.QRScan}>
        {
          this.state.hasReadValidQR ?
            <Fetching />
            :
            <Camera
              style={styles.Preview}
              aspect={Camera.constants.Aspect.fill}
              onBarCodeRead={this.onBarCodeRead}
              barCodeTypes={['qr']}
            >
              <Spinner color={colors.primaryColor} />
              <Text style={styles.Processing}>
                Waiting for a Pauling QR code…
              </Text>
            </Camera>
        }
      </View>
    );
  }
}

export default QRScan;
