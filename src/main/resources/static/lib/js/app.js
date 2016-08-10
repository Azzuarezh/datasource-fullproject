/*
main script application
*/
$(document).ready(function(){

/*	//mocking function
	Mock.mock(/basic_branch.json/, 
				{
				name:'basic_branch',
				db:'Cronos',
				type:'table',
				column: ['id','branchName','city'
					{'name':'id',type:'int','isPrimary':true, 'length': 4},
					{'name':'branchName',type:'varchar', 'length': 50},
					{'name':'city',type:'varchar', 'length': 4}
				]
		});

Mock.mock(/basic_user.json/, 
				{				
				name:'basic_user',
				db:'Cronos',
				type:'table',
				column: ['id','userName','password'
					{'name':'id',type:'int','isPrimary':true, 'length': 4},
					{'name':'userName',type:'varchar', 'length': 4},
					{'name':'password',type:'varchar', 'length': 4}
				]
		});

Mock.mock(/basic_city.json/, 
				{				
				name:'basic_city',
				db:'Cronos',
				type:'table',
				column: ['id','id_country','city'
					{'name':'id',type:'int','isPrimary':true, 'length': 4},
					{'name':'userName',type:'varchar', 'length': 4},
					{'name':'password',type:'varchar', 'length': 4}
				]
		});

Mock.mock(/basic_country.json/, 
				{				
				name:'basic_country',
				db:'Cronos',
				type:'table',
				column: ['id_country','country'
					{'name':'id',type:'int','isPrimary':true, 'length': 4},
					{'name':'userName',type:'varchar', 'length': 4},
					{'name':'password',type:'varchar', 'length': 4}
				]
		});

Mock.mock(/view_branch.json/, 
				{
				name:'basic_branch',
				db:'Cronos',
				type:'view',
				column: ['id','branchName','city'
					{'name':'id',type:'int','isPrimary':true, 'length': 4},
					{'name':'branchName',type:'varchar', 'length': 50},
					{'name':'city',type:'varchar', 'length': 4}
				]
		});

Mock.mock(/view_user.json/, 
				{				
				name:'basic_user',
				db:'Cronos',
				type:'view',
				column: ['id','userName','password'
					{'name':'id',type:'int','isPrimary':true, 'length': 4},
					{'name':'userName',type:'varchar', 'length': 4},
					{'name':'password',type:'varchar', 'length': 4}
				]
		});

Mock.mock(/view_user_country.json/, 
				{				
				name:'basic_user',
				db:'Cronos',
				type:'view',
				column: ['id','userName','country'
					{'name':'id',type:'int','isPrimary':true, 'length': 4},
					{'name':'userName',type:'varchar', 'length': 4},
					{'name':'password',type:'varchar', 'length': 4}
				]
		});
*/
	//w2ui panel function
	 var pstyle = 'background-color: #fffff; border: 2px solid #dfd0d0; padding: 5px;';
	 var pstyle2 = 'background-color: #fffff; border: 2px solid #dfd0d0; padding: 1px;';

	 var topPanelObject = { type: 'top',
	                        size: 131, 
	                        resizable: true, 
	                        style: pstyle2, 
	                        content: function(){
	                            $(this).load('panel/top.html');
	                        }
	                    };
	 var leftPanelObject ={ type: 'left', 
	                        size: 200, 
	                        resizable: true, 
	                        style: pstyle + 'overflow-x:hidden;', 
	                        content: function(){
	                            return $(this).load('panel/left.html');
	                            } 
	                        };

	var mainPanelObject = { type: 'main', 
	                        style: pstyle, 
	                        content: function(){
	                             return $(this).load('panel/main.html');
	                            }
	                        };

	var bottomPanelObject = { type: 'bottom', 
	                          size: 50, 
	                          resizable: true, 
	                          style: pstyle, 
	                          content: function(){
	                             return $(this).load('panel/bottom.html');
	                            }
	                        };
    
    $('#layout').w2layout({
        name: 'layout',
        panels: [topPanelObject,leftPanelObject,mainPanelObject,bottomPanelObject]
    });
    //end layout     
})