import { createCapabilityGetter } from '@gotecq/config';

export const { loadCapabilityMatrix, hasAccess } = createCapabilityGetter();