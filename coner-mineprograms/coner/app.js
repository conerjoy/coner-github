import extend from './extend.js';
import model from './model.js';
import helper from './helper.js';
/**
 * 暂时先添加这些方法，后续需要再加
 */
export default function(options) {
  var exportObject = {};
  for (let modelKey in model) {
    exportObject[modelKey] = model[modelKey];
  }
  for (let helperKey in helper) {
    exportObject[helperKey] = helper[helperKey];
  }

  return extend(options || {}, exportObject);
}