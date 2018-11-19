import { StyleSheet } from 'react-native';
import { colors, metrics, general } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.lighter,
  },

  inputContainer : {

    flexDirection: 'row',
    marginHorizontal: 2*metrics.baseMargin,
    marginVertical: metrics.baseMargin,
    height:44,
  },

  input:{
    flex:1,
    fontSize:12,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    marginRight: metrics.baseMargin,

  },

  bar: {
    ...general.bar,
    marginHorizontal: 2*metrics.baseMargin,
  },

  icon: {
    color: colors.darker,
  },

  button:{
    height: 44,
    maxWidth:16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },
});

export default styles;
