import FurnitureStoreSearch from './../src/furniture-store-search.js';

describe('FurnitureStoreSearch', function() {
  it('should test if the API call returns at least one result', function() {
    let furnitureStoreSearch = new FurnitureStoreSearch();
    let promise = furnitureStoreSearch.getData();
    promise.then(function(response) {
      let body = JSON.parse(response);
      expect(body.length).toBeGreaterThan(0);
    });
  });
})
