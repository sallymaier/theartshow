$(document).ready(function() {

    $( ".infobox" ).hide(); //hide previous boxes


    function comparatorIsStamped(a, b) {
      var $a = $(a), $b = $(b);
      // Check if tile should the second one
      if (!$a.hasClass('stamped-second') && $b.hasClass('stamped-second') && $a.index() >= 2)
        return 1;
      return -1;
    }

    var handler = null,
    page = 1,
    isLoading = false,
    container = '.grid',
    $loaderCircle = $('#loaderCircle'),
    wookmark = undefined
    options = {
              align: 'left',
              autoResize: true,
              direction: 'left',
              ignoreInactiveItems: true,
              offset: 2,
              resizeDelay: 50,
              itemWidth: 200,
              flexibleWidth: true,
              comparator: comparatorIsStamped // Used to sort the items

          };
  

  function applyLayout() {
    

    imagesLoaded(container, function () {
      if (wookmark === undefined) {
        wookmark = new Wookmark(container);
      } else {
        wookmark.initItems();
        wookmark.layout(true);
      }
    });
  };
    



  



  $.getJSON('https://sheetlabs.com/SALL/ClickbaitPrinciplesList', function(data) {
    var template = $('#menu').html();
    var info = Mustache.to_html(template, data);
    $('#menudiv').html(info);

    var template = $('#titlegen').html();
    var info = Mustache.to_html(template, data);
    $('#stachetitles').html(info);

  });


  $.getJSON('https://sheetlabs.com/SALL/ClickbaitArticle', function(data) {

    //mustache for images
    var template = $('#articles').html();
    var info = Mustache.to_html(template, data);
    var $info = $(info)
    $('#articlesdiv').html(info);


    $('.grid-item').one( "mouseover", function()  {
      var itemtext = $('.itemprincipleslist', this);
      var words = itemtext.text().split(" ");
      $(itemtext).empty();
      $.each(words, function(i, v) {
          $(itemtext).append($("<a>").text(v));
      });
      $( ".itemprincipleslist a" ).wrap( "<li>" );
    });

// 

    var options = {
      valueNames: [ 'principle' ],
      page: 500
    };

    var articleList = new List('clickbaitarticle', options);

    articleList.sort('principle', { order: "asc" });
    applyLayout();


    // menu filter
    $('.clickbait-filter li a').on('click touch', function()  {
      $( ".infobox" ).hide();
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

      $( ".pagetitle" ).hide();
      $( "#"+selection).show();

      applyLayout();

    });

    //self filter

    $('.refilter').on('click touch', function()  {
      var refilter = $('.refilter', this).text;
      console.log (refilter);

      // filter items in the list
      articleList.filter(function(item) {
        if (~item.values().principle.indexOf(refilter)) {
          return true;
        } else {
          return false;

          }
      });

      applyLayout();

    });

          //reset
    $('.showall').on('click touch', function()  {
      $( ".infobox" ).hide();
      $( ".pagetitle" ).hide();
      articleList.filter();
      articleList.sort('principle', { order: "asc" });
      applyLayout();
    });

    $('.violatorsinfo').on('click touch', function()  {
      $( ".infobox" ).hide(); //hide previous boxes
      $( ".pagetitle" ).hide();
      $( "#violators" ).show(); //show similarity

      var violators = $(this).data('principle');

      articleList.filter(function(item) {
        if (~item.values().principle.indexOf(violators)) {
          return true;
        } else {
          return false;

          }
      });

      applyLayout();

    });

   
  }); 



  $(function() {
    $( ".infobox" ).draggable();
  });  

  $(function() {
    $( ".pagetitle" ).draggable();
  });  

  $('#filter-none').on('click touch', function()  {
        $( ".infobox" ).hide();
        $( ".pagetitle" ).hide();
  });

  //open textboxes
  $('.whatis').on('click touch', function()  {
    $( ".infobox" ).hide(); //hide previous boxes
    $( ".pagetitle" ).hide();
    $( "#clickbaitdef" ).show(); //show whatis
  });

  $('.similarityinfo').on('click touch', function()  {
    $( ".infobox" ).hide(); //hide previous boxes
    $( ".pagetitle" ).hide();
    $( "#similarity" ).show(); //show similarity
  });



});



