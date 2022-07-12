import { ResourceType } from '@/enums/resource';
import { ResourceItem, PictureResource, AudioResource, VideoResource } from '@/logic/resource';

export function isPicture(resource: ResourceItem): resource is PictureResource {
  return resource.type === ResourceType.Picture;
}

export function isAudio(resource: ResourceItem): resource is AudioResource {
  return resource.type === ResourceType.Audio;
}

export function isVideo(resource: ResourceItem): resource is VideoResource {
  return resource.type === ResourceType.Video;
}
