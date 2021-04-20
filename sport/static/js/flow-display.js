var finishColor = "#66DD00";

function FlowDisplay(diagramDiv) {
    var G = go.GraphObject.make;
    var _this = {};
    var _displayer = {};

    /** --------public method----------------------------------------**/

    /**
     * 显示流程图
     * @param flowData  流程图json数据
     */
    this.loadFlow = function (flowData,id) {

        if(!flowData) return;

        _displayer.model = go.Model.fromJson(flowData);
        _displayer.model.templateId=id;
        var pos = _displayer.model.modelData.position;
        if (pos) _displayer.initialPosition = go.Point.parse(pos);

        // 更改所有连线中间的文本背景色
        setLinkTextBg();
    };

    /**
     * 获取流程图数据
     * @returns {*}
     */
    this.getFlowData = function () {
        _displayer.model.modelData.position = go.Point.stringify(_displayer.position);
        return _displayer.model.toJson();
    };

    /**
     * 动画显示流程路径状态
     */
    this.animateFlowPath = function(strStepKeys, isCompleted, isNoPersistContinue) {
        var stepKeys = strStepKeys.split(',');

        // 查找所有【已完成】步骤：【开始】-> 【已完成】（N个）
        var steps = findFinishedSteps(stepKeys, isCompleted, isNoPersistContinue);

        // 高亮所有“已完成”步骤
        showFinishedNodes(steps);

        //【开始】-> 【已完成】（N个）->【待处理】
        // 或
        //【开始】-> 【已完成】（N个）->【结束】
        var lastStep = findLastStep(stepKeys, steps, isCompleted);
        steps.push(lastStep);

        if (!isCompleted) {
            // “待处理”步骤，加上闪烁动画
            loopRunningNode(lastStep);
        }

        // 在连线上加闪烁动画
        var links = findFinishedLinks(steps);
        loopLinks(links);
    };
    /** --------public method-------------end---------------------------**/

    init(diagramDiv);

    /** --------private method----------------------------------------**/

    /**
     * 初始化流程设计器
     * @param divId 设计器Div
     */
    function init(divId) {
        _displayer = G(go.Diagram, divId,
            {
                allowDrop: false,
                allowSelect: true,
                allowHorizontalScroll: true,
                allowVerticalScroll: true,
                allowMove: false,
                allowLink: false,
                allowRelink: false,
                "draggingTool.dragsLink": false,
                "toolManager.hoverDelay":10
            });
        _displayer.addDiagramListener("ObjectDoubleClicked", function(e){
            window.onFlowDialogObjectDoubleClicked(e,false,true);
        });
        // 流程步骤的样式模板
        _displayer.nodeTemplate = makeNodeTemplate();

        // 流程连接线的样式模板
        _displayer.linkTemplate = makeLinkTemplate();
        _displayer.groupTemplate = makeGroupTemplate();
        _displayer.nodeTemplateMap.add("Comment",
          G(go.Node,  // this needs to act as a rectangular shape for BalloonLink,
            { background: "transparent" },  // which can be accomplished by setting the background.
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            G(go.TextBlock,
              { stroke: "#997013", margin: 3},
              new go.Binding("text").makeTwoWay())
          )
        );
        _displayer.nodeTemplateMap.add("Picture",
          G(go.Node,go.Panel.Spot,
            {
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
                    font: "bold 11pt Helvetica, Arial, sans-serif",
                    margin: 8,
                    maxSize: new go.Size(160, NaN),
                    wrap: go.TextBlock.WrapFit,
                    stroke: "#000"
                },
                new go.Binding("text"),
                new go.Binding("alignment"),
                new go.Binding("alignmentFocus").makeTwoWay(),
                new go.Binding("stroke",'textColor')), 
            {
                contextMenu: makePartContextMenu()
            }
          )
        );
    };

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
            G(go.Panel, "Auto",
                    { name: "PANEL" },
                    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                G(go.Shape, "RoundedRectangle", // default figure
                        {
                            portId: "", // the default port: if no spot on link data, use closest side
                            name: "PIPE",
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            fill: "#ccc", // default color
                            strokeWidth: 1.6,
                            stroke: "#000"
                        },
                        new go.Binding("figure"),
                        new go.Binding("stroke"),
                        new go.Binding("strokeDashArray"),
                        new go.Binding("strokeWidth"),
                        new go.Binding("fill")),
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
                        margin: 8,
                        maxSize: new go.Size(160, NaN),
                        wrap: go.TextBlock.WrapFit,
                        stroke: "#000"
                    },
                    new go.Binding("stroke","textStroke"),
                    new go.Binding("text").makeTwoWay()),
                  ),
                    {
                        toolTip: G(go.Adornment, "Auto",
                            G(go.Shape, { fill: "#FFFFCC" }),
                            G(go.TextBlock, { margin: 4 },
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

    function showNodeHighLight(node, show) {
        _displayer.model.setDataProperty(node.data, "textStroke", show?'#7b3f02':'#000')
    };

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

    /**
     * tooltip上显示的信息
     * @param d
     * @returns {string}
     */
    function nodeInfo(d) {
        var info = `key：${d.key}`;
        if(d.className){
            info+=`\n${d.className}`;
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
        return info;
    }
    
    function linkInfo(d) {
        var info = `${d.text?d.text:''}`;
        if(d.condition&&d.condition&&d.condition!='success'&&d.condition!='fail'){
            info+=`\n${d.condition}`;
        }
        return info;
    }

    /**
     * 右键菜单
     * @returns {*}
     */
    function makePartContextMenu(){
        return G(go.Adornment, "Vertical",
            makeMenuItem("推进",
                function(e, obj) { // OBJ is this Button
                    var contextmenu = obj.part; // the Button is in the context menu Adornment
                    var part = contextmenu.adornedPart; // the adornedPart is the Part that the context menu adorns
                    var node = part;
                    if(node instanceof go.Node && node.data.category === 'Comment')return;
                    if ((node instanceof go.Node) && (node.data.nodeType === 0 || node.data.nodeType === 1 || node.data.nodeType === 2 || node.data.nodeType === 3)) {
                        if(window.antdMessage){
                            window.antdMessage.info("开始、成功、失败等内置步骤不可推进~");
                        }
                        return;
                    }
                    var clazzName = node.data.className;
                    if(node.data.stroke!='red'){
                        if(window.antdMessage){
                            window.antdMessage.info("处理中节点才可以可推进~");
                        }
                        return;
                    }
                    if(window.flowEmitter){
                        window.flowEmitter.emit('continue-flow-from-display',{...node.data,type:'continue',params:"{\r\n    \r\n}"});
                    }
                })
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

    /**
     * 定义连接线的样式模板
     * @returns {*}
     */
    function makeLinkTemplate(){
        return G(go.Link,
            { selectable: false },
            { relinkableFrom: true, relinkableTo: true, reshapable: true },
            new go.Binding("points").makeTwoWay(),
            new go.Binding("curve"),
            new go.Binding("layerName", "color"),
            new go.Binding("zOrder"),
            G(go.Shape, { isPanelMain: true, stroke: "black", strokeWidth: 2 }, new go.Binding("stroke"),new go.Binding("zOrder"),new go.Binding("strokeWidth","linkStrokeWidth")),
            G(go.Shape, { isPanelMain: true, stroke: "#aaa", strokeWidth: 2 }, new go.Binding("stroke"),new go.Binding("strokeWidth","linkStrokeWidth")),
            G(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 1, name: "PIPE", strokeDashArray: [6, 6] }),
            G(go.Shape,
                { toArrow: "standard", stroke: null }, new go.Binding("stroke"), new go.Binding("fill"), new go.Binding("zOrder")),
            G(go.Panel, "Auto",
                G(go.Shape, {
                    fill: null,
                    stroke: null
                }, new go.Binding("fill", "pFill"), new go.Binding("zOrder")),
                G(go.TextBlock,
                    {
                        textAlign: "center",
                        font: "bold 10pt helvetica, arial, sans-serif",
                        stroke: "#333",
                        margin: 4
                    },
                    new go.Binding("text", "text"), new go.Binding("zOrder")),
                {
                    toolTip:// this tooltip Adornment is shared by all nodes
                        G(go.Adornment, "Auto",
                            G(go.Shape, { fill: "#FFFFCC" }),
                            G(go.TextBlock, { margin: 4 }, // the tooltip shows the result of calling nodeInfo(data)
                                new go.Binding("text", "", linkInfo))
                        )
                }
            )
        );
    };

    /**
     * 返回所有【已完成】的步骤
     * @param stepKeys
     * @param isCompleted
     * @returns {Array}
     */
    function findFinishedSteps(stepKeys, isCompleted, isNoPersistContinue) {

        var arrStep = [];

        if (!stepKeys) return arrStep;
        if(!isNoPersistContinue){
            var startStep = findStartStep();// 【开始】步骤
            arrStep.push(startStep);
        }

        // 【已完成】的步骤
        var finishedCount = stepKeys.length - 1;// 不包含最后一个“待处理“步骤
        if (isCompleted) {
            finishedCount = stepKeys.length;// 包含所有步骤
        }
        for (var i = 0; i < finishedCount; i++) {
            var stepKey = stepKeys[i];
            var step = _displayer.findNodeForKey(stepKey);
            if (!step) continue;

            arrStep.push(step);
        }
        return arrStep;
    };

    /**
     * 高亮“已完成”步骤
     * @param steps
     */
    function showFinishedNodes(steps) {

        if (!steps) return;
        
        _displayer.startTransaction("vacate");

        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            let color = finishColor;
            if(step.data){
                if(step.data.nodeType === 1){
                    color = '#4fba4f';
                }else if(step.data.nodeType === 2 || step.data.nodeType === 3){
                    color = '#CE0620';
                }
            }
            
            // 步骤
            
            _displayer.model.setDataProperty(step.data, "fill", color);
            
        }
        _displayer.commitTransaction("vacate");
    };

    /**
     *
     * 查找【开始】节点
     * @param {} steps
     * @returns {}
     */
    function findStartStep() {
        var startStep = null;
        _displayer.nodes.each(function(step) {

            if (step.data.hasOwnProperty('nodeType') && step.data.nodeType === 0) {
                startStep = step;
                return false;
            }
        });
        return startStep;
    };

    /**
     * 循环闪烁“已完成”步骤之间的连线
     * @param links
     */
    function loopLinks(links) {
        setInterval(function () {
            showFinishedLinks(links);// “已完成”连线
        }, 300);
    };

    /**
     * 循环闪烁“待处理”步骤
     * @param node
     */
    function loopRunningNode(node) {
        setTimeout(function () {
            showRunningNode(node);
            loopRunningNode(node);
        }, 200);
    };

    /**
     * 高亮“待处理”步骤
     * @param node
     */
    function showRunningNode(node) {
        if (!node) return;

        _displayer.startTransaction("vacate");
        _displayer.model.setDataProperty(node.data, "fill", (node.data.fill === "#ff9001") ? "#ffB001" : "#ff9001");
        _displayer.commitTransaction("vacate");

        // 边框加上流水动画
        var shape = node.findObject("PIPE");
        var off = shape.strokeDashOffset - 2;
        shape.strokeDashOffset = (off <= 0) ? 20 : off;
    }

    /**
     * 获取最后一个步骤（【待处理】或【结束】）
     * @param stepKeys
     * @param steps
     * @param isCompleted
     * @returns {*}
     */
    function findLastStep(stepKeys, steps, isCompleted) {
        var lastStep;
        if (!isCompleted) {
            // 获取“待处理”步骤
            var lastKey = stepKeys[stepKeys.length - 1];
            var step = _displayer.findNodeForKey(lastKey);
            _displayer.startTransaction("vacate-last");
            _displayer.model.setDataProperty(step.data, "stroke", "red");
            // _displayer.model.setDataProperty(step.data, "strokeWidth", 2);
            _displayer.model.setDataProperty(step.data, "strokeDashArray", [6, 6]);
            _displayer.commitTransaction("vacate-last");

            //【开始】-> 【已完成】（N个）->【待处理】
            lastStep = step;
        } else {
            // 用最后一根连线获取【结束】步骤
            var lastFinishedStep = steps[steps.length - 1];
            lastStep = lastFinishedStep;
          //  var it = lastFinishedStep.findLinksOutOf();
          //  var lastLink = it.first();
          //  var endStep = lastLink.toNode;

            //【开始】-> 【已完成】（N个）->【结束】
         //   lastStep = endStep;
        }

        return lastStep;
    };

    /**
     * 查找步骤之间的连线
     * @param steps
     * @returns {Array}
     */
    function findFinishedLinks(steps) {

        var arrLinks = [];

        if (!steps || steps.length < 1) return arrLinks;

        var currStep = steps[0];// 【开始】步骤

        for (var i = 0; i < steps.length; i++) {

            var step = steps[i];

            // 连线
            var link = currStep.findLinksBetween(step).first();
            if (!link) continue;
            arrLinks.push(link);

            currStep = step;
        }

        return arrLinks;
    };

    /**
     * 高亮所有“已完成”步骤的连线
     * @param links
     */
    function showFinishedLinks(links) {

        if (!links) return;
_displayer.startTransaction("vacate");
        for (var i = 0; i < links.length; i++) {

            // 连线
            var link = links[i];
            let normalColor = "gray";
            if(link.data.type=='fail'){
                normalColor="red";
            }
            
            _displayer.model.setDataProperty(link.data, "stroke", (link.data.stroke === normalColor ? finishColor : normalColor));
            _displayer.model.setDataProperty(link.data, "fill", (link.data.fill === normalColor ? finishColor : normalColor));
            //_displayer.model.setDataProperty(link.data, "zOrder", 999);
            

            // 置于最上层，防止被遮挡
            //_displayer.startTransaction('modified zOrder');
            //_displayer.model.setDataProperty(link.data, "zOrder", 1);
            //_displayer.commitTransaction('modified zOrder');

            // 连线加上流水动画
            var shape = link.findObject("PIPE");
            var off = shape.strokeDashOffset - 4;
            shape.strokeDashOffset = (off <= 0) ? 20 : off;
        }
_displayer.commitTransaction("vacate");
    };

    /**
     * 更改所有连线中间的文本背景色
     */
    function setLinkTextBg() {
        _displayer.startTransaction("vacate");
        _displayer.links.each(function (link) {
            
            if (link.data.text) {
                _displayer.model.setDataProperty(link.data, "pFill", window.go.GraphObject.make(go.Brush, "Radial", {
                    0: "rgb(240, 240, 240)",
                    0.3: "rgb(240, 240, 240)",
                    1: "rgba(240, 240, 240, 0)"
                }));
            }
            
        });
        _displayer.commitTransaction("vacate");
    };

    /** --------private method------------------end----------------------**/

    return this;
};
