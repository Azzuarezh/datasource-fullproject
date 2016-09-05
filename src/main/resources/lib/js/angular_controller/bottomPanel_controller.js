/**
 * this is bottom panel controller angular script resolve many function in left side of the view
 * 
 */

app.directive('bottomSidebar',['$timeout',function($timeout){
	return {
		 restrict: 'E',
	     templateUrl : 'panel/bottom.tpl.html'
	}
}])