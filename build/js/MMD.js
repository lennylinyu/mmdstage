(function (exports) {
'use strict';

// Polyfills

if (Number.EPSILON === undefined) {

	Number.EPSILON = Math.pow(2, -52);
}

if (Number.isInteger === undefined) {

	// Missing in IE
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger

	Number.isInteger = function (value) {

		return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	};
}

//

if (Math.sign === undefined) {

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

	Math.sign = function (x) {

		return x < 0 ? -1 : x > 0 ? 1 : +x;
	};
}

if (Function.prototype.name === undefined) {

	// Missing in IE
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name

	Object.defineProperty(Function.prototype, 'name', {

		get: function get() {

			return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
		}

	});
}

if (Object.assign === undefined) {

	// Missing in IE
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

	(function () {

		Object.assign = function (target) {

			'use strict';

			if (target === undefined || target === null) {

				throw new TypeError('Cannot convert undefined or null to object');
			}

			var output = Object(target);

			for (var index = 1; index < arguments.length; index++) {

				var source = arguments[index];

				if (source !== undefined && source !== null) {

					for (var nextKey in source) {

						if (Object.prototype.hasOwnProperty.call(source, nextKey)) {

							output[nextKey] = source[nextKey];
						}
					}
				}
			}

			return output;
		};
	})();
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * Created by on 2017/3/23.
 */
var Matrix2D = function () {
    function Matrix2D(a, b, c, d, tx, ty) {
        classCallCheck(this, Matrix2D);

        this.setValues(a, b, c, d, tx, ty);
    }

    createClass(Matrix2D, [{
        key: "setValues",
        value: function setValues(a, b, c, d, tx, ty) {
            this.a = a == null ? 1 : a;
            this.b = b || 0;
            this.c = c || 0;
            this.d = d == null ? 1 : d;
            this.tx = tx || 0;
            this.ty = ty || 0;
            return this;
        }
    }, {
        key: "append",
        value: function append(a, b, c, d, tx, ty) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                this.a = a1 * a + c1 * b;
                this.b = b1 * a + d1 * b;
                this.c = a1 * c + c1 * d;
                this.d = b1 * c + d1 * d;
            }
            this.tx = a1 * tx + c1 * ty + this.tx;
            this.ty = b1 * tx + d1 * ty + this.ty;
            return this;
        }
    }, {
        key: "prepend",
        value: function prepend(a, b, c, d, tx, ty) {
            var a1 = this.a;
            var c1 = this.c;
            var tx1 = this.tx;

            this.a = a * a1 + c * this.b;
            this.b = b * a1 + d * this.b;
            this.c = a * c1 + c * this.d;
            this.d = b * c1 + d * this.d;
            this.tx = a * tx1 + c * this.ty + tx;
            this.ty = b * tx1 + d * this.ty + ty;
            return this;
        }
    }, {
        key: "appendMatrix",
        value: function appendMatrix(matrix) {
            return this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        }
    }, {
        key: "prependMatrix",
        value: function prependMatrix(matrix) {
            return this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        }
    }, {
        key: "appendTransform",
        value: function appendTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (rotation % 360) {
                var r = rotation * Matrix2D.DEG_TO_RAD;
                var cos = Math.cos(r);
                var sin = Math.sin(r);
            } else {
                cos = 1;
                sin = 0;
            }

            if (skewX || skewY) {
                // TODO: can this be combined into a single append operation?
                skewX *= Matrix2D.DEG_TO_RAD;
                skewY *= Matrix2D.DEG_TO_RAD;
                this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            } else {
                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }

            if (regX || regY) {
                // append the registration offset:
                this.tx -= regX * this.a + regY * this.c;
                this.ty -= regX * this.b + regY * this.d;
            }
            return this;
        }
    }, {
        key: "prependTransform",
        value: function prependTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (rotation % 360) {
                var r = rotation * Matrix2D.DEG_TO_RAD;
                var cos = Math.cos(r);
                var sin = Math.sin(r);
            } else {
                cos = 1;
                sin = 0;
            }

            if (regX || regY) {
                // prepend the registration offset:
                this.tx -= regX;
                this.ty -= regY;
            }
            if (skewX || skewY) {
                // TODO: can this be combined into a single prepend operation?
                skewX *= Matrix2D.DEG_TO_RAD;
                skewY *= Matrix2D.DEG_TO_RAD;
                this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
                this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
            } else {
                this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            return this;
        }
    }, {
        key: "rotate",
        value: function rotate(angle) {
            angle = angle * Matrix2D.DEG_TO_RAD;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            var a1 = this.a;
            var b1 = this.b;

            this.a = a1 * cos + this.c * sin;
            this.b = b1 * cos + this.d * sin;
            this.c = -a1 * sin + this.c * cos;
            this.d = -b1 * sin + this.d * cos;
            return this;
        }
    }, {
        key: "skew",
        value: function skew(skewX, skewY) {
            skewX = skewX * Matrix2D.DEG_TO_RAD;
            skewY = skewY * Matrix2D.DEG_TO_RAD;
            this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
            return this;
        }
    }, {
        key: "scale",
        value: function scale(x, y) {
            this.a *= x;
            this.b *= x;
            this.c *= y;
            this.d *= y;
            //this.tx *= x;
            //this.ty *= y;
            return this;
        }
    }, {
        key: "translate",
        value: function translate(x, y) {
            this.tx += this.a * x + this.c * y;
            this.ty += this.b * x + this.d * y;
            return this;
        }
    }, {
        key: "identity",
        value: function identity() {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this;
        }
    }, {
        key: "invert",
        value: function invert() {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            var tx1 = this.tx;
            var n = a1 * d1 - b1 * c1;

            this.a = d1 / n;
            this.b = -b1 / n;
            this.c = -c1 / n;
            this.d = a1 / n;
            this.tx = (c1 * this.ty - d1 * tx1) / n;
            this.ty = -(a1 * this.ty - b1 * tx1) / n;
            return this;
        }
    }, {
        key: "isIdentity",
        value: function isIdentity() {
            return this.tx === 0 && this.ty === 0 && this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1;
        }
    }, {
        key: "equals",
        value: function equals(matrix) {
            return this.tx === matrix.tx && this.ty === matrix.ty && this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d;
        }
    }, {
        key: "transformPoint",
        value: function transformPoint(x, y, pt) {
            pt = pt || {};
            pt.x = x * this.a + y * this.c + this.tx;
            pt.y = x * this.b + y * this.d + this.ty;
            return pt;
        }
    }, {
        key: "decompose",
        value: function decompose(target) {
            // TODO: it would be nice to be able to solve for whether the matrix can be decomposed into only scale/rotation even when scale is negative
            if (target == null) {
                target = {};
            }
            target.x = this.tx;
            target.y = this.ty;
            target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
            target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);

            var skewX = Math.atan2(-this.c, this.d);
            var skewY = Math.atan2(this.b, this.a);

            var delta = Math.abs(1 - skewX / skewY);
            if (delta < 0.00001) {
                // effectively identical, can use rotation:
                target.rotation = skewY / Matrix2D.DEG_TO_RAD;
                if (this.a < 0 && this.d >= 0) {
                    target.rotation += target.rotation <= 0 ? 180 : -180;
                }
                target.skewX = target.skewY = 0;
            } else {
                target.skewX = skewX / Matrix2D.DEG_TO_RAD;
                target.skewY = skewY / Matrix2D.DEG_TO_RAD;
            }
            return target;
        }
    }, {
        key: "copy",
        value: function copy(matrix) {
            return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]";
        }
    }]);
    return Matrix2D;
}();

