import { createContext } from 'react';
import { createContextualCan } from '@casl/react';

import { $in, $eq, $not, $and, createQueryTester as sift } from 'sift';

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export const conditionsMatcher = (conditions) => {
  return sift(conditions, { operations: { $in, $eq, $not, $and } });
};
