const ImageKit = require("imagekit-javascript");

const imagekit = new ImageKit({
	publicKey: "public_WuzE6O06RPrl0BjBxuf2Xw5s2lw=",
	urlEndpoint: "https://ik.imagekit.io/v4tocayvx",
	authenticationEndpoint: "http://192.168.0.106:3000/image-kit/auth"
});

const authenticator = async () => {
	try {
		const response = await fetch("http://192.168.0.106:3000/image-kit/auth");
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Request failed with status ${response.status}: ${errorText}`
			);
		}
		const data = await response.json();
		const { signature, expire, token } = data;
		return { signature, expire, token };
	} catch (error) {
		throw new Error(`Authentication request failed: ${error.message}`);
	}
};

const convertToBlob = async fileUri => {
	try {
		const response = await fetch(fileUri);
		const blob = await response.blob();
		return blob;
	} catch (error) {
		console.error("Error converting file to Blob:", error);
		throw error;
	}
};

module.exports.uploadFile = async function (file) {
	const authData = await authenticator();
	const fileBlob = await convertToBlob(file.uri);
	file.fileName = `upload_${Date.now()}`;

	const uploadOptions = {
		file: fileBlob._data,
		fileName: `upload_${Date.now()}`,
		...authData
	};

	console.log("uploadOptions", uploadOptions);

	try {
		const result = await new Promise((resolve, reject) => {
			imagekit.upload(uploadOptions, (err, result) => {
				if (err) {
					console.error("Upload error:", err);
					reject(err);
				} else {
					console.log("Upload successful:", result);
					resolve(result);
				}
			});
		});
		return result;
	} catch (error) {
		console.error("Error in uploadFileToImageKit:", error);
		throw error;
	}
};
