'use strict';

(function() {
  var submitData = {};
  $('#uxSaveControls').hide();
  $('.formSwapper').click(function() {
    var sectionId = $(this).attr('section-id'),
      url = 'section_content.html?section=' + sectionId;
    $('#uxMainContent').load(url, function() {
      initSectionContent(sectionId);
      $('#uxSaveControls').show();
    });
  });
  $('#uxSaveCmd').click(function() {
    $('.section-content').each(function() {
      var $control = $(this),
        name = $control.attr('name'),
        value = $control.val();

      submitData[name] = value;
    });
  });
  $('#uxCheckCmd').click(function() {
    alert(JSON.stringify(submitData));
  });

  $('#uxSubmitCmd').click(function() {
    var dataStr = '';

    Object.keys(submitData).forEach(function (key, idx) {
      if (idx > 0) {
        dataStr += '&'
      }
      dataStr += key + '=';
      dataStr += submitData[key];
    });

    $.ajax({
        type: 'post',
        url: '/post',
        data: dataStr,
        cache: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: false,
        success: function (res) {
          alert(res);
        }
      });
  });


  function initSectionContent(sectionId) {
    sectionId = +sectionId;
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
      formStart = '<div><div class="form-group">',
      formEnd = '</div></div>',
      sectionContent = '<label class="control-label" for="{{section_name}}InputOne">{{section_name}} Field One</label>' +
      '<div><input class="form-control section-content" type="text" name="{{section_name}}InputOne" placeholder="write something"/></div><br/>' +
      '<label class="control-label" for="{{section_name}}InputTwo">{{section_name}} Field Two</label>' +
      '<div><input class="form-control section-content" type="text" name="{{section_name}}InputTwo" placeholder="write something else"/><div>',
      sectionHeader = '<br/><div><h3>{{section_name}}</h3></div>';

    function fillTemplate(str) {
      var inputCount = 1;
      return str.replace(/{{(.+?)}}/g, function(match, param) {
        switch (param) {
          case 'section_name':
            return sectionNames[sectionId].match(/^\w+/);
          case 'section_description':
            return sectionDescriptions[sectionId];
          case 'count':
            return inputCount++;
          default:
            return '';
        }
      });
    }

    function writeContent() {
      var retval = formStart +
        fillTemplate(sectionHeader) + '<br/>' +
        fillTemplate(sectionContent) + formEnd;
      return retval;
    }

    $('#uxSectionContent').html(writeContent());
  }
}());
