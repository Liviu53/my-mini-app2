// ============================================
// КОНФИГУРАЦИЯ ДИНАМИЧЕСКИХ МЕТРИК
// Измените значения ниже для настройки всех цифр, процентов и шкал на сайте
// ============================================

const config = {
    // Информация о видео
    video: {
        caption: "99Follow @lack...",       // Подпись к видео
        date: "99November 21 · Duration 1:00"  // Дата и длительность
    },
    
    // Метрики в верхней части (лайки, комментарии и т.д.)
    metrics: {
        likes: 999,
        comments: 999,
        shares: 999,
        reposts: 9999,
        saves: 99999
    },
    
    // Секция Overview
    overview: {
        views: 99999,
        watchTime: "9d 9h 9m 99s",
        interactions: 99999,
        profileActivity: 999
    },
    
    // Секция Views
    views: {
        total: 9999999,
        chartBluePercent: 70.5,       // Процент синего сегмента в круговой диаграмме (non-followers). Автоматически определяет проценты Followers/Non-followers
        accountsReached: 19999,
        topSources: {
            profile: 9.4,    // Процент просмотров из профиля
            feed: 9.6,       // Процент просмотров из ленты
            reelsTab: 9,   // Процент просмотров из вкладки Reels
            explore: 9,    // Процент просмотров из Explore
            search: 9     // Процент просмотров из поиска
        }
    },
    
    // Секция Watch Time
    watchTime: {
        total: "9d 9h 9m 99s",
        average: "99sec",
        viewRate: 99.1  // Процент просмотров после первых 3 секунд
    },
    
    // Секция Interactions
    interactions: {
        total: 99999,
        chartBluePercent: 63.1,      // Процент синего сегмента в круговой диаграмме (non-followers). Автоматически определяет проценты Followers/Non-followers
        saves: 1,
        shares: 2,
        likes: 3,
        comments: 4
    },
    
    // Секция Profile Activity
    profileActivity: {
        follows: 9
    }
};

// ============================================
// ФУНКЦИИ ДЛЯ ОБНОВЛЕНИЯ МЕТРИК
// ============================================

