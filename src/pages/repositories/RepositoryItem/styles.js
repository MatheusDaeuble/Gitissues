import { StyleSheet } from 'react-native';
import { general, metrics, colors} from 'styles';

const styles = StyleSheet.create({
  container:{
    ...general.box,
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
  },

  name:{
    color:colors.darker,
    fontWeight: 'bold',
    fontSize: 16,
  },

  organization:{
    color: colors.regular,
    fontSize: 12,
  },

  info:{
    marginLeft: metrics.baseMargin
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
