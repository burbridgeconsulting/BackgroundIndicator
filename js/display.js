(function ($) {
	"use strict";
	$(function () {
		
		$('html').append('<div id="cbbi-console"><h3>Elements with Background Set</h3><table></table></div>');
		
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
				if (! this_id.match(/^(#cbbi-console|#debug-bar-info|#debug-bar-menu|#querylist|#wpadminbar|)$/) ) {
					
					var html = '<tr data-selector="' + this_element + this_id + '" '
						+ ' data-background-css="' + $(this).css('background-color') + '" >'
						+ '<td><input class="bg-changer" id="block-" type="checkbox" checked="checked"/></td>'
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
						backgroundCSS = $(this).parents('tr').attr('data-background-css');
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
					var setColor;
					backgroundCSS = $(this).parents('tr').attr('data-background-css');
			    if ($this.is(':checked')) {
						setColor = jQuery.Color( backgroundCSS ).alpha('.75');
			    } else {
						setColor = backgroundCSS;
			    }
					$(selector).css( 'background-color', setColor );
				}
		});
		
		
	});
}(jQuery));