Matrix2D.DEG_TO_RAD = Math.PI / 180;
Matrix2D.identity = null;

var StageContext = function () {
    /**
     * 初始化画布宽高
     * @param width 宽
     * @param height 高
     * */
    function StageContext() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        classCallCheck(this, StageContext);

        this.setSize(width, height);
    }

    /***
     *  横竖屏
     *  @param value H 或 V
     */

    createClass(StageContext, [{
        key: "setSize",

        /**
         * 画布宽高
         * @param width 宽
         * @param height 高
         * */
        value: function setSize(width, height) {
            this._width = width;
            this._height = height;
        }
        /**
         *   "exactfit"; 高宽等于屏幕高宽
         * @private
         * @param width 当前stage宽
         * @param height 当前stage高
         * */

    }, {
        key: "_exactFit",
        value: function _exactFit(width, height) {

            return { x: 0, y: 0, width: this.width, height: this.height, scaleX: width / this.width, scaleY: height / this.height, rotation: 0 };
        }
        /**
         *   "noBorder"; 裁剪铺满
         * @private
         * @param width 当前stage宽
         * @param height 当前stage高
         * */

    }, {
        key: "_noBorder",
        value: function _noBorder(width, height) {
            var ratio = this.height / this.width;
            var scale = 1;
            if (ratio < height / width) {
                scale = height / this.height;
            } else {
                scale = width / this.width;
            }

            return { x: 0, y: 0, width: this.width * scale, height: this.height * scale, scaleX: scale, scaleY: scale, rotation: 0 };
        }

        /**
         *   "noScale"; 不缩放
         * @private
         * @param width 当前stage宽
         * @param height 当前stage高
         * */

    }, {
        key: "_noScale",
        value: function _noScale(width, height) {
            return { x: 0, y: 0, width: this.width, height: this.height, scaleX: 1, scaleY: 1, rotation: 0 };
        }
        /**
         *   "showAll";显示所有
         * @private
         * @param width 当前stage宽
         * @param height 当前stage高
         * */

    }, {
        key: "_showAll",
        value: function _showAll(width, height) {
            var ratio = this.height / this.width;
            var scale = 1;
            if (ratio < height / width) {
                scale = width / this.width;
            } else {
                scale = height / this.height;
            }

            return { x: 0, y: 0, width: this.width * scale, height: this.height * scale, scaleX: scale, scaleY: scale, rotation: 0 };
        }
        /**
         *   计算宽等stage宽比例
         * @private
         * @param width 当前stage宽
         * @param height 当前stage高
         * */

    }, {
        key: "_exactWidth",
        value: function _exactWidth(width, height) {

            var scale = 1;

            scale = width / this.width;

            return { x: 0, y: 0, width: this.width * scale, height: this.height * scale, scaleX: scale, scaleY: scale, rotation: 0 };
        }
        /**
         *   计算高等stage高比例
         * @private
         * @param width 当前stage宽
         * @param height 当前stage高
         * */

    }, {
        key: "_exactHeight",
        value: function _exactHeight(width, height) {

            var scale = 1;

            scale = height / this.height;

            return { x: 0, y: 0, width: this.width * scale, height: this.height * scale, scaleX: scale, scaleY: scale, rotation: 0 };
        }
        /**
         *   update 开始运算
           * @param stageWidth 当前stage宽
         * @param stageHeight 当前stage高
         * @param rotation 当前stage 旋转值 -180 到180
         * */

    }, {
        key: "update",
        value: function update(stageWidth, stageHeight, rotation) {
            var isH = this.type.toLocaleLowerCase() == "h";
            /**
             * 判断旋转 H V
             * */
            if (isH) {
                if (rotation != 0) {
                    var width = stageWidth,
                        height = stageHeight;
                } else {
                    var width = stageHeight,
                        height = stageWidth;
                }
            } else {
                if (rotation == 0) {
                    var width = stageWidth,
                        height = stageHeight;
                } else {
                    var width = stageHeight,
                        height = stageWidth;
                }
            }

            var obj;
            var isAling = false;
            /**
             * 处理缩放方式
             * */
            switch (this.scaleMode.toLowerCase()) {
                case "exactfit":
                    obj = this._exactFit(width, height);
                    break;
                case "noborder":
                    isAling = true;
                    obj = this._noBorder(width, height);
                    break;
                case "noscale":
                    isAling = true;
                    obj = this._noScale(width, height);
                    break;
                case "showall":
                    isAling = true;
                    obj = this._showAll(width, height);
                    break;
                case "width":
                    isAling = true;
                    obj = this._exactWidth(width, height);
                    break;
                case "height":
                    isAling = true;
                    obj = this._exactHeight(width, height);
                    break;
                default:
                    obj = { x: 0, y: 0, width: width, height: height, scaleX: 1, scaleY: 1, rotation: rotation };
                    break;

            }

            if (isH) {
                switch (rotation) {
                    case -90:
                    case 90:
                        obj.rotation = 0;
                        break;
                    default:
                        obj.rotation = -90;
                        break;
                }
            } else {
                obj.rotation = rotation;
            }
            var isRt = obj.rotation != -90 && (!isH || obj.rotation != 0);
            var rwidth = (width - obj.width) * 1;
            var rheight = (height - obj.height) * 1;
            /**
             * 处理对齐方式
             * */
            if (isAling) {
                switch (this.align.toLowerCase()) {
                    case "l":

                        obj.x = isRt ? obj.rotation != 0 ? rwidth : 0 : 0;
                        obj.y = (height - obj.height) / 2;

                        break;
                    case "t":
                        obj.x = (width - obj.width) / 2;
                        obj.y = isRt ? 0 : isH ? obj.rotation != 0 ? rheight : 0 : rheight;
                        break;
                    case "r":
                        obj.x = isRt ? width - obj.width - (obj.rotation == 0 ? 0 : rwidth) : width - obj.width;
                        obj.y = (height - obj.height) / 2;
                        break;
                    case "b":
                        obj.x = (width - obj.width) / 2;
                        obj.y = isRt ? height - obj.height : isH ? obj.rotation != 0 ? 0 : rheight : 0;
                        break;
                    case "lt":
                    case "tl":
                        obj.x = isRt ? obj.rotation != 0 ? rwidth : 0 : 0;
                        obj.y = isRt ? 0 : isH ? obj.rotation != 0 ? rheight : 0 : rheight;

                        break;
                    case "tr":
                    case "rt":
                        obj.x = isRt ? width - obj.width - (obj.rotation == 0 ? 0 : rwidth) : width - obj.width;
                        obj.y = isRt ? 0 : isH ? obj.rotation != 0 ? rheight : 0 : rheight;
                        break;
                    case "bl":
                    case "lb":
                        obj.x = isRt ? obj.rotation != 0 ? rwidth : 0 : 0;
                        obj.y = isRt ? height - obj.height : isH ? obj.rotation != 0 ? 0 : rheight : 0;
                        break;
                    case "br":
                    case "rb":
                        obj.x = isRt ? width - obj.width - (obj.rotation == 0 ? 0 : rwidth) : width - obj.width;
                        obj.y = isRt ? height - obj.height : isH ? obj.rotation != 0 ? 0 : rheight : 0;
                        break;
                    default:
                        obj.x = (width - obj.width) / 2;
                        obj.y = (height - obj.height) / 2;

                        break;
                }
            }

            /**
             * 处理旋转后的位移
             * */
            if (obj.rotation != 0) {

                var ox = obj.x;
                var oy = obj.y;

                if (obj.rotation == -90) {

                    obj.x = obj.scaleY * this.height + oy;
                    obj.y = ox;
                } else {

                    obj.y = obj.scaleX * this.width + ox; //-(this.width-obj.width)
                    obj.x = oy;
                }
            }

            obj.stageWidth = width;
            obj.stageHeight = height;
            return obj;
        }
    }, {
        key: "type",
        set: function set(value) {
            this._type = value;
        },
        get: function get() {
            return this._type;
        }
        /**
         * 对齐方式
         * @param value 默认为"" 居中
         t,靠顶
         l,靠左
         r,靠右
         b，靠底
         可以结合一起用，比如tl,tr,bl,br
         * */

    }, {
        key: "align",
        set: function set(value) {
            this._align = value;
        },
        get: function get() {
            return this._align;
        }
        /**
         * 缩放方式
         * @param value 缩放模式 默认[exactfit]
         "exactfit"; 高宽等于屏幕高宽
         "noborder"; 裁剪铺满
         "noscale"; 不缩放
         "showall"; 显示全部
         "width"; 宽度等于屏幕宽
         "height";高度等于屏幕高
         * */

    }, {
        key: "scaleMode",
        set: function set(value) {
            this._scaleMode = value;
        },
        get: function get() {
            return this._scaleMode;
        }
        /**
         * 设置画布宽
         * @param value 宽
         * */

    }, {
        key: "width",
        set: function set(value) {
            this._width = value;
        },
        get: function get() {
            return this._width;
        }
        /**
         * 设置画布高
         * @param value 高
         * */

    }, {
        key: "height",
        set: function set(value) {
            this._height = value;
        },
        get: function get() {
            return this._height;
        }
    }]);
    return StageContext;
}();
/**
 *      "exactfit"; 高宽等于屏幕高宽
 * */


