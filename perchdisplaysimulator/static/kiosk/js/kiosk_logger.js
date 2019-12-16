$(document).ready(function () {
    let geolocation = 'Unknown';
    if ("geolocation" in navigator) { //check geolocation available
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Found your location \nLat : " + position.coords.latitude + " \nLang :" + position.coords.longitude);
            geolocation = "{Lat : " + position.coords.latitude + ", Long :" + position.coords.longitude + "}";
        });
    }

    $('img').click(function () {
        let productId = $(this).parent().attr('id');

        let rndValue;
        // GENERATE A RANDOM NUMBER (BETWEEN 1 AND 100000) FOR EVERY BUTTON CLICK.
        rndValue = Math.floor((Math.random() * 100000));

        let now = new Date();
        let month = now.getMonth() + 1
        let nowDateTime = now.getFullYear() + "-"
            + month + "-"
            + now.getDate() + " "
            + now.getHours() + ":"
            + now.getMinutes() + ":"
            + now.getSeconds() + "Z";

        logProductInfo(productId, "Product Pickup", nowDateTime, rndValue, geolocation);
        console.log(productId);


        $.post("/log", {
                product_name: productId,
                interaction_type: "Pickup",
                interaction_time: nowDateTime,
                kiosk_id: rndValue,
                button_name: "",
                geolocation: geolocation
            }
        ).done(function () {
            console.log("data persisted");
        })
            .fail(function (data) {
                console.error(data);
            })
    });
});

function logProductInfo(productId, eventType, interaction_time, kiosk_id, geolocation) {

    $('<div>' + interaction_time
        + ' --- Event Type: ' + eventType
        + ', Product Name:' + productId
        + ', Kiosk Id: ' + kiosk_id
        + ', Location:' + geolocation + '</div>').prependTo('#console');
};


