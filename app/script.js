(function(){
    $(document).ready(function(){
        function fixDiv(){
        var footers = document.getElementById('footer');
        if (($(window).scrollTop() > 100) && !isVisible(footers)){
        $('#sdestick').addClass('nwssticky');
    }
    else {
        $('#sdestick').removeClass('nwssticky');
    }
        }
        $(window).scroll(function() {
            $(window).scrollTop() > 60 ? (fixDiv(),$("#main-header").addClass("fix_header")):($("#main-header").removeClass("fix_header"))
        });
        fixDiv();
    }); 
   function isVisible(elm) {
    if(elm){
        var rect = elm.getBoundingClientRect();
        return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }else{
        return false;
    }
}
    
})();