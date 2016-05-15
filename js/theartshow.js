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


  $.getJSON('https://sheetlabs.com/SALL/theartshowtvvideosv3', function(data) {

    //mustache for images
    var template = $('#videos').html();
    var info = Mustache.to_html(template, data);
    var $info = $(info)
    $('#videosdiv').html(info);


// 

    var options = {
      valueNames: [ 'principle' ],
      page: 500
    };

    var articleList = new List('clickbaitarticle', options);


    // menu filter
    $('.clickbait-filter li a').on('click touch', function()  {
      var selection = $(this).data('principle'); 
      console.log(selection);

      // filter items in the list
      articleList.filter(function(item) {
        if (~item.values().principle.indexOf(selection)) {
          return true;
        } else {
          return false;

          }
      });

    });

          //reset
    $('.showall').on('click touch', function()  {
      articleList.filter();
      articleList.sort('principle', { order: "asc" });
    });

    
  }); 
  $(window).on("load", function() {
   
    // Find all Vimeo videos
      var $allVideos = $("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com']"),

          // The element that is fluid width
          $fluidEl = $("body");

      // Figure out and save aspect ratio for each video
      $allVideos.each(function() {

        $(this)
          .data('aspectRatio', this.height / this.width)

          // and remove the hard coded width/height
          .removeAttr('height')
          .removeAttr('width');

      });

      // When the window is resized
      $(window).resize(function() {

        var newWidth = $fluidEl.width();

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {

          var $el = $(this);
          $el
            .width(newWidth)
            .height(newWidth * $el.data('aspectRatio'));

        });

      // Kick off one resize to fix all videos on page load
      }).resize();
  });

});



