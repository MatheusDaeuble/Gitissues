import { StyleSheet } from 'react-native';
import { metrics, colors, general } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.lighter,
    marginHorizontal: metrics.baseMargin*2,
  },

  filterBox:{
    ...general.box,
    marginTop:metrics.baseMargin,
    backgroundColor:colors.light,
    padding: metrics.basePadding/2,
    flexDirection: 'row',
    justifyContent:'space-around'

  },

  filter:{
    color:colors.dark,
    opacity: 0.5,
  },

  activeFilter: {
    color: colors.dark,
    fontWeight: 'bold',
  },

  loading: {
    marginTop: metrics.basePadding,
  }
});

export default styles;
