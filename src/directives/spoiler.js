export default {
    bind(el) {
        el.firstChild.addEventListener("click", function(){
            this.parentElement.classList.toggle("hide");
        });        
    }
}