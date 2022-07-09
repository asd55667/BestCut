import { ResourceType, TrackCtorMap, Base } from '@chiulipine/const';

import { VideoTrack, TrackOption } from '@chiulipine/track';

type ItemOptional = {
  id: string;
  name: string;
  boxSize: string;

  active: boolean;
  usable: boolean; //  show download icon
  favorite: boolean; //show star icon
  showAdd: boolean; //show add icon
  checked: boolean; // star then add2collection
  referenced: boolean; // local
};

type ItemRequired = {
  type: ResourceType;
  src: string; // resource url for a/v, animated gif for the other
  thumbnail: string; // static img
  duration: string;
};

type ResourceOption = Partial<ItemOptional> & ItemRequired;

export class Resource extends Base {
  src: string;
  type: ResourceType;
  duration: string;
  thumbnail: string;

  usable = false;
  showAdd = false;
  checked = false;
  favorite = false;
  referenced = false;
  active = false;

  constructor(options: ResourceOption) {
    super(options.name, options.id);
    this.src = options.src;
    this.type = options.type;
    this.thumbnail = options.thumbnail;
    this.duration = options.duration;
    this.checked = Boolean(options.checked);
    this.referenced = Boolean(options.referenced);
  }

  getProps() {
    return undefined;
  }

  toTrack() {
    return new TrackCtorMap[this.type](this as any);
  }
}

export class VideoResource extends Resource {
  constructor(options: Omit<ResourceOption, 'type'>) {
    const _opts = { type: ResourceType.Video };
    super(Object.assign(_opts, options));
  }
  toTrack() {
    return new VideoTrack(this as TrackOption);
  }
}

type AudioOption = Omit<ResourceOption, 'type'> & { album?: string; author?: string };
export class AudioResource extends Resource {
  album: string;
  author: string;
  constructor(options: AudioOption) {
    const _opts = { type: ResourceType.Audio };
    super(Object.assign(_opts, options));
    this.album = options.album || '';
    this.author = options.author || '';
  }
}

export class PictureResource extends Resource {
  constructor(options: Omit<ResourceOption, 'type'>) {
    const _opts = { type: ResourceType.Picture };
    super(Object.assign(_opts, options));
  }
  toTrack() {
    return new VideoTrack(this as TrackOption);
  }
}

export class StickerResource extends Resource {
  constructor(options: Omit<ResourceOption, 'type'>) {
    const _opts = { type: ResourceType.Sticker };
    super(Object.assign(_opts, options));
  }
}

type AttachmentOption = Omit<ResourceOption, 'type' | 'duration'>;

export class FilterResource extends Resource {
  constructor(options: AttachmentOption) {
    const _opts = { type: ResourceType.Filter, duration: '00:03' };
    super(Object.assign(_opts, options));
  }
}

export class EffectResource extends Resource {
  constructor(options: AttachmentOption) {
    const _opts = { type: ResourceType.Effect, duration: '00:03' };
    super(Object.assign(_opts, options));
  }
}

export class TextResource extends Resource {
  constructor(options: AttachmentOption) {
    const _opts = { type: ResourceType.Text, duration: '03:03' };
    super(Object.assign(_opts, options));
  }
}

export class TransitionResource extends Resource {
  constructor(options: AttachmentOption) {
    const _opts = { type: ResourceType.Transition, duration: '00:01' };
    super(Object.assign(_opts, options));
  }
}

export interface ResourceFragment {
  name?: string;
  usable?: boolean;
  favorite?: boolean;
  showAdd?: boolean;
  list: Resource[];
}
