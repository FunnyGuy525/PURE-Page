const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const scenes={motorcycle:{name:'Motorcycle',frames:226,caption:'Oblique view · temporal point accumulation'},penguin:{name:'Penguin',frames:174,caption:'Oblique view · temporal point accumulation'},sport:{name:'Sport',frames:207,caption:'Original video view · temporal point accumulation'},canyon:{name:'Basketball close-up',frames:121,caption:'Original video view · temporal point accumulation'},jump:{name:'Basketball wide view',frames:121,caption:'Original video view · temporal point accumulation'}};
let currentScene='motorcycle',currentModel='pi3';
function setScene(){const v=$('#scene-video');pauseManagedVideo(v);const input=$('#scene-rgb');const rgbSrc=`assets/${currentScene}-rgb.mp4`;if(input.getAttribute('src')!==rgbSrc){input.src=rgbSrc;input.poster=`assets/${currentScene}-rgb.jpg`;input.load()}const prefix=`assets/${currentScene}-${currentModel}`;v.src=prefix+'.mp4';v.poster=prefix+'.jpg';v.setAttribute('aria-label',`${scenes[currentScene].name} reconstructed with PURE (${currentModel==='pi3'?'Pi3':currentModel.toUpperCase()})`);$('#scene-title').textContent=scenes[currentScene].name;$('#scene-frames').textContent=scenes[currentScene].frames+' FRAMES';$('#view-caption').textContent=scenes[currentScene].caption;$('#scene-download').href=prefix+'.mp4';$('.video-error').hidden=true;v.load();resumeVisibleVideo(v,true);$$('[data-scene]').forEach(b=>{const selected=b.dataset.scene===currentScene;b.classList.toggle('active',selected);b.setAttribute('aria-selected',selected)});$$('[data-model]').forEach(b=>{const selected=b.dataset.model===currentModel;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',selected)})}
$$('[data-scene]').forEach(b=>b.addEventListener('click',()=>{currentScene=b.dataset.scene;setScene()}));$$('[data-model]').forEach(b=>b.addEventListener('click',()=>{currentModel=b.dataset.model;setScene()}));
$$('[role=tab]').forEach((b,i)=>b.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const tabs=$$('[role=tab]');const j=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[j].focus();tabs[j].click()}));
$('#scene-video').addEventListener('error',()=>$('.video-error').hidden=false);
const hero=$('#hero-video');
$('#hero-pause').addEventListener('click',()=>{if(hero.paused){manuallyPaused.delete(hero);hero.play().catch(()=>{})}else{manuallyPaused.add(hero);hero.pause()}});
const updateHeroControl=()=>{$('#hero-pause').textContent=hero.paused?'▶':'Ⅱ';$('#hero-pause').setAttribute('aria-label',hero.paused?'Play background video':'Pause background video')};
hero.addEventListener('play',updateHeroControl);hero.addEventListener('pause',updateHeroControl);updateHeroControl();
$('#watch-film').addEventListener('click',()=>{$('#film-dialog').showModal();managedVideos.forEach(pauseManagedVideo);$('#demo-video').play().catch(()=>{})});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}});d.addEventListener('close',()=>{d.querySelector('video')?.pause();managedVideos.forEach(v=>resumeVisibleVideo(v))})});
$$('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{$('#zoom-image').src=b.dataset.zoom;$('#image-dialog').showModal()}));
$$('[data-seek]').forEach(b=>b.addEventListener('click',()=>{const v=$('#long-video');const seek=()=>{v.currentTime=Number(b.dataset.seek);v.play().catch(()=>{})};if(v.readyState>=1)seek();else{v.addEventListener('loadedmetadata',seek,{once:true});v.load()}v.focus()}));
const citation=`@inproceedings{zhu2026pure,\n  author = {Zhu, Yaolong and Li, Peng and Lu, Jiahao and Zhao, Chengfeng and Li, Mengfei and Wang, Chao and Chen, Wenyue and Gu, Zekai and Ren, Chengwei and Wang, Ronggang and Liu, Yuan},\n  title = {PURE: Refining Feed-forward 3D Reconstruction with Unlabeled Post-training},\n  booktitle = {Proceedings of the 34th ACM International Conference on Multimedia},\n  year = {2026},\n  doi = {10.1145/3767308.3836296}\n}`;
$('#copy-citation').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(citation)}catch{const text=document.createElement('textarea');text.value=citation;text.style.position='fixed';text.style.opacity='0';document.body.append(text);text.select();document.execCommand('copy');text.remove()}$('#toast').textContent='Citation copied';$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2400)});
// Start muted players as they enter view; RGB companions follow their master.
const managedVideos=['long','hero','scene'].map(key=>$(`#${key}-video`));
const visibleVideos=new Set(),manuallyPaused=new Set(),automaticPauses=new WeakSet();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function pauseManagedVideo(video){if(!video.paused){automaticPauses.add(video);video.pause()}}
function resumeVisibleVideo(video,selected=false){
 if(selected)manuallyPaused.delete(video);
 if(!document.hidden&&!document.querySelector('dialog[open]')&&visibleVideos.has(video)&&!manuallyPaused.has(video)&&(!reducedMotion.matches||selected))video.play().catch(()=>{});
}
managedVideos.forEach(video=>{
 video.muted=true;video.defaultMuted=true;
 video.addEventListener('pause',()=>{if(automaticPauses.has(video))automaticPauses.delete(video);else if(visibleVideos.has(video)&&!video.ended)manuallyPaused.add(video)});
 video.addEventListener('play',()=>manuallyPaused.delete(video));
});
if('IntersectionObserver'in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const video=entry.target;
  if(entry.isIntersecting&&entry.intersectionRatio>=.2){visibleVideos.add(video);resumeVisibleVideo(video)}
  else{visibleVideos.delete(video);manuallyPaused.delete(video);pauseManagedVideo(video)}
 }),{threshold:[0,.2]});
 managedVideos.forEach(video=>observer.observe(video));
}else{
 const update=()=>managedVideos.forEach(video=>{const r=video.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){visibleVideos.add(video);resumeVisibleVideo(video)}else{visibleVideos.delete(video);pauseManagedVideo(video)}});
 addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){managedVideos.forEach(pauseManagedVideo);const demo=$('#demo-video');demo.dataset.resumeOnVisible=String(!demo.paused);demo.pause()}else{managedVideos.forEach(v=>resumeVisibleVideo(v));const demo=$('#demo-video');if($('#film-dialog').open&&demo.dataset.resumeOnVisible==='true')demo.play().catch(()=>{})}});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)managedVideos.forEach(pauseManagedVideo);else managedVideos.forEach(v=>resumeVisibleVideo(v))});

