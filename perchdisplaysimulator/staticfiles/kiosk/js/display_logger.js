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
        let productId = "neutrogena";

        let rndValue;
        // GENERATE A RANDOM NUMBER (BETWEEN 1 AND 100000) FOR EVERY BUTTON CLICK.
        rndValue = Math.floor((Math.random() * 100000));

        let rndIndice = Math.floor((Math.random() * 10));
        let user_actions = ["video play",
            "video paused",
            "video stopped",
            "image modal 1 opened",
            "image modal 1 closed",
            "image modal 2 closed",
            "image modal 2 opened",
            "image 3 zoomed in",
            "product description selected",
            "contact us form filled out"
        ];
        let action = user_actions[rndIndice]

        let now = new Date();
        let month = now.getMonth() + 1
        let nowDateTime = now.getFullYear() + "-"
            + month + "-"
            + now.getDate() + " "
            + now.getHours() + ":"
            + now.getMinutes() + ":"
            + now.getSeconds() + "Z";

        logProductInfo(productId, "Display", nowDateTime, rndValue, action, geolocation);
        console.log(productId);


        $.post("/log", {
                product_name: productId,
                interaction_type: "Display",
                interaction_time: nowDateTime,
                kiosk_id: rndValue,
                action: action,
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

function logProductInfo(productId, eventType, interaction_time, kiosk_id, action, geolocation) {

    $('<div>' + interaction_time
        + ' --- Event Type: ' + eventType
        + ', Product Name:' + productId
        + ', Kiosk Id: ' + kiosk_id
        + ', User Action: ' + action
        + ', Location:' + geolocation + '</div>').prependTo('#console');
};


