//this function converts a byte array (Uint8Array) to a Base64 string
//it is used to convert image data (byte array) to a Base64 string for display in the browser
//it is called in showSensorInfoCard.js

function toBase64(arr) {
	//arr = new Uint8Array(arr) if it's an ArrayBuffer
	//btoa: decodes a string into bytes using Latin-1 (ISO-8859), and encodes those bytes into a string using Base64.
	return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}
