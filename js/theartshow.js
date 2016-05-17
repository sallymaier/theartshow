$(document).ready(function() {

  //pretty scroll
  $(" a.scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 700);
  });

  //mustache for menu
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

    var template = $('#episodemenulistmobile').html();
    var info = Mustache.to_html(template, data);
    $('#episodemenumobile').html(info);

    var template = $('#participantmenulistmobile').html();
    var info = Mustache.to_html(template, data);
    $('#participantmenumobile').html(info);
    
    var template = $('#clipsmenulistmobile').html();
    var info = Mustache.to_html(template, data);
    $('#clipsmenumobile').html(info);

    $(function(){
      $('#mobilemenu').slicknav();
    });

  });

  $.getJSON('https://sheetlabs.com/SALL/theartshowtvvideoswithcomments', function(data) {

    //mustache for videos
    var template = $('#videos').html();
    var info = Mustache.to_html(template, data);
    var $info = $(info)
    $('#videosdiv').html(info);

    var options = {
      valueNames: [ 'titlelist', 'participantlist', 'taglist' ],
      page: 500
    };

    var videos = new List('allvideos', options);


    // episode filter
    $('.episodefilter li a').on('click touch', function()  {
      var selection = $(this).data('episode'); 
      console.log(selection);

      // filter items in the list that contain the text of the nav item
      videos.filter(function(item) {
        if (~item.values().titlelist.indexOf(selection)) {
          return true;
        } else {
          return false;

          }
      });

      // test to see if there's only one result
      var results = $("#videosdiv li").length
      console.log(results);


      // expand the video if there is only one result.
      if ( results = 1 )  {
          $( ".setwidth" ).addClass( "widewidth" );
        }
      else {
          $(".setwidth").removeClass( "widewidth" );
        }
      if ( results = 1 )  {
          $( ".imageContainer" ).addClass( "widecontainer" );
        }
      else {
          $(".imageContainer").removeClass( "widecontainer" );
        }

      // pretty scroll to video section on click
        $("body, html").animate({ 
            scrollTop: $('#allvideos').offset().top 
        });
      return false;

    });
    
    // participant filter
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

      // test to see if there's only one result
      var results = $("#videosdiv li").length
      console.log(results);

      // expand the video if there is only one result.
      if ( results = 1 )  {
          $( ".setwidth" ).addClass( "widewidth" );
        }
      else {
          $(".setwidth").removeClass( "widewidth" );
        }
        
      if ( results = 1 )  {
          $( ".imageContainer" ).addClass( "widecontainer" );
        }
      else {
          $(".imageContainer").removeClass( "widecontainer" );
        }

      // pretty scroll to video section on click
      $("body, html").animate({ 
          scrollTop: $('#allvideos').offset().top 
      });

      return false;
    });

    // participant filter
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

      // test to see if there's only one result
      var results = $("#videosdiv li").length
      console.log(results);

      // expand the video if there is only one result.
      if ( results = 1 )  {
          $( ".setwidth" ).addClass( "widewidth" );
        }
      else {
          $(".setwidth").removeClass( "widewidth" );
        }
        
      if ( results = 1 )  {
          $( ".imageContainer" ).addClass( "widecontainer" );
        }
      else {
          $(".imageContainer").removeClass( "widecontainer" );
        }

      // pretty scroll to video section on click
      $("body, html").animate({ 
          scrollTop: $('#allvideos').offset().top 
      });
      return false;
    });

    //reset videos
    $('.showall').on('click touch', function()  {
      videos.filter();
      $(".imageContainer").removeClass( "widecontainer" );
      $(".setwidth").removeClass( "widewidth" );
      $("body, html").animate({ 
            scrollTop: $('#allvideos').offset().top 
      });
    });

    
  });
});





