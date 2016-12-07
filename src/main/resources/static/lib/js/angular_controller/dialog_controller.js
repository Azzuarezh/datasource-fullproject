/**
 * this is dialog controller that resolve pop up dialog message. it create template from panel.dialog package/folder
 * 
 */

app.directive('dialog',function(){
	return {
		restrict 	:'E',
		transclude	: true,
		scope		: true,
		templateUrl :'panel/dialog.tpl.html',
		link 		: function($scope,element,attribute){
			$scope.dialogs =[
			                 {id:'modalConnect',title:'Connect To Server',iconTitle:'fa fa-database',id:'connect'},
			                 {id:'modalExport',title:'Export',iconTitle:'fa fa-database',id:'export'},
			                 {id:'modalSortNGroup',title:'sorting and grouping',iconTitle:'fa fa-slider',id:'sort'}
			                 ]
		}
	}
}).
directive('dialogContent',function(){
	return {
		restrict :'AE',
		templateUrl : 'panel/dialog/dialogContent.tpl.html',
		scope :{
			id : '@'
		},
		link : function($scope,element,attribute){
			$scope.contentId = $scope.id;			
		}
	}
}).
directive('dialogConnect',function(){
	return {
		restrict :'AE',
		templateUrl : 'panel/dialog/content/connect.tpl.html',
		scope :{
			id : '@'
		}
	}
}).
directive('dialogExport',function(){
	return {
		restrict :'AE',
		templateUrl : 'panel/dialog/content/export.tpl.html',
		scope :{
			id : '@'
		}
	}
}).
directive('dialogSort',function(){
	return {
		restrict :'AE',
		templateUrl : 'panel/dialog/content/sort.tpl.html',
		scope :{
			id : '@'
		}
	}
})
