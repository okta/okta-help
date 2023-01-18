	/* <![CDATA[ */
var amountScrolled = 300;

$('div.body-container').scroll(function() {
		if ( $(window).scrollTop() > amountScrolled ) {
			$('a.sf-back-to-top').fadeIn('slow');
		} else {
			$('a.sf-back-to-top').fadeOut('slow');
		}
	});

$('a.sf-back-to-top').click(function() {
		$('html, body').animate({
			scrollTop: 0
			}, 700);
		return false;
	});
	/* ]]> */
	