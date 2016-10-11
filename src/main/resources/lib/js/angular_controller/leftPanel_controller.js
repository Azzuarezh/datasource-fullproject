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
	
}])
.directive('leftSidebar',['$timeout',function($timeout){
	return {
        restrict: 'E',
        templateUrl : 'panel/left.tpl.html',
        transclude : true,
        link: function (scope, element, attributes) {            	            
            var menuElement = element.find('ul.tree');                               
            menuElement.addClass('metisFolder');            
            $timeout(function () {            	
            	menuElement.metisMenu({toggle:false});
            });
        }
    };
}])
.directive('bnDelegate',['$parse','$resource',function($parse,$resource){
	return {
		restrict : 'A',
		scope :true,
		link : function(scope,element,attr){
			scope.listOfObject=[];						
			scope.getListOfDbObject = function(dbName,type){
				//request ajax
				var listOfObj =[];
				var tblService = $resource('/getListOfDbObject',{DB_Name:dbName,ObjectType:type});
				var tbls = tblService.query();
				//ajax function for db
				
				tbls.$promise.then(function(dataTbl){				
					//loop each db to push in array listDatabase					
					for(var i = 0; i < dataTbl.length; i++){			
						//initialize new dbObject which contain db name and list of the table
						var Obj = {
								dbName : dataTbl[i].DATABASE_NAME,
								objectName:dataTbl[i].OBJECT_NAME,								
						}
						listOfObj.push(Obj);				
					}		
				}).finally(function(){
					scope.listOfObject = listOfObj;					
				})
			};
						
			var config = attr.bnDelegate.split('|');						
			 if ( config.length === 1 ) {
                 var selector = "a";
                 var expression = config[ 0 ];
             // Both selector and expression are defined.
             } else {
                 var selector = config[ 0 ];
                 var expression = config[ 1 ];
             }
			 var expressionHandler = $parse( expression );			 
			 element.on(
                     "click.bnDelegate",
                     selector,
                     function( event ) {
                         // Prevent the default behavior - this is
                         // not a "real" link.                         
                         // Find the scope most local to the target
                         // of the click event.                    	 
                         var localScope = $( event.target ).scope();                         
                         // Invoke the expression in the local scope
                         // context to make sure we adhere to the
                         // proper scope chain prototypal inheritance.
                         var isOpened = eval(attr.isOpen);
                         var isLoaded = eval(attr.isLoaded);                        
                         if(isOpened == false && isLoaded == false){                        	 
                        	 localScope.$apply(
                                     function() {   
                                    	 scope.loading = true;
                                         expressionHandler( localScope );
                                         attr.isOpen = 'true';
                                         attr.isLoaded = 'true';
                                         scope.loading = false;
                                     }
                                 );
                         }else if(isOpened){                        	                         	                        	                       	
                        	 attr.isOpen = 'false';
                        	 element.find('ul').addClass('collapse');
                         }else if(!isOpened){                        	 
                        	 attr.isOpen='true';
                        	 element.find('ul').removeClass('collapse').addClass('collapse-in');
                         }                         
                     }
                 );
                 // -------------------------------------- //
                 // -------------------------------------- //
                 // When the scope is destroyed, clean up.
                 scope.$on(
                     "$destroy",
                     function( event ) {
                         element.off( "click.bnDelegate" );
                     }
                 );
		}
	}
}])
.directive('listTable',function($parse){
	return{
		restrict :'E',	
		templateUrl : 'panel/dbo/table.html',
		scope :{
			dbName : '@db'
		}
	}
})
.directive('listView',function($parse){
	return{
		restrict :'E',	
		templateUrl : 'panel/dbo/view.html',
		scope :{
			dbName : '@db'
		}
	}
})