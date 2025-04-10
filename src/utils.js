let sessionData = {
    "planetName": "535d3499-c959-4579-9b01-a5e0c7abbe5c",
    "newPlanetName": "535d3499-c959-4579-9b01-a5e0c7abbe5c",
    "serverIP": "wss://www-gs7.kgoma.com:9091",
    "isSoftLaunch": false,
    "language": "en_US",
    "planetID": 7460414,
    "profileID": 0,
    "embedded": true,
    "pingURL": "https://www.kogama.com/locator/session/f07b5cf9-8efb-426e-a11b-04dd23f5773d/ping/?token=%7B%22id%22%3A%20%22f07b5cf9-8efb-426e-a11b-04dd23f5773d%22%2C%20%22profileID%22%3A%20670347875%7D.dJn3o_USlxyLnphnISGnDPfFUto%3D",
    "disconnectURL": "https://www.kogama.com/locator/session/f07b5cf9-8efb-426e-a11b-04dd23f5773d/leave/?token=%7B%22id%22%3A%20%22f07b5cf9-8efb-426e-a11b-04dd23f5773d%22%2C%20%22profileID%22%3A%20670347875%7D.dJn3o_USlxyLnphnISGnDPfFUto%3D",
    "unityPacketURL": "https://www.kogama.com/locator/session/f07b5cf9-8efb-426e-a11b-04dd23f5773d/?token=%7B%22id%22%3A%20%22f07b5cf9-8efb-426e-a11b-04dd23f5773d%22%2C%20%22profileID%22%3A%20670347875%7D.dJn3o_USlxyLnphnISGnDPfFUto%3D&plugin=WEBGL&ssl=1&unityPacket=1",
    "reauthURL": "https://www.kogama.com/locator/session/f07b5cf9-8efb-426e-a11b-04dd23f5773d/reauth/?sessionToken=%7B%22id%22%3A%20%22f07b5cf9-8efb-426e-a11b-04dd23f5773d%22%2C%20%22profileID%22%3A%20670347875%7D.dJn3o_USlxyLnphnISGnDPfFUto%3D&profileID=670347875&objectID=7460414&lang=en_US&type=1&referrer=kogama&plugin=WEBGL&ssl=1&unityPacket=1",
    "gameRewardData": null,
    "gameRewardURL": "https://api-www.kgoma.com/v1/api/reward/game-play/",
    "gameRewardDataURL": "https://api-www.kgoma.com/v1/api/reward/game-data/",
    "gamePublishedURL": "https://api-www.kgoma.com/v1/api/reward/published/",
    "playerProfileURL": "https://www.kogama.com/profile",
    "eliteUpgradeURL": "https://www.kogama.com/subscription/subscribe/",
    "purchaseGoldURL": "https://www.kogama.com/purchase/",
    "loginURL": "https://www.kogama.com/login/?next=https%3A%2F%2Fwww.kogama.com%2Fgames%2Fembed%2F7460414%2F%3Furl_referrer%3Dcrazygames.com",
    "signupURL": "https://www.kogama.com/register/",
    "idleURL": "https://www.kogama.com/page/disconnected/?reason=idle",
    "disconnectedURL": "https://www.kogama.com/page/disconnected/",
    "region": "eu",
    "referrer": "kogama",
    "detailedStats": false,
    "isIOSDevice": false
}

fetch("https://www.kogama.com/locator/session/?objectID=7460414&profileID=0&lang=en_US&type=1").then(response => {
    let data = response.json();

    sessionData.sessionToken = data.sessionToken;
    sessionData.token = data.token;

    sessionData.newPlanetName = data.sessionID;
    sessionData.planetName = data.sessionID;

    let sessionTokenID = JSON.parse(data.sessionToken.split(".")[0]);
    sessionData.pingURL = `https://www.kogama.com/locator/session/${sessionTokenID}/ping/?token=${data.sessionToken}`;
    
});

function SendMessage (type, data) {
    Module.SendMessage("BrowserComm", type, JSON.stringify(data));
}

function UNITY_requestVideoAd (info) {
    let callbackId = JSON.parse(info).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            adAvailable: false
        })
    });
}

function UNITY_requestRewardedVideoAd (info) {
    let callbackId = JSON.parse(info).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            adAvailable: false
        })
    });
}

function UNITY_requestDomain (info) {
    let callbackId = JSON.parse(info).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            domain: "kogama.com"
        })
    });
}

function UNITY_unityDebugLog (info) {
    console.debug(info);
}

function UNITY_sendPlayerParams (info) {
    console.log(info);
}

function UNITY_sendLoadStats (info) {
    let callbackId = JSON.parse(info).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            DOMReady: Date.now(),
            PluginInit: Date.now()
        })
    });
}

function get_browser_version (info) {
    Module.SendMessage("BrowserComm", "GiveBrowserInfo", "Chrome,135");
}

function UNITY_sendStatHatCount () {
    console.log(arguments);
}

function UNITY_sendPlayerParams (data) {
    let callbackId = JSON.parse(data).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify(sessionData)
    });
}

function UNITY_gotoDisconnectedPage () {
    console.log("disconnected");
}