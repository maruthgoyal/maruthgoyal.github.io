 function sizeChecker() {
            
            var screenWidth = window.outerWidth;

            if(screenWidth < 1024){

                document.getElementById('mainSheet').setAttribute('href', 'mobileStyle.css')
                console.log("true")
            }
            
            else{
              document.getElementById('mainSheet').setAttribute('href', 'stylesheet.css')
            }

          
}