// Форматирование чисел с разделителями тысяч
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Обновление всех метрик на странице
function updateMetrics() {
    // Информация о видео
    const videoCaption = document.querySelector('.video-caption');
    if (videoCaption) videoCaption.textContent = config.video.caption;
    
    const videoDate = document.querySelector('.video-date');
    if (videoDate) videoDate.textContent = config.video.date;
    
    // Метрики в верхней части
    const metricValues = document.querySelectorAll('.metric-value');
    if (metricValues.length >= 5) {
        metricValues[0].textContent = formatNumber(config.metrics.likes);
        metricValues[1].textContent = formatNumber(config.metrics.comments);
        metricValues[2].textContent = formatNumber(config.metrics.shares);
        metricValues[3].textContent = formatNumber(config.metrics.reposts);
        metricValues[4].textContent = formatNumber(config.metrics.saves);
    }
    
    // Секция Overview
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const header = section.querySelector('.section-header span');
        if (header && header.textContent.trim() === 'Overview') {
            const statRows = section.querySelectorAll('.stat-row');
            if (statRows.length >= 4) {
                statRows[0].querySelector('.stat-value').textContent = formatNumber(config.overview.views);
                statRows[1].querySelector('.stat-value').textContent = config.overview.watchTime;
                statRows[2].querySelector('.stat-value').textContent = formatNumber(config.overview.interactions);
                statRows[3].querySelector('.stat-value').textContent = formatNumber(config.overview.profileActivity);
            }
        }
    });
    
    // Секция Views
    const viewsSection = document.querySelector('.views-section');
    if (viewsSection) {
        // Общее количество просмотров в круге
        const viewsCircleValue = viewsSection.querySelector('.circle-value');
        if (viewsCircleValue) viewsCircleValue.textContent = formatNumber(config.views.total);
        
        // Вычисляем проценты на основе chartBluePercent
        const nonFollowersPercent = config.views.chartBluePercent;
        const followersPercent = 100 - nonFollowersPercent;
        
        // Проценты Followers/Non-followers (округление до 1 знака после запятой)
        const viewsAudienceItems = viewsSection.querySelectorAll('.audience-item');
        if (viewsAudienceItems.length >= 2) {
            viewsAudienceItems[0].querySelector('.audience-value').textContent = followersPercent.toFixed(1) + '%';
            viewsAudienceItems[1].querySelector('.audience-value').textContent = nonFollowersPercent.toFixed(1) + '%';
        }
        
        // Top sources of views
        const sourceItems = viewsSection.querySelectorAll('.top-sources .source-item');
        const sourcePercentages = [
            config.views.topSources.profile,
            config.views.topSources.feed,
            config.views.topSources.reelsTab,
            config.views.topSources.explore,
            config.views.topSources.search
        ];
        
        sourceItems.forEach((item, index) => {
            if (index < sourcePercentages.length) {
                const fill = item.querySelector('.source-bar-fill');
                const percentage = item.querySelector('.source-percentage');
                if (fill) fill.style.width = sourcePercentages[index] + '%';
                if (percentage) percentage.textContent = sourcePercentages[index] + '%';
            }
        });
        
        // Accounts reached
        const accountsReached = viewsSection.querySelector('.accounts-reached .stat-value');
        if (accountsReached) accountsReached.textContent = formatNumber(config.views.accountsReached);
    }
    
    // Секция Watch Time
    const watchTimeValue = document.querySelector('.watch-time-value');
    if (watchTimeValue) watchTimeValue.textContent = config.watchTime.total;
    
    const watchTimeSection = document.querySelector('.watch-time-header')?.closest('.section-content');
    if (watchTimeSection) {
        const averageWatchTime = watchTimeSection.querySelector('.stat-row .stat-value');
        if (averageWatchTime) averageWatchTime.textContent = config.watchTime.average;
        
        // View rate
        const viewRateFill = watchTimeSection.querySelector('.view-rate-fill');
        const viewRatePercentage = watchTimeSection.querySelector('.legend-percentage');
        if (viewRateFill) viewRateFill.style.width = config.watchTime.viewRate + '%';
        if (viewRatePercentage) viewRatePercentage.textContent = config.watchTime.viewRate + '%';
    }
    
    // Секция Interactions
    const interactionsSection = document.querySelector('.interactions-section');
    if (interactionsSection) {
        // Общее количество взаимодействий в круге
        const interactionsCircleValue = interactionsSection.querySelector('.circle-value');
        if (interactionsCircleValue) interactionsCircleValue.textContent = formatNumber(config.interactions.total);
        
        // Вычисляем проценты на основе chartBluePercent
        const nonFollowersPercent = config.interactions.chartBluePercent;
        const followersPercent = 100 - nonFollowersPercent;
        
        // Проценты Followers/Non-followers (округление до 1 знака после запятой)
        const interactionsAudienceItems = interactionsSection.querySelectorAll('.audience-item');
        if (interactionsAudienceItems.length >= 2) {
            interactionsAudienceItems[0].querySelector('.audience-value').textContent = followersPercent.toFixed(1) + '%';
            interactionsAudienceItems[1].querySelector('.audience-value').textContent = nonFollowersPercent.toFixed(1) + '%';
        }
        
        // Детали взаимодействий
        const interactionDetails = interactionsSection.querySelectorAll('.interaction-details .interaction-item');
        if (interactionDetails.length >= 4) {
            interactionDetails[0].querySelector('.stat-value').textContent = formatNumber(config.interactions.saves);
            interactionDetails[1].querySelector('.stat-value').textContent = formatNumber(config.interactions.shares);
            interactionDetails[2].querySelector('.stat-value').textContent = formatNumber(config.interactions.likes);
            interactionDetails[3].querySelector('.stat-value').textContent = formatNumber(config.interactions.comments);
        }
    }
    
    // Секция Profile Activity
    const profileActivitySections = document.querySelectorAll('.section');
    profileActivitySections.forEach(section => {
        const header = section.querySelector('.section-header span');
        if (header && header.textContent.trim() === 'Profile activity') {
            // Обновляем число в заголовке
            const headerValue = section.querySelector('.profile-activity-value');
            if (headerValue) {
                headerValue.textContent = formatNumber(config.profileActivity.follows);
            }
            // Обновляем число в строке Follows
            const statValue = section.querySelector('.stat-value');
            if (statValue) {
                statValue.textContent = formatNumber(config.profileActivity.follows);
            }
        }
    });
}

// Обновление круговых диаграмм
function updateCharts() {
    const cx = 100;
    const cy = 100;
    const r = 80;

    // Утилита: полярные → декартовы
    function polar(cx, cy, r, angle) {
        const rad = (angle - 90) * Math.PI / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad)
        };
    }

    // Дуга SVG
    function arcPath(cx, cy, r, startAngle, endAngle) {
        const start = polar(cx, cy, r, startAngle);
        const end = polar(cx, cy, r, endAngle);
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `
            M ${start.x} ${start.y}
            A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}
        `;
    }

    function updateChart(blueId, pinkId, bluePercent) {
        const gapDeg = 8;
        const totalGap = gapDeg * 2;
        const usable = 360 - totalGap;
        const blueDeg = usable * (bluePercent / 100);
        const pinkDeg = usable - blueDeg;

        let angle = 0;
        angle += gapDeg;

        const pinkStart = angle;
        const pinkEnd = angle + pinkDeg;
        angle = pinkEnd;
        angle += gapDeg;

        const blueStart = angle;
        const blueEnd = angle + blueDeg;

        const pinkPath = document.getElementById(pinkId);
        const bluePath = document.getElementById(blueId);
        
        if (pinkPath) pinkPath.setAttribute('d', arcPath(cx, cy, r, pinkStart, pinkEnd));
        if (bluePath) bluePath.setAttribute('d', arcPath(cx, cy, r, blueStart, blueEnd));
    }

    // Обновление диаграммы Views
    updateChart('views-blue', 'views-pink', config.views.chartBluePercent);
    
    // Обновление диаграммы Interactions
    updateChart('interactions-blue', 'interactions-pink', config.interactions.chartBluePercent);
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    updateMetrics();
    updateCharts();
});