StageContext.EXACT_FIT = "exactfit";

/**
 *  "noborder"; 裁剪铺满
 */
StageContext.NO_BORDER = "noborder";

/**
 *  "noscale"; 不缩放
 */
StageContext.NO_SCALE = "noscale";

/**
 *"showall"; 显示全部
 */
StageContext.SHOW_ALL = "showall";

/**
 * "width"; 宽度等于屏幕宽
 */
StageContext.WIDTH = "width";

/**
 *"height";高度等于屏幕高
 */
StageContext.HEIGHT = "height";

/**
 * Created by on 2017/4/19.
 */
var OPTS_DEFAULT = {
    width: 400,
    height: 400,
    scale: "exactfit",
    rotation: "auto",
    align: "",
    mode: "v"
};
var setStyle = function setStyle(style, mtx) {
    var n = 10000;
    var str = "matrix3d(" + (mtx.a * n | 0) / n + "," + (mtx.b * n | 0) / n + ",0,0," + (mtx.c * n | 0) / n + "," + (mtx.d * n | 0) / n + ",0,0,0,0,1,0," + (mtx.tx + 0.5 | 0) + "," + (mtx.ty + 0.5 | 0) + ",0,1)";

    // var str = "matrix3d("
    style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str;
    // var str = "matrix(" + (mtx.a*n|0)/n +","+ (mtx.b*n|0)/n +","+ (mtx.c*n|0)/n +","+ (mtx.d*n|0)/n +","+ (mtx.tx+0.5|0);
    // style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str +","+ (mtx.ty+0.5|0) +")";
    // style.MozTransform = str +"px,"+ (mtx.ty+0.5|0) +"px)";
};

