 function sizeChecker() {
            
            var screenWidth = window.outerWidth;

            if(screenWidth < 1024){

                document.getElementById('mainSheet').setAttribute('href', 'mobileStyle.css')
                console.log("true")
            }

          
}
