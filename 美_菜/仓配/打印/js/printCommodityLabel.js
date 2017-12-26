$(function () {

    var testData = [
        {
            "xrLabRow3_1": {
                "value": ""
            },
            "xrLabRow4_1": {
                "value": ""
            },
            "fileName": {
                "value": "StandardPrint.txt"
            },
            "xrLabRow1_1": {
                "value": ""
            },
            "xrLabRow2_1": {
                "value": "美菜 MEICAI.CN   [商品签]"
            },
            "printNum": {
                "value": "1"
            },
            "xrPictureBox1": {
                "value": "s5330612189"
            },
            "xrLabRow7_1": {
                "value": "33061-测试数据信息"
            },
            "xrLabRow8_1": {
                "value": "李显奇 2017-12-17 18:51:54"
            },
            "xrLabRow6_1": {
                "value": "2189-福临门玉米油|箱(4桶*5L)"
            }
        },
        {
            "xrLabRow3_1": {
                "value": ""
            },
            "xrLabRow4_1": {
                "value": ""
            },
            "fileName": {
                "value": "StandardPrint.txt"
            },
            "xrLabRow1_1": {
                "value": ""
            },
            "xrLabRow2_1": {
                "value": "美菜 MEICAI.CN   [商品签]"
            },
            "printNum": {
                "value": "1"
            },
            "xrPictureBox1": {
                "value": "s5330612189"
            },
            "xrLabRow7_1": {
                "value": "33061-测试数据信息"
            },
            "xrLabRow8_1": {
                "value": "李显奇 2017-12-17 18:51:54"
            },
            "xrLabRow6_1": {
                "value": "2189-福临门玉米油|箱(4桶*5L)"
            }
        }
    ];

    renderPrintPaper(testData, $('.print-list-wrap'), $('.print-paper-template'));

    function renderPrintPaper(printData, $printListWrap, $printPaperTemplate) {

        $.each(printData, function (i, item) {
            var $geDomWrap = $($printPaperTemplate.html());
            var $geDomWrapTemplate = $($printPaperTemplate.html());
            var $printPaperContent = $geDomWrap.find('.print-paper-content').empty();

            // 头部
            var $printHeader = $geDomWrapTemplate.find('.print-paper-header').empty();
            var $printHeaderGenerate = generatePrintHeader(item, $printPaperTemplate);
            $printHeader.replaceWith($printHeaderGenerate);

            // 身子
            var $printBody = $geDomWrapTemplate.find('.print-paper-body').empty();
            var $printBodyGenerate = generatePrintBody(item, $printPaperTemplate);
            $printBody.replaceWith($printBodyGenerate);

            // 脚部
            var $printFooter = $geDomWrapTemplate.find('.print-paper-footer').empty();
            var $printFooterGenerate = generatePrintFooter(item, $printPaperTemplate);
            $printFooter.replaceWith($printFooterGenerate);

            $printPaperContent.replaceWith($geDomWrapTemplate.find('.print-paper-content'));

            $printListWrap.append($geDomWrap);
        });
    }

    function generatePrintHeader(item, $printPaperTemplate) {
        var $geDomWrap = $($printPaperTemplate.html());
        var $printHeader = $geDomWrap.find('.print-paper-header');
        // 二维码
        var $qrcodeWrap = $printHeader.find('.qrcode-wrap');
        renderQrCode($qrcodeWrap.find('.qrcode-show'), item.xrPictureBox1.value);

        $printHeader.find('.title-content').text(item.xrLabRow2_1.value);
        $printHeader.find('.qrcode-text').text(item.xrPictureBox1.value);

        return $printHeader;
    }

    function generatePrintBody(item, $printPaperTemplate) {
        var $geDomWrap = $($printPaperTemplate.html());
        var $printBody = $geDomWrap.find('.print-paper-body');
        $printBody.find('.sku-info').text(item.xrLabRow6_1.value);
        $printBody.find('.supplier-info').text(item.xrLabRow7_1.value);
        return $printBody;
    }

    function generatePrintFooter(item, $printPaperTemplate) {
        var $geDomWrap = $($printPaperTemplate.html());
        var $printFooter = $geDomWrap.find('.print-paper-footer');
        $printFooter.find('.printer-info').text(item.xrLabRow8_1.value);
        return $printFooter;
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
            size: 80,
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
});