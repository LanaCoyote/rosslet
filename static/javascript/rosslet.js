var current_element = 1;
var global_bgcolor  = "#FFF";

function ross_add_element( ) {
  var docspace        = document.getElementById("rslt_doc");
  var ctrlspace       = document.getElementById("rslt_ctrlspace");
  var elemid          = _get_new_elem_id( );

  docspace.innerHTML  = docspace.innerHTML + _create_elem_html( elemid );
  ctrlspace.innerHTML = ctrlspace.innerHTML + _create_ctrlblock_html( elemid );
}

function ross_close( id ) {
  var el    = document.getElementById( "elem_" + id );
  el.parentNode.removeChild( el );

  var ctrl  = document.getElementById( "ctrl_" + id );
  ctrl.parentNode.removeChild( ctrl );
}

function ross_update_bgcolor( id ) {
  console.log( id )
  if ( id > 0 ) {
    var bgcolor = document.getElementById( "ctrl_" + id + "_bgcolor" );
    var elem    = document.getElementById( "elem_" + id );

    if ( bgcolor === "" ) {
      elem.style.background = "transparent";
    } else {
      bgcolor.value         = bgcolor.value;
      elem.style.background = bgcolor.value;
    }
    return elem.style.background;
  } else {
    var bgcolor = document.getElementById( "ctrl_bgcolor" ).value;
    document.body.style.background = bgcolor;
    return document.body.style.background;
  }
}

function ross_update_fgcolor( id ) {
  if ( id > 0 ) {
    var fgcolor = document.getElementById( "ctrl_" + id + "_fgcolor" );
    var elem    = document.getElementById( "elem_" + id );

    if ( fgcolor === "" ) {
      elem.style.color = document.getElementById( "rslt_doc" ).color;
    } else {
      fgcolor.value     = fgcolor.value;
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
  return "<div id='elem_" + id + "' class='rslt_el'>Lorem ipsum dolor sit amet</div>\n";
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
  return "<div class='rslt_close'><a id='close_" + id + "' href='javascript:ross_close( " + id + " )' class='rslt_closebutton'>x</a></div>\n";
}

