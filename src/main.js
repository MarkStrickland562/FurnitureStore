import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import FurnitureStoreSearch from './../src/furniture-store-search.js';

let clearSearch = function() {
  $("#searchName").val('');
  $("#searchDescription").val('');
  $("#searchType").val('');
  $("#searchColor").val('');
  $("#searchPriceMin").val('');
  $("#searchPriceMax").val('');
}

// let validateSearchCriteria = function() {
//   let searchString = "";
//   if ($('#searchFirstName').val() != "") {
//     searchString = "?first_name=" + $('#searchFirstName').val();
//   } else if ($('#searchLastName').val() != "") {
//     searchString = "?last_name=" + $('#searchLastName').val();
//   } else if ($('#searchFullName').val() != "") {
//     searchString = "?name=" + $('#searchFullName').val();
//   } else if ($('#searchIssue').val() != "") {
//     searchString = "?query=" + $('#searchIssue').val();
//   } else if ($('#searchLocation').val() != "") {
//     searchString = "&location=" + $('#searchLocation').val();
//   } else if ($('#searchSpecialty').val() != "Any Specialty") {
//     searchString = "?query=" + $('#searchSpecialty').val();
//   } else {
//     alert("Please enter search criteria!");
//   }
//   return searchString;
// }

let getFurnitureData = function(searchString) {

  // let tableText = "";
  // let phone = "";
  // let website = "";
  // let accepting = "";
  // let table="";

  let furnitureStoreSearch = new FurnitureStoreSearch();
  let promise = furnitureStoreSearch.getData();
  promise.then(function(response) {
    let body = JSON.parse(response);

    if (searchString === "Initialize") {
      let colorArr = [];
      let typeArr = [];
      let priceMax = 0;

      body.body.data.forEach(function(furniture) {
        furniture.colors.forEach(function(color) {
          if (!colorArr.includes(color.toLowerCase())) {
            colorArr.push(color.toLowerCase());
          }
        });
        if (!typeArr.includes(furniture.type.toLowerCase())) {
          typeArr.push(furniture.type.toLowerCase());
        }
        if (furniture.cost > priceMax) {
          priceMax = furniture.cost;
        }
      });

console.log(colorArr);
console.log(typeArr);
console.log(priceMax);
    } else {

//     table = $('#table-data');
//     tableText = '<table id="table-rows"><thead class="table-header"><tr><th>Photo</th><th>First Name</th><th>Last Name</th><th>Phone Number(s)</th><th>Website</th><th>Accepting Patients?</th></tr></thead>';
//     body.body.data.forEach(function(furniture) {
//       tableText += '<tr>';
//       tableText += '<td><img src="' + furniture.image_url + '"></td>';
//       tableText += '<td>' + furniture.name + '</td>' +
//                    '<td>' + furniture.description + '</td>' +
//                    '<td>' + furniture.type + '</td>' +
//                    '<td>' + furniture.colors + '</td>' +
//                    '<td>' + furniture.cost + '</td>';

//       doctor.practices.forEach(function(practice) {
//         practice.phones.forEach(function(thephone) {
//           phone += formatPhone(thephone.number) + '<br>';
//         });

//       tableText += '</tr>';
//     });
//     table.append(tableText);
//     tableText += '</table>';
//     let furnitureCount = body.body.data.length;
//     if (furnitureCount > 0) {
//       $("#furnitureCount").text(furnitureCount);
//     }
//       $("#searching").hide();
//       $("#furniture-info").show();
//       $("#table-data").show();
//     } else {
//       $("#searching").hide();
//       $("#nodata").show();
//     }
//   }, function(error) {
//     $("#searching").hide();
//     $("#error").show();
//     $('#error').text(`There was an error processing your request: ${error.message}`);
//   });
// }
//
    }
  });
}

$(document).ready(function() {
  getFurnitureData("Initialize");
  $("#search-form").submit(function(event){
    event.preventDefault();

    $("#table-rows").remove();
    $("#results").hide();
    $("#searching").show();
    $("#nodata").hide();

    getFurnitureData();
    clearSearch();
  });
});
