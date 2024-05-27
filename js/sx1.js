document.addEventListener("DOMContentLoaded",function(){function e(e,t){var n=document.createElement("script");n.src=e,n.onload=t,document.head.appendChild(n)}e("https://cdn.jsdelivr.net/npm/marked/marked.min.js",()=>{var e;marked.setOptions({sanitizer:!0,sanitize:!0}),(e=(e=new URLSearchParams(window.location.search)).get("gist"))&&fetch("https://api.github.com/gists/"+e).then(e=>e.json()).then(e=>{e.files&&e.files["chat.json"]?(g=JSON.parse(e.files["chat.json"].content),document.getElementById("messageContainer").innerHTML="",g.forEach(e=>{B(e.content,e.role)}),u.style.display="block",document.querySelector(".previous-chats").style.display="none",m.textContent="Send Message"):console.error("No chat data found for this ID.")}).catch(e=>{console.error("Error loading chat:",e)}),null!==(e=localStorage.getItem("copyToFileEnabled"))&&(C=JSON.parse(e),document.getElementById("copyToFileToggle").checked=C),null!==(e=localStorage.getItem("webSearch"))&&(document.querySelector('input[name="webSearch"][value="'+e+'"]').checked=!0),O(),console.log("marked loaded")}),e("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.2/xlsx.full.min.js",()=>{console.log("xlsx loaded")}),e("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js",()=>{console.log("mammoth loaded")}),e("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js",()=>{var e=document.createElement("script");e.innerHTML='pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";',document.head.appendChild(e),console.log("pdfjs loaded")}),e("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js",()=>{console.log("jszip loaded")}),e("https://cdn.jsdelivr.net/npm/epubjs@0.3.88/dist/epub.min.js",()=>{console.log("epubjs loaded")});{const ue=new AbortController,he=setTimeout(()=>ue.abort(),2e3);fetch("https://api.discord.rocks/models",{method:"GET",signal:ue.signal}).then(e=>{if(clearTimeout(he),e.ok)return e.json();console.error("API models returned error status:",e.status),document.getElementById("apiStatusMessage").style.display="block"}).then(e=>{if(e){e=e.data.map(e=>e.id);{var t="Other models";const n=document.getElementById("modelDropdown"),o=document.createElement("option");o.textContent=t,o.disabled=!0,o.selected=!0,n.appendChild(o),e.forEach(e=>{var t=document.createElement("option");t.value=e,t.textContent=e,n.appendChild(t)}),n.selectedIndex=1}}}).catch(e=>{document.getElementById("apiStatusMessage").style.display="block","AbortError"===e.name?(console.error("Fetch request timed out."),document.getElementById("apiStatusMessage").textContent="Request to api.discord.rocks timed out."):console.error("Error fetching GPT API data:",e)})}let p=new AbortController;const s=document.getElementById("messageBox"),j=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent),i=(s.addEventListener("keydown",function(e){"Enter"!==e.key||j||e.shiftKey||(e.preventDefault(),V())}),document.getElementById("fileContainer"));let l=[];function P(e){e.preventDefault(),e.stopPropagation()}function q(e){s.style.border="2px dashed #8f564c"}function M(e){s.style.border=""}function n(t){for(let e=0;e<t.length;e++){const o=t[e];var n;l.some(e=>e.name===o.name)?alert(`File '${o.name}' is already attached.`):(n=o.name.split(".").pop().toLowerCase(),["xls","xlsx","csv","docx","pdf","pptx","epub","rtf"].includes(n)?(l.push(o),c(o.name,i)):((n=new FileReader).onload=function(e){var t=new Uint8Array(e.target.result),n=new TextDecoder("utf-8",{fatal:!0});try{n.decode(t),l.push(o),c(o.name,i),0<i.children.length&&(i.style.display="flex",i.style.marginBottom="10px")}catch(e){alert(`File '${o.name}' is not a supported text, rtf, spreadsheet, docx, pptx, pdf or epub file.`),console.error(e)}},n.onerror=function(e){alert(`Failed to read file: ${o.name}.
`+e.message)},n.readAsArrayBuffer(o.slice(0,100))))}}function R(o){return new Promise((n,t)=>{var e=new FileReader;e.onload=function(e){var e=new Uint8Array(e.target.result),e=XLSX.read(e,{type:"array"}),t=e.SheetNames[0],e=function(e){if(0===e.length)return"";var t=e[0],n=`| ${t.join(" | ")} |
`,t=`| ${t.map(()=>"---").join(" | ")} |
`,e=e.slice(1).map(e=>`| ${e.join(" | ")} |
`).join("");return n+t+e}(XLSX.utils.sheet_to_json(e.Sheets[t],{header:1}));n(e)},e.onerror=function(e){t(new Error(`Failed to read file "${o.name}": `+e.message))},e.readAsArrayBuffer(o)})}function J(o){return new Promise((t,n)=>{var e=new FileReader;e.onload=function(e){mammoth.extractRawText({arrayBuffer:e.target.result}).then(e=>{t(e.value)}).catch(e=>{n(new Error(`Failed to parse file "${o.name}": `+e.message))})},e.onerror=function(e){n(new Error(`Failed to read file "${o.name}": `+e.message))},e.readAsArrayBuffer(o)})}function H(n){return new Promise((t,o)=>{var e=new FileReader;e.onload=function(e){(new JSZip).loadAsync(e.target.result).then(function(e){const n=[];e.folder("ppt/slides").forEach((e,t)=>{n.push(t.async("string"))}),Promise.all(n).then(e=>{let n="";e.forEach(e=>{var t=(new DOMParser).parseFromString(e,"application/xml").getElementsByTagName("a:t");for(let e=0;e<t.length;e++)n+=t[e].textContent+"\n"}),t(n.trim())}).catch(e=>{o(new Error("Failed to parse slides: "+e.message))})}).catch(e=>{o(new Error("Failed to load ZIP: "+e.message))})},e.onerror=function(e){o(new Error(`Failed to read file "${n.name}": `+e.message))},e.readAsArrayBuffer(n)})}function W(l){return new Promise((i,t)=>{var e=new FileReader;e.onload=async function(e){try{var n=e.target.result,o=new Uint8Array(n),r=await pdfjsLib.getDocument({data:o}).promise;let t="";var a=r.numPages;for(let e=1;e<=a;e++){var s=(await(await r.getPage(e)).getTextContent()).items.map(e=>e.str).join("\n");t+=s+"\n\n"}i(t.trim())}catch(e){t(new Error(`Failed to parse file "${l.name}": `+e.message))}},e.onerror=function(e){t(new Error(`Failed to read file "${l.name}": `+e.message))},e.readAsArrayBuffer(l)})}function U(t){return new Promise((n,o)=>{var e=new FileReader;e.onload=function(e){const t=ePub(e.target.result);t.ready.then(()=>{var e=t.spine.spineItems.map(e=>e.load(t.load.bind(t)).then(()=>e.render()).then(e=>{return(new DOMParser).parseFromString(e,"text/html").body.textContent.trim()}));Promise.all(e).then(e=>{e=e.join("\n\n");n(e)}).catch(e=>{o(new Error("Failed to parse chapters: "+e.message))})}).catch(e=>{o(new Error("Failed to load EPUB: "+e.message))})},e.onerror=function(e){o(new Error(`Failed to read file "${t.name}": `+e.message))},e.readAsArrayBuffer(t)})}function _(e){return e.replace(/\\par[d]?/g,"\n").replace(/\\'[0-9a-f]{2}/gi,e=>String.fromCharCode(parseInt(e.slice(2),16))).replace(/\\[a-z]+\d* ?/gi,"").replace(/[{\\}]/g,"").replace(/\n{2,}/g,"\n")}function c(n,e,o=null){const r=document.createElement("div");r.classList.add("file-bubble");var t=document.createElement("span"),a=(t.textContent=function(e,t=8){var[n,o]=e.split(".");return n.length<=t?e:n.substring(0,t)+"..."+o}(n),document.createElement("button"));a.textContent="×",a.classList.add("close-btn"),a.addEventListener("click",e=>{var t;e.stopPropagation(),t=n,e=r,i.removeChild(e),l=l.filter(e=>e.name!==t),I(s),0===l.length&&(i.style.display="none",i.style.marginBottom="0")}),r.appendChild(a),r.appendChild(t),r.addEventListener("click",()=>{if(o)z(n,o);else{const t=l.find(e=>e.name===n);t&&!function(e){var t=e.name.split(".").pop().toLowerCase();{if(["xls","xlsx","csv"].includes(t))return R(e);if("docx"===t)return J(e);if("pdf"===t)return W(e);if("pptx"===t)return H(e);if("epub"===t)return U(e);if("rtf"===t){const o=new FileReader;return new Promise((t,n)=>{o.onload=function(e){t(_(e.target.result))},o.onerror=function(e){n(e.message)},o.readAsText(e)})}{const r=new FileReader;return new Promise((t,n)=>{r.onload=function(e){t(e.target.result)},r.onerror=function(e){n(e.message)},r.readAsText(e)})}}}(t).then(e=>{z(t.name,e)}).catch(e=>{console.error(`Failed to open file '${n}': `+e.message)})}}),s.style.maxHeight="calc(30vh - 60px)",e.appendChild(r)}function z(e,t){const n=document.createElement("div");n.classList.add("modal");var o=document.createElement("div"),r=(o.classList.add("modal-content"),document.createElement("div")),a=(r.classList.add("modal-header"),document.createElement("span")),e=(a.textContent=e,document.createElement("span")),a=(e.classList.add("close"),e.innerHTML="&times;",e.addEventListener("click",()=>{document.body.removeChild(n)}),r.appendChild(a),r.appendChild(e),document.createElement("div"));a.classList.add("modal-body"),a.textContent=t,o.appendChild(r),o.appendChild(a),n.appendChild(o),document.body.appendChild(n),n.addEventListener("click",e=>{e.target===n&&document.body.removeChild(n)})}["dragenter","dragover","dragleave","drop"].forEach(e=>{s.addEventListener(e,P,!1)}),["dragenter","dragover"].forEach(e=>{s.addEventListener(e,q,!1)}),["dragleave","drop"].forEach(e=>{s.addEventListener(e,M,!1)}),s.addEventListener("drop",function(e){e=e.dataTransfer,e=e.files;n(e),I(s)},!1);let d=0;s.addEventListener("paste",function(e){var t=e.clipboardData||window.clipboardData,t=t.getData("Text");t&&1500<t.length&&C&&(e.preventDefault(),e=new Blob([t],{type:"text/plain"}),t=new File([e],`paste-${d}.txt`,{type:"text/plain"}),d++,n([t]),I(s))});const G=document.getElementById("attachButton"),t=document.getElementById("fileInput"),m=(G.addEventListener("click",()=>t.click()),t.addEventListener("change",e=>{n(e.target.files),I(s),t.value=""}),document.getElementById("sendButton")),u=document.getElementById("backButton");var o=document.getElementById("addButton"),r=document.getElementById("runButton"),a=document.getElementById("info-link");const Y=document.getElementById("modelDropdown"),h=document.querySelector(".previous-chats ul");let g=[],f=-1,y=!0;function v(){V()}function b(){T(),g.push(g.slice(-1)[0]),p.abort(),p=new AbortController,te()}re(),I(s),o.addEventListener("click",()=>k(s.value.trim())),r.addEventListener("click",function(){document.querySelector(".previous-chats").style.display="none",A(),Z(),m.textContent="Abort",m.removeEventListener("click",v),m.addEventListener("click",b),u.style.display="block",m.className="abort-button"}),m.addEventListener("click",v),u.addEventListener("click",function(){T(),document.getElementById("messageContainer").innerHTML="",document.querySelector(".export-button-container").innerHTML="",g=[],f=-1,u.style.display="none",document.querySelector(".message-form").style.flex="1",document.querySelector(".previous-chats").style.display="block",m.textContent="Start Chat",I(s),y=!0,O(),setTimeout(()=>{document.documentElement.scrollIntoView({behavior:"smooth",block:"start"})},0)}),a.addEventListener("click",function(){confirm("Created by @pianoth, LLMs and domain provided by @meow_18838.\nPowered by the Discord Rocks API (https://api.discord.rocks/).\n\nDo you want to visit the Discord Rocks API website?")&&(window.location.href="https://api.discord.rocks/")});o=document.getElementById("settingsButton");const E=document.getElementById("settingsModal");r=E.querySelector(".close"),a=document.getElementById("saveSettingsButton");const X=document.getElementById("systemPromptInput"),Q=document.getElementById("maxTokensInput");let w=4096,C=(X.addEventListener("input",function(){I(this)}),document.getElementById("maxTokensInput").addEventListener("input",function(){4096<this.value&&(alert("Max tokens cannot exceed 4096."),this.value=4096)}),o.addEventListener("click",function(){X.value=document.getElementById("systemPromptInput").value,Q.value=w,E.style.display=""}),r.addEventListener("click",function(){E.style.display="none"}),!0);a.addEventListener("click",function(){C=document.getElementById("copyToFileToggle").checked,localStorage.setItem("copyToFileEnabled",JSON.stringify(C)),localStorage.setItem("webSearch",document.querySelector('input[name="webSearch"]:checked').value),document.getElementById("systemPromptInput").value=X.value,w=parseInt(Q.value)||4096,E.style.display="none"}),window.addEventListener("click",function(e){e.target===E&&(E.style.display="none")}),s.addEventListener("input",function(){I(this)});let x=!0;function k(o,a="user"){return new Promise((e,t)=>{if(u.style.display="block",0<l.length){let r="";var n=l.map(o=>new Promise((n,t)=>{var e=o.name.split(".").pop().toLowerCase();["xls","xlsx","csv"].includes(e)?R(o).then(e=>{r+=`
${o.name}
\`\`\`
${e}
\`\`\`
`,n()}).catch(e=>{t(new Error(`Failed to parse file "${o.name}": `+e.message))}):"docx"===e?J(o).then(e=>{e=e.replace(/`/g,"\\`"),r+=`
${o.name}
\`\`\`
${e}
\`\`\`
`,n()}).catch(e=>{t(new Error(`Failed to parse file "${o.name}": `+e.message))}):"pdf"===e?W(o).then(e=>{e=e.replace(/`/g,"\\`"),r+=`
${o.name}
\`\`\`
${e}
\`\`\`
`,n()}).catch(e=>{t(new Error(`Failed to parse file "${o.name}": `+e.message))}):"pptx"===e?H(o).then(e=>{e=e.replace(/`/g,"\\`"),r+=`
${o.name}
\`\`\`
${e}
\`\`\`
`,n()}).catch(e=>{t(new Error(`Failed to parse file "${o.name}": `+e.message))}):"epub"===e?U(o).then(e=>{e=e.replace(/`/g,"\\`"),r+=`
${o.name}
\`\`\`
${e}
\`\`\`
`,n()}).catch(e=>{t(new Error(`Failed to parse file "${o.name}": `+e.message))}):("rtf"===e?((e=new FileReader).onload=function(e){e=_(e.target.result);r+=`
${o.name}
\`\`\`
${e}
\`\`\`
`,n()},e.onerror=function(e){t(new Error(`Failed to read file: ${o.name}.
`+e.message))},e):((e=new FileReader).onload=function(e){let t=e.target.result;t=t.replace(/`/g,"\\`"),r+=`
${o.name}
\`\`\`
${t}
\`\`\`
`,n()},e.onerror=function(e){t(new Error(`Failed to read file: ${o.name}.
`+e.message))},e)).readAsText(o)}));Promise.all(n).then(()=>{d=0,o+=r,l=[],i.style.display="none",i.innerHTML="",g.push({role:a,content:o}),s.value="",I(s),document.querySelector(".previous-chats").style.display="none",A(),B(o,a),T(),e()}).catch(e=>{console.error(e),k("Failed to read attached files.","assistant"),t(e)})}else g.push({role:a,content:o}),s.value="",I(s),document.querySelector(".previous-chats").style.display="none",A(),B(o,a),T(),e()})}function K(e,r){const t=h.children[h.children.length-1-r].querySelector('button[title="Generate a new title for the chat."]'),n=document.createElement("span");n.className="loading-spinner",t.appendChild(n);e={model:"gpt-4o",messages:[{role:"system",content:"You generate title to conversations. You do NOT respond to the message. You do NOT continue the conversation. You use plain text, no markdown."},{role:"user",content:"IMPORTANT: Only create a title for the chat based on the message or conversation. Do NOT respond to the message. Do NOT continue the conversation. Only generate a title. Use plain text, no markdown.\n\n---\n\nCONTEXT:\n\n"+e+"\n\n---\n\nIMPORTANT: Only create a title for the chat based on the message or conversation. Do NOT respond to the message. Do NOT continue the conversation. Only generate a title. Use plain text, no markdown."}],max_tokens:20};const o=new AbortController,a=setTimeout(()=>o.abort(),15e3);fetch("https://api.discord.rocks/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),signal:o.signal}).then(e=>{if(clearTimeout(a),e.ok)return e.json();console.error("API returned error status:",e.status)}).then(t=>{if(t.response&&0<t.response.length){let e=t.response.trim();e.startsWith('"')&&(e=e.endsWith('"')?e.slice(1,-1):e.slice(1)),t=e,n=r,o=JSON.parse(localStorage.getItem("chats"))||[],n<o.length?(o[n].title=t,localStorage.setItem("chats",JSON.stringify(o)),D()):console.error("Invalid chat index:",n)}var n,o}).catch(e=>{t.removeChild(n),"AbortError"===e.name?console.error("Fetch request for the chat title timed out."):console.error("Error fetching chat title:",e)})}function V(){let t=s.value.trim();(t||0<l.length)&&k(t,"user").then(()=>{var e;y&&(e=JSON.parse(localStorage.getItem("chats"))||[],K(t,e.length-1),y=!1),Z(),m.textContent="Abort",m.removeEventListener("click",v),m.addEventListener("click",b),m.className="abort-button"}).catch(e=>{console.error("Error processing files:",e),k("Failed to read attached files.","assistant")})}function Z(){var e=document.querySelector('input[name="webSearch"]:checked').value;if("on"===e){const t=B("Thinking...","loading");!function(e){var t=new Date;const o={model:"llama3-8b-8192",messages:[{role:"user",content:`Here is a conversation from the user:
                    <conversation>
                    ${JSON.stringify(e)}
                    </conversation>
                    
                    Your task is to generate a search query that you would enter into the DuckDuckGo search engine to find information that could help respond to the user's message. Do not attempt to directly answer the message yourself. Instead, focus on creating a search query that would surface the most relevant information from DuckDuckGo.
                    
                    Output your search query between \` characters, like this: \`example search query\`
                    
                    Respond with plain text only. Do not use any markdown formatting. Do not include any text before or after the search query.
                    
                    Remember, today's date is ${t.toDateString()}. Keep this date in mind to provide time-relevant context in your search query if needed.
                    
                    Focus on generating the single most relevant search query you can think of to address the user's message. Do not provide multiple queries.`}],max_tokens:40};return new Promise((t,n)=>{fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{Authorization:"Bearer "+ie,"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>{if(e.ok)return e.json();throw new Error("Network response was not ok")}).then(e=>{(response=e.choices[0].message.content)&&response.startsWith("`")&&response.endsWith("`")?((response=response.slice(1,-1)).startsWith('"')&&response.endsWith('"')&&(response=response.slice(1,-1)),t(response)):(console.error("Invalid response from the API:",e),n(new Error("Invalid response from the API")))}).catch(e=>{console.error("Error fetching web search query:",e),n(e)})})}(g).then(e=>{ee(t,e)}).catch(e=>{console.error("Error in web search:",e),document.getElementById("messageContainer").removeChild(t),S()})}else if("off"===e)S();else{const n=B("Thinking...","loading");!function(e){var t=new Date;const o={model:"llama3-8b-8192",messages:[{role:"user",content:`Here is a conversation from the user:
                    <conversation>
                    ${JSON.stringify(e)}
                    </conversation>
                    
                    Please carefully analyze the conversation to determine if a web search is needed in order for you to provide an appropriate response to the latest message. 

                    If you don't think you need to do a web search in order to respond, just reply with a very short message saying "NO".

                    If you believe a search is necessary, generate a search query that you would enter into the DuckDuckGo search engine to find the most relevant information to help you respond.
                    
                    Put your search query between backticks, like this: \`example search query\`

                    Respond with plain text only. Do not use any markdown formatting. Do not include any text before or after the search query.

                    Remember, today's date is ${t.toDateString()}. Keep this date in mind to provide time-relevant context in your search query if needed.
                    
                    Focus on generating the single most relevant search query you can think of to address the user's message. Do not provide multiple queries.`}],max_tokens:40};return new Promise((t,n)=>{fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{Authorization:"Bearer "+ie,"Content-Type":"application/json"},body:JSON.stringify(o)}).then(e=>{if(e.ok)return e.json();throw new Error("Network response was not ok")}).then(e=>{(response=e.choices[0].message.content)&&response.startsWith("`")&&response.endsWith("`")?((response=response.slice(1,-1)).startsWith('"')&&response.endsWith('"')&&(response=response.slice(1,-1)),t(response)):t("FwFCQI69pikGw6SQE2z6")}).catch(e=>{console.error("Error fetching web search query:",e),n(e)})})}(g).then(e=>{e&&"FwFCQI69pikGw6SQE2z6"!==e?ee(n,e):(document.getElementById("messageContainer").removeChild(n),S())}).catch(e=>{console.error("Error in auto web search:",e),document.getElementById("messageContainer").removeChild(n),S()})}}function ee(r,a){var e;r.textContent="Searching for `"+a+"`...",e=a,new Promise((t,n)=>{fetch("https://cloudflare-cors-anywhere.queakchannel42.workers.dev/?https://duckduckgo.com/html/?q="+encodeURIComponent(e)).then(e=>{if(e.ok)return e.text();throw new Error("Network response was not ok")}).then(e=>{var e=(new DOMParser).parseFromString(e,"text/html").querySelectorAll(".result");0<e.length?(e=Array.from(e).slice(0,7).map(e=>{return[e.querySelector(".result__title .result__a").textContent,decodeURIComponent(e.querySelector(".result__title .result__a").href.match(/[?&]uddg=([^&]+)/)[1]),e.querySelector(".result__snippet").textContent]}),t(e)):t("No search results found")}).catch(e=>{console.error("Error fetching search results:",e),n(e)})}).then(e=>{var t="This message prompted a DuckDuckGo search query: `"+a+"`. Use these results in your answer. The results are:\n\n"+e.map((e,t)=>`${t+1}. [${e[0]}](${e[1]})\n${e[2]}\n\n`).join("")+`

To quote the results you can use this format: [1].

If you need to quote multiple results, do not group multiple quotes together, but rather quote each result separately, like this: [1], [2].

The links will be automatically filled, you don't have to include them if you use this format.`,n=Y.value,o=document.getElementById("systemPromptInput").value.trim(),o={messages:o?[...g.slice(0,-1),{role:"system",content:o},...g.slice(-1),{role:"system",content:t}]:[...g,{role:"system",content:t}],model:n,max_tokens:w,stream:!0};document.getElementById("messageContainer").removeChild(r),S(o,e.map((e,t)=>`[${t+1}]: `+e[1]).join("\n")+"\n")}).catch(e=>{console.error("Error in search:",e),document.getElementById("messageContainer").removeChild(r),S()})}function S(e=null,t=null){var n=Y.value,o=document.getElementById("systemPromptInput").value.trim(),e=e||{messages:o?[...g.slice(0,-1),{role:"system",content:o},...g.slice(-1)]:g,model:n,max_tokens:w,stream:!0};{var r=e;o=t;const l=B("Loading...","loading");let n=0,s=o||"",i="";!function t(){u.disabled=!0,p=new AbortController,fetch("https://api.discord.rocks/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r),signal:p.signal}).then(e=>{const o=e.body.getReader(),r=new TextDecoder("utf-8"),a=(l.innerHTML="",document.createElement("span"));a.classList.add("message-content"),l.appendChild(a),o.read().then(function e({done:t,value:n}){t?(document.getElementById("messageContainer").removeChild(l),B((s=""===s.trim()?"No response from the API.":s).trim(),"assistant"),g.push({role:"assistant",content:s.trim()}),T(),O(),te(),u.disabled=!1):(t=r.decode(n,{stream:!0}),n=(i+=t).split("\n\n"),i=n.pop(),n.forEach(t=>{try{var e,n;t.startsWith("data: ")&&"[DONE]"!==(e=t.split("data: ")[1])&&(n=JSON.parse(e)).choices&&n.choices[0].delta&&n.choices[0].delta.content&&(s+=n.choices[0].delta.content,ne(a,s),l.className="assistant-message")}catch(e){console.error("Failed to parse event:",e,"Event:",t)}}),o.read().then(e).catch(e=>{"AbortError"===e.name?(document.getElementById("messageContainer").removeChild(l),g.pop(),u.disabled=!1,s.trim()&&(k(s.trim(),"assistant"),T(),O())):console.error("Error:",e)}))})}).catch(e=>{"AbortError"===e.name?x=!1:console.error("Error:",e),n<2&&x?(n++,l.textContent=`Retrying (${n}/2)...`,setTimeout(t,1e3)):(u.disabled=!1,g.pop(),te(),x?(l.textContent="Failed to load response after multiple retries.",l.className="error-message"):(l.parentNode.removeChild(l),s.trim()&&(k(s.trim(),"assistant"),T())))})}()}}function te(){m.textContent="Send Message",m.removeEventListener("click",b),m.addEventListener("click",v),m.className=""}function I(e){e.style.height="auto",e.style.height=e.scrollHeight+"px";var t=0<l.length?"calc(30vh - 60px)":"30vh";e.style.maxHeight=t,document.getElementById("messageBoxContainer").contains(e)&&(e.style.paddingLeft=G.offsetWidth+15+"px")}function ne(e,n){if(r=n,/\\[a-zA-Z([]+/.test(r)){r=/\\\[[\s\S]*?\\\]/g;let a=0;const s=[],i=[];var o=(e,t,n,o)=>{var r=`$$$$$MATH$${a++}$$$$$`;return s.push({match:e,placeholder:r}),r};n=(n=n.replace(/\\\(.*?\\\)/g,o)).replace(r,o),s.forEach(e=>{try{var t=katex.renderToString(e.match.slice(2,-2),{throwOnError:!1,displayMode:e.match.startsWith("\\[")});i.push({placeholder:e.placeholder,html:t})}catch(e){console.error("KaTeX rendering error:",e)}});let t=marked.parse(n);i.forEach(e=>{t=t.replace(e.placeholder,e.html)}),e.innerHTML=t.replace(/(?<!<\/?\w+>)\n(?!\s*<\/?\w+>)/g,"<br>")}else{if(r=n,!/[#*_\[\]`!]/.test(r))return void(e.innerHTML=n.replace(/\n/g,"<br>"));e.innerHTML=marked.parse(n).replace(/(?<!<\/?\w+>)\n(?!\s*<\/?\w+>)/g,"<br>")}var r;e.querySelectorAll("pre").forEach(t=>{var e=document.createElement("button");e.textContent="Copy Code",e.className="copy-code-button",e.onclick=function(){var e=t.innerText.slice(0,-11);navigator.clipboard.writeText(e).then(()=>alert("Code copied to clipboard!")).catch(e=>console.error("Failed to copy code: ",e))},t.appendChild(e)})}function L(e,t,n=!0){if(/\n[^\n]+\.\w+\n```\n([\s\S]*?)\n```/g.test(t)&&n){var o,r=e,a=t,s=/\n[^\n]+\.\w+\n```\n([\s\S]*?)\n```/g,n=(r.innerHTML="",a.replace(s,""));for(n.trim()&&(ne(o=document.createElement("span"),n.trim()),r.appendChild(o));null!==(l=s.exec(a));){var i=l[0].match(/\n[^\n]+\.\w+/)[0].trim(),l=l[1].trim();c(i,r,l)}}else ne(e,t)}function oe(s,i,l,c,d,m,n,u){var e=1e3+function(e){var t,n=/^\[\d+\]:\s+https?:\/\/\S+\s*/gm;let o=0;for(;null!==(t=n.exec(e));)o+=t[0].length;return o}(n);const h="user-message"===m.className;if(n.length>e){const t=n.substring(0,e)+"...",o=(L(d,t,h),document.createElement("button"));o.textContent="Show More",o.className="show-more-button",o.title="Show the full content of this message.",o.setAttribute("aria-describedby","showMoreButtonDesc"),m.appendChild(o),o.onclick=function(){"Show More"===o.textContent?(L(d,n,h),o.textContent="Show Less",o.title="Collapse the content of this message.",o.setAttribute("aria-describedby","showLessButtonDesc")):(L(d,t,h),o.textContent="Show More",o.title="Show the full content of this message.",o.setAttribute("aria-describedby","showMoreButtonDesc"))}}else L(d,n,h);c.addEventListener("change",()=>{var e=c.value,t=parseInt(m.id.split("-")[1]);-1!==t&&(p.abort(),p=new AbortController,g[t].role=e,T(),m.className=e+"-message")}),s.onclick=function(){x=!1,p.abort();let t=parseInt(m.id.split("-")[1]);if(-1!==t){const r=document.createElement("textarea");r.style.width="100%",r.value=g[t].content,setTimeout(()=>{I(r)},0),r.addEventListener("input",function(){I(this)});var n=document.createElement("button"),o=(n.textContent="Confirm",n.className="confirm-button",n.title="Confirm the changes.",n.setAttribute("aria-describedby","confirmButtonDesc"),document.createElement("button"));o.textContent="Cancel",o.className="cancel-button",o.title="Cancel the changes.",o.setAttribute("aria-describedby","cancelButtonDesc"),m.replaceChild(r,d),u.innerHTML="";const a=m.querySelector(".show-more-button");let e=null!==a;e&&m.removeChild(a),u.appendChild(n),u.appendChild(o),n.onclick=function(){g[t]?g[t].content=r.value:g.push({role:"user",content:r.value}),L(d,r.value,h),m.replaceChild(d,r),u.innerHTML="",u.appendChild(s),u.appendChild(i),u.appendChild(l),u.appendChild(c),T(),oe(s,i,l,c,d,m,r.value,u)},o.onclick=function(){m.replaceChild(d,r),u.innerHTML="",u.appendChild(s),u.appendChild(i),u.appendChild(l),u.appendChild(c),e&&m.appendChild(a)}}},i.onclick=function(){if(confirm("Are you sure you want to delete this message?")){p.abort(),document.getElementById("messageContainer").removeChild(m),g=g.filter(e=>e.content!==n),T();var t=document.getElementById("messageContainer").children;for(let e=0;e<t.length;e++)t[e].setAttribute("id","message-"+e);O()}},l.onclick=function(){navigator.clipboard.writeText(n).then(()=>alert("Message copied to clipboard!")).catch(e=>console.error("Failed to copy text: ",e))}}function B(e,n){const t=document.createElement("div");t.classList.add("messageDiv"),t.setAttribute("id","message-"+document.getElementById("messageContainer").children.length),t.style.flexDirection="column",t.style.alignItems="center";var o=document.createElement("span"),r=(o.classList.add("message-content"),t.appendChild(o),document.createElement("div")),a=(r.className="message-buttons",document.createElement("button")),s=(a.textContent="Edit",a.className="edit-button",a.title="Edit this message.",a.setAttribute("aria-describedby","editButtonDesc"),document.createElement("button")),i=(s.textContent="Delete",s.className="delete-button",s.title="Delete this message.",s.setAttribute("aria-describedby","deleteButtonDesc"),document.createElement("button"));i.textContent="Copy",i.className="copy-button",i.title="Copy this message to the clipboard.",i.setAttribute("aria-describedby","copyButtonDesc");const l=document.createElement("select");l.className="role-selector",l.title="Change the role of this message.",l.setAttribute("aria-describedby","roleSelectDesc");return["user","assistant","system"].forEach(e=>{var t=document.createElement("option");t.value=e,t.textContent=e.charAt(0).toUpperCase()+e.slice(1),e===n&&(t.selected=!0),l.appendChild(t)}),r.appendChild(a),r.appendChild(s),r.appendChild(i),r.appendChild(l),t.className="user"===n?"user-message":"assistant"===n?"assistant-message":"system"===n?"system-message":"loading-message",document.getElementById("messageContainer").appendChild(t),setTimeout(()=>{t.getBoundingClientRect(),t.scrollIntoView({behavior:"smooth",block:"center"})},0),"loading"!==n?(L(o,e,"user"===n),t.appendChild(r),oe(a,s,i,l,o,t,e,r)):o.textContent=e,t}function T(){var e,t=JSON.parse(localStorage.getItem("chats"))||[];-1===f||f>=t.length?(e={timestamp:(new Date).toISOString(),title:"Chat on "+(new Date).toLocaleString(),conversation:g},t.push(e),f=t.length-1):t[f].conversation=g,localStorage.setItem("chats",JSON.stringify(t)),D()}function re(){var t=JSON.parse(localStorage.getItem("chats"))||[];h.innerHTML="";for(let e=t.length-1;0<=e;e--)!function(t,o){var e=document.createElement("li"),n=(e.textContent=""+(t.title||"Untitled"),document.createElement("button")),r=(n.textContent="Edit",n.title="Edit the title of the chat.",n.setAttribute("aria-describedby","editTitleButtonDesc"),n.onclick=function(e){e.stopPropagation();var t,e=o,n=prompt("Enter new title for the chat:");n&&(t=JSON.parse(localStorage.getItem("chats")))&&t.length>e&&(t[e].title=n,localStorage.setItem("chats",JSON.stringify(t)),D())},document.createElement("button")),a=(r.textContent="Generate",r.title="Generate a new title for the chat.",r.setAttribute("aria-describedby","generateTitleButtonDesc"),r.onclick=function(e){e.stopPropagation(),K(t.conversation.map(e=>e.content).join("\n"),o)},document.createElement("button"));a.textContent="Delete",a.title="Delete the chat.",a.setAttribute("aria-describedby","deleteChatButtonDesc"),a.onclick=function(e){e.stopPropagation();var t,e=o;confirm("Are you sure you want to delete this chat?")&&(t=JSON.parse(localStorage.getItem("chats")))&&t.length>e&&(t.splice(e,1),localStorage.setItem("chats",JSON.stringify(t)),setTimeout(O(),0),D())},e.appendChild(n),e.appendChild(r),e.appendChild(a),e.onclick=()=>{var e=o;if(y=!1,(t=JSON.parse(localStorage.getItem("chats")))&&t.length>e){var t=t[e],n=(g=t.conversation,f=e,document.getElementById("messageContainer").innerHTML="",g.forEach(e=>{B(e.content,e.role)}),document.getElementById("messageContainer").children);for(let e=0;e<n.length;e++)n[e].setAttribute("id","message-"+e);u.style.display="block",document.querySelector(".previous-chats").style.display="none",A(),m.textContent="Send Message",I(s)}},h.appendChild(e)}(t[e],e)}function D(){h.innerHTML="",re()}function A(){var e=document.querySelector(".export-button-container");e.innerHTML=`
            <button id="exportChatButton" class="export-button" title="Export the current chat as a text file." aria-describedby='exportChatDesc'>Export chat</button>
            <button id="shareChatButton" class="export-button" title="Create a shareable link to the current chat." aria-describedby='shareChatDesc'>Share chat</button>
        `,e.appendChild(N),N.style.display="",O(),document.getElementById("exportChatButton").onclick=function(){var e=JSON.parse(localStorage.getItem("chats")),t=function(e){var n=JSON.parse(localStorage.getItem("chats"));if(n&&n.length>e){n=n[e];let t="";return n.conversation.forEach(e=>{t+=`*${e.role}* : ${e.content}

---

`}),t.substring(0,t.length-7)}}(f),t=new Blob([t],{type:"text/plain"}),t=URL.createObjectURL(t),n=document.createElement("a");n.href=t,n.download=`${e[f].title||"Untitled"}.txt`,n.click(),URL.revokeObjectURL(t)},document.getElementById("shareChatButton").onclick=function(){var e;confirm("Warning: Do not share sensitive data. The only way to un-share the chat is to contact @pianoth and sending the chat link to be removed.\n\nDo you want to create a public link for this chat?")&&(e=g,fetch("https://api.github.com/gists",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"token "+se},body:JSON.stringify({description:"LLM Playground Chat",public:!0,files:{"chat.json":{content:JSON.stringify(e)}}})}).then(e=>e.json()).then(e=>{var t;e.id?(t=""+window.location.origin+window.location.pathname+"?gist="+e.id,confirm("Shareable link created: "+t+"\n\nDo you want to copy the URL to the clipboard?")&&navigator.clipboard.writeText(t).then(()=>alert("Link copied to clipboard.")).catch(e=>console.error("Failed to copy link: ",e))):console.error("Failed to save chat data:",e)}).catch(e=>{console.error("Error:",e)}))}}function ae(e){return e.split("").reverse().join("")}const se=ae(atob("azFaTWlKNDBMeXhtMFQzMmZxcW4yYXlkOGxpWnJPT0VZbEhWNEtfcGhneDk=")).slice(2,-2),ie=ae(atob("c3A3ck9wM3JRbEgxckFKdHBlNWJPYjE5NkRtWUYzYnlkR1c3eDdMR1hIMlEzVmtndkQwRVpQaV9rc2c5eDE=")).slice(3,-3);const N=document.createElement("div"),F=(N.classList.add("message-counter"),N.textContent="Messages: 0",N.style.display="none",document.querySelector(".export-button-container").appendChild(N),document.createElement("div"));function O(){var e=g.length;N.textContent="Messages: "+e;let t=0;(JSON.parse(localStorage.getItem("chats"))||[]).forEach(e=>{t+=e.conversation.length}),F.textContent="Total Messages: "+t}F.classList.add("global-message-counter"),F.textContent="Total Messages: 0",document.querySelector(".previous-chats").appendChild(F);const $=document.createElement("textarea"),le=($.id="searchTextarea",$.placeholder="Search chats...",document.querySelector(".previous-chats-controls").appendChild($),document.getElementById("searchButton")),ce=document.getElementById("exportDataButton"),de=document.getElementById("importDataButton"),me=document.getElementById("deleteDataButton");le.addEventListener("click",function(){"block"===$.style.display?($.style.display="none",$.value="",le.textContent="Search",ce.style.display="inline",de.style.display="inline",me.style.display="inline",document.querySelectorAll(".previous-chats li").forEach(e=>e.style.display="list-item")):($.style.display="block",le.textContent="Close Search",ce.style.display="none",de.style.display="none",me.style.display="none")}),$.addEventListener("input",function(){const o=$.value.toLowerCase(),r=JSON.parse(localStorage.getItem("chats"))||[];document.querySelectorAll(".previous-chats li").forEach((e,t)=>{var t=r.length-1-t,t=r[t],n=t.title.toLowerCase(),t=t.conversation.map(e=>e.content.toLowerCase()).join(" ");n.includes(o)||t.includes(o)?e.style.display="list-item":e.style.display="none"})}),ce.addEventListener("click",function(){var e;confirm("Do you want to export the chats to the clipboard?")&&((e=localStorage.getItem("chats"))?navigator.clipboard.writeText(e).then(()=>alert("Chats exported to clipboard.")).catch(e=>console.error("Failed to copy chats: ",e)):alert("No chats available to export."))}),de.addEventListener("click",function(){confirm("Do you want to import chats from the clipboard? You need to click the paste button after this confirming. This will overwrite existing chats.")&&navigator.clipboard.readText().then(e=>{try{var t=JSON.parse(e);Array.isArray(t)?(localStorage.setItem("chats",JSON.stringify(t)),D(),O(),alert("Chats imported successfully.")):alert("Invalid chat data.")}catch(e){console.error("Failed to parse imported chats: ",e),alert("Failed to import chats.")}}).catch(e=>console.error("Failed to read from clipboard: ",e))}),me.addEventListener("click",function(){confirm("Do you want to delete all chats?")&&(localStorage.removeItem("chats"),D(),O(),alert("All chats deleted."))}),document.getElementById("theme-toggle").addEventListener("click",()=>{document.body.classList.toggle("light-mode"),document.body.classList.contains("light-mode")?(localStorage.setItem("theme","light"),document.body.style.backgroundColor="#f1f1f1",document.documentElement.style.backgroundColor="#f1f1f1"):(localStorage.removeItem("theme"),document.body.style.backgroundColor="#333",document.documentElement.style.backgroundColor="#333")}),localStorage.getItem("theme")&&(document.body.classList.add("light-mode"),document.body.style.backgroundColor="#f1f1f1",document.documentElement.style.backgroundColor="#f1f1f1")});
