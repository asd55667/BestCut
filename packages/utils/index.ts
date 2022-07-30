export * from './is';
export * from './http';
export * from './player';
export * from './image';
export * from './dom';
export * from './log';

export const noop = () => {};

export function setDPI(canvas: HTMLCanvasElement, scale: number) {
  // Set up CSS size.
  canvas.style.width = canvas.style.width || canvas.width + 'px';
  canvas.style.height = canvas.style.height || canvas.height + 'px';

  // Get size information.
  // const scaleFactor = dpi / 96;
  const scaleFactor = scale;
  const width = parseFloat(canvas.style.width);
  const height = parseFloat(canvas.style.height);

  // Backup the canvas contents.
  const oldScale = canvas.width / width;
  const backupScale = scaleFactor / oldScale;
  const backup: any = canvas.cloneNode(false);
  backup.getContext('2d').drawImage(canvas, 0, 0);

  // Resize the canvas.
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = Math.ceil(width * scaleFactor);
  canvas.height = Math.ceil(height * scaleFactor);

  // Redraw the canvas image and scale future draws.
  ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
  ctx.drawImage(backup, 0, 0);
  ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
}

export function forEachValue<T>(obj: Record<string, T>, fn: (key: string, val: T) => void) {
  return Object.keys(obj).forEach((key) => fn(key, obj[key]));
}

export function find<T>(list: T[], f: (item: T) => boolean) {
  return list.filter(f)[0];
}

export function deepCopy<T>(obj: T, cache: { original: any; copy: any }[] = []): T {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, (c) => c.original === obj);
  if (hit) return hit.copy;

  const copy = (Array.isArray(obj) ? {} : []) as T;
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy,
  });

  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    copy[key] = deepCopy<T[typeof key]>(obj[key], cache);
  });

  return copy;
}

export function swap<T>(arr: T[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

export function getShapedArrary<T, K>(lists: T[][], value: K): K[][] {
  return new Array(lists.length).fill([]).map((arr, i) => {
    return arr.concat(...new Array(lists[i].length).fill(value));
  });
}
