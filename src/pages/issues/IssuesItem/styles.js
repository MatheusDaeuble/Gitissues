import { StyleSheet } from 'react-native';
import { general, metrics, colors} from 'styles';

const styles = StyleSheet.create({
  container:{
    ...general.box,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
  },

  title:{
    fontWeight: 'bold',
    fontSize: 16,
  },

  login:{
    color: colors.regular,
    fontSize: 12,
  },

  info:{
    flex:1,
    marginHorizontal: metrics.baseMargin,
  },

  avatar:{
    ...general.avatar,

  },

  iconContainer: {
    justifyContent:'center',
    marginLeft:'auto'
  },

  icon: {
    color: colors.lighter,
  },
});

export default styles;
