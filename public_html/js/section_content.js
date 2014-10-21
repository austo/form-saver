'use strict';

(function() {
  var sectionIdRe = /.*?\?.*?(section)=(\d+).*/i;
  var sectionId = (function() {
    var parts = sectionIdRe.exec(document.location.search);
    if (parts === null) {
      return 1;
    }
    var sectionId = +parts[2];
    if (sectionId > 6) {
      sectionId = 1;
    }
    return sectionId;
  }());

  var sectionNames = [
      'User',
      'Personal Details',
      'Referrals',
      'Schedule Information',
      'Technical Experience',
      'Supplemental Materials'
    ],
    sectionDescriptions = ['User Stuff',
      'Personal Details Stuff',
      'Referral Stuff',
      'Schedule Information Stuff',
      'Technical Experience Stuff',
      'Supplemental Materials Stuff'
    ],
    sectionContent = '<input class="form-control" type="text" name="{{section_name}}Input" placeholder="write something"/>',
    sectionHeader = '<h3>{{section_name}}</h3><b>{{section_description}}</b>';

  function fillTemplate(str) {
  	return str.replace(/{{(.+?)}}/g, function(match, param) {
      switch (param) {
        case 'section_name':
          return sectionNames[sectionId].match(/^\w+/);
        case 'section_description':
          return sectionDescriptions[sectionId];
        default:
          return '';
      }
    });
  }

  function writeContent() {
  	var retval = fillTemplate(sectionHeader) + '<br/>' + fillTemplate(sectionContent);
  	return retval;
  }

  $('#uxSectionContent').html(writeContent());


  $('#uxSaveCmd').click(function() {
    $('.form-control').each(function() {
      console.log(this);
    });
  });
}());
