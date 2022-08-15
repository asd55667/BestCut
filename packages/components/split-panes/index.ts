import SplitPanes from './SplitPanes.vue';
import Splitter from './Splitter.vue';
import Panel from './Pane.vue';

// export const Splitter = Splitter;
// export const Panel = Panel;

export const LpSplitPanes = Object.assign(SplitPanes, {
  Splitter,
  Panel,
});
