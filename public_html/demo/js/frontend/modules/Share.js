// SHARING FUNCTIONS
var Share = {
  metaLink: $('meta[property="og:url"]').attr('content'),
  metaType: $('meta[property="og:type"]').attr('content'),
  metaMedia: $('meta[property="og:image"]').attr('content'),
  metaTitle: $('meta[property="og:title"]').attr('content'),
  metaDescription: $('meta[property="og:description"]').attr('content'),
  
  facebook: function() {
    window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(Share.metaLink) + '&p[images][0]=' + encodeURIComponent(Share.metaMedia) + '&p[title]=' + encodeURIComponent(Share.metaTitle) + '&p[summary]=' + encodeURIComponent(Share.metaDescription),'_blank');
  },
  twitter: function() {
    window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(Share.metaLink) + '&text=' + encodeURIComponent(Share.metaTitle) + '%20' + encodeURIComponent(Share.metaLink),'_blank');
  },
  pinterest: function() {
    window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(Share.metaLink) + '&media=' + encodeURIComponent(Share.metaMedia) + '&description=' + encodeURIComponent(Share.metaTitle),'_blank');
  },
  googlePlus: function() {
    window.open('//plus.google.com/share?url=' + encodeURIComponent(Share.metaLink),'_blank');
  },
  linkedIn: function() {
    window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(Share.metaLink) + '&title=' + encodeURIComponent(Share.metaTitle) + '&source=' + encodeURIComponent(Share.metaLink),'_blank');
  },

  init: function() {
    $(".share-facebook").click(function() {
      Share.facebook();
      return false;
    });

    $(".share-twitter").click(function() {
      Share.twitter();
      return false;
    });

    $(".share-pinterest").click(function() {
      Share.pinterest();
      return false;
    });

    $(".share-google-plus").click(function() {
      Share.googlePlus();
      return false;
    });

    $(".share-linkedin").click(function() {
      Share.linkedIn();
      return false;
    });
  }
}