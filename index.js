/**
 * @file util methods
 *
 * @author Leo Wang(leowang721@gmail.com)
 */
'use strict';

const util = {};

/**
 * Generates a random GUID legal string of the given length.
 *
 * @param {number} len 要生成串的长度
 *
 * @return {string} 指定长度的16进制数随机串
 */
function rand16Num(len) {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push('0123456789abcdef'.charAt(
      Math.floor(Math.random() * 16))
    );
  }
  return result.join('');
}

/**
 * 生成一个全局唯一的guid，且格式符合guid规范
 * GUID 的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”
 * 其中每个 x 是 0-9 或 a-f 范围内的一个32位十六进制数
 * 第四版的GUID使用了新的算法，其产生的数字是一个伪随机数。
 * 它生成的GUID的第三组数字的第一位是4
 *
 * @return {string} 符合guid格式的字符串
 */
util.guid = () => {
  let curr = (new Date()).valueOf().toString();
  return [
    '4b534c46',  // Fixed first group. my word.
    rand16Num(4),
    '4' + rand16Num(3),  // The first character of 3rd group is '4'.
    rand16Num(4),
    curr.substring(0, 12)
  ].join('-');
};

/**
 * 生成一个唯一性的unique id串，在这里认为是guid的mini版本，并不是uuid
 * 保证因素：按照时间粒度的唯一性
 * so 生成算法是在当前时间戳的基础上增加随机数的方式
 *
 * @return {string} 一个16位的随机字符串
 */
util.uid = () => {
  return [
    (new Date()).valueOf().toString().substring(0, 12),  // 取前12位
    rand16Num(4)
  ].join('');
};

module.exports = exports = util;
