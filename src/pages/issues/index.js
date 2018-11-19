import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, FlatList, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from 'services/api'
import styles from './styles';
import IssuesItem from './IssuesItem'

export default class Issues extends Component {

  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    title: navigation.state.params.title,
    tabBarIcon: ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor}/>,
  });

  state = {
    data: [],
    loading: false,
    refreshing: false,
    filters : [
      {
        name: 'Todos',
        active: true,
        type: 'all'
      },
      {
        name: 'Abertas',
        active: false,
        type: 'open',
      },
      {
        name: 'Fechadas',
        active: false,
        type: 'closed',
      }
    ]
  }


  componentDidMount(){
    this.loadIssues();
  }

  getFilterPreference = async () => {
    let preference = await AsyncStorage.getItem('@Githuber:preference')
    console.log(preference)
    preference = JSON.parse(preference)
    return preference===null ? 'all' : preference.filter
  }

  setFilterPreference = async (value) => {
    console.log('value: ', value)
    await AsyncStorage.setItem('@Githuber:preference', JSON.stringify({filter:value}))
  }

  updateFilterBar = (type) => {
    this.state.filters.map((fil,index) => {if (fil.type===type) this.changeColorFilters(index)})
  }

  loadIssues = async () => {
    this.setState({ loading: true})
    try {
      const filterPreference = await this.getFilterPreference()
      this.updateFilterBar(filterPreference)
      console.log('FILTERPREFERENCE: ', filterPreference)
      const url = '/repositories/' + this.props.navigation.getParam('repositoryId', null) + '/issues?state=' + filterPreference;
      const response = await api.get(url);
      console.log(response.data)
      this.setState({ data: this.formatIssues(response.data), loading: false, refreshing: false })
    } catch(erro) {
      console.log(erro)
    }
  }

  formatIssues = (data) => {
    let issuesFormated = []
      data.map((issue) => issuesFormated.push({
          title:issue.title,
          login:issue.user.login,
          avatar:issue.user.avatar_url,
          state:issue.state,
          url:issue.html_url
        })
      )
    return issuesFormated
  }

  renderListItem = ({ item }) => (

    <IssuesItem issue={item} />
  );

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={this.renderListItem}
      onRefresh={this.loadIssues}
      refreshing={this.state.refreshing}
    />
  );

  filterIssues = async (index) => {
    try {
      this.changeColorFilters(index);
      console.log('..> ', this.state.filters[index].type)
      await this.setFilterPreference(this.state.filters[index].type);
      this.loadIssues();
    } catch (erro){
      console.log(erro)
    }
  }
  changeColorFilters = (index) => {
    let filters = this.state.filters
    filters.map(filter => filter.active = false)
    filters[index].active = true;
    this.setState({ filters })
  }

  render (){
    return (
      <View style={styles.container}>
      <View style={styles.filterBox}>
      {this.state.filters.map((fil, index) =>
        <TouchableOpacity key={index} onPress={()=>this.filterIssues(index)}>
          <Text key={index} style={fil.active ? styles.activeFilter: styles.filter}>{fil.name}</Text>
        </TouchableOpacity>
      )}
      </View>
        { this.state.loading ?
          <ActivityIndicator style={styles.loading} /> : this.renderList()
        }
      </View>
    );
  }
}
