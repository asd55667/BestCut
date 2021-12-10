import {
  AudioTrack,
  VideoTrack,
  StickerTrack,
  EffectTrack,
  TextTrack,
  FilterTrack,
} from '@/logic/track';

export const videoList = [
  // [new FilterTrack({ name: '原生', duration: '03:00', offset: 150 })],
  // [
  //   new TextTrack({ name: '默认文本1', duration: '02:00', offset: 300 }),
  //   new TextTrack({ name: '默认文本2', duration: '03:00', offset: 150 }),
  //   new TextTrack({ name: '默认文本3', duration: '04:00', offset: 400 }),
  //   new TextTrack({ name: '默认文本4', duration: '01:30', offset: 100 }),
  // ],
  // [new EffectTrack({ name: '渐渐放大', duration: '03:00', offset: 450 })],
  // [new EffectTrack({ name: '渐渐放大', duration: '03:00', offset: 450 })],
  // [new StickerTrack({ duration: '03:00', sticker: '123', offset: 150 })],

  [new VideoTrack({ name: 'bbb.mp4', duration: '00:10:34:17', src: '/media/bbb.mp4' })],
  [new VideoTrack({ name: 'bbb.mp4', duration: '00:10:34:17', src: '/media/bbb.mp4' })],
  [new VideoTrack({ name: 'bbb.mp4', duration: '00:10:34:17', src: '/media/bbb.mp4' })],
];

export const mainList = [
  new VideoTrack({ name: 'aaa.mp4', duration: '00:05:30:20', src: '/media/bbb.mp4' }),
  new VideoTrack({ name: 'bbb.mp4', duration: '00:10:34:17', src: '/media/bbb.mp4' }),
  new VideoTrack({ name: 'ccc.mp4', duration: '00:05:30:20', src: '/media/bbb.mp4' }),
  new VideoTrack({ name: 'ddd.mp4', duration: '00:10:34:17', src: '/media/bbb.mp4' }),
  new VideoTrack({ name: 'eee.mp4', duration: '00:05:30:20', src: '/media/bbb.mp4' }),
  new VideoTrack({ name: 'fff.mp4', duration: '00:10:34:17', src: '/media/bbb.mp4' }),
  new VideoTrack({ name: 'ggg.mp4', duration: '00:05:30:20', src: '/media/bbb.mp4' }),
  new VideoTrack({ name: 'hhh.mp4', duration: '00:10:34:17', src: '/media/bbb.mp4' }),
];

export const audioList = [
  [new AudioTrack({ name: 'aaa.aac', duration: '00:10:34:17', src: '', offset: 200 })],
  [
    new AudioTrack({ name: 'bbb.aac', duration: '00:05:30:20', src: '', offset: 300 }),
    new AudioTrack({ name: 'ccc.aac', duration: '00:10:34:17', src: '', offset: 150 }),
    new AudioTrack({ name: 'ddd.aac', duration: '00:05:30:20', src: '', offset: 100 }),
  ],
];
