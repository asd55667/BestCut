import {
  VideoTrack,
  AudioTrack,
  StickerTrack,
  EffectTrack,
  FilterTrack,
  TransitionTrack,
} from '@chiulipine/track';
import { ResourceType } from './resource';

export enum ContainerType {
  OutSide = 'outside',
  Audio = 'audio',
  Main = 'main',
  Video = 'video',
}

export const TrackCtorMap = {
  [ResourceType.Video]: VideoTrack,
  [ResourceType.Audio]: AudioTrack,
  [ResourceType.Picture]: VideoTrack,
  [ResourceType.Sticker]: StickerTrack,
  [ResourceType.Text]: TextTrack,
  [ResourceType.Effect]: EffectTrack,
  [ResourceType.Filter]: FilterTrack,
  [ResourceType.Transition]: TransitionTrack,
};
