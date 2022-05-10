// @ts-ignore
import type { RemovableRef } from '@vueuse/core';
import type { ResourceItem } from '@/logic/resource';

type LocalMedia = {
  [key: string]: ResourceItem;
};

export const localMedia = useStorage<LocalMedia>('local-media', {});
