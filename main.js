$(function() {
  var $body = $("body"),
    sizes = [
      null,
      'landscape',
      'landscape',
      'landscape',
      'landscape',
      'landscape',
      'landscape',
      'landscape',
      'landscape',
      'portrait'
    ];
  blankImgURL = "images/transparent.gif";
  $("#perpage").val(9).change(function() {
    $body.removeClass().addClass("max-cards-" + $(this).val());
  }).change();

  $("#print-front, #print-back").click(function(e) {
    e.preventDefault();
    var frontBack = $(this).attr("id").substr(6);

    $("ol#droppers li.dropper").each(function(i, e) {
      $dropper = $(this);
      $("#print img.card-" + $dropper.data("card-number"))
        .attr("src", $(this).find("img." + frontBack).attr("src"));
    });

    $("#print-css").html('@page { size : ' + sizes[$("#perpage").val()] + ' }');
    $("#print")
      .removeClass("front")
      .removeClass("back")
      .addClass(frontBack)
      .toggleClass("bleed", $("#bleed").prop("checked") && frontBack == "back");
    window.print();
  })
  $("#droppers a.clear").click(function(e) {
    e.preventDefault();
    $(this).parent().find("img").attr("src", blankImgURL);
  })
  $("#droppers img")
    .on("drag", function drag(ev) {
      ev.originalEvent.dataTransfer.setData("src", ev.target.src);
    })
    .on("dragover", function allowDrop(e) {
      e.preventDefault();
    })
    .on("drop", function drop(e) {
      e.preventDefault();

      var oe = e.originalEvent,
        dt = oe.dataTransfer,
        data = dt.getData("text"),
        files = dt.files,
        $target = $(oe.target);

      $target.attr("src", data);

      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        //attach event handlers here...
        var reader = new FileReader();
        reader.onload = (function(theFile) {
          return function(e) {
            // Render thumbnail.
            $target.attr("src", e.target.result);
          };
        })(file);
        reader.readAsDataURL(file);
      }
      return false;
    })
})