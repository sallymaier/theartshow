$(document).ready(function() {

  $.getJSON('https://sheetlabs.com/SALL/theartshowtvmenu', function(data) {
    var template = $('#episodemenulist').html();
    var info = Mustache.to_html(template, data);
    $('#episodemenu').html(info);

    var template = $('#participantmenulist').html();
    var info = Mustache.to_html(template, data);
    $('#participantmenu').html(info);
    
    var template = $('#clipsmenulist').html();
    var info = Mustache.to_html(template, data);
    $('#clipsmenu').html(info);


  });


  $.getJSON('https://sheetlabs.com/SALL/theartshowtvvideoswithcomments', function(data) {

    //mustache for images
    var template = $('#videos').html();
    var info = Mustache.to_html(template, data);
    var $info = $(info)
    $('#videosdiv').html(info);


// 

    var options = {
      valueNames: [ 'titlelist', 'participantlist', 'taglist' ],
      page: 500
    };

    var videos = new List('allvideos', options);


    // menu filter
    $('.episodefilter li a').on('click touch', function()  {
      var selection = $(this).data('episode'); 
      console.log(selection);

      // filter items in the list
      videos.filter(function(item) {
        if (~item.values().titlelist.indexOf(selection)) {
          return true;
        } else {
          return false;

          }
      });

        $("body, html").animate({ 
            scrollTop: $('#allvideos').offset().top 
        });
      return false;

    });

    $('.participantfilter li a').on('click touch', function()  {
      var selection = $(this).data('participant'); 
      console.log(selection);

      // filter items in the list
      videos.filter(function(item) {
        if (~item.values().participantlist.indexOf(selection)) {
          return true;
        } else {
          return false;

          }
      });

        $("body, html").animate({ 
            scrollTop: $('#allvideos').offset().top 
        });
      return false;

    });

    $('.clipsfilter li a').on('click touch', function()  {
      var selection = $(this).data('tags'); 
      console.log(selection);

      // filter items in the list
      videos.filter(function(item) {
        if (~item.values().taglist.indexOf(selection)) {
          return true;
        } else {
          return false;

          }
      });

        $("body, html").animate({ 
            scrollTop: $('#allvideos').offset().top 
        });
      return false;

    });

          //reset
    $('.showall').on('click touch', function()  {
      videos.filter();
      $("body, html").animate({ 
            scrollTop: $('#allvideos').offset().top 
      });
    });

    
  });

});



