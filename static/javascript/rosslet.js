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
      bgcolor.setAttribute( 'value', bgcolor.value )
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
      fgcolor.setAttribute( 'value', fgcolor.value )
      elem.style.color  = fgcolor.value;
    }
    return elem.style.color;
  } else {
    var fgcolor = document.getElementById( "ctrl_fgcolor" ).value;
    document.body.style.color = fgcolor;
    return document.body.style.color;
  }
}

function ross_save_element_text( id ) {
  var elem = document.getElementById( "elem_" + id + "_input" );
  elem.setAttribute( 'value', elem.value );
}

function ross_hide_controls( ) {
  document.getElementById( "rslt_sidecontrol" ).style.display = "none";
  document.getElementById( "rslt_showhide_link" ).href = "javascript:ross_show_controls( )";
  document.getElementById( "rslt_showhide_link" ).innerHTML = "Show Controls"
}

function ross_show_controls( ) {
  document.getElementById( "rslt_sidecontrol" ).style.display = "block";
  document.getElementById( "rslt_showhide_link" ).href = "javascript:ross_hide_controls( )";
  document.getElementById( "rslt_showhide_link" ).innerHTML = "Hide Controls"
}

function ross_open_font_window( id ) {
  ross_close_font_window( );
  document.getElementById( "rslt_wrapper" ).innerHTML += _wrap_modal( _create_font_form_html( id ) );
}

function ross_close_font_window( ) {
  var win = document.getElementById( "rslt_font_window" );
  if ( win ) {
    win.parentNode.removeChild( win );
  }
}

function ross_apply_font_window( id ) {
  var elem        = document.getElementById( "elem_" + id )

  elem.style.fontFamily = document.getElementById( "modal_font-family" ).value;
  elem.style.fontWeight = document.getElementById( "modal_font-weight" ).value;
  elem.style.fontStyle  = document.getElementById( "modal_font-style" ).value;

  ross_close_font_window( );
}

function _get_new_elem_id( ) {
  var id          = current_element;
  current_element = current_element + 1;
  return id;
}

function _create_elem_html( id ) {
  return "<div id='elem_" + id + "' class='rslt_el'>" +
    "<input id='elem_" + id + "_input' type='text' value='Lorem ipsum dolor sit amet' onchange='javascript:ross_save_element_text( " + id + " )'>" +
    "</div>\n";
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
  return "<div class='rslt_close'>" +
    "<a id='font_" + id + "' href='javascript:ross_open_font_window( " + id + " )' class='rslt_fontbutton'><i class='fa fa-font fa-fw'></i></a>" +
    "<a id='close_" + id + "' href='javascript:ross_close( " + id + " )' class='rslt_closebutton'><i class='fa fa-trash fa-fw'></i></a>" +
    "</div>\n";
}

function _wrap_modal( html ) {
  return "<div id='rslt_font_window' class='rslt_modal'>" + html + "</div>";
}

function _create_font_form_html( id ) {
  var elem = document.getElementById( "elem_" + id );

  return _create_style_attr_input( "font-family", elem.style.fontFamily, "sans-serif" ) + 
    _create_style_attr_input( "font-weight", elem.style.fontWeight, "bold" ) + 
    _create_style_attr_input( "font-style", elem.style.fontStyle, "normal" ) +
    _create_button( "Cancel", "ross_close_font_window( )" ) +
    _create_button( "OK", "ross_apply_font_window( " + id + " )" );
}

function _create_style_attr_input( attr, def, def2 ) {
  if (!def) { def = def2 }
  return "<div class='rslt_control'><span class='rslt_control_label'>" + attr + "</span><input id='modal_" + attr + "' type='text' value='" + def + "'></div><br>\n";
}

function _create_button( text, func ) {
  return "<a class='rslt_button' href='javascript:" + func + "'>" + text + "</a>\n"
}

window.onload = function () {
  ross_add_element( );
  ross_add_element( );
  ross_add_element( );
  ross_add_element( );

  document.getElementById( "ctrl_1_bgcolor" ).placeholder = "Enter a Background Color";
  document.getElementById( "ctrl_1_fgcolor" ).placeholder = "Enter a Foreground Color";
  document.getElementById( "ctrl_2_bgcolor" ).setAttribute( 'value', '#5A5A5A' )
  document.getElementById( "ctrl_2_fgcolor" ).setAttribute( 'value', 'white' )
  document.getElementById( "elem_1_input" ).setAttribute( 'value', 'Welcome to Rosslet! Use the controls on the right to style this text.')
  document.getElementById( "elem_2_input" ).setAttribute( 'value', 'For example, this text is white on a gray background.')
  document.getElementById( "elem_3_input" ).setAttribute( 'value', 'Delete lines by clicking the trash can next to their controls. Add them by clicking the \"Add New Line\" button.')
  document.getElementById( "elem_4_input" ).setAttribute( 'value', 'You can also enter your own text by clicking on these lines.')

  ross_update_bgcolor( 2 );
  ross_update_fgcolor( 2 );
};