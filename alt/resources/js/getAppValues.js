function processData(data) {
  $('#signOnUrl').html(data["signOnUrl"]);
  $('#signOutUrl').html(data["signOutUrl"]);
  $('#changePasswordUrl').html(data["changePasswordUrl"]);
  $('#downloadCertificate').html('<a href="' + data["idpCertDownload"] + '">' + data["idpCertDownload"] + '</a>');
   $('#downloadCertificatePem').html('<a href="' + data["idpCertDownload"] + '?fileExtension=pem">' + data["idpCertDownload"] + '</a>');
  $('#idpMetadata').text(vkbeautify.xml(data["idpMetadata"]));
  $('#x509CertText').html(data["x509CertText"]);
  $('#x509CertTextPem').html(data["x509CertTextPem"]);
  $('#x509CertTextPem').css("white-space", "pre");
  $('#certFingerPrint').html(data["certFingerPrint"]);
  $('#validFrom').html(data["validFrom"]);
  $('#validTo').html(data["validTo"]);
  $('#issuer').html(data["issuer"]);
  $('#metadataUrl2').html(data["signOnUrl"] + '/metadata');
 $('#signOnUrl2').html(data["signOnUrl"] + ' ');
 $('#errorUrl').html(data["signOutUrl"]);
 $('#timeoutUrl').html(data["signOutUrl"]);
 $('#delAuthUrl').html(data["delAuthUrl"]);
 $('#saml11SignOnUrl').html(data["saml11SignOnUrl"]);
 $('#signOnUrlReplicon').html(data["signOnUrl"] + '?target={0}');
 window.dataSAML = data;
 $("body").trigger('dataSAMLUpdated');
}
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
$(document).ready(function($) {
  // This condition is to ensure that the ajax api code is executed only on the intended pages
  if ($('#loginAdminApp').length > 0) {
    var app = getURLParameter('app');
    var subdomain = getURLParameter('subdomain');
    var instanceId = getURLParameter('instanceId');
    var baseAdminUrl = getURLParameter('baseAdminUrl');
    var url;
    if ((subdomain == null && baseAdminUrl == null) || app == null || instanceId == null) {
      $('#loginAdminApp').show();
    } else {
      var endpoint = '/api/internal/v1/setup/help/saml/' + app + '/' + instanceId + '?callback=processData';
      if (baseAdminUrl) {
        url = baseAdminUrl + endpoint;
      } else if (subdomain) {
        url = 'https://' + subdomain + '.okta-admin.com' + endpoint;
      }
      $.ajax({
        type: 'GET',
        url: url,
        jsonp: false,
        jsonpCallback: 'processData',
        dataType: 'jsonp',
        success: function(json) {
          $('#loginAdminApp').hide();
        },
        error: function(e,jqXHR,ajaxSettings,thrownError) {
          $('#loginAdminApp').show();
        },
        timeout: 3000
      });
    }
  }


  function updateMetadataUrl() {
    var a = (window.dataSAML["signOnUrl"]);
    var m = a.indexOf("\/app") + 5;
    var n = a.substr(m);
    var o = n.indexOf("\/")+ 1;
   
    var f = n.substr(o);
    var b = a.substr(0,m);  
    var d = b.concat(f)+"\/metadata";


    $('#metadataUrl').text(d);    


   }
   
 $(document).ready(function($) {
    $("body").on('dataSAMLUpdated', updateMetadataUrl);
  });

  function updateFingerprint() {
    var a = (window.dataSAML["certFingerPrint"]).toUpperCase();
     
    a = a.replace(/(\S{2})/g,"$1\:");
    a = a.replace(/\:$/,"");    

    $('#formattedFingerprint').text(a);    

   }
   
 $(document).ready(function($) {
    $("body").on('dataSAMLUpdated', updateFingerprint);
  });



  function uppercaseFingerprint() {
    var a = (window.dataSAML["certFingerPrint"]).toUpperCase();


    $('#toUppercaseFingerprint').text(a);    

   }
   
 $(document).ready(function($) {
    $("body").on('dataSAMLUpdated', uppercaseFingerprint);
  });






  $('#mailto').on('click', function() {
      var to = "DedicatedSAMLComplaintLine@okta.com"; // I am assuming this will always be same!
      var body = "Dear Okta,%0D%0A%0D%0AI used your SAML setup instruction. I want you to know…%0D%0AI completed the SAML setup?%0D%0AI found errors in this doc?%0D%0A%0D%0AHere’s what I noticed:";
      var subject = "Update Doc:" + $('h1').text();
      var mailto = "mailto:" + to + "?subject=" + subject + "&body=" + body;
      window.location.href = mailto;
    });

});



