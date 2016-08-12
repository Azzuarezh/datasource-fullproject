/**
 * this is left panel controller angular script resolve many function in left side of the view
 */
app.controller('kiri',function($scope,$http){
	$http.get("/getListOfDatabases")
    .then(function(response) {
        //First function handles success
        $scope.content = response.data;
    }, function(response) {
        //Second function handles error
        $scope.content = "Something went wrong";
    }).directive('leftSidebar',function(){
    	return{
    		restrict :'E',
    		template:'content : {{content.DATABASE_NAME}}' 
    	}
    });
})