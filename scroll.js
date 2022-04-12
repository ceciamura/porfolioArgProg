export default function aparecerImagen(img){
 const d= document;

   setTimeout(function()
   { d.querySelector(img).classList.add("aparecerImg")
},1000);
}


