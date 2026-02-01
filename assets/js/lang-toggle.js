(function () {
    var toggle = document.getElementById('lang-toggle');
    if (!toggle) {
        return;
    }
    var root = document.documentElement;

    function applyLang(lang) {
        var useEnglish = lang === 'en';
        root.setAttribute('lang', useEnglish ? 'en' : 'ar');
        root.setAttribute('dir', useEnglish ? 'ltr' : 'rtl');
        toggle.textContent = useEnglish ? 'العربية' : 'English';
        toggle.setAttribute('aria-pressed', useEnglish ? 'true' : 'false');
        toggle.setAttribute('aria-label', useEnglish ? 'التبديل إلى العربية' : 'Switch to English');
        try {
            localStorage.setItem('lang', useEnglish ? 'en' : 'ar');
        } catch (err) {
            // Ignore storage errors.
        }

        var images = document.querySelectorAll('[data-alt-ar][data-alt-en]');
        images.forEach(function (img) {
            img.setAttribute('alt', img.getAttribute(useEnglish ? 'data-alt-en' : 'data-alt-ar'));
        });

        document.title = useEnglish ? 'Mohanad Games | Game Development Studio' : 'ألعاب مهند | استديو تطوير ألعاب';
    }

    var stored = null;
    try {
        stored = localStorage.getItem('lang');
    } catch (err) {
        stored = null;
    }

    var defaultLang = root.getAttribute('lang') === 'en' ? 'en' : 'ar';
    var nextLang = stored === 'en' || stored === 'ar' ? stored : defaultLang;
    applyLang(nextLang);
    toggle.addEventListener('click', function () {
        applyLang(root.getAttribute('lang') === 'ar' ? 'en' : 'ar');
    });
})();
