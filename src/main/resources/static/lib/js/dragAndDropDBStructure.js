
/*This Library contain Drag and drop database function, 
table/view which dropped from left menu handled in this function
*/
$(document).ready(function(){

    //showing original column(which aliased / functioned)
    $('body').popover({
        placement: 'bottom',
        container: 'body',
        html: true,
        selector: '[role="popover"]'
    });

    //dragable object from left to container
	$('.tbl-treeview li, .view-treeview li').draggable({
        appendTo: "#mainContent",
        helper: "clone",
        cursor: 'move',
        refreshPositions: true,
        snap:true       
	});
  
    //closing database object(table/view)
    $('#mainContent').on('click','.jsplumb-close-icon',function(){        
        var c = confirm('really want to close this object?');        
        if(c){                                                                                        
            $(this).closest('.plumbTable').remove();            
        }
    })

    //selecting a column
    $('#mainContent').on('click','div.plumbColumn',function(){         
        $(this).toggleClass('jsplumb-highlight');
        $(this).attr('data-is-selected',true);
    })

    //initialize the plumb
    jsPlumb.ready(function(){
        
        instance = jsPlumb.getInstance({
                Container : "mainContent",
                Endpoint: ["Dot", {radius: 2}],
                Connector:"StateMachine",
                HoverPaintStyle: {strokeStyle: "#1e8151", lineWidth: 3 },
                ConnectionOverlays: [
                    [ "Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 5,
                        foldback: 0.2
                    } ]
                ],
         Container:'mainContent',
         ConnectionsDetachable:true
    })
        //create node
        var initNode = function(el) {                                 
                instance.makeSource(el, {
                          filter:'.endPointDiv',
                          anchor:"Continuous",
                          uniqueEndpoint:true,
                          /*Connector : "Flowchart",*/
                          connectorStyle: { strokeStyle: "#050", lineWidth: 3}
                });

                instance.makeTarget(el, {
                        filter:'.endPointDiv',
                        dropOptions: { hoverClass: "dragHover" },
                        anchor: "Continuous",
                        uniqueEndpoint:true,
                        allowLoopback: false                
                });            
        };

        //make em draggable
        var initDraggable = function(el){
            // initialise draggable elements.            
            instance.draggable(el);
        }

        //new database object dragged
        var newNode = function(resultId,type,resultColumns,x, y) {            
            var baseDiv = document.createElement("div");        
            baseDiv.className = "plumbTable";
            $(baseDiv).attr('data-object-type',type);
            baseDiv.id = type + '_' + resultId;
            $(baseDiv).attr('data-' + type + '-name',resultId);
            $(baseDiv).attr('data-alias',false);
            baseDiv.style.left = x + "px";
            baseDiv.style.top = y + "px";
            var iconHeader = (type=='table')?'table' : 'eye';
            var headerDiv = document.createElement("div");
            headerDiv.className="plumbHeader";
            headerDiv.innerHTML='<span class="jsplumb-dbObject-icon"><i class="fa fa-'+iconHeader+'"></i></span>' + resultId +'<span class="jsplumb-close-icon" data-table-name="'+ resultId +'"><i class="fa fa-times"></i></span>';

            var contentDiv = document.createElement("div");
            contentDiv.className="plumbColumns";        
            if(resultColumns.length > 0 && typeof(resultColumns) !='undefined'){            
                for (var i = 0; i < resultColumns.length; i++) {
                    var colDiv = document.createElement("div");
                    colDiv.className="plumbColumn";
                    colDiv.id=type+ '--' +resultId +'--'+resultColumns[i];                    
                    $(colDiv).attr('data-column-name',resultColumns[i]);
                    $(colDiv).attr('data-column-function',false);
                    $(colDiv).attr('data-toggle','popover');
                    $(colDiv).attr('data-content',resultColumns[i]);
                    $(colDiv).attr('role','popover');
                    $(colDiv).attr('data-title','original-field');
                    $(colDiv).attr('data-column-alias',false);
                    $(colDiv).attr('data-is-selected',false);             
                    $(colDiv).append('<span class="endPointDiv endPointLeft">&#8226;</span>'+resultColumns[i]+'<span class="endPointDiv endPointRight">&#8226;</span>') ;
                    $(contentDiv).append(colDiv.outerHTML);
                };                

            }

            baseDiv.innerHTML = headerDiv.outerHTML + contentDiv.outerHTML;
            instance.getContainer().appendChild(baseDiv);
            initDraggable(baseDiv);
            //loop the column to make source and target
            for (var i = 0; i < resultColumns.length; i++) {
                initNode(type+ '--' +resultId +'--'+resultColumns[i]);
            };                    

            return baseDiv;
            };


        //bind event when connection established    
        instance.bind("connection", function(info) {            
            var sourceDiv = info.source;                                
            var targetDiv = info.target;            
            //finnaly show into modal
            $('#modalJoinProperties').on('shown.bs.modal', info, evtShown
                ).on('hidden.bs.modal', info, evtHidden).modal();
        });        

        function evtHidden(evt) {
        // evt.data contains the data object passed in the button click event        
        }

        function evtShown(evt) {
        // evt.data contains the data object passed in the button click event        
        //produce the keys in the joinproperty dialog
        var $modal =$(evt.currentTarget);
        var listOfKeys_source = [];
        var listOfKeys_target = [];

        //find source columns and push to array
        $(evt.data.source).closest('div.plumbColumns').find('div.plumbColumn').each(function(){            
            listOfKeys_source.push($(this).data('columnName'));
        });


        //find target columns and push to array
        $(evt.data.target).closest('div.plumbColumns').find('div.plumbColumn').each(function(){            
            listOfKeys_target.push($(this).data('columnName'));
        });

        var sourceKey = $modal.find('select[name="sourceKey"]');        
        var targetKey = $modal.find('select[name="targetKey"]');        
        sourceKey.empty();//clean the select         
        targetKey.empty();//clean the select         
        for (var i = 0; i < listOfKeys_source.length; i++) {
            sourceKey.append('<option value="' +listOfKeys_source[i] + '">' + listOfKeys_source[i] + '</option>');
        };

        for (var i = 0; i < listOfKeys_target.length; i++) {
            targetKey.append('<option value="' +listOfKeys_target[i] + '">' + listOfKeys_target[i] + '</option>');
        };
        sourceKey.selectpicker('refresh');
        targetKey.selectpicker('refresh');
        
        //add connection to btn unlink to detach the connection
        $('a.btnUnlink').data('conn',evt.data);                
        $('a.btnSaveChanges').data('conn',evt.data);
        
        }


        //bind event when connection clicked    
        instance.bind("click", function(info) {            
            $('#modalJoinProperties').on('shown.bs.modal', info, evtShown
                ).on('hidden.bs.modal', info, evtHidden).modal();
        });   

        //detach current connection
        $('#modalJoinProperties').on('click','a.btnUnlink',function(){
        instance.select($(this).data('conn')).detach();
        $(this).closest('#modalJoinProperties').modal('hide');        
        })

        //save current relation
        $('#modalJoinProperties').on('click','a.btnSaveChanges',function(){
        var conn =  $(this).data('conn');
        instance.select(conn).removeOverlay('lbl_'+conn.id)        
        .addOverlay(["Label", {label:$('#joinType').val(), id:'lbl_'+conn.id ,cssClass:"joinOverlay"}]);    
        $(this).closest('#modalJoinProperties').modal('hide');        
        })

        //drop function from left menu
        $( ".w2ui-panel-content" ).droppable({
        accept: ".tbl-treeview li, .view-treeview li",
        drop: function(event,ui){
            var droppedObject = ui.draggable;            
            var tableName = 
                (droppedObject.data('tableName')!= null || typeof(droppedObject.data('tableName'))!= 'undefined')
                ? droppedObject.data('tableName') :
                droppedObject.data('viewName');            
            var dbName = droppedObject.parent().parent().closest('ul').closest('li').data('dbName');
            var tipe = (droppedObject.data('tableName')!= null || typeof(droppedObject.data('tableName'))!= 'undefined')
                ? 'table':'view';                        
                $.ajax({
                url: tableName.toLowerCase() + '.json',
                dataType: 'json'                
                }).done(function(result){                
                    newNode(tableName,tipe,result.column,event.offsetX,event.offsetY);
                    droppedObject.data('hasDropped',true);    
                });                
        }
    })

    })
})