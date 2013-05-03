(function ($) {
	"use strict";
	$(function () {
		
		$('html').append('<div id="cbbi-console"><p><strong>Elements with Background Set</strong></p><table></table></div>');
		
		$('#cbbi-console table').append( '<thead><tr><th>Color / Transp.</th><th>Opacity</th><th>Round Corners</th><th>Highlight</th><th>&nbsp;</th></tr></thead><tbody></tbody>' );
		
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
					
					var html = '<tr data-selector="' + this_element + this_id + '">'
						+ '<td><input class="bg-changer" id="block-" type="checkbox" checked="checked"' 
						+ ' data-background-css="'
						+ $(this).css('background-color')
						+ '"/></td>'
						+ '<td><input class="alphaChannel" type="checkbox" /></td>'
						+ '<td><input class="rounded" type="checkbox" /></td>'
						+ '<td><input class="highlight" type="checkbox" /></td>'
						+ '<td><strong>' 
						+ this_element + this_id + '</strong>'
						// + '<br/>' + $(this).css('background-color') 
						+ '</td>';

					$('#cbbi-console tbody').append(html);

				}
				
			}
			
		})
		
		
		$('#cbbi-console :checkbox').click(function() {
		    var $this = $(this);
				var selector = $(this).parents('tr').attr('data-selector');
				
				if ( $(this).hasClass('bg-changer') ) {
					var backgroundCSS;
			    if ($this.is(':checked')) {
						backgroundCSS = $(this).attr('data-background-css');
			    } else {
						backgroundCSS = 'transparent';
			    }
					$(selector).css('background-color', backgroundCSS);
				}
				
				else if ( $(this).hasClass('rounded') ) {
					var rounding;
			    if ($this.is(':checked')) {
						rounding = '17px';
			    } else {
						rounding = '0';
			    }
					$(selector).css('border-radius', rounding);
					$(selector).css('-webkit-border-radius', rounding);
					$(selector).css('-moz-border-radius', rounding);
				}

				else if ( $(this).hasClass('highlight') ) {
					var outline;
			    if ($this.is(':checked')) {
						outline = '11px solid rgba(42, 67, 255, 0.3)';
			    } else {
						outline = 'none';
			    }
					$(selector).css('outline', outline);
				}

				else if ( $(this).hasClass('alphaChannel') ) {
					var fade;
			    if ($this.is(':checked')) {
						fade = '.5';
			    } else {
						fade = '1';
			    }
					$(selector).fadeTo( .3, fade )
				}
		});
		
		
	});
}(jQuery));