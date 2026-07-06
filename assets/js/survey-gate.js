(function () {
    var STORAGE_KEY = 'cpx_ext_user_id';
    var isEnglish = document.documentElement.lang === 'en';
    var surveysUrl = isEnglish ? '/en/surveys/' : '/surveys/';

    function readIdFromUrl() {
        var params = new URLSearchParams(window.location.search);
        return params.get('user_id') ||
            params.get('ext_user_id') ||
            params.get('id') ||
            params.get('fid') ||
            '';
    }

    function saveId(id) {
        try {
            localStorage.setItem(STORAGE_KEY, id);
        } catch (err) {
            // Ignore storage errors.
        }
    }

    function getStoredId() {
        try {
            return localStorage.getItem(STORAGE_KEY) || '';
        } catch (err) {
            return '';
        }
    }

    function normalizeId(value) {
        return String(value || '').trim();
    }

    function goToSurveys(userId) {
        saveId(userId);
        window.location.href = surveysUrl + '?user_id=' + encodeURIComponent(userId);
    }

    var modal = document.getElementById('survey-modal');
    if (modal) {
        var form = modal.querySelector('#survey-modal-form');
        var input = modal.querySelector('#survey-user-id');

        function openModal() {
            modal.hidden = false;
            document.body.classList.add('modal-open');
            if (input) {
                input.value = getStoredId();
                input.focus();
            }
        }

        function closeModal() {
            modal.hidden = true;
            document.body.classList.remove('modal-open');
        }

        document.querySelectorAll('[data-survey-open]').forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                openModal();
            });
        });

        modal.querySelectorAll('[data-survey-close]').forEach(function (el) {
            el.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !modal.hidden) {
                closeModal();
            }
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var userId = normalizeId(input.value);
            if (!userId) {
                input.focus();
                return;
            }
            goToSurveys(userId);
        });
    }

    var gate = document.getElementById('survey-gate');
    var widgetWrap = document.getElementById('survey-widget');
    if (!gate || !widgetWrap) {
        return;
    }

    var gateForm = gate.querySelector('#survey-gate-form');
    var gateInput = gate.querySelector('#survey-user-id');

    function showSurveys(userId) {
        saveId(userId);
        gate.hidden = true;
        widgetWrap.hidden = false;
        if (window.initCpxSurveys) {
            window.initCpxSurveys(userId);
        }
    }

    gateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var userId = normalizeId(gateInput.value);
        if (!userId) {
            gateInput.focus();
            return;
        }

        var url = new URL(window.location.href);
        url.searchParams.set('user_id', userId);
        window.history.replaceState({}, '', url);
        showSurveys(userId);
    });

    var urlId = normalizeId(readIdFromUrl());
    var storedId = normalizeId(getStoredId());
    var userId = urlId || storedId;

    if (userId) {
        if (urlId) {
            saveId(urlId);
        }
        if (gateInput) {
            gateInput.value = userId;
        }
        showSurveys(userId);
    } else if (gateInput) {
        gateInput.focus();
    }
})();
