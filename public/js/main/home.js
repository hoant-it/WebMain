// import Home from "../Home.js"

var menuIcon= document.querySelector(".menu-icon");
var sidebar= document.querySelector(".sidebar");
var containerMain= document.querySelector(".container-main");
var extend= document.getElementById("extend");
var txtSearch = document.getElementById('txtSearch')
var sSearch=txtSearch.value;
var html='';
var sidebarMenu= document.getElementById('menu');





sidebarMenu.addEventListener('click',function(event){
    // console.log(event.target);
    // var a= $(event.target).attr('class');
    // console.log(event.target);
    // console.log($(event.target).attr('class'));
    if($(event.target).attr('class') ==='sub-btn' || $(event.target).attr('class') ==='sub-btn active'){
        // console.log(event.target);
      
        $(event.target).next('.sub-menu').slideToggle();
      //   $(this).find('.dropdown').toggleClass('rotate');
        $(event.target).toggleClass('active');
      
        let icon = $(event.target).children("i")
        if($(event.target).hasClass("active")){
          icon.removeClass("fas fa-plus").addClass("fas fa-minus")
            
      } else{
          icon.removeClass("fas fa-minus").addClass("fas fa-plus")
      }

    }

    if($(event.target).attr('class') ==='sub-item'){
        var subMenuActive =   $('.sub-item')
        subMenuActive.each(function(){
            subMenuActive.removeClass("sub-item active").addClass("sub-item")
    
        });
        $(event.target).toggleClass('active');
    }
    var menu=sidebarMenu.innerHTML;
    localStorage.setItem('menuItem', menu);
})

// const navigateTo = url => {
//     history.pushState(null,null,url),
//     router();
// }


// const router = async () => {
//     const routes = [
//         // {path:"/home",view : Home},
//         {path:"/home",view:() =>console.log("viewwing QTKT")},
//         {path:"/kithuat/QTKT",view:() =>console.log("viewwing QTKT")},
//         // {path:"/",view:() =>console.log("viewwing settings")}
//     ]

//     //test each roite for potential match
//     const potentialMatches= routes.map(route =>{
//         return{
//             route:route,
//             isMatch: location.pathname === route.path

//         }
//     })

//     let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
//     if(!match){
//         match={
//             route:routes[0],
//             isMatch: true
//         }
//     }
    
//     // const view =new match.route.view();
//     // console.log(view);

//     // containerMain.innerHTML = await view.getHtml();

//     containerMain.innerHTML = `<div class="row">
//     <div class="col-md-12 col-sm-12 ">
//         <div class="x_panel">
//             <div class="x_title">
//                 <h2>Form Design <small>different form elements</small></h2>
//                 <ul class="nav navbar-right panel_toolbox">
//                     <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
//                     </li>
//                 </ul>
//                 <div class="clearfix"></div>
//             </div>
//             <div class="x_content">
//                 <br>
//                 <div class="form-group row">
//                     <label class="control-label col-md-3 col-sm-3 col-xs-3">Phone mask</label>
//                     <div class="col-md-9 col-sm-9 col-xs-9">
//                         <input type="text" class="form-control" data-inputmask="'mask' : '(999) 999-9999'">
//                         <span class="fa fa-user form-control-feedback right" aria-hidden="true"></span>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     </div>
// </div>`

   
// }

// document.addEventListener('popstate',router);

// document.addEventListener('DOMContentLoaded',() =>{
//     document.body.addEventListener('click', e =>{
//         if(e.target.matches('[data-link]')) {
//             e.preventDefault();
//             navigateTo(e.target.href);
//         }
//     })
//     router();
// })



function RenderSibebarMenu(){
  
    // alert("load")
    // $.ajax({
    //     url: window.location.origin+'/sp_Wacoal_LoadMenuWeb_V1/',
    //     type:'GET',
    //     success:(res) =>{
    //         if(!html){
    //             html= res;
    //         }
    //         // console.log(html);
    //         sidebarMenu.innerHTML=html;

    //     },  error: (err)=>{
    //         console.log(err)
    //       }
    // })
}


// txtSearch.addEventListener('click',RenderSibebarMenu)
function logout(){
    localStorage.clear();
    document.getElementById('frmLogout').submit();
}



extend.addEventListener("click", function(){
    $(this).toggleClass('down');
    if($(this).hasClass("down")){
        $(this).removeClass("fas fa-angle-down").addClass("fas fa-angle-up")
          
    } else{
        $(this).removeClass("fas fa-angle-up").addClass("fas fa-angle-down")
    }

    $('.sub-btn').each(function(){
        $(this).next('.sub-menu').slideToggle();
        //   $(this).find('.dropdown').toggleClass('rotate');
          $(this).toggleClass('active');
        
          let icon = $(this).children("i")
          if($(this).hasClass("active")){
            icon.removeClass("fas fa-plus").addClass("fas fa-minus")
              
        } else{
            icon.removeClass("fas fa-minus").addClass("fas fa-plus")
        }
        
    });

    var menu=sidebarMenu.innerHTML;
    localStorage.setItem('menuItem', menu);
})





function resize(){
    if(window.innerWidth<700){
        sidebar.classList.add("small-sidebar");
        containerMain.classList.add("large-container-main")
    }
    else
    {
        sidebar.classList.remove("small-sidebar");
        containerMain.classList.remove("large-container-main")
    }

}



menuIcon.addEventListener("click" , function() {
    sidebar.classList.toggle("small-sidebar");
    containerMain.classList.toggle("large-container-main")
})
window.addEventListener('resize', function(){
    resize();
})






$(document).ready(function(){
    var menuItem=localStorage.getItem("menuItem")
// console.log(menuItem);
sidebarMenu.innerHTML=menuItem
    // RenderSibebarMenu();
    //jquery for toggle sub menu
    // $('.sub-btn').click(function(){
    //     $(this).next('.sub-menu').slideToggle();
    //   //   $(this).find('.dropdown').toggleClass('rotate');
    //     $(this).toggleClass('active');
      
    //     let icon = $(this).children("i")
    //     if($(this).hasClass("active")){
    //       icon.removeClass("fas fa-plus").addClass("fas fa-minus")
            
    //   } else{
    //       icon.removeClass("fas fa-minus").addClass("fas fa-plus")
    //   }
     
    //   });


  });

 
//   RenderSibebarMenu();
  resize();


