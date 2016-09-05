/**
 * this is bottom panel controller angular script resolve many function in left side of the view
 * 
 */

app
.controller('bottomSidebarController',function($scope){
	$scope.tabs = [
	               { title:'SQL View', content:'Dynamic content 1',  icon :'fa fa-terminal'},
	               { title:'Data', content:'Dynamic content 2', icon:'fa fa-table'},
	               { title:'Message', content:'Dynamic content 3', icon:'fa fa-envelope'}
	             ];
	
})
.directive('bottomSidebar',['$timeout',function($timeout){
	return {
		 restrict: 'E',
	     templateUrl : 'panel/bottom.tpl.html'
	}
}])