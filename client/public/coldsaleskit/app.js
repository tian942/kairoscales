const form=document.getElementById('kit-form');
document.getElementById('started-at').value=Date.now();document.getElementById('year').textContent=new Date().getFullYear();
form.addEventListener('submit',async(event)=>{
 event.preventDefault();if(!form.reportValidity())return;
 const button=document.getElementById('submit'),status=document.getElementById('form-status');
 const data=Object.fromEntries(new FormData(form));
 const phone=data.phone.replace(/\D/g,'');if(phone.length<7||phone.length>15){status.textContent='Please enter a valid phone number, including your country code.';document.getElementById('phone').focus();return;}
 for(const k of ['utm_source','utm_medium','utm_campaign'])data[k]=new URLSearchParams(location.search).get(k)||'';
 data.source=location.origin+location.pathname;
 button.disabled=true;button.innerHTML='Getting your kit… <span aria-hidden="true">↗</span>';status.textContent='';
 const abort=new AbortController();const timer=setTimeout(()=>abort.abort(),20000);
 try{const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:abort.signal});const result=await response.json();if(!response.ok||!result.ok)throw new Error(result.error||'Please try again in a moment.');location.assign('https://github.com/tian942/the-cold-sales-kit');}
 catch(error){status.textContent=error.name==='AbortError'?'That took too long. Please try again.':(error.message||'Could not save your details. Please try again.');button.disabled=false;button.innerHTML='Download the kit for free <span aria-hidden="true">↗</span>';}
 finally{clearTimeout(timer);}
});
