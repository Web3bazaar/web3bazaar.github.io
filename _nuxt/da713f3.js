(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{678:function(t,e,n){var content=n(692);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("69e6741b",content,!0,{sourceMap:!1})},691:function(t,e,n){"use strict";n(678)},692:function(t,e,n){var o=n(31)(!1);o.push([t.i,".countdown .time-separators{font-size:30px}.countdown .col{display:flex;align-content:center;justify-content:center}.countdown .col .outside{border-radius:12px;border:5px solid purple;width:36px;height:36px;box-shadow:0 0 15px 1px #fff}.countdown .col .inside{width:100%;height:100%;background-color:none;color:purple;line-height:27px;text-align:center}.countdown .col span{color:#ffb6c1;margin-left:4px}",""]),t.exports=o},701:function(t,e,n){"use strict";n.r(e);n(93);var o=6e4,d=36e5,r=24*d,c={props:{giveawayEndDate:{type:String,default:""}},data:function(){return{timeToEndDate:{days:0,hours:0,minutes:0,seconds:0,ended:!1}}},computed:{hasEnded:function(){return this.timeToEndDate.ended}},mounted:function(){this.showRemaining(),setInterval(this.showRemaining,5e3)},methods:{showRemaining:function(){var t=new Date,e=new Date(this.giveawayEndDate)-t;if(e<0)return this.timeToEndDate.ended=!0,void this.$emit("giveaway-ended");var n=Math.floor(e/r),c=Math.floor(e%r/d),l=Math.floor(e%d/o),h=Math.floor(e%o/1e3);this.timeToEndDate.days=n||-1,this.timeToEndDate.hours=c,this.timeToEndDate.minutes=l,this.timeToEndDate.seconds=h}}},l=(n(691),n(29)),h=n(76),v=n.n(h),f=n(662),m=n(667),w=n(664),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[t.hasEnded?t._e():n("v-row",{staticClass:"countdown d-flex justify-center align-center"},[t.timeToEndDate.days>=0?n("v-col",{staticClass:"time-separators",attrs:{cols:"auto"}},[n("div",[n("div",[t._v("\n          "+t._s(t.timeToEndDate.days)+"\n        ")])]),t._v(" "),n("span",[t._v(" Days ")])]):t._e(),t._v(" "),t.timeToEndDate.hours>=0?n("v-col",{staticClass:"time-separators",attrs:{cols:"auto"}},[n("div",[n("div",[t._v("\n          "+t._s(t.timeToEndDate.hours)+"\n        ")])]),t._v(" "),n("span",[t._v(" Hours ")])]):t._e(),t._v(" "),t.timeToEndDate.minutes>=0?n("v-col",{staticClass:"time-separators",attrs:{cols:"auto"}},[n("div",[n("div",[t._v("\n          "+t._s(t.timeToEndDate.minutes)+"\n        ")])]),t._v(" "),n("span",[t._v(" Minutes ")])]):t._e()],1),t._v(" "),n("v-row",[n("v-col",[n("h4",{staticClass:"text-center"},[t._v("This raffle is closed")])])],1)],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{VCol:f.a,VContainer:m.a,VRow:w.a})}}]);