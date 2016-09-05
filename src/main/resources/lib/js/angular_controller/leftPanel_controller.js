/**
 * this is left panel controller angular script resolve many function in left side of the view
 */

app
.controller('leftSidebarController',['$scope','$resource',function($scope,$resource){
	//request ajax
	var dbService = $resource('/getListOfDatabases');
	var dbs = dbService.query();
	//ajax function for db
	$scope.listDatabase =[];
	$scope.listTable=[];
	dbs.$promise.then(function(dataDb){				
		//loop each db to push in array listDatabase
		for(var i = 0; i < dataDb.length; i++){			
			//initialize new dbObject which contain db name and list of the table
			var dbObject = {
					name : dataDb[i].DATABASE_NAME
			}
			$scope.listDatabase.push(dbObject);			
		}		
	})
	
	$scope.expand = function(dbName,$event,type){				
		var tblService = $resource('/getListOfTable?DB_Name=:dbName',{dbName : dbName, ObjectType: type});
		var tbls= tblService.query();		
		tbls.$promise.then(function(dataDbObj){					
			$scope.listDbObject = dataDbObj;			
		}).finally(function(){
			console.log($scope.listDbObject);
		})
		
	}
}])
.directive('leftSidebar',['$timeout',function($timeout){
	return {
        restrict: 'E',
        templateUrl : 'panel/left.tpl.html',
        link: function (scope, element, attributes) {            	            
            var menuElement = element.find('ul');                               
            menuElement.addClass('metisFolder');            
            $timeout(function () {                        	            	
            	$(menuElement).metisMenu({toggle:false});
            });
        }
    };
}])



