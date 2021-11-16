type ItemOptional = {
  active: boolean;
  usable: boolean;
  trackName: string;
  boxSize: string;
  duration: string;
  icon: any;
  sticker: string;
};

type ItemRequired = {
  start: number;
  end: number;
  width: number; // pixel
  height: number; // pixel
  offset: number; // second
  marginLeft: number; // pixel
  marginRight: number; // pixel
};

type Item = Partial<ItemOptional> & ItemRequired;

export interface AudioTrackItem extends Item {
  id: string;
  type: string;
  wave?: string;
}

export interface VideoTrackItem extends Item {
  id: string;
  type: string;
  src?: string;
  audio?: AudioTrackItem;
  cover?: string[];
}

export type TrackItem = VideoTrackItem & AudioTrackItem;
