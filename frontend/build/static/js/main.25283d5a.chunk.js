(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,t,a){},45:function(e,t,a){e.exports=a(78)},53:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(42),s=a.n(l),o=(a(53),a(28)),i=a(1),r=a(3),m=(a(54),a(55),a(31),function(e){var t=e.songName,a=e.artists,n=e.length,l=e.onClick,s=e.isFooter,o=void 0!==s&&s;return c.a.createElement("div",{className:"box ".concat(o?"has-background-grey-lighter\t":"my-2 is-clickable"),style:o?{width:"100%"}:null,onClick:l},c.a.createElement("div",{className:"columns"},c.a.createElement("div",{className:"column is-flex is-flex-direction-row"},c.a.createElement("div",{className:"level is-flex-direction-column is-four-fifths is-justify-content-flex-start mobile-song-container"},c.a.createElement("div",{className:"level-item has-text-weight-bold"},t),c.a.createElement("div",{className:"level-item"},a)),c.a.createElement("div",{className:"column is-flex is-align-items-center is-justify-content-flex-end"},n))))}),u=(a(56),a(29)),d=function(e){var t=e.songName,a=e.artists,n=e.length,l=e.upvoteFn,s=e.downvoteFn,o=e.upvotes,i=e.downvotes;return c.a.createElement("div",{className:"box my-2"},c.a.createElement("div",{className:"is-flex is-flex-direction-row"},c.a.createElement("div",{className:"level is-flex-direction-column is-four-fifths is-justify-content-flex-start mobile-song-container"},c.a.createElement("div",{className:"level-item has-text-weight-bold song-name-container"},t),c.a.createElement("div",{className:"level-item"},a)),c.a.createElement("div",{className:"column is-flex is-align-items-center is-justify-content-flex-end"},n)),c.a.createElement("div",{className:"column is-flex is-align-items-center py-0"},c.a.createElement("div",{className:"column is-half has-text-centered"},c.a.createElement("div",{onClick:l,className:"is-clickable"},c.a.createElement(u.b,{size:"1.5em",display:"block",className:"icon item-icon"})),o),c.a.createElement("div",{className:"column is-half has-text-centered"},c.a.createElement("div",{onClick:s,className:"is-clickable"},c.a.createElement(u.a,{size:"1.5em",display:"block",className:"icon item-icon"})),i)))},v=a(18),f=a.n(v),g=function(){var e=Object(n.useContext)(h),t=Object(n.useState)([]),a=Object(r.a)(t,2),l=a[0],s=a[1],o=Object(n.useState)(!1),i=Object(r.a)(o,2),u=i[0],v=i[1],g=Object(n.useState)(!1),E=Object(r.a)(g,2),b=E[0],p=E[1],N=Object(n.useState)(""),j=Object(r.a)(N,2),x=j[0],y=j[1],O=Object(n.useState)(!1),w=Object(r.a)(O,2),k=w[0],S=w[1];return c.a.createElement("div",{className:"is-flex is-flex-direction-column container is-max-desktop is-fluid"},k?c.a.createElement("div",{class:"notification is-primary"},x):null,c.a.createElement("div",{className:"my-5"},c.a.createElement("h1",{className:"title"},"Suggest a song"),c.a.createElement("div",{className:"".concat(u?"control is-loading":"")},c.a.createElement("input",{className:"input",type:"text",placeholder:"Song name",onChange:function(t){null!=t&&null!=t.target&&null!=t.target.value&&0!==t.target.value.length?(v(!0),f.a.post("/search",{params:{room_id:e.room,query:t.target.value}}).then(function(e){var t=e.data;s(t),v(!1)}).catch(function(e){v(!1)})):s([])}})),l.map(function(t){return c.a.createElement("div",null,c.a.createElement(m,{key:t.id,songName:t.name,artists:t.artist,length:"",onClick:function(){return a=t,s([]),p(!0),void f.a.post("/queue",{params:{room_id:e.room,song:a}}).then(function(e){p(!1),S(!0),y("New song added!"),setTimeout(function(){S(!1),y("")},5e3)}).catch(function(e){p(!1)});var a}}))})),c.a.createElement("nav",{className:"navbar is-fixed-bottom"},e.song&&e.song.name&&e.song.name.trim().length>0?c.a.createElement(m,{songName:e.song.name,artists:e.song.artist,length:"3:51",isFooter:!0}):c.a.createElement("div",{className:"box has-background-grey-lighter",style:{width:"100%"}},"No song currently playing")),c.a.createElement("div",{className:"my-5"},c.a.createElement("h1",{className:"title"},"Queue"),b?c.a.createElement("progress",{class:"progress is-primary",max:"100"},"15%"):e.queue.map(function(t){return c.a.createElement("div",null,c.a.createElement(d,{key:t.id,songName:t.name,artists:t.artist,length:"",upvotes:t.upvotes,downvotes:t.downvotes,upvoteFn:function(){return a=t,p(!0),void f.a.post("/upvote",{params:{room_id:e.room,song:a}}).then(function(e){p(!1)}).catch(function(e){p(!1)});var a},downvoteFn:function(){return a=t,p(!0),void f.a.post("/downvote",{params:{room_id:e.room,song:a}}).then(function(e){p(!1)}).catch(function(e){p(!1)});var a}}))})))},E=a(44),b=function(){Object(n.useContext)(h);var e=Object(n.useState)(""),t=Object(r.a)(e,2);t[0],t[1];return c.a.createElement("div",{className:"container mt-6"},c.a.createElement("section",{className:"section"},c.a.createElement("h1",{className:"title"},"Spotify Party!"),c.a.createElement("form",{action:"http://localhost:3000/login",method:"post"},c.a.createElement("input",{type:"submit",value:"Press to log in"}))))},h=c.a.createContext();var p=function(){var e=Object(i.n)().defaultRoomID,t=Object(n.useState)(e),a=Object(r.a)(t,2),l=a[0],s=a[1],o=Object(n.useState)(null),m=Object(r.a)(o,2),u=m[0],d=m[1],v=Object(n.useState)([]),f=Object(r.a)(v,2),p=f[0],N=f[1],j=Object(n.useState)({}),x=Object(r.a)(j,2),y=x[0],O=x[1],w={socket:u,room:l,setRoom:s,queue:p,song:y};return Object(n.useEffect)(function(){var t=Object(E.a)();d(t),e&&t.emit("join",{room:e},function(){}),t.on("update_state",function(e){console.log(e),N(e.queue),O(e.song)})},[]),c.a.createElement(h.Provider,{value:w},l?c.a.createElement(g,null):c.a.createElement(b,null))},N=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,79)).then(function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,l=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),l(e),s(e)})};s.a.createRoot(document.getElementById("root")).render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(o.a,null,c.a.createElement(i.c,null,c.a.createElement(i.a,{path:"/",element:c.a.createElement(p,null)}),c.a.createElement(i.a,{path:"/:defaultRoomID",element:c.a.createElement(p,null)}))))),N()}},[[45,1,2]]]);
//# sourceMappingURL=main.25283d5a.chunk.js.map