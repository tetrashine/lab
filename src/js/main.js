/* JavaScript Boilerplate main scripting file *
 * @version 1.0.0
 * GIT URL - https://github.com/tetrashine/labt
 * Author - Louis Zheng
 */

(function (global, undefined) {
	var version = 1.0,
		_labt = global.labt,
		labt = function (properties) {
	        if ( global === this ) {
	            return new labt(properties);
	        }
			
			this.init(properties);
	        return this;
	    };

    labt.fn = labt.prototype = {
    	_defaults: {
			endpoint: '',
			userid: '',
			token: ''
		},

    	init: function (opts) {
			this.options = extend(this._defaults, opts);

			// check if endpoints can be reached
			// check if valid id & token
			// check if new user, if yes, assign id
			// check if current user has particpated in any campaign
			// check if which campaign user should be in
    	}
    };

    function extend () {
		var i, next, props, copy,
			target = arguments[0] || {},
			length = arguments.length;

		for (i = 1; i < length; i++) {
			next = arguments[i];

			for (props in next) {
				copy = next[props];
				
				if (copy === target && copy !== undefined) continue;

				target[props] = copy;
			}
		}

		return target;
	}

	function checkCookie () { console.log("check cookie"); }
	function getCookie (name) {

	}

    global.labt = labt;
})(window);
