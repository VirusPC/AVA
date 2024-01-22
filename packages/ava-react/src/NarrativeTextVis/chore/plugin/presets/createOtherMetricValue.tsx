import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { getThemeColor } from '../../../theme';
import { isNumberLike } from '../../../../utils';

import type { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';

const defaultOtherMetricValueDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    color: (value, metadata, { theme, entityStyle }) =>
      getThemeColor('colorOtherValue', theme, entityStyle?.other_metric_value),
  },
  tooltip: {
    title: (value, metadata) => (isNumberLike(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createOtherMetricValue = createEntityPhraseFactory(
  'other_metric_value',
  defaultOtherMetricValueDescriptor
);
