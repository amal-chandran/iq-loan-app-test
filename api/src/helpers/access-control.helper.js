import { AbilityBuilder, Ability } from '@casl/ability';
import rolePermissions from './../configs/access-control';
import { $in, $eq, $not, $and, createQueryTester as sift } from 'sift';
import { rulesToQuery } from '@casl/ability/extra';
import { Op } from 'sequelize';

export function defineAbilityFor(user) {
  const conditionsMatcher = (conditions) => {
    return sift(conditions, { operations: { $in, $eq, $not, $and } });
  };

  return new Ability(defineRulesFor(user), { conditionsMatcher });
}

export function defineRulesFor(user) {
  const builder = new AbilityBuilder();

  if (typeof rolePermissions[user.role] === 'function') {
    rolePermissions[user.role](user, builder);
  } else {
    throw new Error(`Trying to use unknown role "${user.role}"`);
  }

  return builder.rules;
}

function symbolize(query) {
  return JSON.parse(JSON.stringify(query), function keyToSymbol(key, value) {
    if (key[0] === '$') {
      const symbol = Op[key.slice(1)];
      this[symbol] = value;
      return;
    }

    return value;
  });
}

function ruleToSequelize(rule) {
  return rule.inverted ? { $not: rule.conditions } : rule.conditions;
}

export function toSequelizeQuery(ability, subject, action) {
  const query = rulesToQuery(ability, action, subject, ruleToSequelize);
  return query === null ? query : symbolize(query);
}

export async function accessibleBy(ability, action = 'read') {
  const query = toSequelizeQuery(ability, action, this.name);

  if (query === null) {
    // there is no accessible records, so no need to send query to db
    return [];
  }

  return this.findAll({
    where: query,
  });
}
