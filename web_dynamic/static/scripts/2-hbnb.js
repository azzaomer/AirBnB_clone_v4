$(document).ready(function () {
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    $.get(url, function(resp) {
        if(resp.satuts === 'OK') {
            // add the class available
            // to the div#api_status
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});