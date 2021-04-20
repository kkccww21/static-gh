var successColor = 'green';
var failColor = '#ce0d0d';

window.nodeIconCache={};
function geoFuncBindConverter(geoname) {
    if(geoname=='0')return;
    if(window.nodeIconCache[geoname])return window.nodeIconCache[geoname];
    var geo = window.flowNodeIcons[geoname];
    return (window.nodeIconCache[geoname] = go.Geometry.parse(geo, true));
}
/**
 * 流程图元素的双击事件
 * @param ev
 */
window.onFlowDialogObjectDoubleClicked=function(ev, fromContext, fromDisplay){
    var node = ev.subject.part;
    if(node instanceof go.Node && node.data.category === 'Comment')return;
    if ((node instanceof go.Node) && (node.data.nodeType === 0 || node.data.nodeType === 1 || node.data.nodeType === 2 || node.data.nodeType === 3)) {
        if(window.antdMessage){
            window.antdMessage.info("开始、成功、失败等内置步骤不可编辑~");
        }
        return;
    }
    var clazzName = node.data.className;
    if(!clazzName){
        clazzName = "";
    }
    if(node.data.category=='Picture'){
        if(window.showFlowNodePictureDetailInfo){
            window.showFlowNodePictureDetailInfo(node.data, false);
        }
        return;
    }
    if(fromDisplay){
        if(!node.data.className)return;
    }
    if(window.showFlowNodeDetailInfo){
        let nodeDataArray,linkDataArray,model;
        if(ev.diagram&&ev.diagram.model){
            model=ev.diagram.model;
            nodeDataArray=ev.diagram.model.nodeDataArray;
            linkDataArray=ev.diagram.model.linkDataArray;
        }
        window.showFlowNodeDetailInfo(node.data, fromContext, nodeDataArray, linkDataArray, model);
        return;
    }
};
function FlowDesigner(diagramDiv) {
    var G = go.GraphObject.make;
    var _this = {};
    var _designer = {};
    var _jsonNewStep = {text: "新步骤", remark: ''};
    var _jsonNewComment={text: "添加注释",category:'Comment'};

    /** --------public method----------------------------------------**/
    /**
     * 初始化图例面板
     * @returns {*}
     */
    this.initToolbar = function(div){
        var myPalette =
            G(go.Palette, div, // 必须是DIV元素
                {
                    maxSelectionCount: 3,
                    nodeTemplateMap: _designer.nodeTemplateMap, // 跟设计图共同一套样式模板
                    model: new go.GraphLinksModel([
                        { key: 0, text: "开始", figure: "Circle", fill: "#ccccff", nodeType: 0},
                        { key: 1, text: "成功", figure: "Circle", fill: "#00DD00", nodeType: 1},
                        { key: 2, text: "失败", figure: "Circle", fill: "#FF3333", nodeType: 2},
                        _jsonNewStep
                    ])
                });

        return myPalette;
    };

    /**
     * 在设计面板中显示流程图
     * @param flowData  流程图json数据
     */
    this.displayFlow = function (flowData,id) {

        if(!flowData) return;

        _designer.model = go.Model.fromJson(flowData);
        _designer.model.templateId=id;

        var pos = _designer.model.modelData.position;
        if (pos) _designer.initialPosition = go.Point.parse(pos);

        // 更改所有连线中间的文本背景色
        setLinkTextBg();
    };

    /**
     * 获取流程图数据
     * @returns {*}
     */
    this.getFlowData = function () {
        _designer.model.modelData.position = go.Point.stringify(_designer.position);
        return _designer.model.toJson();
    };

    /**
     * 检验流程图是否规范
     */
    this.checkData = function() {
        var errMsg = "";

        // 检查：每个步骤必须包含角色
        if (!_designer.model.nodeDataArray) return '请绘制流程图';
        for(var i=0;i<_designer.model.nodeDataArray.length;i++){
            var item = _designer.model.nodeDataArray[i];
            if (!item.hasOwnProperty("remark") || item.remark === "") {
                errMsg = "请为步骤【" + item.text + "】设置备注~";
                return false;
            }
        }

        return errMsg;
    };

    /** --------public method-------------end---------------------------**/

    init(diagramDiv);
    
    this.getDesigner=function(){
        return _designer;
    };

    /** --------private method----------------------------------------**/

    /**
     * 初始化流程设计器
     * @param divId 设计器Div
     */
    function init(divId) {
        _designer = G(go.Diagram, divId, // must name or refer to the DIV HTML element
                {  grid: G(go.Panel, "Grid",
                        G(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
                        G(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
                        G(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
                        G(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
                    ),
                    allowDrop: true, // must be true to accept drops from the Palette
                    allowCopy:false,
                    //allowTextEdit: false,
                    allowHorizontalScroll: true,
                    allowVerticalScroll: true,
                    "clickCreatingTool.archetypeNodeData": _jsonNewComment, // 双击创建注释
                    "draggingTool.dragsLink": true,
                    "draggingTool.isGridSnapEnabled": true,
                    "linkingTool.isUnconnectedLinkValid": false,
                    "commandHandler.copiesTree": false,
                    "linkingTool.portGravity": 20,
                    "relinkingTool.isUnconnectedLinkValid": false,
                    "relinkingTool.portGravity": 20,
                    "toolManager.hoverDelay":10,
                    "relinkingTool.fromHandleArchetype":
                        G(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
                    "relinkingTool.toHandleArchetype":
                        G(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
                    "linkReshapingTool.handleArchetype":
                        G(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
                    "undoManager.isEnabled": true,
                    contextMenu:G(go.Adornment, "Vertical",
                        makeMenuItem("新建节点", function(e, obj) {
                            let newNode = {text:_jsonNewStep.text};
                            newNode.loc=`${e.documentPoint.x} ${e.documentPoint.y}`;
                            e.diagram.model.addNodeData(newNode);
                        }),
                        makeMenuItem("新建注释", function(e, obj) {
                            let newNode = {..._jsonNewComment};
                            delete newNode.key;
                            newNode.loc=`${e.documentPoint.x} ${e.documentPoint.y}`;
                            e.diagram.model.addNodeData(newNode);
                        }),
                        makeMenuItem("新建图文", function(e, obj) {
                            if(window.showFlowNodePictureDetailInfo){
                                window.showFlowNodePictureDetailInfo({},true,e.documentPoint);
                            }
                        }),
                    )
         });

        // 流程图如果有变动，则提示用户保存
        _designer.addDiagramListener("Modified", onDiagramModified);

        // 双击事件
        _designer.addDiagramListener("ObjectDoubleClicked", window.onFlowDialogObjectDoubleClicked);
        // 右击事件
        _designer.addDiagramListener("ObjectContextClicked", window.onFlowDialogObjectContextClicked);
        
        _designer.addDiagramListener("LinkDrawn", onLinkDrawn);

        // 流程步骤的样式模板
        _designer.nodeTemplate = makeNodeTemplate();

        // 流程连接线的样式模板
        _designer.linkTemplate = makeLinkTemplate();
        _designer.groupTemplate = makeGroupTemplate();

        _designer.nodeTemplateMap.add("Comment",
          G(go.Node,  // this needs to act as a rectangular shape for BalloonLink,
            go.Panel.Auto,
            { background: "transparent" },  // which can be accomplished by setting the background.
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            G(go.TextBlock,
              { stroke: "#997013", margin: 3,editable:true },
              new go.Binding("text").makeTwoWay())
        ));
        _designer.nodeTemplateMap.add("Picture",
          G(go.Node,go.Panel.Spot,
            {   resizable:true,
                background:'#ccc',
                desiredSize: new go.Size(70,70),
            },
            new go.Binding("desiredSize", "pictureSize", go.Size.parse).makeTwoWay(go.Size.stringify),
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            G(go.Picture,
                {
                    imageStretch:go.GraphObject.UniformToFill,
                    sourceCrossOrigin: function(pict) { return "anonymous"; },
                    errorFunction:function(){
                        window.antdMessage.error('图片加载失败！');
                    }
                },
                new go.Binding("figure"),
                new go.Binding("source").makeTwoWay(),
            ),
            G(go.TextBlock,
                {
                    alignment: new go.Spot(0.02, 0.02), alignmentFocus: go.Spot.TopLeft,
                    font: "bold 11pt Helvetica, Arial, sans-serif",
                    maxSize: new go.Size(160, NaN),
                    wrap: go.TextBlock.WrapFit,
                    stroke: "#000"
                },
                new go.Binding("text").makeTwoWay(),
                new go.Binding("alignment"),
                new go.Binding("alignmentFocus").makeTwoWay(),
                new go.Binding("stroke",'textColor')), 
            {
                contextMenu: makePartContextMenu()
            }
          )
        );
    };
    
    function onLinkDrawn(e){
        if(!e.subject.text){
            var node = e.subject.part;
            var oldTexts = _designer.model.linkDataArray.filter(ld=>ld.from === node.data.from).map(ld=>ld.text);
            var newText = "";
            var newCondition = "";
            if(node.data.to === "1"){
                newText = '成功';
                newCondition = "success";
            } else if(node.data.to === "2"){
                newText = '失败';
                newCondition = "fail";
            } else if(oldTexts.indexOf('成功') === -1){
                newText = '成功';
                newCondition = "success";
            } else if(oldTexts.indexOf('失败') === -1){
                newText = '失败';
                newCondition = "fail";
            }
            _designer.startTransaction("vacate");
            _designer.model.setDataProperty(node.data, "text", newText);
            _designer.model.setDataProperty(node.data, "condition", newCondition);
            if(newCondition==='success'){
                _designer.model.setDataProperty(node.data, "stroke", successColor);
                _designer.model.setDataProperty(node.data, "fill", successColor);
            }else if(newCondition==='fail'){
                _designer.model.setDataProperty(node.data, "stroke", failColor);
                _designer.model.setDataProperty(node.data, "fill", failColor);
            }
            _designer.commitTransaction("vacate");
        }
    }

    /**
     * 生成GUID
     * @returns {string}
     */
    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 步骤图的样式模板
     * @returns {*}
     */
    function makeNodeTemplate(){
        return G(go.Node, "Spot",
            { locationSpot: go.Spot.Center },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            { selectable: true, selectionAdornmentTemplate: makeNodeSelectionAdornmentTemplate() },
            new go.Binding("angle").makeTwoWay(),
            // the main object is a Panel that surrounds a TextBlock with a Shape
            G(go.Panel, "Auto",
                { name: "PANEL" },
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                G(go.Shape, "RoundedRectangle", // default figure
                    {
                        portId: "", // the default port: if no spot on link data, use closest side
                        fromLinkable: true,
                        toLinkable: true,
                        cursor: "pointer",
                        fill: "#00DDDD", // 默认背景色
                        strokeWidth: 1.6,
                        stroke: "#000"
                    },
                    new go.Binding("figure"),
                    new go.Binding("fill","fill"),
                    new go.Binding("stroke","nodeStroke"),
                    new go.Binding("strokeDashArray"),
                ),
                G(go.Panel, "Horizontal",
                    G(go.Shape,
                    {
                        desiredSize: new go.Size(0,0),
                        margin: new go.Margin(0,0,0,0),fill:'#000',
                        strokeWidth:0
                    },
                    new go.Binding("desiredSize", "picSize", go.Size.parse).makeTwoWay(go.Size.stringify),
                    new go.Binding("margin", "picMargin", go.Margin.parse).makeTwoWay(go.Margin.stringify),
                    new go.Binding("geometry", "svgGeo", window.geoFuncBindConverter)),
                    G(go.TextBlock,
                        {
                            font: "bold 11pt Helvetica, Arial, sans-serif",
                            margin: 7,
                            maxSize: new go.Size(160, NaN),
                            wrap: go.TextBlock.WrapFit,
                            stroke: "#000"
                        },
                        new go.Binding("stroke","textStroke"),
                        new go.Binding("text").makeTwoWay()), // the label shows the node data's text
                ),
                {
                    toolTip:// this tooltip Adornment is shared by all nodes
                        G(go.Adornment, "Auto",
                            G(go.Shape, { fill: "#FFFFCC" }),
                            G(go.TextBlock, { margin: 4 }, // the tooltip shows the result of calling nodeInfo(data)
                                new go.Binding("text", "", nodeInfo))
                        ),
                    // 绑定上下文菜单
                    contextMenu: makePartContextMenu()
                }
            ),
            {
                mouseEnter: function (e, node) { showNodeHighLight(node, true); },
                mouseLeave: function (e, node) { showNodeHighLight(node, false); }
            }
        );
    }

    /**
     * 选中节点的样式
     * @returns {*}
     */
    function makeNodeSelectionAdornmentTemplate(){
        return G(go.Adornment, "Auto",
            G(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
            G(go.Placeholder)
        );
    }

    /**
     * 创建连接点
     * @param name
     * @param spot
     * @param output
     * @param input
     * @returns {*}
     */
    function makeNodePort(name, spot, output, input) {
        // the port is basically just a small transparent square
        return G(go.Shape, "Circle",
            {
                fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
                stroke: null,
                desiredSize: new go.Size(7, 7),
                alignment: spot, // align the port on the main Shape
                alignmentFocus: spot, // just inside the Shape
                portId: name, // declare this object to be a "port"
                fromSpot: spot,
                toSpot: spot, // declare where links may connect at this port
                fromLinkable: output,
                toLinkable: input, // declare whether the user may draw links to/from here
                cursor: "pointer" // show a different cursor to indicate potential link point
            });
    };

    /**
     * tooltip上显示的信息
     * @param d
     * @returns {string}
     */
    function nodeInfo(d) {
        if (!d.hasOwnProperty('key')) return "";
        var info = `(${d.key})`;
        if(d.nodeType===0){
            info="开始";
        }
        if(d.nodeType===3){
            info="告警";
        }
        if(d.nodeType===2){
            info="失败";
        }
        if(d.nodeType===1){
            info="成功";
        }
        if(d.className){
            info+=` ${d.className}`;
        }
        if(window.allFlowNodes&&d.className){
            let curClasNode=window.allFlowNodes.filter(it=>it.className==d.className);
            if(curClasNode.length>0&&curClasNode[0].dec){
                info+=`\n类描述：`+curClasNode[0].dec;
            }
            if(window.getUsedParamsFromNodeScript){
                let usedParams=window.getUsedParamsFromNodeScript(d.className);
                info+=`\n读params：` + usedParams.readParams.join(', ');
                info+=`\n写params：` + usedParams.writeParams.join(', ');
            }
        }
        if(d.refByOthers){
            info+=`\n\n★ 引用${d.className}的其他流程：\n${d.refByOthers.join('\n')}`;
        }
        return info;
    }
    
    function linkInfo(d) {
        var info = `${d.text?d.text:''}`;
        if(d.condition&&d.condition!='success'&&d.condition!='fail'){
            info+=`\ncondition: ${d.condition}`;
        }
        return info;
    }

    /**
     * 右键菜单
     * @returns {*}
     */
    function makePartContextMenu(){
        return G(go.Adornment, "Vertical",
            makeMenuItem("编辑",
                function(e, obj) { // OBJ is this Button
                    var contextmenu = obj.part; // the Button is in the context menu Adornment
                    var part = contextmenu.adornedPart; // the adornedPart is the Part that the context menu adorns
                    // now can do something with PART, or with its data, or with the Adornment (the context menu)
                    window.onFlowDialogObjectDoubleClicked({subject:{part:part},diagram:e.diagram}, true);
                }),
            makeMenuItem("删除",
                function(e, obj) { e.diagram.commandHandler.deleteSelection(); },
                function(o) { return o.diagram.commandHandler.canDeleteSelection(); })
        );
    };

    /**
     * 生成右键菜单项
     * @param text
     * @param action
     * @param visiblePredicate
     * @returns {*}
     */
    function makeMenuItem(text, action, visiblePredicate) {
        return G("ContextMenuButton",
            G(go.TextBlock, text, {
                margin: 6,
                font: 'normal 12px serif',
                textAlign: "center",
                stroke: "#555555"
            }),
            { click: action },
            // don't bother with binding GraphObject.visible if there's no predicate
            visiblePredicate ? new go.Binding("visible", "", visiblePredicate).ofObject() : {});
    };

    function showNodeHighLight(node, show) {
        _designer.model.setDataProperty(node.data, "textStroke", show?'#7b3f02':'#000')
    };

    /**
     * 连接线的选中样式
     * @returns {*}
     */
    function makeLinkSelectionAdornmentTemplate(){
        return G(go.Adornment, "Link",
            G(go.Shape,
                // isPanelMain declares that this Shape shares the Link.geometry
                { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }) // use selection object's strokeWidth
        );
    };

    /**
     * 定义连接线的样式模板
     * @returns {*}
     */
    function makeLinkTemplate(){
        return G(go.Link, // the whole link panel
            { selectable: true, selectionAdornmentTemplate: makeLinkSelectionAdornmentTemplate() },
            { relinkableFrom: true, relinkableTo: true, reshapable: true },
            new go.Binding("points").makeTwoWay(),
            new go.Binding("curve"),
            G(go.Shape, // 线条
                { stroke: "black",isPanelMain: true,strokeWidth: 2 }, new go.Binding("stroke"),new go.Binding("strokeWidth","linkStrokeWidth")),
            G(go.Shape, // 箭头
                { toArrow: "standard", stroke: null }, new go.Binding("stroke"), new go.Binding("fill")),
            G(go.Panel, "Auto",
                G(go.Shape, // 标签背景色
                    {
                        fill: null,
                        stroke: null
                    }, new go.Binding("fill", "pFill")),
                G(go.TextBlock, // 标签文本
                    {
                        textAlign: "center",
                        font: "bold 10pt helvetica, arial, sans-serif",
                        stroke: "#000",
                        minSize: new go.Size(10, NaN),
                        margin: 4
                    },
                    new go.Binding("text"),new go.Binding("stroke")), // the label shows the node data's text
                {
                    toolTip:// this tooltip Adornment is shared by all nodes
                        G(go.Adornment, "Auto",
                            G(go.Shape, { fill: "#fdfff1" }),
                            G(go.TextBlock, { margin: 4 }, // the tooltip shows the result of calling nodeInfo(data)
                                new go.Binding("text", "", linkInfo)
                                ,new go.Binding("stroke"))
                        ),
                    // this context menu Adornment is shared by all nodes
                    contextMenu: makePartContextMenu()
                }
            )
        );
    };

    /**
     * 流程图如果有变动，则提示用户保存
     * @param e
     */
    function onDiagramModified(e){
        if(window.onFlowDiagramModified){
            window.onFlowDiagramModified(_designer.isModified, e);
        }
    };

    /**
     * 更新节点信息
     * @param oldData
     * @param newData
     */
    function updateNodeData(node, text, className) {
        _designer.startTransaction("vacate");
        _designer.model.setDataProperty(node.data, "text", text);
        _designer.model.setDataProperty(node.data, "className", className);
        _designer.commitTransaction("vacate");
    };

    /**
     * 更改所有连线中间的文本背景色
     */
    function setLinkTextBg() {
        _designer.links.each(function (link) {
            _designer.startTransaction("vacate");
            if (link.data.text) {
                _designer.model.setDataProperty(link.data, "pFill", window.go.GraphObject.make(go.Brush, "Radial", {
                    0: "rgb(240, 240, 240)",
                    0.3: "rgb(240, 240, 240)",
                    1: "rgba(240, 240, 240, 0)"
                }));
            }
            _designer.commitTransaction("vacate");
        });
    };

    function makeGroupTemplate() {
        return G(go.Group, "Spot",
          {
            selectionAdornmentTemplate: // adornment when a group is selected
              G(go.Adornment, "Auto",
                G(go.Shape, "Rectangle",
                  { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
                G(go.Placeholder)
              ),
            toSpot: go.Spot.AllSides, // links coming into groups at any side
            toEndSegmentLength: 30, fromEndSegmentLength: 30
          },
          G(go.Panel, "Auto",
            G(go.Shape, "Rectangle",
              {
                name: "OBJSHAPE",
                strokeDashArray:[4,2],
                fill: "rgba(0,0,0,0.02)"
              },
              new go.Binding("desiredSize", "ds"),
              new go.Binding("fill")),
            G(go.Placeholder,
              { padding: 32 })
          ),
          G(go.TextBlock,
            {
              name: "GROUPTEXT",
              alignment: go.Spot.TopLeft,
              alignmentFocus: new go.Spot(0,0,4,4),
              font: "Bold 10pt Sans-Serif"
            },
            new go.Binding("text", "text")),
          {
            toolTip:  //  define a tooltip for each group that displays its information
              G(go.Adornment, "Auto",
                G(go.Shape, { fill: "#EFEFCC" }),
                G(go.TextBlock, { margin: 4 },
                  new go.Binding("text",  "" , function(d){
                    return d.tips?d.tips:d.key;
                  }))
              )
          }
        );
    }

    /** --------private method------------------end----------------------**/

    return this;
};
