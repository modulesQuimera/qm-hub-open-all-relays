module.exports = function(RED) {

    "use strict";
    // var mapeamentoNode;

    function openAllRelaysNode(config) {
        RED.nodes.createNode(this, config);
        // this.websocket = config.websocket;
        // this.websocketConfig = RED.nodes.getNode(this.websocket);
        var node = this
        // this.mapeamento = config.mapeamento
        // node.channel_number = config.channel_number
        // node.AC_mode = config.AC_mode === "true" ? true : false,
        // node.scale = config.scale
        // mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        
        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "multimeter_modular_V1.0",
                slot: 1,
                method: "open_all_relays",
                // couple_channel: parseInt(node.channel_number),
                // AC_mode: node.AC_mode ,
                // scale: parseInt(node.scale) 
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            // node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            // msg.payload = command
            send(msg)
        });
    }
    RED.nodes.registerType("open-all-relays", openAllRelaysNode);

    // RED.httpAdmin.get("/getVoltageDiff",function(req,res) {
    //     console.log(mapeamentoNode)
    //     if(mapeamentoNode){
    //         res.json([
    //             {value:mapeamentoNode.valuePort1, label: mapeamentoNode.labelPort1, hasValue:false},
    //             {value:mapeamentoNode.valuePort2, label: mapeamentoNode.labelPort2, hasValue:false},
    //             {value:mapeamentoNode.valuePort3, label: mapeamentoNode.labelPort3, hasValue:false},
    //             {value:mapeamentoNode.valuePort4, label: mapeamentoNode.labelPort4, hasValue:false},
    //             {value:mapeamentoNode.valuePort5, label: mapeamentoNode.labelPort5, hasValue:false},
    //             {value:mapeamentoNode.valuePort6, label: mapeamentoNode.labelPort6, hasValue:false},
    //             {value:mapeamentoNode.valuePort7, label: mapeamentoNode.labelPort7, hasValue:false},
    //             {value:mapeamentoNode.valuePort8, label: mapeamentoNode.labelPort8, hasValue:false},
    //             {value:mapeamentoNode.valuePort9, label: mapeamentoNode.labelPort9, hasValue:false},
    //             {value:mapeamentoNode.valuePort10, label: mapeamentoNode.labelPort10, hasValue:false},
    //             {value:mapeamentoNode.valuePort11, label: mapeamentoNode.labelPort11, hasValue:false},
    //             {value:mapeamentoNode.valuePort12, label: mapeamentoNode.labelPort12, hasValue:false},
    //             {value:mapeamentoNode.valuePort13, label: mapeamentoNode.labelPort13, hasValue:false},
    //         ])
    //     }
    //     else{
    //         res.json([
    //             {label:"A1 | B1", value: "0", hasValue:false},
    //             {label:"A2 | B2", value: "1", hasValue:false},
    //             {label:"A3 | B3", value: "2", hasValue:false},
    //             {label:"A4 | B4", value: "3", hasValue:false},
    //             {label:"A5 | B5", value: "4", hasValue:false},
    //             {label:"A6 | B6", value: "5", hasValue:false},
    //             {label:"A7 | B7", value: "6", hasValue:false},
    //             {label:"A8 | B8", value: "7", hasValue:false},
    //             {label:"A9 | B9", value: "8", hasValue:false},
    //             {label:"A10 | B10", value: "9", hasValue:false},
    //             {label:"A11 | B11", value: "10", hasValue:false},
    //             {label:"APW | BPW", value: "11", hasValue:false},
    //             {label:"AMX | BMX", value: "12", hasValue:false},
    //         ])
    //     }
    // });
}