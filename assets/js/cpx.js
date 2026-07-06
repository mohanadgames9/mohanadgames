(function () {
    var loaded = false;

    window.initCpxSurveys = function (userId) {
        var appId = document.body.dataset.cpxAppId;
        var id = String(userId || '').trim();

        if (!appId || !id || loaded) {
            return;
        }

        loaded = true;

        var script1 = {
            div_id: 'cpx-surveys',
            theme_style: 1,
            order_by: 2,
            limit_surveys: 8
        };

        window.config = {
            general_config: {
                app_id: parseInt(appId, 10),
                ext_user_id: id,
                email: '',
                username: '',
                secure_hash: '',
                subid_1: '',
                subid_2: ''
            },
            style_config: {
                text_color: '#e8ecf4',
                survey_box: {
                    topbar_background_color: '#5b8def',
                    box_background_color: '#141b28',
                    rounded_borders: true,
                    stars_filled: '#5b8def'
                }
            },
            script_config: [script1],
            debug: false,
            useIFrame: true,
            iFramePosition: 1,
            functions: {}
        };

        if (document.querySelector('script[data-cpx-tag]')) {
            return;
        }

        var tag = document.createElement('script');
        tag.src = 'https://cdn.cpx-research.com/assets/js/script_tag_v2.0.js';
        tag.dataset.cpxTag = '1';
        document.body.appendChild(tag);
    };
})();
