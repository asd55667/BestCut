import { describe, expect, it } from 'vitest';

import { clipDurationString } from '../src/utils/player';

describe('clipDurationString', () => {
  it('hh:mm:ss:ff to mm:ss', () => {
    expect(clipDurationString('00:16:19:21')).toMatchInlineSnapshot('"16:20"');

    expect(clipDurationString('01:16:19:21')).toMatchInlineSnapshot('"76:20"');

    expect(clipDurationString('01:16:59:21')).toMatchInlineSnapshot('"76:59"');

    expect(clipDurationString('00:00:00:12')).toMatchInlineSnapshot('"12f"');

    expect(clipDurationString('00:02:30:00')).toMatchInlineSnapshot('"02:30"');
  });
});
