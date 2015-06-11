/**
 * @author Eric.zhu
 * @email  Eric.zhu@sz-seastar.com
 * @date   2015/6/8 0008 18:31
 */
var util = require('util');
function IPError() {

}

util.inherits(IPError,Error);

module.exports = IPError;


