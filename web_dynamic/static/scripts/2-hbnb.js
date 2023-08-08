$(document).ready(function () {
    const amenity_obj = {};
    $('.amenity .popover input').change(function () {
        if ($(this).is(':checked')) {
            amenity_obj[$(this).attr('data-name')] = $(this).attr('data-id');
        } else if ($(this).is(':not(:checked')) {
            delete amenity_obj[$(this).attr('data-name')];
        }
        const names = Object.keys(amenity_obj);
        $('.amenities h4').text(names.sort().join(', '));
    });
    $.get("http://0.0.0.0:5001/api/v1/status/", (response, data)=>{
        if(response === "sucess", data.status === "ok"){
           $("div#api_status").addClass("available");
        }
        else{
            $("div#api_status").removeClass("available");
        }
    });
});