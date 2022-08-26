import SplitPanes from './SplitPanes.vue';
import Splitter from './Splitter.vue';
import Pane from './Pane.vue';

export const LpSplitPanes = Object.assign(SplitPanes, {
  Splitter,
  Pane,
});

export const LpPane = Pane;
export const LpSplitter = Splitter;
