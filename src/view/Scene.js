/**
 * Created by on 2017/3/23.
 */

import Children from "./Children"
import Emitter from "../event/Emitter"



export default class Scene extends Emitter
{
    constructor()
    {
        super()
// console.log(this)
        this.init()


    }
    init() {
        // this._html =document.getElementsByTagName("html")[0];
        this._list = [];
        // if (!("orientation" in window))
        // {
        //     window.orientation = 0;
        // }

        this._orientation =  window.orientation||0
        addEventListener("DOMContentLoaded",this._onContentLoaded.bind(this))


        addEventListener("orientationchange",this._onOrientation.bind(this))
        addEventListener("resize",this._onResize.bind(this))
    }
    _onOrientation()
    {

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

        this.createTime()



    }
    get orientation()
    {
        return this._orientation
    }
    _onResize()
    {

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
            if (window.innerWidth < window.innerHeight)
            {
                this._orientation =0
            }else
            {
                this._orientation =90
            }
            this._onOrientation()

        // }

        this.createTime()

        // this.dispatchEvent(new Event("resize"))
        // setInterval(function () {
        //     document.head.style.zoom = 1
        //     document.style.zoom = 1
        // },100)


    }
    _onContentLoaded()
    {

        addEventListener("DOMNodeInserted", this._onInserted.bind(this))
        addEventListener("DOMNodeRemoved", this._onRemoved.bind(this))

         this._onInserted({target:document.body})
    }
    _onRemoved(e)
    {
         this._removeItem(e.target)
        // console.log("remove",e.target)
    }
    _onInserted(e)
    {

       
        this._checkNodes(e.target)
    }
    _checkNodes(child)
    {
        var childNodes = child.childNodes;

        if (child.getAttribute)
        {
            var isRotation =child.getAttribute("view-mode")

            if (!!isRotation)
            {

                // alert(child.getAttribute("view-mode"))

                if(!this._checkItem(child)&&this._checkParent(child))
                {

                    try {
                        var c = new Children(child)
                    }catch (e)
                    {
                        // alert(e)
                    }

                    this._addItem(c)
                    // this.dispatchEvent(new Event("inserted"))

                }
            }
        }

        for (var i=0;i<childNodes.length;i++)
        {
            var c = child.childNodes[i];
            this._checkNodes(c)
        }


    }
    _checkParent(child)
    {
        var parent = child.parentNode

        if(parent && parent!=document )
        {
           
            if (!!parent.getAttribute("view-mode"))
            {

                return false
            }else
            {

                return this._checkParent(parent)
            }

        }

        return true
    }
    _addItem(child)
    {
        this._removeItem(child)

        // var opts = {
        //     width:child.getAttribute("view-width"),
        //     height:child.getAttribute("view-height"),
        //     rotation:child.getAttribute("view-rotation"),
        //     align:child.getAttribute("view-align"),
        //     skew: child.getAttribute("view-skew")
        // }
        // Object.assign(opts,opts_default)
        
         this._list.push(child)
        if (window.orientation  === undefined)
        {
            if (window.innerWidth < window.innerHeight)
            {
                this._orientation =0
            }else
            {
                this._orientation =90
            }


        }
        this.createTime()

    }
    _checkItem(child)
    {
        for (var i=0;i<this._list.length;i++)
        {
            if (this._list[i].target == child)
            {

                return true
            }
        }
        return false
    }
    _removeItem(child)
    {
        for (var i=0;i<this._list.length;i++)
        {
            if (this._list[i].target == child)
            {
                this._list.slice(i,1)
                // this.dispatchEvent(new Event("removed"))
                return
            }
        }
    }
    _update()
    {

        if (window.innerWidth < window.innerHeight)
        {
            this._orientation =0
        }else
        {
            this._orientation =90
        }
            var width = window.innerWidth
            var height = window.innerHeight
        for (var i=0;i<this._list.length;i++)
        {
            var child = this._list[i];

             child.update(width,height,this._orientation )

        }
    }
    createTime()
    {

        clearTimeout( this._tid )
        var tid = 0
        this._tid = setInterval(()=>{

        this.  _update();
            tid++
            if (tid >10)
            {
                clearTimeout( this._tid )
            }
            
        },100)
        this.  _update();
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
    static getInstance()
    {
        return Scene._instance ?Scene._instance :Scene._instance = new Scene();
    }

}


Scene._instance = null
Scene.getInstance()
export {Scene}