function SendMessage (type, data) {
    Module.SendMessage("BrowserComm", type, JSON.stringify(data));
}

let typeToGameMode = {
    "edit": 0,
    "play": 1,
    "character": 2,
    "local-play": 1
}

function UNITY_sendPlayerParams (data) {
    let urlParams = new URLSearchParams(document.location.search);
    let gameID = urlParams.get("gameID") || 7460414;
    let profileID = 0;
    let gamemode = "play";

    let sessionCallbackID = JSON.parse(data).callbackId;
    fetch(`https://www.kogama.com/locator/session/?objectID=${gameID}&profileID=${profileID}&lang=en_US&type=${gamemode}`).then(async (response) => {
        
        let data = await response.json();
        let sessionTokenID = JSON.parse(data.sessionToken.split(".")[0]).id;

        let sessionData = {
            "isSoftLaunch": false,
            "language": "en_US",
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
            "isIOSDevice": false,
            "gameMode": typeToGameMode[gamemode],
            "profileID": profileID,
            "planetID": gameID,
            "sessionToken": data.sessionToken,
            "token": data.token,
            "newPlanetName": data.sessionID,
            "planetName": data.sessionID,
            "pingURL": `https://www.kogama.com/locator/session/${sessionTokenID}/ping/?token=${data.sessionToken}`,
            "disconnectURL": `https://www.kogama.com/locator/session/${sessionTokenID}/leave/?token=${data.sessionToken}`,
            "unityPacketURL": `https://www.kogama.com/locator/session/${sessionTokenID}/leave/?token=${data.sessionToken}&plugin=WEBGL&ssl=1&unityPacket=1`,
            "disconnectURL": `https://www.kogama.com/locator/session/${sessionTokenID}/leave/?token=${data.sessionToken}&profileID=${profileID}&objectID=${gameID}&lang=en_US&type=1&referrer=kogama&plugin=WEBGL&ssl=1&unityPacket=1`,
            "serverIP": `wss://${data.hostName}:${data.wssPort}`
        }

        SendMessage("ExternalCallback", {
            callbackId: sessionCallbackID,
            data: JSON.stringify(sessionData)
        });
    });
}

function UNITY_requestVideoAd (data) {
    let callbackId = JSON.parse(data).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            adAvailable: true
        })
    });
}

function UNITY_requestRewardedVideoAd (data) {
    let callbackId = JSON.parse(data).callbackId;
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

function  UNITY_showVideoAd (data) {
    let callbackId = JSON.parse(data).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            status: 1
        })
    })
}

function UNITY_requestDomain (data) {
    let callbackId = JSON.parse(data).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            domain: "kogama.com"
        })
    });
}

function UNITY_sendLoadStats (data) {
    let callbackId = JSON.parse(data).callbackId;
    SendMessage("ExternalCallback", {
        callbackId: callbackId,
        data: JSON.stringify({
            DOMReady: Date.now(),
            PluginInit: Date.now()
        })
    });
}

function get_browser_version () {
    Module.SendMessage("BrowserComm", "GiveBrowserInfo", "Chrome,135");
}

function UNITY_gotoDisconnectedPage () {
    console.log("disconnected");
}

function UNITY_gotoIdlePage () {
    console.log("disconnected");
}

function UNITY_sendStatHatValue () {

}

function UNITY_readyForAd () {

}

function UNITY_sendStatHatCount () {
    
}

function UNITY_gamePlayStatus () {
    
}

function UNITY_resetAFKtimer () {
    console.log("reset AFK timer");
}

function UNITY_unityDebugLog (data) {
    console.debug(data);
}