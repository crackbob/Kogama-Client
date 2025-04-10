let sessionData = {
    "isSoftLaunch": false,
    "language": "en_US",
    "planetID": 7460414,
    "profileID": 0,
    "embedded": true,
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

let profileID = 0;

function SendMessage (type, data) {
    Module.SendMessage("BrowserComm", type, JSON.stringify(data));
}

function UNITY_requestVideoAd (info) {
    let callbackId = JSON.parse(info).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            adAvailable: true
        })
    });
}

function UNITY_requestRewardedVideoAd (info) {
    let callbackId = JSON.parse(info).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            adAvailable: true
        })
    });
}

function UNITY_showRewardedVideoAd (data) {
    let callbackId = JSON.parse(data).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            status: 1
        })
    })
}

function UNITY_readyForAd () {

}

function UNITY_gamePlayStatus () {
    
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
    let sessionCallbackID = JSON.parse(data).callbackId;
    fetch("https://www.kogama.com/locator/session/?objectID=7460414&profileID=0&lang=en_US&type=1").then(async (response) => {
        let data = await response.json();

        sessionData.profileID = profileID;

        sessionData.sessionToken = data.sessionToken;
        sessionData.token = data.token;

        sessionData.newPlanetName = data.sessionID;
        sessionData.planetName = data.sessionID;

        let sessionTokenID = JSON.parse(data.sessionToken.split(".")[0]).id;
        sessionData.pingURL = `https://www.kogama.com/locator/session/${sessionTokenID}/ping/?token=${data.sessionToken}`;
        sessionData.disconnectURL = `https://www.kogama.com/locator/session/${sessionTokenID}/leave/?token=${data.sessionToken}`;
        sessionData.unityPacketURL = `https://www.kogama.com/locator/session/${sessionTokenID}/leave/?token=${data.sessionToken}&plugin=WEBGL&ssl=1&unityPacket=1`;
        sessionData.disconnectURL = `https://www.kogama.com/locator/session/${sessionTokenID}/leave/?token=${data.sessionToken}&profileID=${profileID}&objectID=7460414&lang=en_US&type=1&referrer=kogama&plugin=WEBGL&ssl=1&unityPacket=1`;

        sessionData.serverIP = `wss://${data.hostName}:${data.wssPort}`;
        
        SendMessage("ExternalCallback", {
            callbackId: sessionCallbackID,
            data: JSON.stringify(sessionData)
        });
    });
}

function UNITY_gotoDisconnectedPage () {
    console.log("disconnected");
}

function UNITY_sendStatHatValue (info) {
    console.log(info);
}

function UNITY_resetAFKtimer (info) {
    console.log(info);
}