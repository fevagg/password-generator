document.addEventListener("DOMContentLoaded", ()=>{
    const eyeArray = document.getElementsByClassName("eye-show");
    const passArray = document.getElementsByClassName("password");
    const btnArray = document.getElementsByClassName("btn-copy-past");
    for(let i = 0; i < passArray.length; i++){
        const pass = passArray[i];
        const btn = btnArray[i];
        const eye = eyeArray[i];
        btn.addEventListener("click", ()=>{
            pass.select()
            pass.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(pass.value);
        })
        eye.addEventListener("click", (event)=>{
            if(event.target.classList.contains("fa-eye-slash")){
                event.target.classList.replace("fa-eye-slash", "fa-eye");
                pass.type = "password"
            }else{
                event.target.classList.replace("fa-eye", "fa-eye-slash");
                pass.type = "text"
            }
        })
        pass.type = "password"
        eye.style.cursor = "pointer"
    }
});