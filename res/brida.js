import { androidpinningwithca1, androidpinningwithoutca1, androidrooting1, androidfingerprintbypass1, androidfingerprintbypass2hook } from './androidDefaultHooks.js'
import { androidfingerprintbypass2function, tracekeystore, listaliasesstatic, listaliasesruntime, dumpcryptostuff } from './androidDefaultHooks.js'
import { ios10pinning, ios11pinning, ios12pinning, iosbypasstouchid, iosjailbreak, iosdumpkeychain, iosdataprotectionkeys, iosdumpcurrentencryptedapp } from './iosDefaultHooks.js'
import { getallclasses, getallmodules, getmoduleimports, getmoduleexports, getclassmethods, findobjcmethods } from './bridaFunctions.js'
import { findimports, findexports, detachall, trace, changereturnvalue, getplatform } from './bridaFunctions.js'

// Brida User file: use this file to insert your Frida exports/hooks/functions.
// Do not remove existing code (it is necessary for Brida)

rpc.exports = {
	androidpinningwithca1, androidpinningwithoutca1, androidrooting1, androidfingerprintbypass1, androidfingerprintbypass2hook, 
    androidfingerprintbypass2function, tracekeystore, listaliasesstatic, listaliasesruntime, dumpcryptostuff,
	ios10pinning, ios11pinning, ios12pinning, iosbypasstouchid, iosjailbreak, iosdumpkeychain, iosdataprotectionkeys, iosdumpcurrentencryptedapp,
	getallclasses, getallmodules, getmoduleimports, getmoduleexports, getclassmethods, findobjcmethods,
	findimports, findexports, detachall, trace, changereturnvalue, getplatform,

	// BE CAREFUL: Do not use uppercase characters in exported function name (automatically converted lowercase by Pyro)
	exportedfunction: function() {

		// Do stuff...	
		// This functions can be called from custom plugins or from Brida "Execute method" dedicated tab

	}

	// Put here the exported functions called by your custom plugins

}

// Put here you Frida hooks!

//if(ObjC.available) {
//if(Java.available) {
	
	// ...

//}



// Auxiliary functions - You can remove them if you don't need them!

// Convert a hex string to a byte array
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

// Convert a ASCII string to a hex string
function stringToHex(str) {
    return str.split("").map(function(c) {
        return ("0" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join("");
}

// Convert a hex string to a ASCII string
function hexToString(hexStr) {
    var hex = hexStr.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}