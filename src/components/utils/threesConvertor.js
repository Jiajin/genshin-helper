const getMostLow = (all) => {
  let maximumNumberOfLow =
    Number(all.low) +
    Number(all.medium) * 3 +
    Number(all.high) * 9 +
    Number(all.max) * 27;

  return maximumNumberOfLow;
};

const getMostMax = (showMax, all) => {
  let result = {
    low: 0,
    medium: 0,
    high: 0,
    max: 0,
  };
  if (showMax){
    result.max = parseInt(all / 27, 10);
    result.high = parseInt((all - result.max * 27) / 9, 10);
    result.medium = parseInt((all - result.max * 27 - result.high * 9) / 3, 10);
    result.low = all % 3;
  } else{
    result.high = parseInt(all  / 9, 10);
    result.medium = parseInt((all -  result.high * 9) / 3, 10);
    result.low = all % 9;
  }
  return result;
};

const sum = (one, two) => {
  return {
    low: one.low + two.low,
    medium: one.medium + two.medium,
    high: one.high + two.high,
    max: one.max + two.max,
  };
};

const minus = (one, two) => {
  console.log(one);
  console.log(two);
  return {
    low: one.low - two.low,
    medium: one.medium - two.medium,
    high: one.high - two.high,
    max: one.max - two.max,
  };
};

module.exports = {
  getMostLow,
  getMostMax,
  sum,
  minus,
};
