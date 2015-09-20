 function sizeChecker() {
            
            var screenWidth = window.outerWidth;

            var screenInnerWidt = window.innerWidth;
            var screenInnderH = window.innerHeight;

            if(screenWidth < 1025){

                document.getElementById('mainSheet').setAttribute('href', 'mobileStyle.css')
                console.log("true")

                if(screenInnerWidt < screenInnderH){
                	document.getElementById('bigIcon').style.width = "55vw"
                }
            }
            
            else{

              document.getElementById('mainSheet').setAttribute('href', 'stylesheet.css')

            }

          
}
