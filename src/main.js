import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './background.jpg';
import $ from 'jquery';
import FurnitureStoreSearch from './../src/furniture-store-search.js';

let clearSearch = function() {
  $("#searchName").val('');
  $("#searchDescription").val('');
  $("#searchPriceMin").val('$0');
  getFurnitureData("Initialize");
}

let getFurnitureData = function(searchString) {
  let tableText = "";
  let table = "";
  let counter= 0;
  let furnitureStoreSearch = new FurnitureStoreSearch();
  let promise = furnitureStoreSearch.getData();
  promise.then(function(response) {
    let body = JSON.parse(response);

    if (searchString === "Initialize") {
      let colorArr = [];
      let typeArr = [];
      let priceMax = 0;
      let colorText = '<label class="label"><input type="radio" name="color" value="Any Color" checked="true">Any Color</label><br>';
      let typeText = '<label class="label"><input type="radio" name="type" value="Any Type" checked="true">Any Type</label><br>';
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
      typeArr.sort().forEach(function(type) {
        typeText += '<label class="label"><input type="radio" name="type" value="' + type + '">' + type + '</label><br>';
      });
      colorArr.sort().forEach(function(color) {
         colorText += '<label class="label"><input type="radio" name="color" value="' + color + '">' + color + '</label><br>';
      });
      $("#types").html(typeText);
      $("#colors").html(colorText);
      $("#searchPriceMax").val("$" + Math.ceil(priceMax));
    } else {
      table = $('#table-data');
      tableText = '<table id="table-rows"><thead class="table-header"><tr><th>Photo</th><th>Name</th><th>Description</th><th>Type</th><th>Available Colors</th><th>Cost</th></tr></thead>';
      let searchName = $("#searchName").val().toLowerCase();
      let searchDescription = $("#searchDescription").val().toLowerCase();
      let searchType = $("input:radio[name=type]:checked").val();
      let searchColor = $("input:radio[name=color]:checked").val();
      let searchMin = $("#searchPriceMin").val();
      let searchMax = $("#searchPriceMax").val();
      if (searchMin.substring(0,1) === '$') {
        searchMin = searchMin.substring(1,100);
      }
      if (searchMax.substring(0,1) === '$') {
        searchMax = searchMax.substring(1,100);
      }
      clearSearch();
      body.body.data.forEach(function(furniture) {
        let colorList = "";
        furniture.colors.forEach(function(color) {
          colorList = colorList + color.toLowerCase() + ",";
        });
        if ((searchName === "" || (searchName != "" && furniture.name.toLowerCase().includes(searchName))) &&
            (searchDescription === "" || (searchDescription != "" && furniture.description.toLowerCase().includes(searchDescription))) &&
            (searchType === "Any Type" || furniture.type.toLowerCase().includes(searchType)) &&
            (searchColor === "Any Color" || colorList.includes(searchColor)) &&
            (furniture.cost >= parseInt(searchMin)) &&
            (furniture.cost <= parseInt(searchMax))
           )
        {
          counter += 1;
          tableText += '<tr>';
          tableText += '<td><img src="' + furniture.imageUrl + '"></td>';
          tableText += '<td>' + furniture.name + '</td>' +
                       '<td>' + furniture.description + '</td>' +
                       '<td>' + furniture.type + '</td><td>';
          furniture.colors.forEach(function(color) {
            tableText += color + '<br>';
          });
          tableText += '</td><td>' + '$' + furniture.cost + '</td>';
          tableText += '</tr>';
        }
      });
      tableText += '</table>';
      table.append(tableText);
      if (counter > 0) {
        $("#resultCount").text(counter);
        $("#searching").hide();
        $("#results").show();
        $("#table-data").show();
      } else {
        $("#searching").hide();
        $("#nodata").show();
      }
    }
  }, function(error) {
    $("#searching").hide();
    $("#error").show();
    $('#error').text(`There was an error processing your request: ${error.message}`);
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

    getFurnitureData("Search");
  });
});
