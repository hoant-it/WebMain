var button='<button class="close" type="button" title="Remove this page">×</button>';
var tabID = 1;
function resetTab(){
	var tabs=$("#tab-list li:not(:first)");
	var len=1
	$(tabs).each(function(k,v){
		len++;
		$(this).find('a').html('Tab ' + len + button);
	})
	tabID--;
}

getidli = () => {
  alert(this.id);
}

$(document).ready(function() {
  // $("#child-menu li").click(function() {
  //   alert(this.id); // get id of clicked li
  // });


    $('#btn-add-tab').click(function() {
        tabID++;
        $('#tab-list').append($(`<li>
        <a href="#tab${tabID}" role="tab" data-toggle="tab">
        <span>Tab${tabID} </span>
        <button class="close" type="button" title="Remove this page">×</button>
        </a>
        </li>`));
        $('#tab-content').append($(`<div class="tab-pane fade" id="tab${tabID}">Tab${tabID} content 
         <img src="/images/media.jpg" alt="" style="width: 100%; height: 90vh;">
        </div>`));
        $(".edit").click(editHandler);
    });
    
    $('#tab-list').on('click', '.close', function() {
        var tabID = $(this).parents('a').attr('href');
        $(this).parents('li').remove();
        $(tabID).remove();

        //display first tab
        var tabFirst = $('#tab-list a:first');
        resetTab();
        tabFirst.tab('show');
    });

    // var list = document.getElementById("tab-list");
});

var editHandler = function() {
  var t = $(this);
  t.css("visibility", "hidden");
  $(this).prev().attr("contenteditable", "true").focusout(function() {
    $(this).removeAttr("contenteditable").off("focusout");
    t.css("visibility", "visible");
  });
};

$(".edit").click(editHandler);