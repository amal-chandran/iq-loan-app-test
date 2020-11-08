import sequelize, { cast } from 'sequelize';
import { Op } from 'sequelize';
import { isArray, isNumber, toLower, toNumber } from 'lodash';

export const transformKey = ({ key }) => {
  if (key.includes('$')) {
    const [operator, column] = key.split('$');
    return column;
  } else {
    return key;
  }
};

export const transformValue = ({ key, value, model }, cont) => {
  let inputData = value;
  const numberConverted = toNumber(inputData);
  const isInputNumber = isNumber(numberConverted) && !isNaN(numberConverted);
  inputData = isInputNumber ? numberConverted : inputData;

  if (key.includes('$')) {
    const [operator, column, columnType] = key.split('$');

    if (columnType === 'date') {
      inputData = sequelize.literal(`'${inputData}'::timestamptz`);
    }

    switch (operator) {
      case 'eq':
        return { [Op.eq]: inputData };
      case 'gt':
        return { [Op.gt]: inputData };
      case 'gte':
        return { [Op.gte]: inputData };
      case 'lt':
        return { [Op.lt]: inputData };
      case 'lte':
        return { [Op.lte]: inputData };
      case 'ne':
        return { [Op.ne]: inputData };
      case 'not':
        return { [Op.not]: inputData };
      case 'like':
        return { [Op.like]: `%${inputData}%` };
      case 'notLike':
        return { [Op.notLike]: `%${inputData}%` };
      case 'search':
        return { [Op.iLike]: `%${inputData}%` };
      case 'notSearch':
        return { [Op.notILike]: `%${inputData}%` };
      case 'between':
        if (isArray(inputData)) {
          return { [Op.between]: inputData };
        }
      case 'notBetween':
        if (isArray(inputData)) {
          return { [Op.notBetween]: inputData };
        }
      case 'in':
        if (isArray(inputData)) {
          return { [Op.in]: inputData };
        }
      case 'notIn':
        if (isArray(inputData)) {
          return { [Op.notIn]: inputData };
        }
      default:
        return;
    }
  } else {
    return { [Op.eq]: inputData };
  }
};
