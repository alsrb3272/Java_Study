"use strict";function animatedCanvas(e,t){t??={},t.draw??={};let a={_frame_la:0,_frame_delta:1e3/60,_viewalpha:255,__fps_tick:0,__fps:0,showFps:!1,width:0,height:0,scale:1,speedScale:1,baseSize:t.baseSize??3686400,baseRefreshRate:10,element:e,context:e.getContext("2d"),options:t,draw:{onresize:t.draw.onresize??function(e){e.draw.setsize(e),e.draw.invalidate(e,e.context,e.width,e.height,!1)},setsize:t.draw.setsize??function(t){t.width=e.width=e.offsetWidth,t.height=e.height=e.offsetHeight,t.scale=t.width*t.height/t.baseSize},invalidate:t.draw.invalidate,draw:t.draw.draw,drawBackground:t.draw.drawBackground,animation:t.draw.animation??function(){let e=Date.now(),t=a.baseRefreshRate;a.speedScale=(a._frame_delta=Math.min(e-a._frame_la,999))/t,a._frame_la=e;let i=a.context,n=a.width,d=a.height;o.drawBackground(a,i,n,d,!1),o.draw(a,i,n,d,!1),a.showFps&&((a.__fps_tick+=1)>=1e3/t&&(a.__fps_tick=0,a.__fps=Math.round(1e3/a._frame_delta)),i.fillStyle="#888",i.font="16px serif",i.fillText(a.__fps,10,26)),requestAnimationFrame(o.animation)}}},o=a.draw;o.setsize(a),o.invalidate(a,a.context,a.width,a.height,!0),window.onresize=function(){o.onresize(a)},a._frame_la=Date.now(),requestAnimationFrame(o.animation)}function drawFunction(e,t=null,a=null){let o;if("firefly"==(e=e.toLowerCase())){function e(e,a,o,i){for(let n of e.options.dots){let d=n.speed*e.scale,l=n.count*e.scale;for(let r=0;r<l;r++)e._dots.push(t({size:n.size,speed:d},a,o,i))}}function t(e,t,a,o=!1){let n=e.speed;return e.age=o?255:0,e.speedx=.001*i(1e3*-n,1e3*n),e.speedy=.001*i(1e3*-n,1e3*n),e.x=i(0,t-e.size),e.y=i(0,a-e.size),e}o={invalidate:function(t,a,o,i,n){t._dotColor??=t.options.dotColor??"#ffffff",t._dotAlpha??=Math.min(255,Math.max(0,t.options.dotAlpha??255)),t._viewalpha??=255,t.options.dots??=[{size:1,speed:.3,count:400},{size:2,speed:.2,count:100},{size:3,speed:.1,count:70},{size:4,speed:.09,count:30}],t._dots=[],e(t,o,i,!0),t.draw.drawBackground(t,a,o,i,n),t.draw.draw(t,a,o,i,!0)},draw:function(e,a,o,i){let n=e._dots,d=e.speedScale;for(let l of n){let n=l.size;(l.x<-n||l.y<-n||l.x>o+n||l.y>i+n)&&t(l,o,i),l.x+=l.speedx*d,l.y+=l.speedy*d,l.age<255||e._dotAlpha<255||e._viewalpha<255?(l.age<255&&(l.age+=d),a.fillStyle=e._dotColor+Math.round(Math.min(l.age,e._viewalpha,e._dotAlpha)).toString(16).padStart(2,"0")):a.fillStyle=e._dotColor,a.fillRect(l.x,l.y,n,n)}},drawBackground:drawBackgroundFunction(a??"radial_gradient")}}else{if("star"!=e)throw"Unknown function name";{function e(e,t,a){for(let o of e.options.dots){let n=o.speed*e.scale,d=o.count*e.scale;for(let l=0;l<d;l++)e._dots.push({size:o.size,speed:n,x:i(0,t-o.size),y:i(0,a-o.size)})}}o={invalidate:function(t,a,o,i,n){t._dotColor??=t.options.dotColor??"#ffffff",t._dotAlpha??=Math.min(255,Math.max(0,t.options.dotAlpha??255)),t._viewalpha??=255,t.options.dots??=[{size:1,speed:.3,count:400},{size:2,speed:.2,count:100},{size:3,speed:.1,count:70},{size:4,speed:.09,count:30}],t._dots=[],e(t,o,i),t.draw.drawBackground(t,a,o,i,n),t.draw.draw(t,a,o,i,!0)},draw:function(e,t,a,o){let i=e._dots;for(let a of i){let i=a.size;a.y-=a.speed*e.speedScale,a.y+i<0&&(a.y+=o+i),a.y>o+i&&(a.y-=o+2*i),e._dotAlpha<255||e._viewalpha<255?t.fillStyle=e._dotColor+Math.round(Math.min(255,e._viewalpha,e._dotAlpha)).toString(16).padStart(2,"0"):t.fillStyle=e._dotColor,t.fillRect(a.x,a.y,i,i)}},drawBackground:drawBackgroundFunction(a??"radial_gradient")}}}function i(e,t){return Math.floor(Math.random()*(t-e+1))+e}return null!=t?Object.assign(o,t):o}function drawBackgroundFunction(e){let t=e.split(" ");if(t.includes("radial_gradient"))return t.includes("fade")?function(e,t,a,o,i=!1){e._viewalpha&&!i||(e._viewalpha=0);let n="",d=e.speedScale;e._viewalpha<255&&(n=Math.round(Math.min(e._viewalpha+=(e.options.fadeSpeed??1)*d,255)).toString(16).padStart(2,"0"));let l=t.createRadialGradient(a/2,o/2,(a+o)/6,a/2,o/2,o),r=e.options.backgroundColorSteps??={0:"#1B2735",1:"#090A0F"};for(let e in r)l.addColorStop(e,r[e]+n),l.addColorStop(e,r[e]+n);t.fillStyle=l,t.fillRect(0,0,a,o)}:function(e,t,a,o){let i=t.createRadialGradient(a/2,o/2,(a+o)/6,a/2,o/2,o),n=e.options.backgroundColorSteps??={0:"#1B2735",1:"#090A0F"};for(let e in n)i.addColorStop(e,n[e]),i.addColorStop(e,n[e]);t.fillStyle=i,t.fillRect(0,0,a,o)};throw"Unknown function name"}


// 기존 스크립트 내용
// <script>
// function createStar() {
//     let star = document.createElement("div");
//     star.className = "star";
//     star.style.left = `${Math.random() * window.innerWidth}px`;
//     star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Randomize animation duration
//     star.style.animationDelay = `0s`; // Start without delay

//     document.body.appendChild(star);

//     // Remove the star from DOM after it has fallen
//     star.addEventListener('animationiteration', () => {
//         star.remove();
//         createStar(); // Create a new star to replace it
//     });
// }

// // Create 100 stars initially
// for (let i = 0; i < 100; i++) {
//     createStar();
// }
// </script>


// body {
//     margin: 0;
//     padding: 0;
//     background: #000;
//     overflow: hidden;
// }

// .star {
//     width: 2px;
//     height: 2px;
//     background: white;
//     position: absolute;
//     border-radius: 50%;
//     animation: fall linear infinite;
//     /* Make animation continuous */
// }

// @keyframes fall {
//     from {
//         transform: translateY(-2px);
//         opacity: 1;
//     }

//     to {
//         transform: translateY(calc(100vh + 5px));
//         /* Move it just outside the viewport */
//         opacity: 0;
//     }
// }