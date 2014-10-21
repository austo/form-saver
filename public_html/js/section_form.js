'use strict';

(function() {
  $('#userLink').click(function() {
    var sectionId = $(this).attr('section-id'),
      url = 'section_content.html?section=' + sectionId;
    $('#uxMainContent').load(url);
  });
}());
