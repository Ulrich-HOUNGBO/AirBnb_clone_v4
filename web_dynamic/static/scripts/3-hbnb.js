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
        if (response === "success", data.status === "ok") {
           $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    });

    const place_url = "http://0.0.0.0:5001/api/v1/places_search";
    $.ajax({
        type: "POST",
        url: place_url,
        headers: {'Content-Type': "application/json"},
        data: JSON.stringify({}),
        success: function(data){
            for (let place of data){
                let html = `<article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                  ${place.description}
                </div>
              </article>`;
                $("section.places").append(html);
            }
        },
         error: function (error) {
            console.log(error);
    }
    });
});
