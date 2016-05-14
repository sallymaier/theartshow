$(document).ready(function() {

  $.getJSON('https://sheetlabs.com/SALL/ClickbaitPrinciplesList', function(data) {
    var template = $('#menu').html();
    var info = Mustache.to_html(template, data);
    $('#menudiv').html(info);


  });


  $.getJSON('https://sheetlabs.com/SALL/theartshowtvvideos', function(data) {

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
});



