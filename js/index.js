$(document).ready(function() {
    $(".primary-headline").keyup(function() {
      var primaryHeadline = $(this).val();
      $('.banner-text h1').text(primaryHeadline);
    });
    $(".secondary-headline").keyup(function() {
      var secondaryHeadline = $(this).val();
      $('.banner-text h2').text(secondaryHeadline);
    });
    $(".terms-and-conditions").keyup(function() {
      var termsConditions = $(this).val();
      $('.banner-text h4').text(termsConditions);
    });

    // Save banner image only
    $(".save-image-only").click(function() {
      $('.banner .banner-text, .edit-image, .filter').attr('data-html2canvas-ignore',true);
      saveImage()
    });

    // Save banner with text and search box
    $(".save-full-banner").click(function() {
      $('.banner .banner-text, .edit-image, .filter').removeAttr('data-html2canvas-ignore');
      saveImage()
    });

    // Save banner with text and search box
    $(".edit-image").click(function() {
      if (!$(this).hasClass('active')) {
        $(this).text('Save Changes');
        $(this).addClass('active');
        $('.banner .container, .filter').hide();
        $('#banner-image').addClass('drag-and-resize');
      } else {
        $(this).text('Reposition Image');
        $(this).removeClass('active');
        $('.banner .container, .filter').show();
        $('#banner-image').removeClass('drag-and-resize');
      }
    });

    $(".darken-image").click(function() {
      if (!$(this).hasClass('active')) {
        $('#banner-image').addClass('filtered');
        $('.banner').removeClass('lighten');
        $('.filter').removeClass('active');
        $(this).addClass('active');
      } else {
        $('#banner-image').removeClass('filtered');
        $(this).removeClass('active');
      }
    });

     $(".lighten-image").click(function() {
      if (!$(this).hasClass('active')) {
        $('#banner-image').addClass('filtered');
        $('.banner').addClass('lighten');
        $('.filter').removeClass('active');
        $(this).addClass('active');
      } else {
        $('#banner-image').removeClass('filtered');
        $('.banner').removeClass('lighten');
        $(this).removeClass('active');
      }
    });
});


function changeColor() {
  var newColor = $('.textcolor').val();
  $('.banner-text h1, .banner-text h2, .banner-text h4').css('color',newColor);
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#banner-image').attr('src', e.target.result);
      $('.page').addClass('has-image');
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function clearText(thefield) {
  if( thefield.defaultValue == thefield.value )
  thefield.value = ""
} 

function saveImage() {
  html2canvas($('.banner'), {
    letterRendering: true,
    onrendered: function (canvas) {
      var a = document.createElement('a');
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      a.download = 'new-banner.jpg';
      a.click();
    }
  });
}