import colors from './colors';
import metrics from './metrics';

export default {
  box: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
  },

  bar: {
    height:2,
    backgroundColor:colors.light,
  },

  avatar: {
    borderRadius:50,
    width:45,
    height:45,
  },
};
