 function sizeChecker() {
            
            var screenWidth = window.outerWidth;

            if(screenWidth < 1024){

                var myImg = document.createElement("IMG");

                myImg.setAttribute("src", "menuicon.png");
                myImg.setAttribute("id", "navImg");
                myImg.style.width = "55px";
                myImg.style.height = "auto";

                document.getElementById("myNav").appendChild(myImg);

                document.getElementById("nonMobileList").style.display = "none";
                document.getElementById("ic").style.display = "none"; 
                document.getElementById("myNav").style.height = "60px";
            }

          
}
