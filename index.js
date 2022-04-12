import login from "./login.js";
import aparecerImagen from "./scroll.js";
const d= document;
d.addEventListener("DOMContentLoaded", (e)=>{
    login("#login", ".form", ".is-success");
    aparecerImagen(".foto");
})