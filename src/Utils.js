import {differenceInMinutes, formatDistance, parse} from 'date-fns';
import {notification} from "antd";

let viLocale = require('date-fns/locale/vi');
const accounting = require('accounting');


export const getUrlParam = function (paramName) {
    let Url = new URL(window.location.href);
    return Url.searchParams.get(paramName);
};

export const getUrlParam_2 = function (variable) {
    var query = window.location.search.substring(1);
    console.log(query)//"app=article&act=news_content&aid=160990"
    var vars = query.split("&");
    console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

export const formatMoney = function (money) {
    return accounting.formatMoney(money, {
        symbol: ' đ',
        thousand: '.',
        format: '%v%s',
        precision: 0
    });
};
export const format_Number = function (number) {
    return accounting.formatNumber(number, {
        symbol: '',
        thousand: ',',
        format: '%v%s',
        precision: 2
    });
};
export const format_Number_int = function (number) {
    return accounting.formatNumber(number, {
        symbol: '',
        thousand: ',',
        format: '%v%s',
        precision: 0
    });
};

export const locale = "vi-vn";
export const currencyFormatter = value => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "VND"
    }).format(value);
};

export const percentFormatter = value => {
    return `${value} %`
};

export const pointFormatter = value => {
    return accounting.formatMoney(value, {
        symbol: ' ₫',
        thousand: '.',
        format: '%v%s',
        precision: 0
    });
};



export const currencyParser = val => {
    try {
        // for when the input gets clears
        if (typeof val === "string" && !val.length) {
            // val = "0.0";
            val = "0";
        }

        // detecting and parsing between comma and dot
        var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
        var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
        var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
        reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
        //  => 1232.21 €

        // removing everything except the digits and dot
        reversedVal = reversedVal.replace(/[^0-9.]/g, "");
        //  => 1232.21

        // appending digits properly
        const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
        const needsDigitsAppended = digitsAfterDecimalCount > 2;

        if (needsDigitsAppended) {
            reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
        }

        return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
        console.error(error);
    }
};

export const change_alias = (alias) => {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    return str;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

export function input_isNumeric(new_value, old_value) {
    if (new_value !== null && new_value !== '') {
        if (isNumeric(new_value)) {
            return new_value
        } else {
            return old_value
        }
    } else {
        return ''
    }
}

export function showMessage(type, title, content) {
    switch (type) {
        case 'info':
            notification.info({
                message: title,
                description: content,
                placement: 'bottomRight'
            });
            break
        case 'success':
            notification.success({
                message: title,
                description: content,
                placement: 'bottomRight'
            });
            break
        case 'error':
            notification.error({
                message: title,
                description: content,
                placement: 'bottomRight'
            });
            break
        case 'warning':
            notification.warning({
                message: title,
                description: content,
                placement: 'bottomRight'
            });
            break
        case 'warn':
            notification.warn({
                message: title,
                description: content,
                placement: 'bottomRight'
            });
            break
        case 'open':
            notification.open({
                message: title,
                description: content,
                placement: 'bottomRight'
            });
            break
        case 'close':
            notification.close(content);
            break
        case 'destroy':
            notification.destroy();
            break
    }
}

export const getRandomColorRange = (numberOfTables) => {
    let colors = [];
    for (let i = 0; i < numberOfTables; i++) {
        let r = getRandomInt(0, 255);
        let g = getRandomInt(0, 255);
        let b = getRandomInt(0, 255);
        colors.push(`rgb(${r},${g},${b})`)
    }

    return colors
}

export const getRandomColor = (table_id) => {
    let r = getRandomInt(0, 255);
    let g = getRandomInt(0, 255);
    let b = getRandomInt(0, 255);
    return {
        id: table_id,
        color: `rgb(${r},${g},${b})`
    }
}

export const uuidv4 = function () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

export const getTimeAgo = function (datetimeString) {
    let time = parse(
        datetimeString,
        'dd/MM/yyyy HH:mm:ss',
        new Date()
    );
    return formatDistance(time, new Date(), {includeSeconds: true, locale: viLocale});
};

export const convertStringToDate = function (stringDate) {
    return parse(
        stringDate,
        'dd/MM/yyyy HH:mm:ss',
        new Date());
};

export const getColor = function (time, maxMinutes) {
    let percentColors = [
        {pct: 0.0, color: {r: 0xff, g: 0x00, b: 0}},
        {pct: 0.5, color: {r: 0xff, g: 0xff, b: 0}},
        {pct: 1.0, color: {r: 0x00, g: 0xff, b: 0}}];


    let differenceInMin = Math.abs(differenceInMinutes(time, new Date()));
    // lay percent so voi maxMinutes
    let pct = differenceInMin >= maxMinutes ? 0 : 1 - ((differenceInMin / maxMinutes));
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    // console.log(differenceInMin)
    let lower = percentColors[i - 1];
    let upper = percentColors[i];
    let range = upper.pct - lower.pct;
    let rangePct = (pct - lower.pct) / range;
    let pctLower = 1 - rangePct;
    let pctUpper = rangePct;
    // return {
    //     r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    //     g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    //     b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    // };

    let color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';

    // return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // var getColorForPercentage = function(pct) {
    //     for (var i = 1; i < percentColors.length - 1; i++) {
    //         if (pct < percentColors[i].pct) {
    //             break;
    //         }
    //     }
    //     var lower = percentColors[i - 1];
    //     var upper = percentColors[i];
    //     var range = upper.pct - lower.pct;
    //     var rangePct = (pct - lower.pct) / range;
    //     var pctLower = 1 - rangePct;
    //     var pctUpper = rangePct;
    //     var color = {
    //         r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    //         g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    //         b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    //     };
    //     return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    //     // or output as hex if preferred
    // }
};


export function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

export function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return '#'+("00000".substring(0, 6 - c.length) + c);
}
