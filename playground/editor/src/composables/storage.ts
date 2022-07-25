// @ts-ignore
import type { RemovableRef } from '@vueuse/core';
import { ResourceFragment } from '@chiulipine/resource';

type LocalMedia = {
  [key: string]: ResourceFragment[];
};

export const localMedia = useStorage<LocalMedia>('local-media', {});
