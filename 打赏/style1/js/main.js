jQuery(document).ready(function () {
    var QRBox = $('#QRBox');
    var MainBox = $('#MainBox');
    var QQPayQR = 'image/payMethod/payByQQPay.png'; // 二维码路径
    var AliPayQR = 'image/payMethod/payByAlipay.png';
    var WeChanQR = 'image/payMethod/payByWeChat.png';


    function showQR(QR) {
        if (QR) {
            MainBox.css('background-image', 'url(' + QR + ')');
        }
        $('#DonateText,#donateBox,#github').addClass('blur');
        QRBox.fadeIn(300, function (argument) {
            MainBox.addClass('showQR');
        });
    }

    $('#donateBox>li').click(function (event) {
        var thisID = $(this).attr('id');
        if (thisID === 'QQPayQR') {
            showQR(QQPayQR);
            // new Clipboard('#BTCBn');
        } else if (thisID === 'AliPay') {
            showQR(AliPayQR);
        } else if (thisID === 'WeChat') {
            showQR(WeChanQR);
        }
    });

    MainBox.click(function (event) {
        MainBox.removeClass('showQR').addClass('hideQR');
        setTimeout(function (a) {
            QRBox.fadeOut(300, function (argument) {
                MainBox.removeClass('hideQR');
            });
            $('#DonateText,#donateBox,#github').removeClass('blur');
        }, 600);

    });
});
