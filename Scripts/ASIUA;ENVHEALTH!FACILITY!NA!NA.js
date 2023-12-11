//ASIUA:ENVHEALTH/FACILITY/NA/NA event
if(capId != null)
	{
	useAppSpecificGroupName=false;
       var uploadToCERSapp = getAppSpecific("Assign a new CERS ID via CERS Tier5", capId);
       var CERS_ID = getAppSpecific("CERS_ID", capId);
      if(uploadToCERSapp =="CHECKED" && isBlank(CERS_ID))
    	  {
    	  showMessage = true; 
    	  showDebug = true;
    	  var altId = capId.getCustomID(); 
	  		aa.env.setValue("Additional Options", "CERS_OPTIONS");
	  		aa.env.setValue("FacilityDownload", "N");
	  		aa.env.setValue("CMEUpload","N");
	  		aa.env.setValue("EmailTo","noreply@mail.com");
	  		aa.env.setValue("FacilityUpload","Y");
	  		aa.env.setValue("currentAltId",capId.getCustomID() );
	  		eval(getScriptText("BATCH_CERS", null, false));
    	  }	
	}

function getScriptText(vScriptName, servProvCode, useProductScripts) {
    if (!servProvCode)
        servProvCode = aa.getServiceProviderCode();
    vScriptName = vScriptName.toUpperCase();
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    try {
        if (useProductScripts) {
            var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
        } else {
            var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
        }
        return emseScript.getScriptText() + "";
    } catch (err) {
        return "";
    }
}