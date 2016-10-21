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
			                 {id:'modalConnect',title:'Connect To Server',iconTitle:'fa fa-database'},
			                 {id:'modalExport',title:'Export',iconTitle:'fa fa-database'},
			                 {id:'modalSortNGroup',title:'sorting and grouping',iconTitle:'fa fa-slider'}
			                 ]
		}
	}
}).
directive('dialogConnect',function(){
	return {
		restrict :'AE',
		templateUrl : 'panel/dialog/connect.tpl.html',
		scope :{
			id : '@'
		},
		link : function($scope,element,attribute){
			$scope.modalId = $scope.id;
			$scope.modalTitle = ''
			$scope.modalIconTitle =''
		}
	}
})
