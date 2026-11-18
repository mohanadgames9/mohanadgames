(function () {
    "use strict";

    // Optional: Add your Google Analytics 4 Measurement ID (e.g. "G-XXXXXXXXXX") to enable GA4 automatically across all pages.
    var GA4_MEASUREMENT_ID = "";

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    if (GA4_MEASUREMENT_ID && /^G-[A-Z0-9]+$/i.test(GA4_MEASUREMENT_ID)) {
        var gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_MEASUREMENT_ID);
        document.head.appendChild(gaScript);
        gtag("js", new Date());
        gtag("config", GA4_MEASUREMENT_ID);
    }

    function trackEvent(eventName, params) {
        try {
            gtag("event", eventName, params || {});
        } catch (e) {
            // Ignore analytics errors
        }
    }

    // Track store download button clicks
    document.addEventListener("click", function (e) {
        var link = e.target.closest("a[data-store]");
        if (!link) return;
        trackEvent("store_click", {
            store: link.getAttribute("data-store"),
            game: link.getAttribute("data-game") || "studio",
            placement: link.getAttribute("data-placement") || "page",
            page_path: window.location.pathname
        });
    });

    // Screenshot Lightbox
    var shotButtons = document.querySelectorAll("[data-lightbox-src]");
    if (shotButtons.length > 0) {
        var dialog = document.getElementById("shot-lightbox");
        if (dialog && typeof dialog.showModal === "function") {
            var fullImg = dialog.querySelector("[data-lightbox-img]");
            var captionEl = dialog.querySelector("[data-lightbox-caption]");
            var closeBtn = dialog.querySelector("[data-lightbox-close]");

            shotButtons.forEach(function (btn) {
                btn.addEventListener("click", function () {
                    fullImg.src = btn.getAttribute("data-lightbox-src");
                    fullImg.alt = btn.getAttribute("data-lightbox-alt") || "";
                    if (captionEl) {
                        captionEl.textContent = btn.getAttribute("data-lightbox-alt") || "";
                    }
                    dialog.showModal();
                    trackEvent("screenshot_view", { src: fullImg.src });
                });
            });

            if (closeBtn) {
                closeBtn.addEventListener("click", function () {
                    dialog.close();
                });
            }

            dialog.addEventListener("click", function (ev) {
                if (ev.target === dialog) {
                    dialog.close();
                }
            });
        }
    }

    // Interactive Quiz Datasets
    var QUIZZES = {
        home: {
            title: "تحدي فطحل سوريا السريع",
            playStore: "https://play.google.com/store/apps/details?id=com.fathalsyria.app&referrer=utm_source%3Dmohanadgames.com%26utm_medium%3Dquiz%26utm_campaign%3Dhome_quiz",
            appStore: "https://apps.apple.com/us/app/%D9%81%D8%B7%D8%AD%D9%84-%D8%B3%D9%88%D8%B1%D9%8A%D8%A7/id6797496747?ct=mohanadgames_home_quiz&mt=8",
            questions: [
                {
                    category: "ذاكرة المسلسلات السورية",
                    q: "في مسلسل «ضيعة ضايعة»، ما اسم الضيعة التي تدور فيها مغامرات أسعد وجودة؟",
                    options: ["أم الطنافس الفوقا", "كفر قوق", "حارة الضبع", "تشرين التحتا"],
                    answer: 0,
                    explain: "أحداث المسلسل تدور في الضيعة الساحلية المتخيلة «أم الطنافس الفوقا» وجارتها «التحتا»."
                },
                {
                    category: "أكمل المثل السوري",
                    q: "أكمل المثل الشعبي الشهير: «طب الجرة على ___ بتطلع البنت لأمها»",
                    options: ["راسها", "تمها", "إيدها", "جنبها"],
                    answer: 1,
                    explain: "«طب الجرة على تمها بتطلع البنت لأمها» من أشهر الأمثال الشامية الموجودة في تحديات فطحل سوريا."
                },
                {
                    category: "نجوم الشاشة السورية",
                    q: "من هو الفنان القدير الذي أدّى شخصية «حسني البورظان» في مسلسل «صح النوم»؟",
                    options: ["نهاد قلعي", "ناجي جبر", "ياسين بقوش", "رفيق سبيعي"],
                    answer: 0,
                    explain: "الفنان الراحل نهاد قلعي هو صاحب شخصية «حسني البورظان» إلى جانب دريد لحام (غوار الطوشة)."
                },
                {
                    category: "كلاسيكيات الدراما",
                    q: "من أخرج ثلاثية «الفصول الأربعة» و«الزير سالم» و«التغريبة الفلسطينية»؟",
                    options: ["حاتم علي", "بسام الملا", "نجدة إسماعيل أنزور", "الليث حجو"],
                    answer: 0,
                    explain: "المخرج السوري الراحل حاتم علي هو مخرج هذه الأعمال الخالدة في ذاكرة التلفاز العربي."
                },
                {
                    category: "كوميديا لا تُنسى",
                    q: "من أدّى دور الزوج الغيور «جميل» في المسلسل الشهير «جميل وهناء»؟",
                    options: ["بسام كوسا", "أيمن زيدان", "سلوم حداد", "عابد فهد"],
                    answer: 1,
                    explain: "النجم أيمن زيدان أدّى دور «جميل» بمشاركة نورمان أسعد والقديرة سامية الجزائري (أم محمود)."
                }
            ]
        },
        series: {
            title: "اختبار ذاكرة المسلسلات السورية",
            playStore: "https://play.google.com/store/apps/details?id=com.fathalsyria.app&referrer=utm_source%3Dmohanadgames.com%26utm_medium%3Dquiz%26utm_campaign%3Dseries_quiz",
            appStore: "https://apps.apple.com/us/app/%D9%81%D8%B7%D8%AD%D9%84-%D8%B3%D9%88%D8%B1%D9%8A%D8%A7/id6797496747?ct=mohanadgames_series_quiz&mt=8",
            questions: [
                {
                    category: "ضيعة ضايعة",
                    q: "من هو الفنان الذي جسّد شخصية «جودة أبو خميس» رفيق أسعد في «ضيعة ضايعة»؟",
                    options: ["نضال سيجري", "باسم ياخور", "جرجس جبارة", "زهير عبد الكريم"],
                    answer: 0,
                    explain: "الراحل نضال سيجري أبدع في دور «جودة أبو خميس» إلى جانب باسم ياخور في دور «أسعد خشوف»."
                },
                {
                    category: "باب الحارة",
                    q: "من أدّى شخصية «الإدعشري» في الجزء الأول من مسلسل «باب الحارة»؟",
                    options: ["عباس النوري", "بسام كوسا", "سامر المصري", "سليم كلاس"],
                    answer: 1,
                    explain: "بسام كوسا قدّم أداءً استثنائياً لشخصية «الإدعشري» في الجزء الأول."
                },
                {
                    category: "الكوميديا الناقدة",
                    q: "ما اسم السلسلة الكوميدية الناقدة الشهيرة التي ارتبطت بالفنان ياسر العظمة منذ عام 1982؟",
                    options: ["بقعة ضوء", "مرايا", "عيلة 5 نجوم", "حمام القيشاني"],
                    answer: 1,
                    explain: "سلسلة «مرايا» للفنان ياسر العظمة تُعد من أطول وأشهر السلاسل الكوميدية الناقدة عربياً."
                },
                {
                    category: "الخربة",
                    q: "في مسلسل «الخربة»، ما اسما العائلتين المتنافستين في القرية؟",
                    options: ["بو قعقور وبو مالحة", "أبو عصام وأبو شهاب", "آل خميس وآل خشوف", "بيت جابر وبيت عامر"],
                    answer: 0,
                    explain: "دارت المنافسات الطريفة في «الخربة» بين عائلتي «بو قعقور» (دريد لحام) و«بو مالحة» (رشيد عساف)."
                },
                {
                    category: "الدراما التاريخية",
                    q: "من جسّد شخصية «الزير سالم (عدي بن ربيعة)» في المسلسل الشهير عام 2000؟",
                    options: ["سلوم حداد", "عابد فهد", "جهاد سعد", "رشيد عساف"],
                    answer: 0,
                    explain: "سلوم حداد قدّم واحداً من أشهر أدواره التاريخية بشخصية «الزير سالم»."
                },
                {
                    category: "جميل وهناء",
                    q: "ما اسم الجارة التي كانت تخطط مع جميل لإثارة غيرة زوجته هناء (أدّتها سامية الجزائري)؟",
                    options: ["أم أحمد", "أم محمود", "أم زكي", "فطوم"],
                    answer: 1,
                    explain: "القديرة سامية الجزائري أدّت شخصية الجارة «أم محمود» بخفة ظل خالدة."
                },
                {
                    category: "عيلة 5 نجوم",
                    q: "من أدّت دور «سمر» ابنة أم أحمد الكبرى في مسلسل «عيلة 5 نجوم»؟",
                    options: ["أمل عرفة", "شكران مرتجى", "كاريس بشار", "سلافة معمار"],
                    answer: 0,
                    explain: "النجمة أمل عرفة أدّت شخصية «سمر» إلى جانب سامية الجزائري وأندريه سكاف وفارس الحلو."
                },
                {
                    category: "أحلام أبو الهنا",
                    q: "من لعب دور البطولة بشخصية «أبو الهنا» المواطن الدمشقي البسيط؟",
                    options: ["دريد لحام", "أيمن رضا", "حسن دكاك", "عصام عبه جي"],
                    answer: 0,
                    explain: "دريد لحام جسّد شخصية «أبو الهنا» بمشاركة سامية الجزائري وفارس الحلو."
                }
            ]
        },
        proverbs: {
            title: "تحدي الأمثال الشعبية السورية",
            playStore: "https://play.google.com/store/apps/details?id=com.fathalsyria.app&referrer=utm_source%3Dmohanadgames.com%26utm_medium%3Dquiz%26utm_campaign%3Dproverbs_quiz",
            appStore: "https://apps.apple.com/us/app/%D9%81%D8%B7%D8%AD%D9%84-%D8%B3%D9%88%D8%B1%D9%8A%D8%A7/id6797496747?ct=mohanadgames_proverbs_quiz&mt=8",
            questions: [
                {
                    category: "أمثال البيت الشامي",
                    q: "أكمل المثل: «طب الجرة على ___ بتطلع البنت لأمها»",
                    options: ["تمها", "جنبها", "إيدها", "كتفها"],
                    answer: 0,
                    explain: "يُضرب في تشابه طباع البنت مع أمها."
                },
                {
                    category: "أمثال الحكمة",
                    q: "أكمل المثل: «اللي ما بيعرف الصقر ___»",
                    options: ["بيشويه", "بيبيعه", "بيتركه", "بيصيده"],
                    answer: 0,
                    explain: "يُضرب لمن يجهل قيمة الشيء الثمين أو الشخص الكفؤ."
                },
                {
                    category: "أمثال التجربة",
                    q: "أكمل المثل: «اللي بياكل العصي مو متل اللي ___»",
                    options: ["بيعدها", "بيشوفها", "بيكسرها", "بيحملها"],
                    answer: 0,
                    explain: "يُقال للتفريق بين من يعاني المشكلة فعلاً ومن يكتفي بالتفرج والتنظير."
                },
                {
                    category: "أمثال الجيرة",
                    q: "أكمل المثل المأثور: «الجار قبل ___»",
                    options: ["الدار", "المال", "السوق", "الباب"],
                    answer: 0,
                    explain: "يؤكد أهمية السؤال عن الجار الطيب قبل شراء البيت أو السكن فيه."
                },
                {
                    category: "أمثال الأصالة",
                    q: "أكمل المثل: «خود الأصيلة ولو كانت ع ___»",
                    options: ["الحصيرة", "الجزيرة", "البحيرة", "السريرة"],
                    answer: 0,
                    explain: "يُضرب لتفضيل الأصل الطيب والأخلاق الكريمة على المظاهر والمال."
                },
                {
                    category: "أمثال السرعة والفرص",
                    q: "أكمل المثل: «دق الحديد وهو ___»",
                    options: ["حامي", "قاسي", "بارد", "طويل"],
                    answer: 0,
                    explain: "يحثّ على اغتنام الفرصة في وقتها المناسب قبل فوات الأوان."
                }
            ]
        }
    };

    function getRankLabel(score, total) {
        var ratio = score / total;
        if (ratio === 1) return "فطحل من الطراز الرفيع! ذاكرتك حديدية";
        if (ratio >= 0.75) return "ذاكرة ذهبية! خبير بالدراما والتراث السوري";
        if (ratio >= 0.5) return "بداية حلوة! عندك مخزون طيب بس بتقدر تجيب أعلى";
        return "يبدو إنك بحاجة لتنشيط الذاكرة بجولة في فطحل سوريا!";
    }

    document.querySelectorAll("[data-quiz]").forEach(function (container) {
        var quizKey = container.getAttribute("data-quiz");
        var quiz = QUIZZES[quizKey];
        if (!quiz) return;

        var index = 0;
        var score = 0;
        var timeLeft = 12;
        var timerId = null;
        var answered = false;

        function clearTimer() {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
            }
        }

        function renderQuestion() {
            clearTimer();
            answered = false;
            timeLeft = 12;
            var item = quiz.questions[index];
            var total = quiz.questions.length;
            var progressPct = Math.round((index / total) * 100);

            var timerBadge = index === 0
                ? '<span class="quiz-pill quiz-timer">تحدي السرعة</span>'
                : '<span class="quiz-pill quiz-timer" data-timer>' + timeLeft + " ث</span>";

            container.innerHTML =
                '<div class="quiz-topbar">' +
                    '<span class="quiz-pill">السؤال ' + (index + 1) + " من " + total + "</span>" +
                    '<span class="quiz-pill">النقاط: ' + score + "</span>" +
                    timerBadge +
                "</div>" +
                '<div class="quiz-progress"><div class="quiz-progress-bar" style="width:' + progressPct + '%"></div></div>' +
                '<span class="quiz-category">' + item.category + "</span>" +
                '<h3 class="quiz-question">' + item.q + "</h3>" +
                '<div class="quiz-options"></div>' +
                '<div class="quiz-feedback" hidden data-feedback></div>';

            var optionsWrap = container.querySelector(".quiz-options");
            var timerEl = container.querySelector("[data-timer]");

            item.options.forEach(function (optText, optIdx) {
                var btn = document.createElement("button");
                btn.type = "button";
                btn.className = "quiz-option";
                btn.textContent = optText;
                btn.addEventListener("click", function () {
                    handleSelect(optIdx);
                });
                optionsWrap.appendChild(btn);
            });

            if (index > 0) {
                timerId = setInterval(function () {
                    timeLeft -= 1;
                    if (timerEl) {
                        timerEl.textContent = timeLeft + " ث";
                        if (timeLeft <= 4) timerEl.classList.add("is-low");
                    }
                    if (timeLeft <= 0) {
                        clearTimer();
                        handleSelect(-1);
                    }
                }, 1000);
            }
        }

        function handleSelect(choiceIdx) {
            if (answered) return;
            answered = true;
            clearTimer();

            if (index === 0) {
                trackEvent("quiz_start", { quiz: quizKey });
            }

            var item = quiz.questions[index];
            var buttons = container.querySelectorAll(".quiz-option");
            var isCorrect = choiceIdx === item.answer;
            if (isCorrect) score += 1;

            buttons.forEach(function (btn, idx) {
                btn.disabled = true;
                if (idx === item.answer) {
                    btn.classList.add("is-correct");
                } else if (idx === choiceIdx) {
                    btn.classList.add("is-wrong");
                }
            });

            var feedback = container.querySelector("[data-feedback]");
            var statusLabel = choiceIdx === -1
                ? "انتهى الوقت!"
                : (isCorrect ? "إجابة صحيحة!" : "إجابة غير صحيحة!");
            var nextLabel = index + 1 < quiz.questions.length ? "السؤال التالي ←" : "عرض النتيجة النهائية";

            feedback.hidden = false;
            feedback.innerHTML =
                "<div><strong>" + statusLabel + "</strong> " + item.explain + "</div>" +
                '<button type="button" class="btn btn-primary" data-next>' + nextLabel + "</button>";

            feedback.querySelector("[data-next]").addEventListener("click", function () {
                index += 1;
                if (index < quiz.questions.length) {
                    renderQuestion();
                } else {
                    renderResult();
                }
            });
        }

        function renderResult() {
            clearTimer();
            var total = quiz.questions.length;
            var rankText = getRankLabel(score, total);
            var shareUrl = window.location.href.split("#")[0];
            var shareText = "حققت " + score + " من " + total + " في «" + quiz.title + "»! هل تقدر تكسر رقمي؟ جرب الآن: " + shareUrl;
            var waHref = "https://wa.me/?text=" + encodeURIComponent(shareText);

            trackEvent("quiz_complete", { quiz: quizKey, score: score, total: total });

            container.innerHTML =
                '<div class="quiz-result">' +
                    '<div class="quiz-score-ring">' + score + "/" + total + "</div>" +
                    "<h3>" + rankText + "</h3>" +
                    "<p>هذا مجرد نموذج مصغّر! في تطبيق <strong>فطحل سوريا</strong> تنتظرك مئات المشاهد بالصور، مسابقة يومية متجددة، ولوحة متصدرين مع لاعبين من كل مكان.</p>" +
                    '<div class="actions actions-center">' +
                        '<a class="btn btn-whatsapp" href="' + waHref + '" target="_blank" rel="noopener" data-share-wa>تحدَّ أصدقاءك على واتساب</a>' +
                        '<button type="button" class="btn btn-secondary" data-copy-score>نسخ النتيجة</button>' +
                        '<button type="button" class="btn btn-secondary" data-retry>أعد التحدي</button>' +
                    "</div>" +
                    '<div class="quiz-result-cta">' +
                        "<p><strong>جاهز للمنافسة الحقيقية ودخول لوحة المتصدرين؟</strong> حمّل اللعبة مجاناً الآن:</p>" +
                        '<div class="actions actions-center">' +
                            '<a class="btn btn-primary" href="' + quiz.playStore + '" target="_blank" rel="noopener" data-store="google_play" data-game="fathal_syria" data-placement="quiz_result">تحميل من Google Play</a>' +
                            '<a class="btn btn-store" href="' + quiz.appStore + '" target="_blank" rel="noopener" data-store="app_store" data-game="fathal_syria" data-placement="quiz_result">تحميل من App Store</a>' +
                        "</div>" +
                    "</div>" +
                "</div>";

            var waBtn = container.querySelector("[data-share-wa]");
            if (waBtn) {
                waBtn.addEventListener("click", function () {
                    trackEvent("quiz_share", { quiz: quizKey, method: "whatsapp" });
                });
            }

            var copyBtn = container.querySelector("[data-copy-score]");
            if (copyBtn) {
                copyBtn.addEventListener("click", function () {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(shareText).then(function () {
                            copyBtn.textContent = "تم نسخ التحدي!";
                        });
                    }
                    trackEvent("quiz_share", { quiz: quizKey, method: "copy" });
                });
            }

            container.querySelector("[data-retry]").addEventListener("click", function () {
                index = 0;
                score = 0;
                renderQuestion();
            });
        }

        renderQuestion();
    });
})();
