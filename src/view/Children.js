/**
 * Created by on 2017/4/19.
 */
import Matrix2D from "../math/Matrix2D"
import StageContext from "../utils/StageContext"
let OPTS_DEFAULT  = {
    width:400,
    height:400,
    scale:"exactfit",
    rotation:"auto",
    align:"",
    mode: "v"
}
const setStyle = (style,mtx)=>
{
    var n = 10000;
    var str ="matrix3d("+(mtx.a*n|0)/n+","+(mtx.b*n|0)/n+",0,0,"+(mtx.c*n|0)/n+","+(mtx.d*n|0)/n+",0,0,0,0,1,0,"+(mtx.tx+0.5|0)+","+(mtx.ty+0.5|0)+",0,1)"

    // var str = "matrix3d("
    style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str
    // var str = "matrix(" + (mtx.a*n|0)/n +","+ (mtx.b*n|0)/n +","+ (mtx.c*n|0)/n +","+ (mtx.d*n|0)/n +","+ (mtx.tx+0.5|0);
    // style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str +","+ (mtx.ty+0.5|0) +")";
    // style.MozTransform = str +"px,"+ (mtx.ty+0.5|0) +"px)";
}
export default class Children
{
    constructor(child)
    {
        this.matrix = new Matrix2D()
        this._stage = new StageContext(OPTS_DEFAULT.width,OPTS_DEFAULT.height)
        this.target =child;

    }
    set options(value)
    {
        this._options = value
        if (this.target)
        {
            this.target.setAttribute("view-width",value.width)
            this.target.setAttribute("view-height",value.height)
            this.target.setAttribute("view-scale",value.scale)
            this.target.setAttribute("view-rotation",value.rotation)
            this.target.setAttribute("view-align",value.align)
            this.target.setAttribute("view-mode",value.mode)
        }
        this._stage.width = this.options.width
        this._stage.height = this.options.height
        this._stage.align = this.options.align
        this._stage.scaleMode = this.options.scale
        this._stage.type = value.mode

      
    }
    get options()
    {
        return this._options
    }
    set matrix (value)
    {
        this._matrix = value

    }
    get matrix()
    {
        return this._matrix
    }
    set parent(value)
    {
        this._parent = value
    }
    get parent()
    {
        return this._parent;
    }
    set target(value)
    {
        this._target = value
        if (value)
        {
            value.style.position = "absolute";
            value.style.transformOrigin = value.style.WebkitTransformOrigin = value.style.msTransformOrigin = value.style.MozTransformOrigin = value.style.OTransformOrigin = "0% 0%";

            var opts = {
                width:Number(value.getAttribute("view-width")),
                height:Number(value.getAttribute("view-height")),
                scale:value.getAttribute("view-scale"),
                rotation:value.getAttribute("view-rotation"),
                align:value.getAttribute("view-align"),
                mode: value.getAttribute("view-mode")
            }

            for (var i in opts)
            {
                if (!opts[i])
                {
                    opts[i]=OPTS_DEFAULT[i]
                }
            }
         
            value.style.width = opts.width +"px";
            value.style.height = opts.height +"px";
            value.style.overflow = "hidden"
            this.options =opts

        }
    }

