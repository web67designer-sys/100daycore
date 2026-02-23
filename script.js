function askAI(){
let q=document.getElementById("question").value;
fetch("/ai",{method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({q:q})})
.then(res=>res.json())
.then(data=>{
document.getElementById("ai_answer").innerText=data.answer;
});
}
