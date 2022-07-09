// @ts-ignore
import type { RemovableRef } from '@vueuse/core';
import type { ResourceFragment } from '@/logic/resource';

type LocalMedia = {
  [key: string]: ResourceFragment[];
};

export const localMedia = useStorage<LocalMedia>('local-media', {});
