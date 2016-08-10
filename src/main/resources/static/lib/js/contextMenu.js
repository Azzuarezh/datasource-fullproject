/*this library show the menu when user right click on the database oject model*/
$(document).ready(function(){
	
	$.contextMenu({
		selector:'div.plumbColumn',
		/*autoHide : true,*/
		items: {
                "colAlias":{
                    name :"Alias",
                    callback: function(key,options){
                        aliasingFunction(key,options)
                    }                    
                }
                ,
                "separator": "---------",                    			
                "fn": {
                	name: "Function", icon: function(){
                        return 'context-menu-icon context-menu-icon-fn';
                	},
                    items:{
                        "aggregate": {
                            name: "Aggregate", 
                            icon: function(){
                                return 'context-menu-icon context-menu-icon-aggregate';
                            }, 
                            items:{
                                "count":{
                                    name:"Count",
                                    icon: function(){
                                        return 'context-menu-icon context-menu-icon-count';
                                         },
                                    callback: function(key,options){                                           
                                             checkColumnFunction(key,options) 
                                        }
                                    },
                                "sum":{
                                    name:"Sum", 
                                    icon:function(){
                                            return 'context-menu-icon context-menu-icon-sum';
                                        },
                                    callback: function(key,options){
                                             checkColumnFunction(key,options) 
                                        }
                                    },
                                "avg":{
                                    name:"Average",
                                    icon: function(){
                                        return 'context-menu-icon context-menu-icon-avg';
                                         },
                                    callback: function(key,options){
                                             checkColumnFunction(key,options)   
                                        }
                                    },
                                "min":{
                                    name:"Min",
                                    icon : function(){
                                        return 'context-menu-icon context-menu-icon-min';
                                        },
                                    callback: function(key,options){
                                            checkColumnFunction(key,options) 
                                        }
                                    },
                                "max":{
                                    name:"Max",
                                    icon : function(){
                                        return 'context-menu-icon context-menu-icon-max';
                                        },
                                    callback: function(key,options){
                                            checkColumnFunction(key,options) 
                                        }
                                }
                            }
                        },
                        "scalar": {
                            name: "Scalar", 
                            icon:function(){
                                        return 'context-menu-icon context-menu-icon-scalar';
                            },
                            items:
                                {
                                    "ucase":{
                                            name:"Upper Case",
                                            icon:function(){
                                                return 'context-menu-icon context-menu-icon-ucase';
                                                }
                                        },
                                    "lcase":{
                                            name:"Lower Case",
                                            icon:function(){
                                                return 'context-menu-icon context-menu-icon-lcase';
                                                }
                                        },
                                    "mid":{
                                            name:"Mid",
                                            icon:function(){
                                                return 'context-menu-icon context-menu-icon-fnMid';
                                                }
                                        },
                                    "len":{
                                            name:"Length of", 
                                            icon:function(){
                                                return 'context-menu-icon context-menu-icon-len';
                                                }
                                    },
                                    "round":{
                                            name:"Round",
                                            icon:function(){
                                                return 'context-menu-icon context-menu-icon-fnRound';
                                                }
                                        },
                                    "now":{
                                            name:"Now",
                                            icon:function(){
                                                return 'context-menu-icon context-menu-icon-fnNow';
                                                }
                                        },
                                    "format":{
                                            name:"Format",
                                            icon:function(){
                                                return 'context-menu-icon context-menu-icon-fnFormat';
                                                }
                                    }
                                }
                        },
                        "type_cast" :{
                            name:"Type Casting",
                            icon:function(){
                                return 'context-menu-icon context-menu-icon-TypeCast';
                            }, 
                            items:{
                                "TBA": {name:"To Be Thought"}    
                            }                    
                        }
                    }
                }
            }
	})
    $.contextMenu({
            selector:'div.plumbHeader',
            items:{
                            "objectAlias": {name:"Alias"}    
                        },
            callback: function(key,options){
                aliasingFunction(key,options)   
            }  
    })
})