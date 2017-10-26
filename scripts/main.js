$(document).ready(function() {
    $('.container').hide();

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) goHome();
    });

    addProjects();
});

function goHome(){
    $(".mdl-layout").toggleClass("blur");
    document.title = "Maruth Goyal";

    if($(".mdl-layout").hasClass("blur")){
        $(".mdl-layout").one('webkitTransitionEnd', function() {
            $('.container').show();
            $('.close').addClass('animated rollIn');
            //$('.container').addClass('animated fadeInUp');
        });
    } else {
        $('.container').hide();
        $('.close').removeClass('animated rotateIn');
        document.title = "Maruth Goyal's Portfolio";
    }
}

function addProjects() {
    $("#portfolio").empty();

    $("#portfolio").append(newProject("bork", "A programming language I made, based on LISP\
        (created by John McCarthy at MIT in 1958). It supports defining your own functions, variables\
        if-else control flow, recursion, arithmetic, and boolean operators. I created it without using any\
        books or tutorials, as an attempt at making an interpreter in order to better understand how they work.\
        The interpreter first converts the code into a tree, consisting of token and expressions, which is then\
        recursively evaluated. It's written in C++.", "https://github.com/maruthgoyal/bork", "09/2017"));

    $('#portfolio').append(newProject("The Evolution of Words and Spellings Over the Centuries", "I collected usage data\
        of English words of French origin over 5 centuries using Google's N-gram corpora, by writing an automated Python script.\
        I then aggregated the data in several ways and created plots, further connecting the trends to possible historical causes. ",
         "https://www.dropbox.com/s/l6vh5x37zaxei8x/English%20Project%20.pdf?dl=0", "06/2016"));

    $('#portfolio').append(newProject("Zipf's Law", "A research project for a competition. I detailed the mathetmatical foundings\
        of Zipf's Law, its appearances in random texts, and in sentence spaces generated using Context-Free Grammars (CFGs). I further\
        discussed applications of the law to Caching and Password Strength.",
    "https://www.dropbox.com/s/d34vepi12xo7fh9/Zipf_Maruth_DPS_Noida.pdf?dl=0", "10/2017"));

    $('#portfolio').append(newProject("Poetry Generator", "Generates poetry by converting a data-set to a frequency\
        graph, and then performs a weighted Markovian walk over the graph.","https://github.com/maruthgoyal/poem_generator", "12/2016"));

    $('#portfolio').append(newProject("CBSE 2017 Data", "An automated Python script to scrape the marks of the students of my school\
        from the CBSE website, and plot them", "https://github.com/maruthgoyal/schoolScrape2017", "06/2016"));

    $('#portfolio').append(newProject("Programming Judge", "An automated online programming judge, based on Google's Code Jam.","https://github.com/maruthgoyal/judge","08/2016"));

    $('#portfolio').append(newProject("Cryptic Hunt", "A website for an online treasure hunt. It rate limits users, supports IP blacklisting\
        and has naive bot-detection.", "https://github.com/maruthgoyal/crypt", "07/2016"));

    $('#portfolio').append(newProject("Oatmeal Checker", "Automated script to check for new comics posted on The Oatmeal.",
    "https://github.com/maruthgoyal/oatmeal_checker", "04/2016"));

   $('#portfolio').append(newProject("Brainf**k Interpreter", "A simple, full-featured interpreter in C. \
    \"Brainf**k is an esoteric programming language noted for its extreme minimalism. The language consists of only eight simple commands\
     and an instruction pointer. Nevertheless, it was shown to be Turing-complete. It is designed to challenge and amuse programmers, and\
      was not made to be suitable for practical use. It was created in 1993 by Urban Müller. The language's name is a reference to the vulgar term \
      \"brain f**k\", which refers to things so complicated or unusual that they exceed the limits of one's understanding\"\
      (<a href=\"https://en.wikipedia.org/wiki/Brainfuck\">Wikipedia</a>).",
       "https://github.com/maruthgoyal/bf", "12/2016"));

    $('#portfolio').append(newProject("Huffman Coding", "A program to compress a given file using the Huffman Coding Algorithm.", "https://github.com/maruthgoyal/playground/tree/master/src/Huffman%20Compression", "05/2015"));

    $('#portfolio').append(newProject("Min-Heap", "Python implementation for a Min-Heap, and Heap-Sort", "https://github.com/maruthgoyal/playground/tree/master/src/Heap%20sort", "06/2015"));

    $('#portfolio').append(newProject("Blackjack", "Simple Python code for a game of Blackjack. The Computer plays random moves.",
     "https://github.com/maruthgoyal/playground/tree/master/src/Blackjack", "06/2015"));

}

function newProject(name, description, link, /*paths,*/ date){
    // var mainFiles = "";

    // for (i = 0; i < paths.length; i++) {
    //     mainFiles += '<div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">\
    //                     <form method="get" target="_blank" action="Projects/' + link + '/' + paths[i] + '">\
    //                         <button class="mdl-button mdl-js-button mdl-button--primary">\
    //                             <span style="text-transform: capitalize;">view ' + paths[i] +'</span>\
    //                         </button>\
    //                     </form>\
    //                 </div>';
    // }

    return '<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">\
        <div class="mdl-card mdl-cell mdl-cell--12-col">\
            <div class="mdl-card__supporting-text mdl-grid mdl-grid--no-spacing">\
                <h4 class="mdl-cell mdl-cell--12-col">' + name + '</h4>\
                <p class="mdl-cell mdl-cell--12-col">' + description + '</p>\
                ' + '\
            </div>\
            <div class="mdl-card__actions">\
                <a href=' + link  + ' class="mdl-button" _blank> View on GitHub </a>\
            </div>\
        </div>\
        <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="' + link + '">\
            <i class="material-icons">more_vert</i>\
        </button>\
        <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right" for="' + link + '">\
            <li class="mdl-menu__item" onclick="alert(\'' + date + ': (mm/yyyy)\');">' + date + '</li>\
        </ul>\
    </section>\
    <section class="section--center mdl-grid mdl-grid--no-spacing"></section>';
}
