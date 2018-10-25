class StageContext
{
    /**
     * 初始化画布宽高
     * @param width 宽
     * @param height 高
     * */
    constructor(width=0,height=0)
    {
        this.setSize(width,height)

    }

    /***
     *  横竖屏
     *  @param value H 或 V
     */

    set type(value)
    {
        this._type = value
    }
    get type()
    {
        return this._type
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
    set align(value)
    {
        this._align = value


    }
    get align()
    {
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
    set scaleMode (value)
    {
        this._scaleMode = value
    }
    get scaleMode ()
    {
        return this._scaleMode
    }
    /**
     * 设置画布宽
     * @param value 宽
     * */
    set width(value)
    {
        this._width = value
    }
    get width()
    {
        return this._width
    }
    /**
     * 设置画布高
     * @param value 高
     * */
    set height(value)
    {
        this._height = value
    }
    get height()
    {
        return this._height
    }
    /**
     * 画布宽高
     * @param width 宽
     * @param height 高
     * */
    setSize(width,height)
    {
        this._width= width;
        this._height = height
    }
    /**
     *   "exactfit"; 高宽等于屏幕高宽
     * @private
     * @param width 当前stage宽
     * @param height 当前stage高
     * */
    _exactFit(width,height)
    {

        return {x:0,y:0,width:this.width,height:this.height,scaleX:width/this.width,scaleY:height/this.height,rotation:0}
    }
    /**
     *   "noBorder"; 裁剪铺满
     * @private
     * @param width 当前stage宽
     * @param height 当前stage高
     * */
    _noBorder(width,height)
    {
        var ratio = this.height/this.width;
        var scale = 1
       if(ratio<height/width)
       {
           scale = height/this.height;
       }else
       {
           scale = width/this.width;
       }


        return {x:0,y:0,width:this.width*scale,height:this.height*scale,scaleX:scale,scaleY:scale,rotation:0}
    }

    /**
     *   "noScale"; 不缩放
     * @private
     * @param width 当前stage宽
     * @param height 当前stage高
     * */
    _noScale(width,height)
    {
        return {x:0,y:0,width:this.width,height:this.height,scaleX:1,scaleY:1,rotation:0}
    }
    /**
     *   "showAll";显示所有
     * @private
     * @param width 当前stage宽
     * @param height 当前stage高
     * */
    _showAll(width,height)
    {
        var ratio = this.height/this.width;
        var scale = 1
        if(ratio<height/width)
        {
            scale = width/this.width;
        }else
        {
            scale = height/this.height;
        }


        return {x:0,y:0,width:this.width*scale,height:this.height*scale,scaleX:scale,scaleY:scale,rotation:0}
    }
    /**
     *   计算宽等stage宽比例
     * @private
     * @param width 当前stage宽
     * @param height 当前stage高
     * */
    _exactWidth(width,height)
    {

        var scale = 1

        scale = width/this.width;



        return {x:0,y:0,width:this.width*scale,height:this.height*scale,scaleX:scale,scaleY:scale,rotation:0}
    }
    /**
     *   计算高等stage高比例
     * @private
     * @param width 当前stage宽
     * @param height 当前stage高
     * */
    _exactHeight(width,height)
    {

        var scale = 1

        scale = height/this.height;



        return {x:0,y:0,width:this.width*scale,height:this.height*scale,scaleX:scale,scaleY:scale,rotation:0}
    }
    /**
     *   update 开始运算

     * @param stageWidth 当前stage宽
     * @param stageHeight 当前stage高
     * @param rotation 当前stage 旋转值 -180 到180
     * */
    update(stageWidth,stageHeight,rotation)
    {
        var isH = this.type.toLocaleLowerCase()=="h"
        /**
         * 判断旋转 H V
         * */
        if (isH) {
            if (rotation!= 0) {
                var width = stageWidth, height = stageHeight
            } else {
                var width = stageHeight, height = stageWidth
            }
        }else
        {
            if (rotation == 0) {
                var width = stageWidth, height = stageHeight
            } else {
                var width = stageHeight, height = stageWidth
            }
        }


        var obj
        var isAling = false
        /**
         * 处理缩放方式
         * */
        switch (this.scaleMode.toLowerCase())
        {
            case "exactfit":
                obj= this._exactFit(width,height)
                break
            case "noborder":
                isAling =true;
                obj= this._noBorder(width,height)
                break
            case "noscale":
                isAling =true
                obj= this._noScale(width,height)
                break
            case "showall":
                isAling =true;
                obj= this._showAll(width,height)
                break
            case "width":
                isAling =true
                obj = this._exactWidth(width,height)
                break;
            case "height":
                isAling =true
                obj = this._exactHeight(width,height)
                break;
            default:
                obj= {x:0,y:0,width:width,height:height,scaleX:1,scaleY:1,rotation:rotation}
                break

        }

        if (isH)
        {
            switch (rotation)
            {
                case -90:
                case 90:
                    obj.rotation = 0;
                    break
                default:
                    obj.rotation = -90
                    break
            }

        }else
        {
            obj.rotation = rotation
        }
        var isRt=obj.rotation != -90 && (!isH ||obj.rotation !=0)
        var rwidth = (width-obj.width) * 1
        var rheight =(height-obj.height)* 1
        /**
         * 处理对齐方式
         * */
        if (isAling) {
            switch (this.align.toLowerCase()) {
                case "l":

                    obj.x =isRt? (obj.rotation !=0 ?rwidth:0):0
                    obj.y =(height-obj.height)/2

                    break;
                case "t":
                    obj.x =(width-obj.width)/2
                    obj.y =isRt ? 0:isH ?(obj.rotation !=0 ?rheight:0):rheight
                    break;
                case "r":
                    obj.x =isRt?(width-obj.width)-(obj.rotation ==0 ?0:rwidth) :(width-obj.width)
                    obj.y =(height-obj.height)/2
                    break
                case "b":
                    obj.x =(width-obj.width)/2
                    obj.y =isRt ?(height-obj.height):(isH ?(obj.rotation !=0 ?0:rheight):0)
                    break
                case "lt":
                case "tl":
                    obj.x =isRt? (obj.rotation !=0 ?rwidth:0):0
                    obj.y =isRt ? 0:isH ?(obj.rotation !=0 ?rheight:0):rheight

                    break;
                case "tr":
                case "rt":
                    obj.x =isRt?(width-obj.width)-(obj.rotation ==0 ?0:rwidth) :(width-obj.width)
                    obj.y =isRt ? 0:isH ?(obj.rotation !=0 ?rheight:0):rheight
                    break;
                case "bl":
                case "lb":
                    obj.x =isRt? (obj.rotation !=0 ?rwidth:0):0
                    obj.y =isRt ?(height-obj.height):(isH ?(obj.rotation !=0 ?0:rheight):0)
                    break;
                case "br":
                case "rb":
                    obj.x =isRt?(width-obj.width)-(obj.rotation ==0 ?0:rwidth) :(width-obj.width)
                    obj.y =isRt ?(height-obj.height):(isH ?(obj.rotation !=0 ?0:rheight):0)
                    break;
                default:
                    obj.x =(width-obj.width)/2
                    obj.y =(height-obj.height)/2

                    break;
            }
        }


/**
 * 处理旋转后的位移
 * */
            if (obj.rotation  != 0) {

                var ox = obj.x
                var oy = obj.y

                if (obj.rotation  == -90) {

                    obj.x = (obj.scaleY * this.height)+oy
                    obj.y = ox
                } else {

                    obj.y =(obj.scaleX * this.width )+ox//-(this.width-obj.width)
                    obj.x = oy
                }
            }

        obj.stageWidth = width;
        obj.stageHeight = height
        return obj
    }
}
/**
 *      "exactfit"; 高宽等于屏幕高宽
 * */
StageContext.EXACT_FIT ="exactfit";


/**
 *  "noborder"; 裁剪铺满
 */
StageContext.NO_BORDER ="noborder";


/**
 *  "noscale"; 不缩放
 */
StageContext.NO_SCALE ="noscale";


/**
 *"showall"; 显示全部
 */
StageContext.SHOW_ALL ="showall";


/**
 * "width"; 宽度等于屏幕宽
 */
StageContext.WIDTH = "width";


/**
 *"height";高度等于屏幕高
 */
StageContext.HEIGHT = "height";

export default StageContext;
export {StageContext}