    get target()
    {
        return this._target
    }
    update(width,height,rotation)
    {
        if (this.options.rotation.toLocaleLowerCase() == "v")
        {
            this.target.style.display = rotation !=0?"none":"block"
        }
        if (this.options.rotation.toLocaleLowerCase() == "h")
        {
            this.target.style.display = rotation ==0?"none":"block"
        }
        if (this.options.rotation.toLocaleLowerCase() == "auto")
        {
            this.target.style.display = "block";
        }
        if ( this.target.style.display != "block") return;

            var rect = this._stage.update(width, height, rotation)
            var matrix = new Matrix2D()
            matrix.rotate(-rect.rotation)

            matrix.tx = rect.x
            matrix.ty = rect.y
            matrix.scale(rect.scaleX, rect.scaleY)
            this.matrix = matrix
            this._sendEvent(this.target,"rectangle",rect)
            setStyle(this.target.style, this.matrix)
        var o  =this._parsePoint(this.options.width,this.options.height,rect.x,rect.y,rect,this.align)
        this._sendEvent(this.target,"position",o)

        this._updatChild(rect)
        
    }
    _sendEvent(target,type,data)
    {
        if (document.createEvent)
        {
            var e = document.createEvent("Event");
            e.initEvent(type,true,true);
            e.data = data//{target:child,top:top,left:left,right:right,bottom:bottom}
            target.dispatchEvent(e)
        }
    }
    _parsePoint(width,height,x,y,rect,align)
    {


        var isH,rx,ry,left,right,top,bottom
        if (isH)
        {

            switch (rect.rotation){
                case -90:
                case 90:
                    left = -(rect.y) / rect.scaleY
                    top =-(rect.stageHeight - (rect.x) )/rect.scaleX

                    right = left+ rect.stageWidth/rect.scaleX
                    bottom = top + rect.stageHeight / rect.scaleY
                    break
                case 0:

                    left = -(rect.x) / rect.scaleX
                    top =-(rect.y) / rect.scaleY
                    right = left+ rect.stageWidth/rect.scaleX
                    bottom = top + rect.stageHeight / rect.scaleX


                    break
            }

        }else
        {

            switch (rect.rotation)
            {
                case 0:
                    top = -(rect.y) / rect.scaleY
                    left = -(rect.x) / rect.scaleX
                    right = left + rect.stageWidth / rect.scaleX
                    bottom = top + rect.stageHeight / rect.scaleY
                    break
                case -90:
                    top = -(rect.stageHeight - (rect.x) )/rect.scaleX
                    left = -(rect.y) / rect.scaleY
                    right = left + rect.stageWidth / rect.scaleX
                    bottom = top + rect.stageHeight / rect.scaleY
                    break;
                case 90:
                    left =-(rect.stageWidth - (rect.y) )/rect.scaleY
                    top =  -(rect.x) / rect.scaleX
                    right = left + rect.stageWidth / rect.scaleY
                    bottom = top + rect.stageHeight / rect.scaleX
                    break
            }


        }

        rx = left+(right-left)/2
        ry = top+(bottom-top)/2
        if(align !==undefined)
        {

            switch (align.toLocaleLowerCase())
            {

                case "t":
                    ry = top;
                    break;
                case "l":
                    rx = left
                    break;
                case "r":
                    rx = right
                    break
                case "b":
                    ry = bottom
                    break
                case "tl":
                case "lt":
                    rx = left;
                    ry = top
                    break;
                case "tr":
                case "rt":
                    rx = right;
                    ry = top
                    break
                case "bl":
                case "lb":
                    rx = left;
                    ry = bottom
                    break
                case "rb":
                case "br":
                    rx = right
                    ry = bottom
                    break;

            }

             child.style.top = (ry-height/2+y) + "px"
             child.style.left = (rx-width/2+x) + "px"


        }
        return {x:rx,y:ry,top:top,left:left,right:right,bottom:bottom};

    }
    _updatChild(rect)
    {
        if (this.target)
        {
            var childNodes = this.target.childNodes
            var x,y,align,isH,child,rx,ry,left,right,top,bottom,width,height
            isH = this._stage.type.toLocaleLowerCase() == "h"

            for (var i=0;i<childNodes.length;i++)
            {
                 child = childNodes[i];
                if (child.getAttribute) {


                     align = child.hasAttribute("view-align") ? (child.getAttribute("view-align")?child.getAttribute("view-align"):""): undefined
                    width =Number(child.getAttribute("view-width")) ||0;
                    height=Number(child.getAttribute("view-height")) ||0         ;
                     x =( Number(child.getAttribute("view-x")) ||0);
                     y =(Number( child.getAttribute("view-y"))||0);
                    var o =this._parsePoint(width,height,x,y,rect,align)

                    if(align !==undefined) {
                        child.style.top = (o.y - height / 2 + y) + "px"
                        child.style.left = (o.x - width / 2 + x) + "px"
                    }

                        if (isH)
                        {

                            switch (rect.rotation){
                                case -90:
                                case 90:
                                         left = -(rect.y) / rect.scaleY
                                         top =-(rect.stageHeight - (rect.x) )/rect.scaleX

                                         right = left+ rect.stageWidth/rect.scaleX
                                            bottom = top + rect.stageHeight / rect.scaleY
                                    break
                                case 0:

                                        left = -(rect.x) / rect.scaleX
                                        top =-(rect.y) / rect.scaleY
                                        right = left+ rect.stageWidth/rect.scaleX
                                        bottom = top + rect.stageHeight / rect.scaleX


                                    break
                            }

                        }else
                        {

                                switch (rect.rotation)
                                {
                                    case 0:
                                        top = -(rect.y) / rect.scaleY
                                        left = -(rect.x) / rect.scaleX
                                        right = left + rect.stageWidth / rect.scaleX
                                        bottom = top + rect.stageHeight / rect.scaleY
                                        break
                                    case -90:
                                        top = -(rect.stageHeight - (rect.x) )/rect.scaleX
                                        left = -(rect.y) / rect.scaleY
                                        right = left + rect.stageWidth / rect.scaleX
                                        bottom = top + rect.stageHeight / rect.scaleY
                                        break;
                                    case 90:
                                        left =-(rect.stageWidth - (rect.y) )/rect.scaleY
                                        top =  -(rect.x) / rect.scaleX
                                        right = left + rect.stageWidth / rect.scaleY
                                        bottom = top + rect.stageHeight / rect.scaleX
                                        break
                                }


                        }

                    rx = left+(right-left)/2
                    ry = top+(bottom-top)/2
                    if(align !==undefined)
                    {

                        switch (align.toLocaleLowerCase())
                        {

                            case "t":
                                ry = top;
                                break;
                            case "l":
                                rx = left
                                break;
                            case "r":
                               rx = right
                                break
                            case "b":
                                ry = bottom
                                break
                            case "tl":
                            case "lt":
                             rx = left;
                                ry = top
                                break;
                            case "tr":
                            case "rt":
                                rx = right;
                                ry = top
                                break
                            case "bl":
                            case "lb":
                                rx = left;
                                ry = bottom
                                break
                            case "rb":
                            case "br":
                                rx = right
                                ry = bottom
                                break;

                        }

                            child.style.top = (ry-height/2+y) + "px"
                            child.style.left = (rx-width/2+x) + "px"


                    }
                 this._sendEvent(child,"position",{target:child,top:top,left:left,right:right,bottom:bottom})
                }
            }
        }
    }


}