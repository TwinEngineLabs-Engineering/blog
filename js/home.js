$(document).ready(function() {
  $("#payment-form").submit(function(event) {
    // disable the submit button to prevent repeated clicks
    $('.submit-button').attr("disabled", "disabled");

    Stripe.createToken({
        number: $('.card-number').val(),
        cvc: $('.card-cvc').val(),
        exp_month: $('.card-expiry-month').val(),
        exp_year: $('.card-expiry-year').val()
    }, stripeResponseHandler);


    // prevent the form from submitting with the default action
    return false;
  });

  function stripeResponseHandler(status, response) {
      if (response.error) {
          //show the errors on the form
          $(".payment-errors").html(response.error.message);
          $(".submit-button").removeAttr("disabled");
      } else {
          var form$ = $("#payment-form");
          // token contains id, last4, and card type
          var token = response['id'];
          // insert the token into the form so it gets submitted to the server
          form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
          // and submit
          form$.get(0).submit();
      }
  }

	// Initialize product carousel
	$('#app-show').carousel({
		interval: 2500
	});

	// Animate scroll to section, eg. Team
	/*$("#primary-nav a").click(function(e) {
		e.preventDefault();
		scrollTo($(this).attr("id"));
	});*/

	// Show popover for team member
	$('.team-list a[rel="popover"]').popover({
		placement: 'top'
	});

});
