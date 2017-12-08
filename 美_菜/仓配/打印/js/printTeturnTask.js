$(function () {
    var printData = [
        {
            returnTaskNo: 'TK123456789test',
            warehouseNameFrom: '廊坊站点1',
            warehouseNameTo: '北京仓库1',
            outWarehouseDate: '2017-10-31',
            outWarehouseTime: '2017-10-31 11:21:37',
            outWarehouseTimeFormative: '2017-10-31 11:21:37',
            printTime: '2017-10-31 11:22:20',
            printTimeFormative: '2017-10-31 11:22:20',
            shipUserName: '胡斐',
            returnTaskList: geTestReturnTaskData(40)
        },
        {
            returnTaskNo: 'TK123456789test1',
            warehouseNameFrom: '廊坊站点1',
            warehouseNameTo: '北京仓库1',
            outWarehouseDate: '2017-10-31',
            outWarehouseTime: '2017-10-31 11:21:37',
            outWarehouseTimeFormative: '2017-10-31 11:21:37',
            printTime: '2017-10-31 11:22:20',
            printTimeFormative: '2017-10-31 11:22:20',
            shipUserName: '胡斐',
            returnTaskList: geTestReturnTaskData(30)
        }
    ];
    console.log(printData);

    function geTestReturnTaskData(count) {
        var one = {
            index: 1,
            containerCode: 'TP00100001',
            skuId: '545',
            ssuId: '545',
            name: '冬瓜|优质|约25斤/个',
            returnAmount: '77.02',
            skuFormat: '斤/2个',
            remark: '备注'
        };
        var dataList = [];
        for(var i = 0; i < count; i++){
            var j = i + 1;
            var newOne = {
                index: j,
                containerCode: 'TP' + one.containerCode + j,
                skuId: one.skuId + j,
                ssuId: one.ssuId + j,
                name: one.name + j,
                returnAmountStr: 20 + j + '斤/2个',
                remark: '备注' + j
            };
            dataList.push(newOne);
        }
        return dataList;
    }

    var $printDeliveredPaperTemplate = $('.print-delivered-paper-template');
    var $printListWrap = $('.print-list-wrap');
    renderPrintPaper(printData, $printListWrap, $printDeliveredPaperTemplate, 'A4');

    function renderPrintPaper(printData, $printListWrap, $printDeliveredPaperTemplate, paperSize) {
        var groupSize = 30, paperA4StyleClass = 'print-paper-a4', paperA5StyleClass = 'print-paper-a5', paperStyleClass = paperA4StyleClass;
        if(paperSize === 'A5'){
            paperStyleClass = paperA5StyleClass;
            groupSize = 10;
        }

        $.each(printData, function (i, item) {
            var $geDomWrap = $($printDeliveredPaperTemplate.html());
            var $printGroupHandle = $geDomWrap.find('.print-group-handle');
            var $printGroupContent = $geDomWrap.find('.print-group-content').empty();

            var groupData = splitDataListToGroup(item.returnTaskList, groupSize);
            var hasPager = groupData.length > 1;
            $.each(groupData, function (j, row) {
                var $geDomWrap = $($printDeliveredPaperTemplate.html());
                $geDomWrap.find('.print-paper').removeClass(paperA5StyleClass).removeClass(paperA4StyleClass).addClass(paperStyleClass);

                var $printBody = $geDomWrap.find('.dispatch-data-table').empty();
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

    function splitDataListToPrintGroup(listData, headAndBodySize, justBodySize, bodyAndFooterSize, fullPageSize) {
        // 头 + 数据(20)
        headAndBodySize = headAndBodySize || 20;
        // 全数据(26)
        justBodySize = justBodySize || 26;
        // 数据(20) + 尾部
        bodyAndFooterSize = bodyAndFooterSize || 20;
        // 包含全体，头 + 数据(12) + 尾部
        fullPageSize = fullPageSize || 12;
        var groupData = [];
        // 0 < x < 12 1张
        if(listData.length <= fullPageSize){
            groupData.push(listData);
            return groupData;
        }
        // 20 + 26 * n + 20 n+2 张
        var groupOne = [];
        $.each(listData, function (i, item) {
            var index = i + 1;
            groupOne.push(item);
            if(listData.length < (headAndBodySize + justBodySize) && index === fullPageSize){
                groupData.push(groupOne);
                groupOne = [];
            }

            if(index === headAndBodySize){
                groupData.push(groupOne);
                groupOne = [];
            }

            if(index === (headAndBodySize + justBodySize)){
                groupData.push(groupOne);
                groupOne = [];
            }

            if(index >= (headAndBodySize + justBodySize) && (index - headAndBodySize) % justBodySize === 0){
                groupData.push(groupOne);
                groupOne = [];
            }
        });

        groupOne !== [] ? groupData.push(groupOne) : null;
        return groupData;
    }
    //console.log(splitDataListToPrintGroup(printData[0]['returnTaskList']));

    
    function splitDataListToGroup(listData, groupSize) {
        groupSize = groupSize || 15;
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
        // 二维码
        /*var $qrcodeWrap = $printHeader.find('.qrcode-wrap');
        renderQrCode($qrcodeWrap.find('.qrcode-show'), item.returnTaskNo);*/

        var $barCodeWrap = $printHeader.find('.barcode-wrap');
        renderBarCode($barCodeWrap.find('.barcode-show'), item.returnTaskNo);

        $printHeader.find('.text-task-no').text(item.returnTaskNo);
        $printHeader.find('.warehouse-name-from').text(item.warehouseNameFrom);
        $printHeader.find('.warehouse-name-to').text(item.warehouseNameTo);
        $printHeader.find('.out-warehouse-date').text(item.outWarehouseDate);
        $printHeader.find('.out-warehouse-time').text(item.outWarehouseTimeFormative);
        $printHeader.find('.print-time').text(item.printTimeFormative);
        return $printHeader;
    }

    function generateDataTable(data, $printDeliveredPaperTemplate) {
        var $geDomWrap = $($printDeliveredPaperTemplate.html());
        var $dataTable = $geDomWrap.find('.dispatch-data-table');
        // 单据数据
        var $dispatchDataTable = $dataTable.find('table');
        var $dispatchDataTableTbody = $dispatchDataTable.find('tbody');
        $.each(data, function (i, row) {
            // 数据预处理
            var $dispatchDataTr = $('<tr>');
            var $dispatchDataTds = '<td>' + row.index + '</td>\n' +
                '<td>' + row.containerCode + '</td>\n' +
                '<td>' + (row.skuId === 0 ? '' : row.skuId) + '</td>\n' +
                '<td>' + (row.ssuId === 0 ? '' : row.ssuId) + '</td>\n' +
                '<td>' + row.name + '</td>\n' +
                '<td>' + row.returnAmountStr + '</td>\n' +
                '<td>' + row.remark + '</td>';
            $dispatchDataTr.append($dispatchDataTds);
            $dispatchDataTableTbody.append($dispatchDataTr);
        });
        return $dataTable;
    }

    function generatePrintFooter(item, $printDeliveredPaperTemplate) {
        var $geDomWrap = $($printDeliveredPaperTemplate.html());
        var $printFooter = $geDomWrap.find('.print-paper-footer');
        $printFooter.find('.ship-user-name').text(item.shipUserName);
        $printFooter.find('.out-warehouse-time').text(item.outWarehouseTimeFormative);
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

    function renderQrCode($qrCodeContainer, text) {
        $qrCodeContainer.empty().qrcode({
            // render method: 'canvas', 'image' or 'div'
            render: 'image',
            // version range somewhere in 1 .. 40
            minVersion: 4,
            maxVersion: 40,

            // error correction level: 'L', 'M', 'Q' or 'H'
            ecLevel: 'H',

            // offset in pixel if drawn onto existing canvas
            left: 0,
            top: 0,
            // size in pixel
            size: 60,
            // code color or image element
            fill: '#000',
            // background color or image element, null for transparent background
            background: '#fff',
            // content
            text: text,
            // corner radius relative to module width: 0.0 .. 0.5
            radius: 0,
            // quiet zone in modules
            quiet: 2,
            // modes
            // 0: normal
            // 1: label strip
            // 2: label box
            // 3: image strip
            // 4: image box
            mode: 0,

            mSize: 0.2,
            mPosX: 0.5,
            mPosY: 0.5,

            label: '',
            fontname: 'sans',
            fontcolor: '#000'
        });
    }
    function renderBarCode($barCodeContainer, text, barcodeConfigOption) {
        var barcodeConfigDefaultOption = {
            format: 'code128',
            width: 1.2,                 //设置条之间的宽度
            height: 40,                 //高度
            displayValue: false,         //是否在条形码下方显示文字
            fontOptions: "bold",        //使文字加粗体或变斜体
            font: "sans-serif",         //设置文本的字体
            text: '',                   //覆盖显示的文本
            textAlign: "center",        //设置文本的水平对齐方式
            textPosition: "bottom",     //设置文本的垂直对齐方式
            textMargin: 0,              //设置条形码和文本之间的间距
            fontSize: 24,               //设置文本的大小
            background: "#fff",         //设置条形码的背景
            lineColor: "#000",          //设置条和文本的颜色。
            margin: 0                   //设置条形码周围的空白边距
        };
        barcodeConfigOption = barcodeConfigOption || barcodeConfigDefaultOption;
        $barCodeContainer.empty().JsBarcode(text, barcodeConfigOption);
    }
});