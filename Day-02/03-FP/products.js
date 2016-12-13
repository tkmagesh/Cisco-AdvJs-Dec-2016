var products = [
	{id : 4, name : 'Pen', cost : 10, units : 30, category : 'stationary'},
	{id : 8, name : 'Pencil', cost : 30, units : 80, category : 'stationary'},
	{id : 6, name : 'Honey', cost : 50, units : 20, category : 'food'},
	{id : 2, name : 'Marker', cost : 40, units : 60, category : 'stationary'},
	{id : 7, name : 'Bread', cost : 90, units : 50, category : 'food'}
];


/*
sort
filter
groupBy
some
all
*/

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe("Default list", function(){
	console.table(products);
});
describe("Sorting", function(){
	describe("Default Sorting [products by id]", function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}

		}
		sort();
		console.table(products);
	});
	

	describe("Sorting any list by any attribute", function(){
		function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}

		}
		describe("products by cost", function(){
			//sort
			sort(products, "cost");
			console.table(products)
		});

		describe("products by units", function(){
			sort(products, "units");
			console.table(products);
		})
	});

	describe("Sorting any list by any comparison", function(){
		function sort(list, comparisonFn){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (comparisonFn(products[i], products[j]) > 0){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}

		describe("Products by value [cost * units]", function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0;
			}
			sort(products, productComparerByValue);
			console.table(products);
		})
	})
});

describe("Filtering", function(){
	describe("All food products", function(){
		function getFoodProducts(){
			var result = [];
			for(var i=0; i < products.length; i++)
				if (products[i].category === 'food')
					result.push(products[i]);
			return result;
		}
		var foodProducts = getFoodProducts();
		console.table(foodProducts);
	})
	describe("Any list by any criteria", function(){

		function filter(list, criteriaFn){
			var result = [];
			for(var i=0; i < list.length; i++)
				if (criteriaFn(list[i]))
					result.push(list[i]);
			return result;
		}
		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			}
		}
		describe("Products By Cost", function(){
			var costlyProductCriteria = function(product){
				return product.cost > 50;
			}
			describe("All costly products [cost > 50]", function(){
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);	
			});	
			/*var affordableProductCriteria = function(product){
				//return product.cost <= 50;
				return !costlyProductCriteria(product);
			}*/
			var affordableProductCriteria = negate(costlyProductCriteria);

			describe("All affordable products [cost <= 50]", function(){
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			})
		})
		
		describe("Products by units", function(){
			var underStockedProductCriteria = function(product){
				return product.units < 50;
			};
			describe("All understocked products [units < 50]", function(){
				var understockedProducts = filter(products, underStockedProductCriteria);
				console.table(understockedProducts);
			})
			/*var wellStockedProductCriteria = function(product){
				return !underStockedProductCriteria(product);
			}*/
			var wellStockedProductCriteria = negate(underStockedProductCriteria);

			describe("All well stocked products [!understockedProducts]", function(){
				var wellStockedProducts = filter(products, wellStockedProductCriteria);
				console.table(wellStockedProducts);
			})
		});
	})
});

describe("GroupBy", function(){
	function groupBy(list, keySelectorFn){
		var result  = {};
		for(var i=0; i < list.length; i++){
			var key = keySelectorFn(list[i]);
			/*if (typeof result[key] === 'undefined')
				result[key] = [];*/
			result[key] = result[key] || [];
			result[key].push(list[i]);
		}
		return result;
	}
	function printGroup(group){
		for(var key in group){
			describe("Key - " + key, function(){
				console.table(group[key]);
			})
		}
	}
	describe("Products by category", function(){
		var categoryKeySelector = function(product){
			return product.category;
		};
		var productsByCategory = groupBy(products, categoryKeySelector);
		printGroup(productsByCategory);
	});

	describe("Products by cost", function(){
		var costyKeySelector = function(product){
			return product.cost > 50 ? "costly" : "affordable";
		}
		var productsByCost = groupBy(products, costyKeySelector);
		printGroup(productsByCost)
	})
})

function memoize(fn){
	var cacheFn = function(n){
		if (typeof cacheFn.cache[n] === 'undefined')
			cacheFn.cache[n] = fn.apply(this, arguments);
		return cacheFn.cache[n]
	};
	return cacheFn;
}



















