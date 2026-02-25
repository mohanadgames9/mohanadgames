(function () {
    var toggle = document.getElementById('lang-toggle');
    if (!toggle) {
        return;
    }
    var root = document.documentElement;
    var seoByLang = {
        ar: {
            title: 'شركة برمجة ألعاب | تطوير ألعاب موبايل - Mohanad Games',
            description: 'Mohanad Games شركة برمجة ألعاب متخصصة في تطوير ألعاب الموبايل: تصميم، برمجة، اختبار ونشر ألعاب بجودة عالية.'
        },
        en: {
            title: 'Game Development Company | Mobile Game Development - Mohanad Games',
            description: 'Mohanad Games is a game development company focused on mobile game development, from concept and design to programming, testing, and launch.'
        }
    };

    function setMetaContent(selector, value) {
        var element = document.querySelector(selector);
        if (element) {
            element.setAttribute('content', value);
        }
    }

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

        var selectedSeo = seoByLang[useEnglish ? 'en' : 'ar'];
        document.title = selectedSeo.title;
        setMetaContent('meta[name="description"]', selectedSeo.description);
        setMetaContent('meta[property="og:title"]', selectedSeo.title);
        setMetaContent('meta[property="og:description"]', selectedSeo.description);
        setMetaContent('meta[name="twitter:title"]', selectedSeo.title);
        setMetaContent('meta[name="twitter:description"]', selectedSeo.description);
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
