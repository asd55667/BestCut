<script lang="tsx">
import { useResource } from './useResource';

export default defineComponent({
  setup() {
    const { tabs, tabIndex, setTabIndex } = useResource();
    const isTabActive = (i: number) => tabIndex.value === i;

    return () => (
      <div class="tabs flex items-center pt-1 px-1 w-full">
        {tabs.value.map((tab, idx) => (
          <div
            class={[isTabActive(idx) ? 'text-[aqua]' : '', 'flex flex-col items-center mx-1 w-10']}
            onClick={() => setTabIndex(idx)}
          >
            {tab.icon}
            <span class="text-xs mt-1"> {tab.name} </span>
          </div>
        ))}
      </div>
    );
  },
});
</script>
