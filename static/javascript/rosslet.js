var current_element = 1;  // ID of the next element to add

// ross_add_element
// Adds a new element to the document and an associated control.
function ross_add_element( ) {
  var docspace        = document.getElementById("rslt_doc");        // document container (put elements here)
  var ctrlspace       = document.getElementById("rslt_ctrlspace");  // control container (put controls here)
  var elemid          = _get_new_elem_id( );  // get the next id

  docspace.innerHTML  = docspace.innerHTML + _create_elem_html( elemid );       // append an element to the document container
  ctrlspace.innerHTML = ctrlspace.innerHTML + _create_ctrlblock_html( elemid ); // append a control to the control container
}

// ross_close
// Removes an element and its associated control.
//
// * id - the id of the element to remove
function ross_close( id ) {
  // find and delete the element with that id
  var el    = document.getElementById( "elem_" + id );
  el.parentNode.removeChild( el );

  // find and delete the control with that id
  var ctrl  = document.getElementById( "ctrl_" + id );
  ctrl.parentNode.removeChild( ctrl );
}

// ross_update_bgcolor
// Updates the background color of an element or the whole document
//
// * id - the id of the element to update or 0 to apply to the document
function ross_update_bgcolor( id ) {
  if ( id > 0 ) {
    // an id is specified, so set its colors
    var bgcolor = document.getElementById( "ctrl_" + id + "_bgcolor" ); // get the associated control
    var elem    = document.getElementById( "elem_" + id );              // get the associated element

    if ( bgcolor === "" ) {
      // background is left blank, so set it to transparent
      elem.style.background = "transparent";
    } else {
      // set the background to the given color
      elem.style.background = bgcolor.value;
    }

    // return the new color for debugging
    return elem.style.background;
  } else {
    // no id specified, apply to the whole document
    var bgcolor = document.getElementById( "ctrl_bgcolor" ).value;  // ge the global bg control
    document.body.style.background = bgcolor; // set our background
    return document.body.style.background;    // return the color for debugging
  }
}

// ross_update_fgcolor
// Updates the foreground color of an element or the whole document
//
// * id - the id of the element to update or 0 to apply to the document
function ross_update_fgcolor( id ) {
  if ( id > 0 ) {
    var fgcolor = document.getElementById( "ctrl_" + id + "_fgcolor" );
    var elem    = document.getElementById( "elem_" + id );

    if ( fgcolor === "" ) {
      elem.style.color = document.getElementById( "rslt_doc" ).color;
    } else {
      elem.style.color  = fgcolor.value;
    }
    return elem.style.color;
  } else {
    var fgcolor = document.getElementById( "ctrl_fgcolor" ).value;
    document.body.style.color = fgcolor;
    return document.body.style.color;
  }
}

function _get_new_elem_id( ) {
  var id          = current_element;
  current_element = current_element + 1;
  return id;
}

function _create_elem_html( id ) {
  return "<div id='elem_" + id + "' class='rslt_el'><input type='text' value='Lorem ipsum dolor sit amet'></div>\n";
}

function _create_ctrlblock_html( id ) {
  return "<div id='ctrl_" + id + "' class='rslt_ctrlblock'>\n" + 
    _create_ctrl_html( id, "BG:", "bgcolor" ) +
    _create_ctrl_html( id, "FG:", "fgcolor" ) +
    _create_close_html( id ) +
    "</div>\n";
}

function _create_ctrl_html( id, label, input ) {
  return "<div class='rslt_control'>" + _create_ctrl_label_html( label ) + _create_ctrl_inputbox_html( id, input ) + "</div>\n";
}

function _create_ctrl_label_html( label ) {
  return "<span class='rslt_control_label'>" + label + "</span>";
}

function _create_ctrl_inputbox_html( id, input ) {
  return "<input id='ctrl_" + id + "_" + input + "' type='text' onchange='javascript:ross_update_" + input + "( " + id + " )'>";
}

function _create_close_html( id ) {
  return "<div class='rslt_close'><a id='close_" + id + "' href='javascript:ross_close( " + id + " )' class='rslt_closebutton'><i class='fa fa-trash fa-fw'></i></a></div>\n";
}

window.onload = ross_add_element;