import { AbilityBuilder } from '@casl/ability';
import rolePermissions from './../configs/access-control';

export function defineAbilityFor(user) {
  const builder = new AbilityBuilder();

  if (typeof rolePermissions[user.role] === 'function') {
    rolePermissions[user.role](user, builder);
  } else {
    throw new Error(`Trying to use unknown role "${user.role}"`);
  }

  return builder.build();
}
