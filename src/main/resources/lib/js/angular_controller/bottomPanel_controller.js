/**
 * this is bottom panel controller angular script resolve many function in bottom side of the view
 * 
 */

app
.controller('bottomSidebarController',function($scope){	
	$scope.tabs = [
	               { title:'SQL View', id:'sqlView',  icon :'fa fa-terminal'},
	               { title:'Data', id:'dataView', icon:'fa fa-table'},
	               { title:'Message', id:'consoleView', icon:'fa fa-envelope'}
	             ];
	
})
.directive('bottomSidebar',['$timeout',function($timeout){
	return {
		 restrict: 'E',
	     templateUrl : 'panel/bottom.tpl.html'
	}
}])
.directive('sqlView',function(){
	return {
		restrict :'E',
		templateUrl :'panel/view/sqlView.tpl.html'
	}
})
.directive('dataView',function(){
	return {
		restrict :'E',
		templateUrl :'panel/view/dataView.tpl.html'
	}
})
.directive('consoleView',function(){
	return {
		restrict :'E',
		templateUrl :'panel/view/consoleView.tpl.html',
		link : function(scope,element,attr){
			scope.message ="console logged!";
		}
	}
})