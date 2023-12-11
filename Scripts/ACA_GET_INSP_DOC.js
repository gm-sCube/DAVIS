/*------------------------------------------------------------------------------------------------------/
| Program		: ACA_GET_INSP_DOC.js
| Event			: 
|
| Usage			: 
| Notes			: auto generated Record Script by Accela Eclipse Plugin 
| Created by	: AWARRAD
| Created at	: 19/05/2022 02:17:41
|
/------------------------------------------------------------------------------------------------------*/
var altId = aa.env.getValue("AltId");
var capId = aa.cap.getCapID(altId).getOutput();

var inspId = aa.env.getValue("InspId");
var entityId = capId.getID1() + "-" + capId.getID2() + "-" + capId.getID3() + "-" + inspId;

var cap = aa.cap.getCap(capId).getOutput();

var inspDocList = aa.document.getDocumentListByEntity(entityId, "INSPECTION").getOutput().toArray();


if (inspDocList.length > 0) {
	var documentModel = inspDocList.sort(function (a, b) {
		return b.getFileUpLoadDate().getTime() - a.getFileUpLoadDate().getTime()
	})[0];

	if (documentModel) {
		var downloaded = aa.document.downloadFile2Disk(documentModel, aa.cap.getCap(capId).getOutput().getCapModel().getModuleName(), "", "", true);
		var filePathObj = java.nio.file.Paths.get(downloaded.getOutput());
		var fileIo = java.nio.file.Files.readAllBytes(filePathObj);

		var encodedBytes = java.util.Base64.getEncoder().encode(fileIo);
		var base64Result = new java.lang.String(encodedBytes)

		aa.env.setValue("fileName", documentModel.getDocName());
		aa.env.setValue("base64", base64Result);
		aa.env.setValue("documentFound", true);
	} else {
		aa.env.setValue("documentFound", false);
	}
} else {
	aa.env.setValue("documentFound", false);
}