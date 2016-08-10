/*this file provide handle
sql object function
like aliasing table/column/view count, max, min, average column and etc
*/
var aggregateTypeSet = ['count','sum','min','max','avg'];
var scalarTypeSet =[''];


//set columnTitle (name to show in the ui)
function setColumnTitle(title){
	return 	 '<span class="endPointDiv endPointLeft">&#8226;</span>'+ title +'<span class="endPointDiv endPointRight">&#8226;</span>';	
}

function getOriginalFieldFromKey(fn,columnName){
	var sql =''
	for (var i = aggregateTypeSet.length - 1; i >= 0; i--) {		
		if(fn == aggregateTypeSet[i]){
			sql = aggregateTypeSet[i] +'('+ columnName +')';	
			break;
		}else continue
	}
	return sql
}


//to show original field
function checkColumnFunction (key,options){
	var selector = options.$trigger[0];
	$(selector).popover('hide');	
	var colName = $(selector).data('columnName');	
	if(key != 'colAlias' || key != 'objectAlias'){
		$(selector).data('columnFunction',key);				
		$(selector).attr('data-content',getOriginalFieldFromKey($(selector).data('columnFunction'),$(selector).data('columnName')));
	}	
}

$('#mainContent').on('click','.plumbColumn',function(){
	$(this).popover('destroy')
})


//aliasing the database object name
function aliasingFunction(key,options){
	var selector = options.$trigger[0];	
    var objectIcon = $(selector).find('span.jsplumb-dbObject-icon').html();
    var closeIcon = $(selector).find('span.jsplumb-close-icon').html();    
    var parentSelector = $(selector).parent('div.plumbTable');//.data('tableName');
    var promptAlias ={};       
    if(key == 'objectAlias'){
    		//for object model (table/view name)    
    		bootbox.prompt(
    			{
    				title:'Alias',
    				placeholder:(parentSelector.data('alias') === false)?$(selector).text(): parentSelector.data('alias'),
    				callback : function(result){
    					if (result != null) {
					    	var objectSpan = '<span class="jsplumb-dbObject-icon">'+objectIcon+'</span>';
						    var closeSpan = '<span class="jsplumb-close-icon">'+closeIcon+'</span>';                        
						    $(selector).html(objectSpan + result + closeSpan);
						    parentSelector.attr('data-alias',result);
				  		}
    				}
    			});    		    		
		                		
	    }else if(key == 'colAlias'){ 
	    	//for object column (table/view name)		    		
			bootbox.prompt(
				{
						title:"Alias",
						placeholder :($(selector).data('columnAlias') == false)? $(selector).data('columnName') : $(selector).data('columnAlias') ,
						callback:function(result) { 						
				  		if (result != null) {
					    	var colAlias = result;			    			    			    		    			    	
			    			$(selector).data('columnAlias',colAlias);	    					    			
			    			$(selector).popover('hide');
			    			$(selector).attr('data-content',getOriginalFieldFromKey($(selector).data('columnFunction'),$(selector).data('columnName')));	    		
			    			$(selector).html(setColumnTitle(colAlias));//showing in the table
				  		}	 
					}
				});		    	
	    }

}