// RGB follows the master player's play/pause/seek/rate and loop timeline.
// Hide input during the camera-only overview reveal; it has no corresponding RGB frame.
function synchronizeRGB(key,{hideBefore=0,hideAfter=Infinity}={}){
 const master=$(`#${key}-video`),rgb=$(`#${key}-rgb`),inset=$(`#${key}-rgb-inset`);let callback=null;
 const sync=(force=false)=>{
  const t=master.currentTime,visible=t>=hideBefore&&t<hideAfter;
  inset.classList.toggle('is-hidden',!visible);inset.setAttribute('aria-hidden',String(!visible));
  if(!visible){rgb.pause();return}
  rgb.playbackRate=master.playbackRate;
  if(rgb.readyState>=1&&Number.isFinite(rgb.duration)){
   const target=Math.min(t,Math.max(0,rgb.duration-.002));
   if(force||Math.abs(rgb.currentTime-target)>.065){try{rgb.currentTime=target}catch{}}
  }
  if(master.paused||master.ended)rgb.pause();else if(rgb.paused)rgb.play().catch(()=>{});
 };
 const stop=()=>{if(callback!==null){master.cancelVideoFrameCallback?.(callback);callback=null}};
 const tick=()=>{sync();callback=null;if(!master.paused&&!master.ended&&master.requestVideoFrameCallback)callback=master.requestVideoFrameCallback(tick)};
 master.addEventListener('play',()=>{sync(true);stop();if(master.requestVideoFrameCallback)callback=master.requestVideoFrameCallback(tick)});
 for(const e of ['pause','ended'])master.addEventListener(e,()=>{stop();rgb.pause();sync(true)});
 for(const e of ['seeking','seeked','loadedmetadata','ratechange'])master.addEventListener(e,()=>sync(true));
 master.addEventListener('timeupdate',()=>sync());
 rgb.addEventListener('loadedmetadata',()=>sync(true));
 rgb.addEventListener('error',()=>{inset.classList.add('is-hidden')});
 sync(true);if(!master.paused&&master.requestVideoFrameCallback)callback=master.requestVideoFrameCallback(tick);
}
// Main and modal films already contain synchronized RGB. Only raw clip players need companions.
synchronizeRGB('scene');synchronizeRGB('hero');

$$('[data-demo-seek]').forEach(b=>b.addEventListener('click',()=>{const v=$('#demo-video');const seek=()=>{v.currentTime=Number(b.dataset.demoSeek);v.play().catch(()=>{})};if(v.readyState>=1)seek();else{v.addEventListener('loadedmetadata',seek,{once:true});v.load()}v.focus()}));
