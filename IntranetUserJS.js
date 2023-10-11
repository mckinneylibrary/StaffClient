$(document).ready(function(){
  
//    if ( $('#pat_memberentrygen').length ) {
//        $('#dateofbirth').removeClass('flatpickr flatpickr-input');
 //   }
  
  let baseURL = 'https://ipac.mckinneytexas.org';
/* change OPAC link on record detail page*/
if ($('#catalog_detail').length) {
    let bib = $('input[name="bib"]').val();
    $('.results_summary > a:contains("Open in new window")').attr('href', `${baseURL}/Record/${bib}`);
}

/* change OPAC link on subscription detail page*/
if ($('#ser_subscription-detail').length) {
    let bibtext = $('#subscription_info ol > li > i').text();
    let re = /\(([^\)]+)\)/;
    let bib = bibtext.match(re);
    $('#view-subscription-in-opac').attr('href', `${baseURL}/Record/${bib[1]}`);
}

/* change OPAC link in search results*/
if ($('#catalog_results').length) {
    $('#searchresults table tbody tr').each(function() {
        let bib = $(this).find('input[name="biblionumber"]').val();
        $(this).find('.view-in-opac > a').attr('href', `${baseURL}/Record/${bib}`);
    });
}
  
  
// RT 92543 1.18.22 lg
if ( $('#acq_suggestion').length ) {
    $('label[for="copyrightdate"]').text('Publication date:');
    $('label[for="publishercode"]').text('Intended audience:');
    $('label[for="publishercode"], label[for="place"], label[for="collectiontitle"], label[for="itemtype"]').addClass('required');
    $('label[for="place"]').text('Format');
    $('label[for="collectiontitle"]').text('If purchased, place hold for me:');
    $('label[for="itemtype"]').text('If not purchased, order interlibrary loan for me');
    $('textarea[id="note"]').siblings('label').text('Additional information:');
    $('textarea[id="staff_note"]').parent().hide();
    $('#note').attr('maxlength' , 100 );
    
    let pubcode_value = $('#publishercode').val();
    $('#publishercode').replaceWith(`
    <select id="publishercode" name="publishercode" class="valid required" aria-invalid="false">
        <option value="">--Choose--</option>
        <option value="Adults">Adults</option>
        <option value="Teens">Teens</option>
        <option value="Children">Children</option>
        <option value="General/Unknown">General/Unknown</option>
    </select>
    `);
    $('#publishercode option[value="'+pubcode_value+'"]').prop('selected' , true );

    let place_value = $('#place').val();
    $('#place').replaceWith(`
    <select id="place" name="place" class="valid required" aria-invalid="false">
        <option value="">--Choose--</option>
        <option value="Book">Book</option>
        <option value="Large type">Large type</option>
        <option value="Blu-ray">Blu-ray</option>
        <option value="DVD">DVD</option>
    </select>
    `);
    $('#place option[value="'+place_value+'"]').prop('selected' , true );
 
    let collectiontitle_value = $('#collectiontitle').val();
    $('#collectiontitle').replaceWith(`
    <select id="collectiontitle" name="collectiontitle" class="valid required" aria-invalid="false">
        <option value="">--Choose--</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
    `);
    $('#collectiontitle option[value="'+collectiontitle_value+'"]').prop('selected' , true );

    let itemtype_value = $('#itemtype').val();
    console.log(itemtype_value);
    $('#itemtype').replaceWith(`
    <select id="itemtype" name="itemtype" class="valid required" aria-invalid="false">
        <option value="">--Choose--</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
    `);
     $('#itemtype option[value="'+itemtype_value+'"]').prop('selected' , true );
}  
  
if ( $('#acq_suggestion').length ) {
    $('.label:contains("Copyright date")').text('Publication date:');
    $('.label:contains("Publisher")').text('Intended audience:');
    $('.label:contains("Publication place")').text('Format:');
    $('.label:contains("Collection title")').text('If purchased, place hold for me:');
    $('.label:contains("Document type")').text('If not purchased, order interlibrary loan for me:');
    $('.label:contains("Notes")').text('Additional information:');	
    
    if ( $('#suggestiontabs').length ) {
        $('.suggestion_publishercode').each( function() {
            let intented_for_text = $(this).text().replace('Published by ' , 'Intended for ');
            $(this).text(intented_for_text);
        });
        $('.suggestion_collectiontitle').each( function() {
        	$(this).wrap('<div class="place_hold">If purchased, place hold: <strong></strong></div>');
        });
        $('.suggestion_itype').each( function() {
        	$(this).wrap('<div class="place_ill">If not purchased, order ILL: <strong></strong> </div>');
        });
       $("td:nth-child(2)").each(function(){  
            //$(this).html($(this).html().replace(/;/g , ''));
        });
        $('.suggestion_publishercode').each( function() {
            $(this).css('display' , 'block').css('font-size' , '18px');
        	if ( $(this).text().includes('Adults') ) {
            	$(this).css('color' , 'green');
            } else if ( $(this).text().includes('Children') ) {
            	$(this).css('color' , 'blue');
            } else if ( $(this).text().includes('Teen') ) {
            	$(this).css('color' , 'orange');
            }
        });

    }
}
  
/* RT 79692 4.5.21 lg */
  
if ( $('#circ_returns').length ) {
    $('.ret_checkinmsg:contains("ROUTE TO NEW DISPLAY")').parent().hide();
	if ( $('.ret_checkinmsg:contains("ROUTE TO NEW DISPLAY")').length && $('#wrong-transfer-modal').length == 0 && $('#item-transfer-modal').length == 0 && $('h4:contains("Transfer to:")').length == 0 && $('.confirm').length == 0 ) {
      let the_text = $('.ret_checkinmsg:contains("ROUTE TO NEW DISPLAY"):first').text();     
      $('body').append('<div class="modal" id="itemTypeAlert" tabindex="-1" role="dialog" aria-labelledby="smallModal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"> <h4 class="modal-title" id="itemTypeAlertLabel">ALERT</h4></div><div class="modal-body"><div class="alert">'+the_text+'</div></div><div class="modal-footer"> <button type="button" class="btn btn-default closeit" data-dismiss="modal">Close</button> </div></div></div></div>');
      $('#itemTypeAlert').modal('show');
    }

      $('.ret_checkinmsg:contains("Please Check Kit for All Parts. If it is a Maker Kit, please reformat the USB drive.")').parent().hide();
	if ( $('.ret_checkinmsg:contains("Please Check Kit for All Parts. If it is a Maker Kit, please reformat the USB drive.")').length && $('#wrong-transfer-modal').length == 0 && $('#item-transfer-modal').length == 0 && $('h4:contains("Transfer to:")').length == 0 && $('.confirm').length == 0 ) {
      let the_text = $('.ret_checkinmsg:contains("Please Check Kit for All Parts. If it is a Maker Kit, please reformat the USB drive."):first').text();     
      $('body').append('<div class="modal" id="itemTypeAlert" tabindex="-1" role="dialog" aria-labelledby="smallModal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"> <h4 class="modal-title" id="itemTypeAlertLabel">ALERT</h4></div><div class="modal-body"><div class="alert">'+the_text+'</div></div><div class="modal-footer"> <button type="button" class="btn btn-default closeit" data-dismiss="modal">Close</button> </div></div></div></div>');
      $('#itemTypeAlert').modal('show');
}  
}
  
$('.closeit').click( function() {
    setTimeout(function(){ 
  	$('#barcode').focus(); 
}, 50);

  });
  
  
/* Clear search form EV post 20.05 upgrade 20210224 */
/*     $("#search-form").focus( 
		function(){ 
		$(this).val('');   
	  });  
     $("#search-form").focus(); */
  
  
/* hide other covers when there is a local cover. details page RT 76002 12.3.20 lg*/
 /*
if ( $('#catalog_detail').length ) {
  let target = document.querySelector('#local-thumbnail-preview');
  let config = { attributes: true, childList: true, characterData: true }
  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if ( $('#local-thumbnail-preview img[src*="/cgi-bin/koha/catalogue/image.pl"]').length ) {
        $('#amazon-bookcoverimg').hide();
      }
    });
  });
  observer.observe(target, config);
} */   

  
  /* hide B&T covers when there is a local cover. results page RT 76002 12.3.20 lg*/
  /*if ( $('#catalog_results').length ) {
      $("[id^=local-thumbnail]").each( function() {
          let this_one = $(this);
          let this_id = '#' + $(this).attr('id');
          let target = document.querySelector(this_id);
          let config = { attributes: true, childList: true, characterData: true }
          let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              var addedNodes = $(mutation.addedNodes[0]);
              if ( addedNodes.prop('nodeName') == "IMG" ) {
                  this_one.parent().siblings().children('img').hide();
              }
  
            });
          });
          observer.observe(target, config);
      })
  }*/
  
  
    if ( $('#pat_memberentrygen')  ) {
      let vote_reg = $('label:contains("Would you like a voter registration card? (please see staff):")').siblings('select');
      let vote_attr = vote_reg.val(); 
      if ( vote_attr == 1 ) {
          $('.patronbriefinfo').prepend('<li style="color:red;"><strong>Voter registration card: YES</strong></li>');
      } else if ( vote_attr == 0 ) {
          $('.patronbriefinfo').prepend('<li><strong>Voter registration card: NO</strong></li>');
      }
  }
  
  /*add barcode above patroninfo section RT 69058 6.6.20 lg*/
  if ( $('.patroninfo').length ) {
    
    let cardnumber = $('.patroninfo h5').text();
    let findMatch = cardnumber.match(/\d{14}/);
    if (findMatch) {
	$('.patroninfo h5').append('<svg id="barcode_placeholder"></svg>');
      $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.0/barcodes/JsBarcode.codabar.min.js" )
      .done(function( script, textStatus ) {
            var element = document.getElementById("barcode_placeholder");
            JsBarcode(element, findMatch[0], {
              width: 1,
              height: 40,
              displayValue: false
			});
      });
    }
  }
   




$(document).ready(function () {
  /*in batch checkouts show number of checkout in batch. 5.5.20 lg*/  
  if ( $('#circ_circulation_batch_checkouts').length ) {
    var checkout_number = 0;
    $('#checkout_infos tbody tr').each( function() {
      checkout_number++;
    });
    $(`<h3>Number of checkouts in batch: ${checkout_number}</h3>`).insertBefore( $('#checkout_infos') );
  }
});

// Hiding the inventory data in the holdings table on the details.pl page. 
/* $(document).ready(function () {
  if ( $('#catalog_detail').length ) {
    $(window).load(function () {
      var table = $('#holdings_table').DataTable();
      let inventory_number_column = $('#holdings_table th:contains("Inventory number")').index();
      table.columns( [inventory_number_column] ).visible(false ).draw();
    })
  }
});
*/

//improving location column 
$(document).ready(function(){
$("div.availability strong").css("color:green;");  
$(".availability span.status").prepend("<br><hr>");
});  


$(document).ready(function(){
if ( $('#catalog_advsearch').length ) {

// Add Accelerated Reading Level to advanced search
$("select.advsearch").append('<option value="arl,phr">Accelerated Reading Level</option>');

// Add Accelerated Reading Point to advanced search
$("select.advsearch").append('<option value="arp,phr">Accelerated Reading Point</option>');
}
});
 
/* News in language bar testing  
	$("#changelanguage").append('<marquee class="ScrollingNews" direction="scroll">We have devloped a scrolling news feed for the bottom of our Koha staff site. Please report any issues <a href="https://goo.gl/forms/LnKM3URotVMMDukK2">here</a>.</marquee>');
*/

// Setting L-Pri as the default val for manual invoice_type 
$("#invoice_type").val("L- PRI").attr("selected","selected");


//jQuery adding the Cloud Library data to the staff client. Nick and Ed
//Commented out - plugin auto adds this now - wnc 20190507
// var our_cloud_lib = "ndpmf";
// $.getScript("/plugin/Koha/Plugin/Com/ByWaterSolutions/Bibliotheca/js/cloudlibrary.js");



$(document).ready(function() {


/*Disables submit buttom on payment collect screen unless a Payment type value is selected. Written by LG added by EV 12/17/18 */
$(document).ready(function() {
    if ($('#pat_paycollect').length > 0) {
        $(".tabs-container #payfine input[type='submit']").prop('disabled', true);
        $("#payindivfine").append('<span class="required" aria-required="true">Must choose a Payment type</span>');

        let paymentTypeCheck = function() {
            if ($("#payment_type").val() == '') {
                $(".tabs-container #payfine input[type='submit']").prop('disabled', true);
                $(".tabs-container .required").show();
            } else {
                $(".tabs-container #payfine input[type='submit']").prop('disabled', false);
                $(".tabs-container .required").hide();
            }
        };
        $("#payment_type").change(paymentTypeCheck);
    }
});

//ILL hold testing EV 12/13
if (window.location.pathname == '/cgi-bin/koha/reserve/request.pl') {
	$(".title:contains('ILL -')").css("color", "red").append("  (NO HOLDS)");	
	}
//End ILL hold testing EV


// New Tab for top of staff interface 6/22/23

$("#toplevelmenu").append('<li class="dropdown"><a href="/cgi-bin/koha/mainpage.pl" class="dropdown-toggle" data-toggle="dropdown">Resources <b class="caret"></b></a><ul class="dropdown-menu dropdown-menu-left"><b style="color:white;"> STAFF</b><li><a href="https://mckinney.aspendiscovery.org/" target="_blank">Aspen Discovery</a></li><li><a href="https://texasgroup.worldcat.org/" target="_blank">InterLibrary Loan</a></li><li><a href="https://secure.usaepay.com/login" target="_blank">USAePay</a></li><li><a href="http://mckinney.schedule3w.com" target="_blank">Schedule3W</a></li><li><a href="https://mcktime3:7021/ExecuTime/Index.do">Executime</a></li><li><a href="https://mckinney-public-library-system.odoo.com/sign/document/mail/1/d986fbbb-047f-4cad-a73e-d498092f4396" target="_blank">MK Waiver</a></li><li><a href="https://mckinney.metabase.bywatersolutions.com/" target="_blank">Metabase Login</a></li><br><li><b style="color:white;"> VOLUNTEERS</b><li><a href="http://mckinney.metabase.bywatersolutions.com/public/question/b3b1d7b4-d2fb-4a61-8d2c-13c8eed288e8" target="_blank">JJG Holds Pull List</a></li><li><a href="http://mckinney.metabase.bywatersolutions.com/public/question/61c83a40-685a-46bf-9d52-c8c6131a3a8b" target="_blank">RHH Holds Pull List</a></li><li><a href="http://mckinney.metabase.bywatersolutions.com/public/question/b7e7ec34-1fbf-4863-8f9c-5528985e83d5" target="_blank">Trace List</a></li></li></ul>');


  
  
//Check for Check-In Alerts
//Added by EV 20180917 based on report in reports library named Interrupt check-in process for hold/transfer confirmations 
if ($('#return2,#hold-found1,#hold-found2,#item-transfer').length){
$("#barcode").blur();
$("input[class='print']").css({backgroundColor: 'lightgreen'});
}
//end Checking for Alerts


        //add lexile to search pull downs
        $("select[name='idx']").append("<option value='lexile-number,st-numeric'>Lexile score (e.g. 600 or 550-650 )</option>");
        //$("select[name='idx']").append("<option value='Interest-age-level,wrdl'>Interest Age Level</option>");
        //$("select[name='idx']").append("<option value='Interest-grade-level,wrdl'>Interest Grade Level</option>");
        //$("select[name='idx']").append("<option value='Reading-grade-level,wrdl'>+Reading Grade Level</option>");

// Adds No Dashes text to SMS feild EV 2017/12/14
$("#SMSnumber").attr("placeholder", "NO DASHES");

// Code from Nick for #46436 put in place by EV 
$("#macro-editor").closest("div.row").css("height","100%");

//for #42060, Caboose
//Change tab from Checked to Ordered

var data = $('#suggestiontabs ul li:contains("Checked")').text();
var arr = data.split('('); 
$('#suggestiontabs ul li:contains("Checked")').children('a').text("Ordered" + " (" + arr[1]);

//change select drop-down to ordered
$("#STATUSASKED option:contains('Checked')").text("Ordered");

$(".update_suggestions option:contains('Checked')").text("Ordered");

//change status column on Ordered tab active to Ordered
$("#CHECKEDt td:contains('Checked')").text("Ordered");


$("#cardnumber").change(function () {
    var addressArray = $("#cardnumber").val();
    $("#userid").val(addressArray);
});


});


$(window).load(function() {

//replace checked with ordered

$('#ui-id-6').each(function() {
        var text = $(this).text().replace('Checked', 'Ordered');
        $(this).text(text);
    });
});

$(document).ready(function() {

    if (window.location == "http://staff.mckinney.bywatersolutions.com/cgi-bin/koha/circ/returns.pl") {
        $('#circ_returns').css("background", "#9AC8D5");
    }


    $("#memberentry_identity label[for='surname']").html("Last Name:");

    // Temporary bug fix to make default notforloan for ordered items -1 (ordered)
    $("input[name^='notforloan_']").val('-1');
});




    

/* JS for Koha RoomReservation Plugin 
This JS was added automatically by installing the RoomReservation plugin
Please do not modify 

$(document).ready(function() {
var data = $("div.patroninfo h5").html();

    if (typeof borrowernumber !== 'undefined') {
        if (data) {
            var regExp = /(([^)]+))/;
            var matches = regExp.exec(data);
            var cardnumber = matches[1];

            $('<a id="bookAsButton" target="_blank" class="btn btn-default btn-sm" href="/cgi-bin/koha/plugins/run.pl?class=Koha::Plugin::Com::MarywoodUniversity::RoomReservations&method=bookas&borrowernumber=' + borrowernumber + '"><i class="fa fa-search"></i>&nbsp;Reserve room as patron</a>').insertAfter($('#addnewmessageLabel'));
        }
    }
});
*/
    /* End of JS for Koha RoomReservation Plugin */

/* Autopopulate password with the last four digits of the cardnumber, does not work with AutoMemberNum */
$(document).ready(function () {
  if ( $('#pat_memberentrygen').length > 0 ) {  
  $("#cardnumber").on("keyup change", function() {
    var cardNum = this.value; 
    var lastFour = cardNum.substring(cardNum.length-4, cardNum.length );
    if (cardNum.length > 3){
    $("#password, #password2").val(lastFour);
    }
 });
  }
 });

/* Always Show Checkouts Immediately without checking the box in the patron record */
$(document).ready(function() {
  if ( typeof script !== 'undefined' && ! $.cookie("issues-table-load-immediately-" + script && $('#pat_moremember, #circ_circulation').length) ) {
      $('#issues-table-load-now-button').click();
      $.cookie("issues-table-load-immediately-" + script, true, { expires: 365 });
  }
});

/* Remove the Cart and corresponding links 07.17.22 JG */
$("#carticon").remove();
$(".cartlabel").remove();
$("#cartmenulink").remove();
$('[class ^="addtocart"]').remove();
/* kept the cart out, but added back patrons and search, etc., after staff discussed how they used those buttons and without them it increased navigation clicks to accomplish the same tasks. If we want to clean up the menues, let us please pull a team together and solicit broader staff input. 07.22.22 SS*/




//Import data from Photo ID
  $('#pat_memberentrygen #toolbar').append('<button class="btn btn-default toggler" id="btnScanPhotoID" name="scan" style="margin-right: 0px; margin-right: 5px;"><i class="fa fa-id-card-o"></i> Scan Photo ID</button>');
  $('#pat_memberentrygen').append('<div id="PhotoIDModal" class="modal fade" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><form id="formID" method="post" action="submit" onsubmit="return false;"><div class="modal-header"><h3>Scan Photo ID</h3></div><div class="modal-body"><textarea id="inputPhotoIDData" rows="1" cols="1" style="margin-left: -400px;" /><span id="msgScan"></span></div><div id="ContentFooter" class="modal-footer"><button id="btnPhotoIDClose" data-dismiss="modal" aria-hidden="true" class="btn"><i class="fa fa-times"></i> Cancel</button></div></form></div></div></div>');
  function ProcessPhotoID() {
    //Close modal
    $('#PhotoIDModal').modal('hide');
    $('#PhotoIDModal').on('hidden.bs.modal', function () {
      $('#msgScan').html('<h4>Scan Photo ID now...</h4>');
    });
    //Separate information into array
    console.log($('#inputPhotoIDData').val());
    var IDSegments = $('#inputPhotoIDData').val().split('\n');
    
    function toTitleCase(str)
    //NEED TO MAKE THIS FUNCTION OPTIONAL
    {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    } 
    //Fix city names that are incomplete
    function FixCity(str) {
      if (str == 'Coeur D Al') {
        return 'Coeur d\'Alene';
      } else {
        return str;
      }
    }
    //Process data
    if (IDSegments != '') {
      var usrLastName,usrFirstName,usrBirth,mStop,usrMailingAddress,usrMailingCity,usrMailingState,usrMailingZip,usrPhysicalAddress,usrPhysicalCity,usrPhysicalState,usrPhysicalZip;
      for (i = 0; i < IDSegments.length; ++i) {
        if (IDSegments[i].startsWith('DCS')) {
          usrLastName = toTitleCase(IDSegments[i].slice(3));
          if (usrLastName.substring(0,2) == 'Mc') {
            usrLastName = 'Mc' + usrLastName.substring(2,3).toUpperCase() + usrLastName.substring(3);
          }
          if (usrLastName.substring(0,3) == 'Mac') {
            $('label[for="surname"]').siblings('span.required').after('<span style="background-color: yellow; color: red; margin-left: 5px;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Check capitalization</span>');
          }
        }
        if (IDSegments[i].startsWith('DAC')) {
          usrFirstName = toTitleCase(IDSegments[i].slice(3));
        }
        if (IDSegments[i].startsWith('DAD')) {
          usrFirstName += ' ' + toTitleCase(IDSegments[i].slice(3));
        }
        if (IDSegments[i].startsWith('DBB')) {
          usrBirth = IDSegments[i].slice(3);
          usrBirth = usrBirth.substring(0,2) + '/' + usrBirth.substring(2,4) + '/' + usrBirth.substring(4,8);
        }
        if (IDSegments[i].startsWith('DAG')) {
          usrMailingAddress = toTitleCase(IDSegments[i].slice(3));
        }
        if (IDSegments[i].startsWith('DAH')) {
          usrMailingAddress += ' ' + toTitleCase(IDSegments[i].slice(3));
        }
        if (IDSegments[i].startsWith('DAI')) {
          usrMailingCity = FixCity(toTitleCase(IDSegments[i].slice(3)));
        }
        if (IDSegments[i].startsWith('DAJ')) {
          usrMailingState = IDSegments[i].slice(3);
        }
        if (IDSegments[i].startsWith('DAK')) {
          usrMailingZip = toTitleCase(IDSegments[i].slice(3,8));
        }
        if (IDSegments[i].startsWith('DAL')) {
          usrPhysicalAddress = toTitleCase(IDSegments[i].slice(3));
        }
        if (IDSegments[i].startsWith('DAM')) {
          usrPhysicalAddress += ' ' + toTitleCase(IDSegments[i].slice(3));
        }
        if (IDSegments[i].startsWith('DAN')) {
          usrPhysicalCity = FixCity(toTitleCase(IDSegments[i].slice(3)));
        }
        if (IDSegments[i].startsWith('DAO')) {
          usrPhysicalState = IDSegments[i].slice(3);
        }
        if (IDSegments[i].startsWith('DAP')) {
          usrPhysicalZip = toTitleCase(IDSegments[i].slice(3,8));
        }
      }
      //Copy data to form fields
      $('#surname').val(usrLastName).css('background-color','yellow');
      $('#firstname').val(usrFirstName).css('background-color','yellow');
      $('#dateofbirth').val(usrBirth).css('background-color','yellow');
      $('#address').val(usrMailingAddress).css('background-color','yellow');
      $('#city').val(usrMailingCity).css('background-color','yellow');
      $('#state').val(usrMailingState).css('background-color','yellow');
      $('#zipcode').val(usrMailingZip).css('background-color','yellow');
      //If secondary address doesn't exist, it usually starts with @
      if (typeof usrPhysicalAddress != 'undefined') {
        $('#B_address').val(usrPhysicalAddress).css('background-color','yellow');
        $('#B_city').val(usrPhysicalCity).css('background-color','yellow');
        $('#B_state').val(usrPhysicalState).css('background-color','yellow');
        $('#B_zipcode').val(usrPhysicalZip).css('background-color','yellow');
      }
      $('#surname').focus();
    }
  }
  $('#pat_memberentrygen #btnScanPhotoID').on('click', function() {
    var TimerActive = 0; //Reset timer
    var ScanActive = 0;
    $('#inputPhotoIDData').val('');
    $('#msgScan').html('<h4>Scan Photo ID now...</h4>');
    $('#PhotoIDModal').modal('show');
    $('#PhotoIDModal').on('shown.bs.modal', function () {
      $('#inputPhotoIDData').focus();
      $('#inputPhotoIDData').unbind();
      $('#inputPhotoIDData').keydown(function(event){
        var code = (event.keyCode || event.which);
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
        if (code == 120) { //Disable F9 so Firefox doesn't launch reader
          return false;
        }
      });
      $('#inputPhotoIDData').on('keyup', function() {
        if (ScanActive == 0) { //Set Processing Message
          $('#msgScan').html('<center><h4>Processing...  please wait.</h4><svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 105 105" fill="#000"><circle cx="12.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"><animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="52.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="52.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="92.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="92.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="12.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="52.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="92.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/></circle></svg></center>');
          //Processing Graphic from https://github.com/SamHerbert/SVG-Loaders/tree/master/svg-loaders
          ScanActive = 1;
        }
        if (TimerActive == 0) {  //Time's up on input
          TimerActive = 1;
          setTimeout(function(){
            console.log('Entire block of data: ');
            console.log($('#inputPhotoIDData').val());
            var checkStart = $('#inputPhotoIDData').val().startsWith('@'); //Check if beginning of barcode starts with @
            if (checkStart) { //Was this a valid barcode?
              ProcessPhotoID();
            } else {
              $('#msgScan').html('<center><h4>That doesn\'t look like a Photo ID.  Try again.</h4></center>');
              $('#inputPhotoIDData').val('');
              TimerActive = 0;
              ScanActive = 0;
            }
          }, 5000);          
        }
        console.log(event.key);
        //Convert to linefeed - ArrowDown for Honeywell 7580g / ArrowRight for Datalogic QD2430 / Alt for Zebra Symbol DS4308
        if ((event.key == 'ArrowDown') || (event.key == 'ArrowRight') || (event.key == 'Alt') || (event.key == 'Enter')) {
          $('#inputPhotoIDData').val($('#inputPhotoIDData').val() + '\n');
        }
      });
    });
  });
  //END Import data from Photo ID

//BEGIN Restructure Patron Details screen (From CIN) 

$('#pat_moremember #circmessages').nextAll('h3:first').wrap('<div id="patron-id"></div>');
$('#pat_moremember #patron-information div.patroninfo-heading').each(function () {
  $(this.nextSibling).wrap('<div id="patron-othername"></div>');
});
var othername_trim = $('#pat_moremember #patron-othername').text().trim();
$('#pat_moremember #patron-othername').text(othername_trim);
$('#pat_moremember #patron-othername').insertAfter('#patron-id');

$('#pat_moremember #patron-alternate-address div.address').attr('id','physical-address').prependTo('#patron-information div.rows ol').wrap('<li></li>');
$('<span class="label">Alternate address: </span>').insertBefore('#patron-information #physical-address');
$('#pat_moremember #patron-information div.address').first().attr('id','mailing-address').prependTo('#patron-information div.rows ol').wrap('<li></li>');
$('<span class="label">Mailing address: </span>').insertBefore('#patron-information #mailing-address');
$('#patron-information div.address li').each(function(){
  var $li = $(this);
  $li.replaceWith(function () {
    return $('<div/>', {
      html: this.innerHTML
    });
  });
});
$('#pat_moremember #patron-information div.address ul').contents().unwrap();
$('#pat_moremember #patron-information div.address').css('display','inline-block');
$('#pat_moremember #patron-alternate-address').remove();
if (!$('#pat_moremember #patron-altcontactsurname').length && !$('#pat_moremember #patron-altcontactfirstname').length && !$('#pat_moremember #patron-altcontactphone').length) {
   $('#pat_moremember #patron-alternative-contact').remove();
}

$('#pat_moremember #patron-sort1,#pat_moremember #patron-sort2,#pat_moremember #patron-password').remove();
$('#pat_moremember #patron-extended-attributes li').appendTo('#patron-library-details ol');
$('#pat_moremember #patron-extended-attributes').remove();
$('#pat_moremember #patron-alternative-contact').insertAfter('#patron-information');
if ($('#pat_moremember span:contains("SMS number:")').next('a').is(':empty')) {
   $('#pat_moremember span:contains("SMS number:")').closest('div.rows').remove();
$('#pat_moremember #patron-borrowernotes').insertAfter('#patron-library-details > div.rows > ol > li:nth-child(16)');  
$('#pat_moremember #patron-opacnote').insertAfter('#pat_moremember #patron-borrowernotes'); 

}

//End Restructure


  //BEGIN Rename section headers on members/memberentry.pl - 11/3/22 - checked ok 
  $("#entryform legend:contains('Main address')").html("Mailing address");
  $("#entryform legend:contains('Patron messaging preferences')").text("Patron notification preferences");

  //BEGIN Move Patron Attributes under OPAC/Staff Login 
  $("#entryform #patron_attributes").parent().parent().parent().attr('id','#memberentry_userid');
  $("#memberentry_patron_attributes").insertAfter("#memberentry_userid");

  //BEGIN Move Library Setup under Patron Notifications 
  $("#entryform #subscription").parent().parent().parent().attr('id','#memberentry_messaging_prefs');
  $("#memberentry_subscription").insertAfter("#memberentry_messaging_prefs");

  //BEGIN Move Patron Notifications under Patron Attributes 
  $("#entryform #messaging_prefs").parent().parent().parent().attr('id','#entryform #patron_attributes');
  $("#memberentry_messaging_prefs").insertAfter("#entryform #patron_attributes");

  //BEGIN Move Account Flags under Patron Notificatons    $("#memberentry_account_flags").parent().parent().parent().attr('id','#memberentry_messaging_prefs');
  $("#memberentry_account_flags").insertAfter("#memberentry_messaging_prefs");

  //BEGIN Move Patron Restrictions under Patron Notificatons $("#memberentry_restrictions").parent().parent().parent().attr('id','#memberentry_messaging_prefs');
  $("#memberentry_restrictions").insertAfter("#memberentry_messaging_prefs");

  //BEGIN Move Physical Address under Mailing Address
  $("#entryform #address").parent().parent().parent().attr('id','memberentry_mailingaddress');
  $("#memberentry_address").insertAfter("#memberentry_mailingaddress");

  //BEGIN Change Surname to Last Name - 11/3/22 - checked ok  
      $("#memberentry_identity li label:contains('Surname:')").text("Last name:");

  //BEGIN Change First Name to First/Middle Name - 11/3/22 - checked ok 
      $("#memberentry_identity li label:contains('First name:')").text("First/Middle name:");  

  //BEGIN Change Surname to Last Name for Alternate Contact - 11/3/22 - checked ok 
      $("#memberentry_altaddress li label:contains('Surname:')").text("Last name:");

  //BEGIN Change Surname to Last Name for Guarantor 
      $("#memberentry_guarantor li label:contains('Surname:')").text("Last name:");

  //BEGIN Change Zip/Postal Code to Zip Code - 11/3/22 - checked ok  
      $("#memberentry_mailingaddress li label:contains('ZIP/Postal code:')").text("Zip Code:");

  //BEGIN Change Zip/Postal Code to Zip Code for Alternate Address
      $("#memberentry_address li label:contains('ZIP/Postal code:')").text("Zip Code:");

  //BEGIN Change Zip/Postal Code to Zip Code for Alternate Contact 
      $("#memberentry_altaddress li label:contains('ZIP/Postal code:')").text("Zip Code:");





$(document).ready(function () { 
   //BEGIN Item Cataloging Helper

    //Classes
    $('#cat_additem span:contains("Withdrawn status")').parent().parent().parent().addClass('withdrawn');
    $('#cat_additem span:contains("Lost status")').parent().parent().parent().addClass('lost');
    $('#cat_additem span:contains("Damaged status")').parent().parent().parent().addClass('damaged');
    $('#cat_additem span:contains("Not for loan")').parent().parent().parent().addClass('notloan');
    $('#cat_additem span:contains("Permanent location")').parent().parent().parent().addClass('homebranch');
    $('#cat_additem span:contains("Current location")').parent().parent().parent().addClass('holdingbranch');
    $('#cat_additem span:contains("Shelving location")').parent().parent().parent().addClass('shelfloc');
    $('#cat_additem span:contains("Collection code")').parent().parent().parent().addClass('ccode');
    $('#cat_additem span:contains("Call number")').parent().parent().parent().addClass('callnumber');
    $('#cat_additem span:contains("Volume")').parent().parent().parent().addClass('volume');
    $('#cat_additem span:contains("Barcode")').parent().parent().parent().addClass('bcode');
    $('#cat_additem span:contains("Item type")').parent().parent().parent().addClass('itype');
    $('#cat_additem span:contains("Date cataloged")').parent().parent().parent().addClass('accessiondate');
    $('#cat_additem span:contains("Source of acquisition")').parent().parent().parent().addClass('source');
    $('#cat_additem span:contains("Cost - purchase price")').parent().parent().parent().addClass('purchase');
    $('#cat_additem span:contains("Cost - list price")').parent().parent().parent().addClass('replacement');
    $('#cat_additem span:contains("Uniform Resource Identifier")').parent().parent().parent().addClass('uniformresourceidentifier');
    $('#cat_additem span:contains("Non-public note")').parent().parent().parent().addClass('nonpublic');
    $('#cat_additem span:contains("Public note")').parent().parent().parent().addClass('public');

    //Move  
    $('#cat_additem .accessiondate').insertAfter('#cat_additem .homebranch'); //date acquired
    $('#cat_additem .notloan').insertAfter('#cat_additem .accessiondate'); //notloan
    $('#cat_additem .itype').insertAfter('#cat_additem .notloan'); //itype  
    $('#cat_additem .ccode').insertAfter('#cat_additem .itype'); //ccode
    $('#cat_additem .shelfloc').insertAfter('#cat_additem .ccode'); //shelfloc
    $('#cat_additem .callnumber').insertAfter('#cat_additem .shelfloc'); //callnumber
    $('#cat_additem .volume').insertAfter('#cat_additem .callnumber'); //volume
    $('#cat_additem .bcode').insertAfter('#cat_additem .volume'); //bcode
    $('#cat_additem .source').insertAfter('#cat_additem .cataloger'); //source
    $('#cat_additem .purchase').insertAfter('#cat_additem .source'); //cost
    $('#cat_additem .replacement').insertAfter('#cat_additem .purchase'); //cost  
    $('#cat_additem .uniformresourceidentifier').insertAfter('#cat_additem .replacement'); //uniformresourceidentifier
    $('#cat_additem .public').insertAfter('#cat_additem .nonpublic'); //notes
    $('#cat_additem .withdrawn').insertAfter('#cat_additem .public'); //withdrawn
    $('#cat_additem .lost').insertAfter('#cat_additem .withdrawn'); //lost
    $('#cat_additem .damaged').insertAfter('#cat_additem .lost'); //damaged  
  
  });
    });
  