import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import styles from './styles';

import { Card,Button,Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const IssuesItem = ({ issue }) => (
  <TouchableOpacity onPress={()=> Linking.openURL(issue.url) } style={styles.container}>
    <Image style={styles.avatar} source={{uri: issue.avatar}}/>
    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1} >{issue.title}</Text>
      <Text style={styles.login}>{issue.login}</Text>
    </View>
    <View style={styles.iconContainer}>
      <Icon name="chevron-right" size={20} style={styles.icon}></Icon>
    </View>
  </TouchableOpacity>
);


IssuesItem.propTypes = {
  issue: PropTypes.shape({
    avatar: PropTypes.String,
    title: PropTypes.String,
    login: PropTypes.String,
  }).isRequired,
};

export default IssuesItem
