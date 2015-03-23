/* JavaScript Boilerplate main scripting file *
 * @version 1.0.0
 * GIT URL - https://github.com/tetrashine/labt
 * Author - Louis Zheng
 */

(function (global, undefined) {
	var version = 'v1.0',
		_labt = global.labt,
		labt = function (webid, properties) {
	        if ( global === this ) {
	            return new labt(webid, properties);
	        }
			
			this.init(webid, properties);
	        return this;
	    };

    labt.fn = labt.prototype = {
    	_version: version,
    	_defaults: {
    		cookieName: 'labt-user-id',
			endpoint: 'dummy/stubend.json',
			webid: '',
			userid: ''
		},

    	init: function (webid, opts) {

			var response, userid,
				options = this.options = extend(this._defaults, opts),
				cookieName = options.cookieName;
			options.webid = webid;

			//check if valid webid
			if (webid) {
				//check if new user, if yes, assign id
				userid = options.userid = getCookie(cookieName);
				
				ajax(options.endpoint, {
					webid: webid,
					userid: userid
				}, function(responseText) {
					response = JSON.parse(responseText);

					if (parseResponse(response) && response.success) {

						if (userid === undefined || response.userid !== userid) {
							//store id into cookie
							userid = options.userid = response.userid;
							setCookie(cookieName, userid);
						}

						//perform the actions from response
						log('pending actions');
					} else {
						//log error
						log(response.error || 'Invalid response');
					}
				});
			}
    	},

    	getVersion: function () {
    		return this._version;
    	}
    };

    //logging
    function log (text) {
    	console.log(text);
    }

    //javascript object types
    var objectTypes = {
    	Array: 'array',
    	Boolean: 'boolean',
    	String: 'string',
    	Number: 'number',
    	Object: 'object'
    };

    //check response from server
    function parseResponse (response) {
    	var variable,
    		ret = true,
    		variables = {
	    		success: objectTypes.Boolean,
	    		error: objectTypes.String,
	    		userid: objectTypes.Number,
	    		action: objectTypes.Object
	    	};

    	for (variable in response) {
    		if (!variables[variable] || typeof response[variable] !== variables[variable]) {
    			ret = false;
    		}
    	}

    	return ret;
    }

    //cross-browser ajax call
    function ajax (url, opts, callback) {
	    var xmlhttp;

	    if (window.XMLHttpRequest) {
	        // code for IE7+, Firefox, Chrome, Opera, Safari
	        xmlhttp = new XMLHttpRequest();
	    } else {
	        // code for IE6, IE5
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4) {
				if(xmlhttp.status == 200){
					callback(xmlhttp.responseText);
				} else if(xmlhttp.status == 400) {
					log('There was an error 400');
				} else {
					log('something else other than 200 was returned');
				}
	        }
	    };

	    xmlhttp.open("GET", url, true);
	    xmlhttp.send(opts);

	    return xmlhttp.responseText;
	}

	//extend object with 2nd object
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

	//set variable in cookies
	function setCookie (name, value, expires, path, domain, secure){
		cookieStr = name + "=" + escape(value) + "; ";
		
		if(expires){
			expires = setExpiration(expires);
			cookieStr += "expires=" + expires + "; ";
		}
		if(path){
			cookieStr += "path=" + path + "; ";
		}
		if(domain){
			cookieStr += "domain=" + domain + "; ";
		}
		if(secure){
			cookieStr += "secure; ";
		}
		
		document.cookie = cookieStr;
	}

	//get variable from cookies
	function getCookie (cname) {
		var name = cname + "=",
			ca = document.cookie.split(';');

	    for (var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
	    }
	    return undefined;
	}

    global.labt = labt;
})(window);