var Children = function () {
    function Children(child) {
        classCallCheck(this, Children);

        this.matrix = new Matrix2D();
        this._stage = new StageContext(OPTS_DEFAULT.width, OPTS_DEFAULT.height);
        this.target = child;
    }

    createClass(Children, [{
        key: "update",
        value: function update(width, height, rotation) {
            if (this.options.rotation.toLocaleLowerCase() == "v") {
                this.target.style.display = rotation != 0 ? "none" : "block";
            }
            if (this.options.rotation.toLocaleLowerCase() == "h") {
                this.target.style.display = rotation == 0 ? "none" : "block";
            }
            if (this.options.rotation.toLocaleLowerCase() == "auto") {
                this.target.style.display = "block";
            }
            if (this.target.style.display != "block") return;

            var rect = this._stage.update(width, height, rotation);
            var matrix = new Matrix2D();
            matrix.rotate(-rect.rotation);

            matrix.tx = rect.x;
            matrix.ty = rect.y;
            matrix.scale(rect.scaleX, rect.scaleY);
            this.matrix = matrix;
            this._sendEvent(this.target, "rectangle", rect);
            setStyle(this.target.style, this.matrix);
            var o = this._parsePoint(this.options.width, this.options.height, rect.x, rect.y, rect, this.align);
            this._sendEvent(this.target, "position", o);

            this._updatChild(rect);
        }
    }, {
        key: "_sendEvent",
        value: function _sendEvent(target, type, data) {
            if (document.createEvent) {
                var e = document.createEvent("Event");
                e.initEvent(type, true, true);
                e.data = data; //{target:child,top:top,left:left,right:right,bottom:bottom}
                target.dispatchEvent(e);
            }
        }
    }, {
        key: "_parsePoint",
        value: function _parsePoint(width, height, x, y, rect, align) {

            var isH, rx, ry, left, right, top, bottom;
            if (isH) {

                switch (rect.rotation) {
                    case -90:
                    case 90:
                        left = -rect.y / rect.scaleY;
                        top = -(rect.stageHeight - rect.x) / rect.scaleX;

                        right = left + rect.stageWidth / rect.scaleX;
                        bottom = top + rect.stageHeight / rect.scaleY;
                        break;
                    case 0:

                        left = -rect.x / rect.scaleX;
                        top = -rect.y / rect.scaleY;
                        right = left + rect.stageWidth / rect.scaleX;
                        bottom = top + rect.stageHeight / rect.scaleX;

                        break;
                }
            } else {

                switch (rect.rotation) {
                    case 0:
                        top = -rect.y / rect.scaleY;
                        left = -rect.x / rect.scaleX;
                        right = left + rect.stageWidth / rect.scaleX;
                        bottom = top + rect.stageHeight / rect.scaleY;
                        break;
                    case -90:
                        top = -(rect.stageHeight - rect.x) / rect.scaleX;
                        left = -rect.y / rect.scaleY;
                        right = left + rect.stageWidth / rect.scaleX;
                        bottom = top + rect.stageHeight / rect.scaleY;
                        break;
                    case 90:
                        left = -(rect.stageWidth - rect.y) / rect.scaleY;
                        top = -rect.x / rect.scaleX;
                        right = left + rect.stageWidth / rect.scaleY;
                        bottom = top + rect.stageHeight / rect.scaleX;
                        break;
                }
            }

            rx = left + (right - left) / 2;
            ry = top + (bottom - top) / 2;
            if (align !== undefined) {

                switch (align.toLocaleLowerCase()) {

                    case "t":
                        ry = top;
                        break;
                    case "l":
                        rx = left;
                        break;
                    case "r":
                        rx = right;
                        break;
                    case "b":
                        ry = bottom;
                        break;
                    case "tl":
                    case "lt":
                        rx = left;
                        ry = top;
                        break;
                    case "tr":
                    case "rt":
                        rx = right;
                        ry = top;
                        break;
                    case "bl":
                    case "lb":
                        rx = left;
                        ry = bottom;
                        break;
                    case "rb":
                    case "br":
                        rx = right;
                        ry = bottom;
                        break;

                }

                child.style.top = ry - height / 2 + y + "px";
                child.style.left = rx - width / 2 + x + "px";
            }
            return { x: rx, y: ry, top: top, left: left, right: right, bottom: bottom };
        }
    }, {
        key: "_updatChild",
        value: function _updatChild(rect) {
            if (this.target) {
                var childNodes = this.target.childNodes;
                var x, y, align, isH, child, rx, ry, left, right, top, bottom, width, height;
                isH = this._stage.type.toLocaleLowerCase() == "h";

                for (var i = 0; i < childNodes.length; i++) {
                    child = childNodes[i];
                    if (child.getAttribute) {

                        align = child.hasAttribute("view-align") ? child.getAttribute("view-align") ? child.getAttribute("view-align") : "" : undefined;
                        width = Number(child.getAttribute("view-width")) || 0;
                        height = Number(child.getAttribute("view-height")) || 0;
                        x = Number(child.getAttribute("view-x")) || 0;
                        y = Number(child.getAttribute("view-y")) || 0;
                        var o = this._parsePoint(width, height, x, y, rect, align);

                        if (align !== undefined) {
                            child.style.top = o.y - height / 2 + y + "px";
                            child.style.left = o.x - width / 2 + x + "px";
                        }

                        if (isH) {

                            switch (rect.rotation) {
                                case -90:
                                case 90:
                                    left = -rect.y / rect.scaleY;
                                    top = -(rect.stageHeight - rect.x) / rect.scaleX;

                                    right = left + rect.stageWidth / rect.scaleX;
                                    bottom = top + rect.stageHeight / rect.scaleY;
                                    break;
                                case 0:

                                    left = -rect.x / rect.scaleX;
                                    top = -rect.y / rect.scaleY;
                                    right = left + rect.stageWidth / rect.scaleX;
                                    bottom = top + rect.stageHeight / rect.scaleX;

                                    break;
                            }
                        } else {

                            switch (rect.rotation) {
                                case 0:
                                    top = -rect.y / rect.scaleY;
                                    left = -rect.x / rect.scaleX;
                                    right = left + rect.stageWidth / rect.scaleX;
                                    bottom = top + rect.stageHeight / rect.scaleY;
                                    break;
                                case -90:
                                    top = -(rect.stageHeight - rect.x) / rect.scaleX;
                                    left = -rect.y / rect.scaleY;
                                    right = left + rect.stageWidth / rect.scaleX;
                                    bottom = top + rect.stageHeight / rect.scaleY;
                                    break;
                                case 90:
                                    left = -(rect.stageWidth - rect.y) / rect.scaleY;
                                    top = -rect.x / rect.scaleX;
                                    right = left + rect.stageWidth / rect.scaleY;
                                    bottom = top + rect.stageHeight / rect.scaleX;
                                    break;
                            }
                        }

                        rx = left + (right - left) / 2;
                        ry = top + (bottom - top) / 2;
                        if (align !== undefined) {

                            switch (align.toLocaleLowerCase()) {

                                case "t":
                                    ry = top;
                                    break;
                                case "l":
                                    rx = left;
                                    break;
                                case "r":
                                    rx = right;
                                    break;
                                case "b":
                                    ry = bottom;
                                    break;
                                case "tl":
                                case "lt":
                                    rx = left;
                                    ry = top;
                                    break;
                                case "tr":
                                case "rt":
                                    rx = right;
                                    ry = top;
                                    break;
                                case "bl":
                                case "lb":
                                    rx = left;
                                    ry = bottom;
                                    break;
                                case "rb":
                                case "br":
                                    rx = right;
                                    ry = bottom;
                                    break;

                            }

                            child.style.top = ry - height / 2 + y + "px";
                            child.style.left = rx - width / 2 + x + "px";
                        }
                        this._sendEvent(child, "position", { target: child, top: top, left: left, right: right, bottom: bottom });
                    }
                }
            }
        }
    }, {
        key: "options",
        set: function set(value) {
            this._options = value;
            if (this.target) {
                this.target.setAttribute("view-width", value.width);
                this.target.setAttribute("view-height", value.height);
                this.target.setAttribute("view-scale", value.scale);
                this.target.setAttribute("view-rotation", value.rotation);
                this.target.setAttribute("view-align", value.align);
                this.target.setAttribute("view-mode", value.mode);
            }
            this._stage.width = this.options.width;
            this._stage.height = this.options.height;
            this._stage.align = this.options.align;
            this._stage.scaleMode = this.options.scale;
            this._stage.type = value.mode;
        },
        get: function get() {
            return this._options;
        }
    }, {
        key: "matrix",
        set: function set(value) {
            this._matrix = value;
        },
        get: function get() {
            return this._matrix;
        }
    }, {
        key: "parent",
        set: function set(value) {
            this._parent = value;
        },
        get: function get() {
            return this._parent;
        }
    }, {
        key: "target",
        set: function set(value) {
            this._target = value;
            if (value) {
                value.style.position = "absolute";
                value.style.transformOrigin = value.style.WebkitTransformOrigin = value.style.msTransformOrigin = value.style.MozTransformOrigin = value.style.OTransformOrigin = "0% 0%";

                var opts = {
                    width: Number(value.getAttribute("view-width")),
                    height: Number(value.getAttribute("view-height")),
                    scale: value.getAttribute("view-scale"),
                    rotation: value.getAttribute("view-rotation"),
                    align: value.getAttribute("view-align"),
                    mode: value.getAttribute("view-mode")
                };

                for (var i in opts) {
                    if (!opts[i]) {
                        opts[i] = OPTS_DEFAULT[i];
                    }
                }

                value.style.width = opts.width + "px";
                value.style.height = opts.height + "px";
                value.style.overflow = "hidden";
                this.options = opts;
            }
        },
        get: function get() {
            return this._target;
        }
    }]);
    return Children;
}();

