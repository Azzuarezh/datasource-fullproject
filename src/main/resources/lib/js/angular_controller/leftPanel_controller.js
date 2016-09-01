/**
 * this is left panel controller angular script resolve many function in left side of the view
 */

app
.controller('leftSidebarController',['$scope','$resource', function($scope,$resource){
	//request ajax
	var dbService = $resource('/getListOfDatabases');
	var dbs = dbService.query();
	//ajax function for db
	dbs.$promise.then(function(dataDb){		
		$scope.listDatabase =[];
		//loop each db to push in array listDatabase
		for(var i = 0;i < dataDb.length;i++){
			
			//initialize new dbObject which contain db name and list of the table
			var dbObject ={
				name : dataDb[i].DATABASE_NAME
			}
			
			//request table related to database
			var tblService = $resource('/getListOfTable?DB_Name=:dbName', {dbName : dataDb[i].DATABASE_NAME});
			var listTableService = tblService.query();
			
			//loop each table and push in the db
			listTableService.$promise.then(function(dataTbl){
				var listTable = [];
				
				for (var j = 0; j < dataTbl.length; j++) {
					listTable.push(dataTbl[i].TABLE_NAME);
				}
			})
		}
	})
}])
.directive('leftSidebar',['$timeout',function($timeout){
	return {
        restrict: 'E',
        templateUrl : 'panel/left.tpl.html',
        link: function (scope, element, attributes) {            	            
            var menuElement = element.find('ul');                               
            menuElement.addClass('metisFolder');            
            $timeout(function () {                        	            	
            	$(menuElement).metisMenu();
            });
        }
    };
}])



