var rule = {
    title: '盘他',
    host: 'https://panso.pro',
    searchUrl: '/search?exact=false&page=fypage&q=**&share_time=&type=&user=',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'PC_UA',
    },
    timeout: 5000,
    play_parse: true,
    class_name:'🦢免费观看此资源🦢',
	class_url:'🦢免费观看此资源🦢',
	
    lazy: $js.toString(() => {
        let url = input.startsWith('push://') ? input : 'push://' + input;
        input = {parse: 0, url: url};
    }),
    一级: '',
    二级: $js.toString(() => {
        VOD = {};
        VOD.vod_id = input;
        let html = request(input);
        let title = pdfh(html, 'h1&&Text');
        let share_url = pdfh(html, '.semi-typography-link:eq(-1)&&a&&href');
        let share_type = pdfh(html, '.semi-descriptions-value:eq(3)&&Text');
        VOD.vod_name = title;
        VOD.vod_pic = '';
        VOD.content = share_url;
        VOD.vod_remarks = pdfh(html, '.semi-descriptions-value&&Text');
        VOD.vod_play_from = '点击下方播放';
        VOD.vod_play_url = share_type + '$' + 'push://' + share_url;
    }),
    搜索: $js.toString(() => {
        let html = request(input);
        let data = pdfa(html, '.rm-search-content&&.semi-space-vertical');
        let d = [];
        data.forEach(it => {
            d.push({
                title: pdfh(it, 'a&&title'),
                desc: pdfh(it, 'span:eq(3)&&Text') + '|' + pdfh(it, 'span:eq(-1)&&Text'),
                img: "",
                url: pd(it, 'a&&href', MY_URL)
            });

        });
        setResult(d);
    }),
}