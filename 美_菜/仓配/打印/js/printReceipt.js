$(function () {

    // todo 渲染完成后重复的检查高度，如果高度太高，就减小每组个数
    function geTestReceiverData(paperCount, dataCount) {
        var one = {
            "data": {
                "datas": [
                    
                ],
                "printerName": "",
                "page": {
                    "width": "827",
                    "type": "A5Rotated",
                    "height": "583"
                }
            },
            "error_code": 0
        };
        var dataList = [];
        for(var i = 0; i < dataCount; i++){
            var j = i + 1;
            var newOne = {
                    "column1": j,
                    "column12": "备注" + j,
                    "column11": "135.00",
                    "column10": "",
                    "column5": "纯生" + j,
                    "column4": "青岛" + j,
                    "column3": "青岛青岛啤酒|纯生|箱(12瓶* 500ml)/箱(12瓶* 500ml)",
                    "column2": 27010107609001 + j,
                    "column9": "",
                    "column8": "45.00",
                    "column7": 1 + j + "箱",
                    "column6": 1 + j + "箱"
                };
            dataList.push(newOne);
        }

        var mainList = [];
        for(var i = 0; i < paperCount; i++){
            var j = i + 1;
            var one = {
                "fileName": {
                    "value": "ReceiptGood1_A5.txt"
                },
                "line": {
                    "value": "true"
                },
                "xrLabRow6_6": {
                    "value": "现场实付："
                },
                "gridView1": {
                    "list": dataList
                },
                "xrLabRow5_5": {
                    "value": "应收：365.16"
                },
                "xrLabRow6_4": {
                    "value": "配送员签字/日期："
                },
                "xrLabRow5_6": {
                    "value": "客户应付：365.16"
                },
                "xrLabRow6_5": {
                    "value": ""
                },
                "xrLabRow5_3": {
                    "value": "运费：0.00"
                },
                "xrLabRow6_2": {
                    "value": ""
                },
                "xrLabRow7_1": {
                    "value": "备注：受实际生产影响，已优惠可能与下单时优惠有差异。"
                },
                "xrLabRow5_4": {
                    "value": "预付款：0.00"
                },
                "xrLabRow6_3": {
                    "value": ""
                },
                "xrLabRow8_1": {
                    "value": "如果您选择现金付款，则未收货款零头将计入您美菜账户的欠款，后续收取。"
                },
                "xrLabRow3_3": {
                    "value": "配送日期：2017-11-23                                                                                                                                                                                                                                                                                                                                          打印时间：2017-11-27 11:30:21"
                },
                "deliveryDate": {
                    "value": "配送日期：2017-11-23"
                },
                "printTime": {
                    "value": "打印时间：2017-11-27 11:30:21"
                },
                "xrLabRow5_1": {
                    "value": "已优惠：0.00"
                },
                "xrLabRow5_2": {
                    "value": "优惠后金额：395.00"
                },
                "xrLabRow6_1": {
                    "value": "收货人签字/日期："
                },
                "xrLabRow2_1_1": {
                    "value": "B-4482897-门店4482897[7:00-8:00]"
                },
                "xrLabRow1_3": {
                    "value": "客服电话：4006-135-135"
                },
                "xrLabRow3_1": {
                    "value": "地址：北京****5号"
                },
                "xrLabRow2_2": {
                    "value": "配送：邓新晨--直送(18612861869)"
                },
                "xrLabRow3_2": {
                    "value": "销售：王智南(13691319097)"
                },
                "xrLabRow2_3": {
                    "value": "订单号：193442800"
                },
                "xrLabRow1_1": {
                    "value": "美_菜 MEI_CAI.CN"
                },
                "xrLabRow2_1_3": {
                    "value": "13-晨鲜送-魏公村1-1"
                },
                "xrLabRow2_1": {
                    "value": "收货人：李老板(12345678901)"
                },
                "xrLabRow2_1_2": {
                    "value": "货到付款 "
                },
                "xrLabRow1_2": {
                    "value": "收货确认单(廊坊分拣中心)" + j
                }
            };
            mainList.push(one);
        }

        return mainList;
    }

    var printData = geTestReceiverData(1, 28);
    console.log(printData);


    var $printDeliveredPaperTemplate = $('.print-delivered-paper-template');
    var $printListWrap = $('.print-list-wrap');
    renderPrintPaper(printData, $printListWrap, $printDeliveredPaperTemplate, 'A5');

    function renderPrintPaper(printData, $printListWrap, $printDeliveredPaperTemplate, paperSize) {
        var groupSize = 28, paperA4StyleClass = 'print-paper-a4', paperA5StyleClass = 'print-paper-a5', paperStyleClass = paperA4StyleClass;
        if(paperSize === 'A5'){
            paperStyleClass = paperA5StyleClass;
            groupSize = 7;
        }

        $.each(printData, function (i, item) {
            var $geDomWrap = $($printDeliveredPaperTemplate.html());
            var $printGroupHandle = $geDomWrap.find('.print-group-handle');
            var $printGroupContent = $geDomWrap.find('.print-group-content').empty();

            var groupData = splitDataListToGroup(item.gridView1.list, groupSize);
            var hasPager = groupData.length > 1;
            $.each(groupData, function (j, row) {
                var $geDomWrap = $($printDeliveredPaperTemplate.html());
                $geDomWrap.find('.print-paper').removeClass(paperA5StyleClass).removeClass(paperA4StyleClass).addClass(paperStyleClass);

                var $printBody = $geDomWrap.find('.receipts-data-table').empty();
                var $printHeader = $geDomWrap.find('.print-paper-header').empty();
                var $printFooter = $geDomWrap.find('.print-paper-footer').empty();
                // 头部
                var $printHeaderGenerate = generatePrintHeader(item, $printDeliveredPaperTemplate);
                if(hasPager){
                    $printHeaderGenerate.find('.print-paper-pager').text((j + 1) + '/' + groupData.length);
                }
                $printHeader.replaceWith($printHeaderGenerate);
                // 身子
                $printBody.replaceWith(generateDataTable(row, $printDeliveredPaperTemplate));

                if(groupData.length === 1 || j === (groupData.length - 1)){
                    // 尾部
                    $printFooter.replaceWith(generatePrintFooter(item, $printDeliveredPaperTemplate));
                }
                $printGroupContent.append($geDomWrap.find('.receipts-delivered-paper'));
            });
            // 打印按钮
            var printCallBack = function (aa) {
                console.log(item.returnTaskNo);
                console.log(aa);
            };
            $printGroupHandle.replaceWith(generatePrintHandle($geDomWrap, printCallBack, 'testaa'));
            $printListWrap.append($geDomWrap);
        });
    }


    function splitDataListToGroup(listData, groupSize) {
        groupSize = groupSize || 13;
        var groupData = [];
        if(listData.length <= groupSize){
            groupData.push(listData);
            return groupData;
        }
        var groupOne = [];
        var matchGroup = listData.length % groupSize === 0;
        $.each(listData, function (i, item) {
            groupOne.push(item);
            var groupIndex = ((i + 1) % groupSize);
            if(groupIndex === 0 || (!matchGroup && i === (listData.length - 1))){
                groupData.push(groupOne);
                groupOne = [];
            }
        });
        return groupData;
    }
    //console.log(splitDataListToGroup(printData[0]['returnTaskList']));

    function generatePrintHeader(item, $printDeliveredPaperTemplate) {
        var $geDomWrap = $($printDeliveredPaperTemplate.html());
        var $printHeader = $geDomWrap.find('.print-paper-header');

        $printHeader.find('.self-warehouse-name').text(item.xrLabRow1_2.value);
        $printHeader.find('.company-info').text(item.xrLabRow2_1_1.value);
        $printHeader.find('.receiver-info').text(item.xrLabRow2_1.value);
        $printHeader.find('.receive-address-info').text(item.xrLabRow3_1.value);

        $printHeader.find('.delivery-type').text(item.xrLabRow2_1_2.value);
        $printHeader.find('.delivery-info').text(item.xrLabRow2_2.value);
        $printHeader.find('.seller-info').text(item.xrLabRow3_2.value);
        $printHeader.find('.delivery-batch-info').text(item.xrLabRow2_1_3.value);
        $printHeader.find('.order-no').text(item.xrLabRow2_3.value);
        $printHeader.find('.delivery-date').text(item.deliveryDate.value);
        $printHeader.find('.print-time').text(item.printTime.value);
        return $printHeader;
    }

    function generateDataTable(data, $printDeliveredPaperTemplate) {
        var $geDomWrap = $($printDeliveredPaperTemplate.html());
        var $dataTable = $geDomWrap.find('.receipts-data-table');
        // 单据数据
        var $receiptsDataTable = $dataTable.find('table');
        var $receiptsDataTableTbody = $receiptsDataTable.find('tbody').empty();
        $.each(data, function (i, row) {
            // 数据预处理
            var $dispatchDataTr = $('<tr>');
            var $dispatchDataTds =
                '<td>' + row.column1 + '</td>\n' +
                '<td>' + row.column2 + '</td>\n' +
                '<td>' + row.column3 + '</td>\n' +
                '<td>' + row.column6 + '</td>\n' +
                '<td>' + row.column7 + '</td>\n' +
                '<td>' + row.column8 + '</td>\n' +
                '<td>' + row.column11 + '</td>\n' +
                '<td>' + row.column12 + '</td>';
            $dispatchDataTr.append($dispatchDataTds);
            $receiptsDataTableTbody.append($dispatchDataTr);
        });
        return $dataTable;
    }

    function generatePrintFooter(item, $printDeliveredPaperTemplate) {
        var $geDomWrap = $($printDeliveredPaperTemplate.html());
        // 绑定打印按钮事件
        var $printHandle = $geDomWrap.find('.print-handle'), $printPaper = $geDomWrap.find('.print-paper');
        $printHandle.on('click', function () {
            $printPaper.printArea({
            });
        });
        var $printFooter = $geDomWrap.find('.print-paper-footer');
        $printFooter.find('.discounted-total-money').text(item.xrLabRow5_1.value);
        $printFooter.find('.after-discounted-money').text(item.xrLabRow5_2.value);
        $printFooter.find('.delivery-money').text(item.xrLabRow5_3.value);
        $printFooter.find('.pre-pay-money').text(item.xrLabRow5_4.value);
        $printFooter.find('.should-get-money').text(item.xrLabRow5_5.value);
        $printFooter.find('.customer-need-pay-money').text(item.xrLabRow5_6.value);
        $printFooter.find('.receiver-mark-date').text(item.xrLabRow6_1.value);
        $printFooter.find('.deliveryman-mark-date').text(item.xrLabRow6_4.value);
        $printFooter.find('.replenishment-money').text(item.xrLabRow6_4.value);
        $printFooter.find('.return-goods-money').text(item.xrLabRow6_4.value);
        $printFooter.find('.return-package-money').text(item.xrLabRow6_4.value);
        $printFooter.find('.locale-get-money').text(item.xrLabRow6_6.value);
        $printFooter.find('.remark1').text(item.xrLabRow7_1.value);
        $printFooter.find('.remark2').text(item.xrLabRow8_1.value);
        return $printFooter;
    }
    function generatePrintHandle($geDomWrap, callback, callbackParam) {
        //var $geDomWrap = $($printDeliveredPaperTemplate.html());
        // 绑定打印按钮事件
        var $printHandle = $geDomWrap.find('.print-handle'), $printPaper = $geDomWrap.find('.print-paper-content');
        $printHandle.find('.print-one').on('click', function () {
            $printPaper.printArea({
            });
            if(typeof callback === 'function') callback(callbackParam);
        });
        return $printHandle;
    }
});