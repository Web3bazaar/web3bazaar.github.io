(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{677:function(t,e,n){t.exports=n.p+"img/link.694332c.png"},699:function(t,e,n){var content=n(731);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("524b6a2c",content,!0,{sourceMap:!1})},730:function(t,e,n){"use strict";n(699)},731:function(t,e,n){var r=n(31)(!1);r.push([t.i,".trade-tab-asset .item-quantity{display:inline;font-size:.75rem}.trade-tab-asset .item-info *{text-align:left!important}.trade-tab-asset .item-info .item-name.small-links{font-size:.75rem}.trade-tab-asset .item-info .item-name,.trade-tab-asset .item-info .item-quantity{color:#d3d3d3}.trade-tab-asset .item-info .item-name span,.trade-tab-asset .item-info .item-quantity span{color:#ffb6c1;font-size:.85rem}@media(max-width:720px){.trade-tab-asset .item-info *{text-align:center!important}.trade-tab-asset .item-info>*{font-size:.65rem!important}}",""]),t.exports=r},740:function(t,e,n){"use strict";n.r(e);var r=n(4),o=(n(7),n(69),n(39),n(12)),l={props:{asset:{type:Object,default:function(){}}},data:function(){return{linkIcon:n(677),baseImg:null,projectLink:null,assetName:null,externalUrl:null,imageData:null,itemName:null}},fetch:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getProjectInfo",{contractAddress:t.asset.contractAddress,idAsset:t.asset.idAsset,contractTypeIndex:t.asset.contractTypeIndex});case 2:n=e.sent,t.baseImg=n.baseImg,t.imageData=n.imageData,t.projectLink=n.projectLink,t.assetName=n.assetName||n.projectName,t.externalUrl=n.externalUrl,t.itemName=n.itemName;case 9:case"end":return e.stop()}}),e)})))()},computed:{formattedQuantity:function(){var t,e,n;return(null===(t=this.asset)||void 0===t?void 0:t.contractType)===this.$contractTypes.ERC20?o.ethers.utils.formatUnits(((null===(e=this.asset)||void 0===e?void 0:e.amount.toString())||0)+""):null===(n=this.asset)||void 0===n?void 0:n.amount}}},c=(n(730),n(29)),m=n(76),d=n.n(m),f=n(662),x=n(667),v=n(664),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"trade-tab-asset pa-2 pa-sm-3"},[n("v-row",{staticClass:"justify-center"},[n("v-col",{staticClass:"d-flex flex-column justify-center item-info pb-0 pl-0",attrs:{cols:"12",md:"auto"}},[n("a",{staticClass:"item-name small-links d-flex align-center",attrs:{href:t.externalUrl,target:"_blank"}},[1!==t.asset.contractTypeIndex?n("div",{},[t._v("\n          "+t._s(t._f("truncate")(t.itemName,12,"...",7))+"\n        ")]):n("div",[t._v("\n          "+t._s(t.assetName)+"\n        ")])])]),t._v(" "),n("v-col",{staticClass:"d-flex justify-center py-0",attrs:{cols:"auto"}},[n("a",{attrs:{href:t.externalUrl,target:"_blank"}},[t.imageData?n("div",{staticClass:"svg-img",staticStyle:{width:"100px"},domProps:{innerHTML:t._s(t.imageData)}}):n("img",{staticClass:"ml-0",staticStyle:{"max-height":"100px","max-width":"120px","min-height":"100px","min-width":"120px"},attrs:{contain:"",src:t.baseImg}})])]),t._v(" "),n("v-col",{staticClass:"d-flex flex-column justify-center item-info pt-0",attrs:{cols:"12",md:"auto"}},[n("p",{staticClass:"item-quantity mb-0"},[t._v("\n        Amount:"),n("span",[t._v(" "+t._s(t.formattedQuantity)+" ")])])])],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VCol:f.a,VContainer:x.a,VRow:v.a})}}]);