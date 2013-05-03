(function ($) {
	"use strict";
	$(function () {
		
		var myBlock = new Array();
		var myCounter = 0;
		
		$('html').append('<div id="cbbi-console"><p><strong>Elements with Background Set</strong></p></div>');
		
		$('html, body, div').each(function() {
			
			var bgColor = $(this).css('background-color');
			if ( ! (bgColor.match(/^rgba\(0, 0, 0, 0\)$/) || bgColor.match(/^transparent$/)) ) {
				var this_element = this.tagName.toLowerCase();
				
				var this_id = '';
				if ( $(this).attr('id') ) {
					this_id = '#' + $(this).attr('id');
				}
				
				// Ignore my own code
				if (this_id != '#cbbi-console') {
					
					myCounter++;
					myBlock[myCounter] = this_element + this_id;

					var msg = '<p><input id="block-" type="checkbox" checked="checked" data-selector="'
						+ this_element + this_id
						+ '" data-background-css="'
						+ $(this).css('background-color')
						+ '"/> <strong>' 
						+ this_element + this_id + '</strong> - ' + $(this).css('background-color') + '</p>';
					$('#cbbi-console').append(msg);

				}
				
			}
			
		})
		
		$('#cbbi-console :checkbox').click(function() {
		    var $this = $(this);
				var selector;
				var backgroundCSS;
		    // $this will contain a reference to the checkbox   
		    if ($this.is(':checked')) {
					selector = $(this).attr('data-selector');
					backgroundCSS = $(this).attr('data-background-css');
		    } else {
					selector = $(this).attr('data-selector');
					backgroundCSS = 'transparent';
		    }
				$(selector).css('background-color', backgroundCSS);
		});
		
		
	});
}(jQuery));