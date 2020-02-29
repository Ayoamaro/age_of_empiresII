/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */

/**
 * @file script.js es el archivo JS de la prática (U10P01 - Civilizaciones del Age of Empires II)
 * @author Ayoze Amaro Estévez
 */
const arrayCiv = [];
const busquedaCiv = [];
var i = 0;
var search = false;

$('#spinnerUI').show();
document.getElementById("botonBusqueda").addEventListener("click", busquedaCivilizacion);

$(document).ready(function() {
  $('#spinnerUI').hide();
});

$.ajax({
    url: 'https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations',
    type: "GET",
    success: function(response) {
        arrayCiv.push(response);
        while (i < arrayCiv[0].civilizations.length) {
          var divPrincipal = document.getElementById('MyComponent');
          var element = document.createElement('div');
          element.setAttribute('id', `ReactElement${i}`);
          divPrincipal.append(element);
          ReactDOM.render(<Cards />, document.getElementById(`ReactElement${i}`));
          i++;
        }
    },
    error: function(jqXHR) {
      if (jqXHR.status === 0) {
        alert('Not connect: Verify Network.');
      }
    },
		complete: function() {
	    $('#spinnerUI').hide();
		}
});

/**
 * Esta función tiene la funcionalidad recibir el nombre o ID escrito en el cuadro de búsqueda y procesar los datos
 * @event target
 * @type {function}
 */
function busquedaCivilizacion() {
  $('#spinnerUI').show();
	$('#MyComponent').empty();
  $('#botonBusqueda').hide();
  var busquedaUsuario = $("#busqueda").val();
  search = true;
	$.ajax({
	  url: `https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${busquedaUsuario}`,
	  method: "GET",
	  success: function(result) {
      busquedaCiv.push(result);
      console.log(busquedaCiv);
      var divPrincipal = document.getElementById('MyComponent');
      var element = document.createElement('div');
      element.setAttribute('id', 'ReactElement');
      divPrincipal.append(element);
      ReactDOM.render(<Cards />, document.getElementById('ReactElement'));
	  },
		complete: function() {
      $('#spinnerUI').hide();
    }, 
    error: function(jqXHR) {
      if (jqXHR.status == 404) {
        ReactDOM.render(<Empty />, document.getElementById('MyComponent'));
      }
    }
  });
}

/**
 *
 * Esta función recibe los datos de cada clase de React para imprimirlos por pantalla
 * @param {*} paramCiv Parámetro recibido por las clases de React
 * @returns {string} Retorna tanto el nombre, como el tipo de arma y el bonus de la civilización
 */
function datosCiv(paramCiv) {
  if (search == false) {
    var name = arrayCiv[0].civilizations[i].name;
    var army_type = arrayCiv[0].civilizations[i].army_type;
    var civilization_bonus = arrayCiv[0].civilizations[i].civilization_bonus.toString();
  }
  else {
    var name = busquedaCiv[0].name;
    var army_type = busquedaCiv[0].army_type;
    var civilization_bonus = busquedaCiv[0].civilization_bonus.toString();
  }
  
  switch (paramCiv) {
    case 'name':
      return <h1>{name}</h1>;
    case 'army_type':
      return <h4>{army_type}</h4>;
    case 'civilization_bonus':
      return <p>{civilization_bonus}</p>;
  }
}

/**
 *
 * Esta clase de React devuelve un mensaje de error sino se encuentran resultados durante la búsqueda del usuario
 * @class Empty
 * @extends {Component}
 * @returns {string} Retorna el mensaje de error ante una búsqueda nula de resultados
 */
class Empty extends React.Component {
  render() {
    return <h4>No se han encontrado resultados con los parámetros establecidos... Por favor, inténtelo de nuevo.</h4>;
  }
}

/**
 *
 * Esta clase de React genera un div donde imrpimirá el nombre, arma y bonus de las civilizaciones obtenidas
 * @class Cards
 * @extends {Component}
 * @returns {string} Retorna el div con los datos de la civilización
 */
class Cards extends React.Component {
  render() {
    return (
      <div id='cards'>
        <Name />
        <Army_Type />
        <Civ_Bonus />
      </div>
    );
  }
}

/**
 *
 * Esta clase de React envía a la función 'datosCiv' el Nombre de la civilización
 * @class Name
 * @extends {Component}
 * @returns {string} Retorna el nombre de la civilización
 */
class Name extends React.Component {
  render() {
    return datosCiv('name');
  }
}

/**
 *
 * Esta clase de React envía a la función 'datosCiv' el Tipo de Arma de la civilización
 * @class Army_Type
 * @extends {Component}
 * @returns {string} Retorna el tipo de arma de la civilización
 */
class Army_Type extends React.Component {
  render() {
    return datosCiv('army_type');
  }
}

/**
 *
 * Esta clase de React envía a la función 'datosCiv' el Bonus de la civilización
 * @class Civ_Bonus
 * @extends {Component}
 * @returns {string} Retorna el bonus de la civilización
 */
class Civ_Bonus extends React.Component {
  render() {
    return datosCiv('civilization_bonus');
  }
}

