import{r as s,g as e,e as l,f as n,w as a,h as o,i as t,j as i,k as r,c,l as d,t as u,F as p,m as g,s as m,n as v,v as b,a as y,p as f,b as h,u as L,q as w,x as k,y as I}from"./index-732f335f.js";const S=""+new URL("../png/mosaic-logo-43a72bbe.png",import.meta.url).href,q={class:"header-login"},x={key:0,class:"header-username"},P={class:"usericon mr-1"},j=r("div",{class:"usernameloc"},[r("h5",{id:"user-info-field"},"Account / Location")],-1),U=r("img",{src:S},null,-1),M={key:1,class:"signout-header"},$=y(" Log out "),A={class:"container h-100 mt-5 pt-3"},C={class:"row"},O={class:"col-lg-6 position-relative"},Q={class:"pt-lg-5 pr-lg-4 pl-lg-4 mx-5 left-mainlog"},V={class:"logintime-section"},D={class:"welcome-section"},_=r("h1",null,"Mosaic POS",-1),F=r("p",null,"Please enter your credentials to login.",-1),H=r("h1",null,[y("Welcome to "),r("br"),y("Account, Location")],-1),N=r("p",null,"Please enter your pin to login.",-1),R=r("p",{class:"trouble-p"},[r("b",null,"Having trouble logging in?"),y(),r("br"),y(" Please contact your administrator. ")],-1),T={class:"footercontent-left"},W={class:"col-lg-6"},z={key:0,id:"main-login-form"},B={class:"card shadow-sm"},E={class:"card-body"},G={class:"mainlogbox"},J={class:"form-group"},K={class:"form-group"},X={key:1,class:"pt-2 pinlogin-wrapper"},Y=f('<div class="form-group userdrop"><select class="form-control minimal" id="username" name="username" required><option value="">Select a user</option><option value=""></option></select></div><div class=""><input type="password" name="password" class="form-control pinput" placeholder="Input your PIN" autocomplete="current-password" readonly="readonly" required></div>',2),Z={class:"pinbuttons-tbl"},ss=r("tr",null,[r("td",null,[r("div",{class:"pinbutton"},"1")]),r("td",null,[r("div",{class:"pinbutton"},"2")]),r("td",null,[r("div",{class:"pinbutton"},"3")])],-1),es=r("tr",null,[r("td",null,[r("div",{class:"pinbutton"},"4")]),r("td",null,[r("div",{class:"pinbutton"},"5")]),r("td",null,[r("div",{class:"pinbutton"},"6")])],-1),ls=r("tr",null,[r("td",null,[r("div",{class:"pinbutton"},"7")]),r("td",null,[r("div",{class:"pinbutton"},"8")]),r("td",null,[r("div",{class:"pinbutton"},"9")])],-1),ns=r("td",null,[r("div",{class:"pinbutton pinsquare"},"clear")],-1),as=r("td",null,[r("div",{class:"pinbutton"},"0")],-1),os={class:"pinbutton pinsquare icon"},ts={class:"loginbtn"},is={key:0,class:"fas fa-spinner fa-spin"},rs=y(" Login "),cs={__name:"Login",setup(y){const f=s({day:"",time:"00:00 AM",error:{username:"",password:""},values:{username:"",password:""},validationMessages:{},loading:!1,message:"",isLoggedIn:e()||!1});let S=s({otherQuery:{},redirect:void 0}),cs=l(new Date);const ds=setInterval((()=>{cs=new Date,f.time=cs.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});const s=cs.toLocaleString("default",{month:"long"}),e=cs.toLocaleString("default",{day:"numeric"}),l=cs.toLocaleString("default",{weekday:"long"}),n=cs.toLocaleString("default",{year:"numeric"});f.day=`${l}, ${s} ${e} ${n}`}),1e3);n((()=>{clearInterval(ds)}));const us=h();a((()=>us.query),(s=>{s&&(S.redirect=s.redirect,S.otherQuery=(s=>Object.keys(s).reduce(((e,l)=>("redirect"!==l&&(e[l]=s[l]),e)),{}))(s))}),{immediate:!0});const ps=L(),gs=()=>{w(!0),f.isLoggedIn=e()},ms=()=>{k("1234"),ps.push({path:S.redirect||"/",query:S.otherQuery}),location.reload()},vs=()=>{I(),f.isLoggedIn=!1};return(s,e)=>{const l=o("fa");return t(),i("div",null,[r("div",q,[f.isLoggedIn?(t(),i("div",x,[r("div",P,[c(l,{icon:"store"})]),j])):d("",!0),U,f.isLoggedIn?(t(),i("div",M,[r("a",{class:"mt-3",href:"javascript:",onClick:vs},[c(l,{icon:"sign-out-alt"}),$])])):d("",!0)]),r("div",A,[r("div",C,[r("div",O,[r("div",Q,[r("div",V,[r("h3",null,[r("span",null,u(f.time),1)]),r("h4",null,u(f.day),1)]),r("div",D,[f.isLoggedIn?d("",!0):(t(),i(p,{key:0},[_,F],64)),f.isLoggedIn?(t(),i(p,{key:1},[H,N],64)):d("",!0),R]),r("div",T,[r("span",null,[r("b",null,"Mosaic POS Ver. "+u(g(m).version),1)])])])]),r("div",W,[f.isLoggedIn?(t(),i("div",X,[Y,r("table",Z,[ss,es,ls,r("tr",null,[ns,as,r("td",null,[r("div",os,[c(l,{icon:"backspace"})])])])]),r("div",ts,[r("button",{class:"btn btn-primary",onClick:ms},[f.loading?(t(),i("i",is)):d("",!0),rs])])])):(t(),i("div",z,[r("div",B,[r("div",E,[r("div",G,[r("div",J,[c(l,{icon:"user-alt"}),v(r("input",{type:"text",name:"username",class:"form-control",placeholder:"Username","onUpdate:modelValue":e[0]||(e[0]=s=>f.values.username=s)},null,512),[[b,f.values.username]])]),r("div",K,[c(l,{icon:"lock"}),v(r("input",{type:"password",name:"password",class:"form-control",placeholder:"Password","onUpdate:modelValue":e[1]||(e[1]=s=>f.values.password=s)},null,512),[[b,f.values.password]])]),r("div",{class:"mb-0"},[r("div",{class:"d-flex justify-content-end align-items-baseline"},[r("button",{class:"btn btn-prim btn-block",onClick:gs},"Login ")])])])])])]))])])])])}}};export{cs as default};
