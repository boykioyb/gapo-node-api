
let request = require('request');
var rp = require('request-promise');
let queryString = require('query-string');

exports.home = (req, res) => {
    let base = "https://m.facebook.com/";
    let path = "typeahead/search/facebar/bootstrap/?";
    let query = {
        m_sess : '',
        fb_dtsg_ag : 'AQztUat7Vj8N-vwKyMScyCfGdmuQuue-5ZrPG3ybE5SzUA%3AAQxezUfpdGxGJ7QTfTx1jsWD640WOqlo8NtjrhvPraciIA',
        jazoest : '28313',
        __dyn : '1KQdAmm1gxu4U46AeGh28sXBgS5UqxKcwRwAxu3-U6C7UW1DxW4E2qxK4ohwmUkwdK4o29wmU1a852q3q5U2nweS787S78Ki2S3G1Qzaw5KzHzo5i1CwgE7e1gwwyo36wqobFE8Ejw',
        __req:'1',
        __ajax__: 'AYk-KkWdnZUq9a64uC_Du4TttPLcqLC1D8_ffR9mON9mwn3EONzxWuQYk2ACPnYeO0cqGi03lYOlkeKcCu4ka3xwU8CcB-3jB1Va3rkvz1UtRw',
        __a: 'AYk-KkWdnZUq9a64uC_Du4TttPLcqLC1D8_ffR9mON9mwn3EONzxWuQYk2ACPnYeO0cqGi03lYOlkeKcCu4ka3xwU8CcB-3jB1Va3rkvz1UtRw',
        __user: '100006623086603'
    };
    console.log(base + path + queryString.stringify(query));
    let parse = rp({
        url: base + path + queryString.stringify(query),
        method: 'GET',
        resolveWithFullResponse: true,
        json: true
    });
    parse.then((htmlString) => {
        return htmlString.body;
    });

    res.send(parse);

}