/**
 * Created by on 2017/4/19.
 */
var Emitter = function Emitter() {
    var _this = this;

    classCallCheck(this, Emitter);

    var delegate = document.createDocumentFragment();
    ['addEventListener', 'dispatchEvent', 'removeEventListener'].forEach(function (f) {
        return _this[f] = function () {
            return delegate[f].apply(delegate, arguments);
        };
    });
};

/**
 * Created by on 2017/3/23.
 */

var Scene = function (_Emitter) {
    inherits(Scene, _Emitter);

    function Scene() {
        classCallCheck(this, Scene);

        // console.log(this)
        var _this = possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));

        _this.init();

        return _this;
    }

    createClass(Scene, [{
        key: "init",
        value: function init() {
            // this._html =document.getElementsByTagName("html")[0];
            this._list = [];
            // if (!("orientation" in window))
            // {
            //     window.orientation = 0;
            // }

            this._orientation = window.orientation || 0;
            addEventListener("DOMContentLoaded", this._onContentLoaded.bind(this));

            addEventListener("orientationchange", this._onOrientation.bind(this));
            addEventListener("resize", this._onResize.bind(this));
        }
    }, {
        key: "_onOrientation",
        value: function _onOrientation() {

            // if (window.orientation !==undefined){
            //     this._orientation =window.orientation
            //
            // }
            // alert(window.orientation)

            // setTimeout(()=>{
            //     document.body.style.zoom=1.01;
            //     this._update()
            //     setTimeout(()=>{
            //         document.body.style.zoom=1;
            //         // alert('inner:'+window.innerWidth.toString()+'*'+window.innerHeight.toString()+' body:'+document.body.clientWidth.toString()+'*'+document.body.clientHeight.toString())
            //         // onResize(document.body.clientWidth, document.body.clientHeight,VERTICAL,ALIGN);
            //         this._update()
            //     },100);
            // },100);

            this.createTime();
        }
    }, {
        key: "_onResize",
        value: function _onResize() {

            // setTimeout(()=>{
            //     // document.body.style.zoom=1.01;
            //     // this._update()
            //     // setTimeout(()=>{
            //     //     document.body.style.zoom=1;
            //     //     // alert('inner:'+window.innerWidth.toString()+'*'+window.innerHeight.toString()+' body:'+document.body.clientWidth.toString()+'*'+document.body.clientHeight.toString())
            //     //     // onResize(document.body.clientWidth, document.body.clientHeight,VERTICAL,ALIGN);
            //     //     this._update()
            //     // },100);
            //     this._update()
            // },100);
            // if (window.orientation  === undefined)
            // {
            if (window.innerWidth < window.innerHeight) {
                this._orientation = 0;
            } else {
                this._orientation = 90;
            }
            this._onOrientation();

            // }

            this.createTime();

            // this.dispatchEvent(new Event("resize"))
            // setInterval(function () {
            //     document.head.style.zoom = 1
            //     document.style.zoom = 1
            // },100)

        }
    }, {
        key: "_onContentLoaded",
        value: function _onContentLoaded() {

            addEventListener("DOMNodeInserted", this._onInserted.bind(this));
            addEventListener("DOMNodeRemoved", this._onRemoved.bind(this));

            this._onInserted({ target: document.body });
        }
    }, {
        key: "_onRemoved",
        value: function _onRemoved(e) {
            this._removeItem(e.target);
            // console.log("remove",e.target)
        }
    }, {
        key: "_onInserted",
        value: function _onInserted(e) {

            this._checkNodes(e.target);
        }
    }, {
        key: "_checkNodes",
        value: function _checkNodes(child) {
            var childNodes = child.childNodes;

            if (child.getAttribute) {
                var isRotation = child.getAttribute("view-mode");

                if (!!isRotation) {

                    // alert(child.getAttribute("view-mode"))

                    if (!this._checkItem(child) && this._checkParent(child)) {

                        try {
                            var c = new Children(child);
                        } catch (e) {
                            // alert(e)
                        }

                        this._addItem(c);
                        // this.dispatchEvent(new Event("inserted"))
                    }
                }
            }

            for (var i = 0; i < childNodes.length; i++) {
                var c = child.childNodes[i];
                this._checkNodes(c);
            }
        }
    }, {
        key: "_checkParent",
        value: function _checkParent(child) {
            var parent = child.parentNode;

            if (parent && parent != document) {

                if (!!parent.getAttribute("view-mode")) {

                    return false;
                } else {

                    return this._checkParent(parent);
                }
            }

            return true;
        }
    }, {
        key: "_addItem",
        value: function _addItem(child) {
            this._removeItem(child);

            // var opts = {
            //     width:child.getAttribute("view-width"),
            //     height:child.getAttribute("view-height"),
            //     rotation:child.getAttribute("view-rotation"),
            //     align:child.getAttribute("view-align"),
            //     skew: child.getAttribute("view-skew")
            // }
            // Object.assign(opts,opts_default)

            this._list.push(child);
            if (window.orientation === undefined) {
                if (window.innerWidth < window.innerHeight) {
                    this._orientation = 0;
                } else {
                    this._orientation = 90;
                }
            }
            this.createTime();
        }
    }, {
        key: "_checkItem",
        value: function _checkItem(child) {
            for (var i = 0; i < this._list.length; i++) {
                if (this._list[i].target == child) {

                    return true;
                }
            }
            return false;
        }
    }, {
        key: "_removeItem",
        value: function _removeItem(child) {
            for (var i = 0; i < this._list.length; i++) {
                if (this._list[i].target == child) {
                    this._list.slice(i, 1);
                    // this.dispatchEvent(new Event("removed"))
                    return;
                }
            }
        }
    }, {
        key: "_update",
        value: function _update() {

            if (window.innerWidth < window.innerHeight) {
                this._orientation = 0;
            } else {
                this._orientation = 90;
            }
            var width = window.innerWidth;
            var height = window.innerHeight;
            for (var i = 0; i < this._list.length; i++) {
                var child = this._list[i];

                child.update(width, height, this._orientation);
            }
        }
    }, {
        key: "createTime",
        value: function createTime() {
            var _this2 = this;

            clearTimeout(this._tid);
            var tid = 0;
            this._tid = setInterval(function () {

                _this2._update();
                tid++;
                if (tid > 10) {
                    clearTimeout(_this2._tid);
                }
            }, 100);
            this._update();
        }

        // _parseMtx(opts)
        // {
        //     var mtx =  new Matrix2D()
        //     var width = window.innerWidth
        //     var height = window.innerHeight
        //
        //     var sx = 1
        //     var sy = 1;
        //     var arg = window.orientation;
        //     // return
        //
        //     switch (opts.rotation.toLocaleLowerCase())
        //     {
        //         case "h":
        //
        //             mtx.rotate(arg+90)
        //             break
        //         case "v":
        //
        //             mtx.rotate(arg)
        //             break;
        //     }
        //
        //     return mtx
        // }

    }, {
        key: "orientation",
        get: function get() {
            return this._orientation;
        }
    }], [{
        key: "getInstance",
        value: function getInstance() {
            return Scene._instance ? Scene._instance : Scene._instance = new Scene();
        }
    }]);
    return Scene;
}(Emitter);

Scene._instance = null;
Scene.getInstance();

/**
 * Created by on 2017/4/19.
 */

exports.DomLayout = Scene;

}((this.MMD = this.MMD || {})));
