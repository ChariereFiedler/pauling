/* @flow */
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';
import type { Navigation, Poster } from 'app/types';

type Props = {|
  ...Poster,
  navigation: Navigation,
|};

class PosterCard extends Component {
  props: Props;

  onPress = () => {
    const { navigate } = this.props.navigation;
    const currentPoster = { ...this.props };

    navigate('Poster', currentPoster);
  };

  render() {
    const props = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.PosterCard}>
          <Image
            source={{ uri: props.thumbnail_url }}
            style={styles.PosterThumbnail}
          />
          <View style={styles.PosterInfos}>
            <Text
              style={styles.PosterTitle}
              numberOfLines={6}
            >
              {props.title}
            </Text>
            <Text
              style={styles.PosterAuthors}
              numberOfLines={2}
            >
              {props.authors}
            </Text>
            <Text style={styles.PosterSavedAt}>
              Saved on {props.saved_at}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PosterCard;
