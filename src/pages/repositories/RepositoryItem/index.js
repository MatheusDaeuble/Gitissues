import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { View, Text, Image,TouchableOpacity, Avatar } from 'react-native';
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RepositoryItem extends Component {

  render(){
    const repository = this.props.repository
    return (
      <TouchableOpacity onPress={this.props.openIssues} style={styles.container}>
        <Image style={styles.avatar} source={{uri: repository.avatar}}/>
        <View style={styles.info}>
          <Text style={styles.name}>{repository.name}</Text>
          <Text style={styles.organization}>{repository.organization}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="chevron-right" size={20} style={styles.icon}></Icon>
        </View>
      </TouchableOpacity>
    );
  }

  PropTypes = {
    repository: PropTypes.shape({
      name: PropTypes.String,
      id: PropTypes.number,
      organization: PropTypes.String,
      avatar: PropTypes.String,
    }).isRequired,
  };
}

