import React, {Component} from 'react';
import { FlatList,AsyncStorage, ActivityIndicator, View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import api from 'services/api'
import RepositoryItem from './RepositoryItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '/styles'

StatusBar.setBarStyle("light-content");

export default class Repositories extends Component {
  static navigationOptions ={
    title: 'GitIssues',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    username:'',
    loading: false,
    errorMessage:null,
    data: [],
    refreshing:false,
  }

  componentDidMount(){
    this.loadRepositories();
  }

  refreshRepositories = async () => {
    let repositories = await AsyncStorage.getItem('@Githuber:repositories')
    repositories = JSON.parse(repositories)
    let repositoriesRefreshing = [];
    for (var i in repositories){
      let repo = await this.refreshRepository(repositories[i].id)
      repositoriesRefreshing.push(repo)
    }

    await AsyncStorage.setItem('@Githuber:repositories', repositoriesRefreshing);

  }

  loadRepositories = async () => {
    this.setState({ refreshing : false})
    let repositories = await AsyncStorage.getItem('@Githuber:repositories')
    repositories = JSON.parse(repositories)
    this.setState({ data: repositories===null ? [] : repositories, loading: false, refreshing: false })
  }

  openIssues= (id, title) => {
    this.props.navigation.navigate('Issues', {repositoryId: id, title:title})
  }

  addRepositoryInStorage = async (newRepository) => {
    let repositories = await AsyncStorage.getItem('@Githuber:repositories')
    repositories = JSON.parse(repositories)

    repositories = repositories===null ?  [newRepository] : [...repositories, newRepository];

    await AsyncStorage.setItem('@Githuber:repositories', JSON.stringify(repositories));
  }

  renderListItem = ({ item }) => (
    <RepositoryItem key={item.id} repository={item} openIssues={() => this.openIssues(item.id, item.name)}/>
  );

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={this.renderListItem}
      onRefresh={this.refreshRepositories}
      refreshing={this.state.refreshing}
    />
  );


  signIn = async () => {
    const { username } = this.state;

    if (username.length === 0) return ;

    this.setState ({ loading:true });
    try {
      const user = await this.checkRepository(username);
      await this.addRepositoryInStorage(user);
      this.setState({data:[...this.state.data, user]})
    } catch (erro) {
      this.setState ({ loading : false, errorMessage : 'Usuário inválido' });
    }
    this.setState ({ loading : false });
  }

  refreshRepository = async (id) => {
    const url = '/repositories/' + id.toString();
    const repo = await api.get(url);
    const orgs = await api.get(repo.data.owner.organizations_url);

    return {
      id: repo.data.id,
      name: repo.data.name,
      avatar:repo.data.owner.avatar_url,
      organization: orgs.data[0] ? orgs.data[0].login : '',
    }
  }

  checkRepository = async (username) => {
    const url = '/repos/' + username;
    const user = await api.get(url);
    const orgs = await api.get(user.data.owner.organizations_url)
    return {
      id: user.data.id,
      name: user.data.name,
      avatar:user.data.owner.avatar_url,
      organization: orgs.data[0] ? orgs.data[0].login : '',
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='  Adicionar um novo repositório'
            underlineColorAndroid='rgba(0, 0, 0, 0)'
            value={this.state.username}
            onChangeText={ username => this.setState({ username }) }
            />

          <TouchableOpacity style={styles.button} onPress={ this.signIn }>
             { this.state.loading ?
              <ActivityIndicator size={16} color={colors.darker}/>
              : <Icon name="plus" size={16} style={styles.icon}></Icon>
            }
          </TouchableOpacity>
        </View>

        <View style={styles.bar}></View>
        {this.renderList()}
      </View>
    );
  }
}

// Welcome.navigationOptions ={
//   header:null,
// }
