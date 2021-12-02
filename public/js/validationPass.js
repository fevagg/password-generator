document.addEventListener("DOMContentLoaded", ()=>{
    const passInput = Array.from(document.getElementsByClassName("form-check-input"))
    const checked = element => element.checked;
    const btn = document.getElementById("btnpass");
    btn.addEventListener("click", (event)=>{
        if(!passInput.some(checked)){
           event.preventDefault();
           event.stopImmediatePropagation();
           alert("Select at least one character type")
        }
    })
});