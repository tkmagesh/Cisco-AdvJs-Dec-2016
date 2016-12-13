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