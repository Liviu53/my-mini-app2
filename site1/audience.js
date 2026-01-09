// ============================================
// КОНФИГУРАЦИЯ ДИНАМИЧЕСКИХ МЕТРИК ДЛЯ AUDIENCE.HTML
// Измените значения ниже для настройки всех цифр, процентов и шкал на странице
// ============================================

const audienceConfig = {
    // Секция Views
    views: {
        total: 810914,
        chartBluePercent: 82.4,  // Процент синего сегмента (non-followers). Автоматически определяет проценты Followers/Non-followers
        accountsReached: {
            value: 585,
            change: "-83.0%"  // Изменение (может быть положительным "+X%" или отрицательным "-X%")
        }
    },
    
    // Секция By content type
    contentType: {
        reels: {
            total: 97.1,      // Общий процент
            pink: 10,         // Процент Followers
            blue: 90          // Процент Non-followers
        },
        posts: {
            total: 2.9,
            pink: 30,
            blue: 70
        }
    },
    
    // Секция By top content (карусель)
    topContent: [
        { views: "21K", date: "Dec 18" },
        { views: "18K", date: "Dec 17" },
        { views: "15K", date: "Dec 16" },
        { views: "12K", date: "Dec 15" },
        { views: "10K", date: "Dec 14" },
        { views: "8K", date: "Dec 13" },
        { views: "6K", date: "Dec 12" }
    ],
    
    // Секция Audience cards
    audience: {
        cities: [
            { name: "London", percentage: 11.8 },
            { name: "Montreal", percentage: 1.5 },
            { name: "Toronto", percentage: 1.5 },
            { name: "Istanbul", percentage: 1.3 }
        ],
        countries: [
            { name: "United States", percentage: 21.2 },
            { name: "United Kingdom", percentage: 17.6 },
            { name: "Canada", percentage: 9.0 },
            { name: "India", percentage: 8.4 }
        ],
        ageRanges: [
            { name: "25-34", percentage: 48.8 },
            { name: "18-24", percentage: 37.1 },
            { name: "35-44", percentage: 9.7 },
            { name: "45-54", percentage: 2.3 }
        ],
        gender: [
            { name: "Men", percentage: 92.4 },
            { name: "Women", percentage: 7.6 }
        ]
    },
    
    // Секция Profile Activity
    profileActivity: {
        total: 25,
        change: "+38.9%",  // Изменение
        period: "vs Nov 4 - Dec 3",
        profileVisits: {
            value: 25,
            change: "+38.9%"
        },
        externalLinkTaps: 0
    },
    
    // Дата и период
    dateRange: {
        selector: "Last 30 days",
        range: "Dec 4 - Jan 2"
    }
};

// ============================================
// ФУНКЦИИ ДЛЯ ОБНОВЛЕНИЯ МЕТРИК
// ============================================

// Форматирование чисел с разделителями тысяч
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Инициализация двухцветных шкал в разделе By content type
function initializeContentBars() {
    const contentBars = document.querySelectorAll('.content-bar-fill[data-total]');
    contentBars.forEach(bar => {
        const pinkPercent = parseFloat(bar.getAttribute('data-pink'));
        const bluePercent = parseFloat(bar.getAttribute('data-blue'));
        
        if (isNaN(pinkPercent) || isNaN(bluePercent)) return;
        
        // Рассчитываем ширину каждого цвета внутри общей шкалы
        const totalPercent = pinkPercent + bluePercent;
        const normalizedPink = (pinkPercent / totalPercent) * 100;
        const normalizedBlue = (bluePercent / totalPercent) * 100;
        
        const pinkElement = bar.querySelector('.content-bar-fill-pink');
        const blueElement = bar.querySelector('.content-bar-fill-blue');
        
        if (pinkElement && blueElement) {
            pinkElement.style.width = normalizedPink + '%';
            blueElement.style.width = normalizedBlue + '%';
            pinkElement.style.flexShrink = '0';
            blueElement.style.flexShrink = '0';
            pinkElement.style.minWidth = '0';
            blueElement.style.minWidth = '0';
        }
    });
}

// Обновление всех метрик на странице
function updateAudienceMetrics() {
    // Секция Views
    const viewsCircleValue = document.querySelector('.views-circle .circle-value');
    if (viewsCircleValue) {
        viewsCircleValue.textContent = formatNumber(audienceConfig.views.total);
    }
    
    // Проценты Followers/Non-followers
    const nonFollowersPercent = audienceConfig.views.chartBluePercent;
    const followersPercent = 100 - nonFollowersPercent;
    
    const audienceItems = document.querySelectorAll('.audience-breakdown .audience-item');
    if (audienceItems.length >= 2) {
        audienceItems[0].querySelector('.audience-value').textContent = followersPercent.toFixed(1) + '%';
        audienceItems[1].querySelector('.audience-value').textContent = nonFollowersPercent.toFixed(1) + '%';
    }
    
    // Accounts reached
    const accountsReachedValue = document.querySelector('.stat-row .stat-value > div');
    const accountsReachedChange = document.querySelector('.stat-row .stat-value .stat-change');
    if (accountsReachedValue) {
        accountsReachedValue.textContent = formatNumber(audienceConfig.views.accountsReached.value);
    }
    if (accountsReachedChange) {
        accountsReachedChange.textContent = audienceConfig.views.accountsReached.change;
        // Автоматически определяем класс для цвета
        if (audienceConfig.views.accountsReached.change.startsWith('+')) {
            accountsReachedChange.classList.add('positive');
            accountsReachedChange.classList.remove('negative');
        } else if (audienceConfig.views.accountsReached.change.startsWith('-')) {
            accountsReachedChange.classList.add('negative');
            accountsReachedChange.classList.remove('positive');
        }
    }
    
    // By content type
    const contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach((item, index) => {
        const contentName = item.querySelector('.content-name');
        if (!contentName) return;
        
        const name = contentName.textContent.trim();
        let configData = null;
        
        if (name === 'Reels') {
            configData = audienceConfig.contentType.reels;
        } else if (name === 'Posts') {
            configData = audienceConfig.contentType.posts;
        }
        
        if (configData) {
            const barFill = item.querySelector('.content-bar-fill');
            const percentageSpan = item.querySelector('.content-percentage');
            const pinkFill = item.querySelector('.content-bar-fill-pink');
            const blueFill = item.querySelector('.content-bar-fill-blue');
            
            if (barFill) {
                barFill.style.width = configData.total + '%';
                barFill.setAttribute('data-total', configData.total);
                barFill.setAttribute('data-pink', configData.pink);
                barFill.setAttribute('data-blue', configData.blue);
            }
            
            if (percentageSpan) {
                percentageSpan.textContent = configData.total + '%';
            }
            
            // Обновляем двухцветные шкалы
            if (pinkFill && blueFill) {
                const totalPercent = configData.pink + configData.blue;
                const normalizedPink = (configData.pink / totalPercent) * 100;
                const normalizedBlue = (configData.blue / totalPercent) * 100;
                
                pinkFill.style.width = normalizedPink + '%';
                blueFill.style.width = normalizedBlue + '%';
                pinkFill.style.flexShrink = '0';
                blueFill.style.flexShrink = '0';
                pinkFill.style.minWidth = '0';
                blueFill.style.minWidth = '0';
            }
        }
    });
    
    // Инициализируем двухцветные шкалы после обновления
    initializeContentBars();
    
    // By top content (карусель)
    const topContentItems = document.querySelectorAll('.top-content-item');
    topContentItems.forEach((item, index) => {
        if (index < audienceConfig.topContent.length) {
            const viewsElement = item.querySelector('.content-views');
            const dateElement = item.querySelector('.content-date');
            
            if (viewsElement) {
                viewsElement.textContent = audienceConfig.topContent[index].views;
            }
            if (dateElement) {
                dateElement.textContent = audienceConfig.topContent[index].date;
            }
        }
    });
    
    // Audience cards
    const audienceCards = document.querySelectorAll('.audience-card');
    audienceCards.forEach(card => {
        const cardTitle = card.querySelector('.audience-card-title');
        if (!cardTitle) return;
        
        const title = cardTitle.textContent.trim();
        let cardData = null;
        
        if (title === 'Top cities') {
            cardData = audienceConfig.audience.cities;
        } else if (title === 'Top countries') {
            cardData = audienceConfig.audience.countries;
        } else if (title === 'Top age ranges') {
            cardData = audienceConfig.audience.ageRanges;
        } else if (title === 'Gender') {
            cardData = audienceConfig.audience.gender;
        }
        
        if (cardData) {
            const cardItems = card.querySelectorAll('.audience-card-item');
            cardItems.forEach((item, index) => {
                if (index < cardData.length) {
                    const label = item.querySelector('.stat-label');
                    const barFill = item.nextElementSibling?.querySelector('.audience-card-fill');
                    const valueSpan = item.nextElementSibling?.querySelector('.stat-value');
                    
                    if (label) {
                        label.textContent = cardData[index].name;
                    }
                    
                    if (barFill) {
                        barFill.style.width = cardData[index].percentage + '%';
                    }
                    
                    if (valueSpan) {
                        valueSpan.textContent = cardData[index].percentage + '%';
                    }
                }
            });
        }
    });
    
    // Profile Activity
    const profileValue = document.querySelector('.profile-value');
    if (profileValue) {
        profileValue.textContent = formatNumber(audienceConfig.profileActivity.total);
    }
    
    const profileSubtitle = document.querySelector('.profile-subtitle');
    if (profileSubtitle) {
        const periodText = profileSubtitle.childNodes[0]?.textContent?.trim() || '';
        const changeSpan = profileSubtitle.querySelector('.profile-change');
        if (changeSpan) {
            changeSpan.textContent = audienceConfig.profileActivity.change;
            if (audienceConfig.profileActivity.change.startsWith('+')) {
                changeSpan.classList.add('positive');
                changeSpan.classList.remove('negative');
            } else if (audienceConfig.profileActivity.change.startsWith('-')) {
                changeSpan.classList.add('negative');
                changeSpan.classList.remove('positive');
            }
        }
        // Обновляем период если нужно
        if (audienceConfig.profileActivity.period) {
            const textNode = profileSubtitle.childNodes[0];
            if (textNode && textNode.nodeType === 3) {
                textNode.textContent = audienceConfig.profileActivity.period + ' ';
            }
        }
    }
    
    const profileVisitsValue = document.querySelector('.profile-activity .stat-row .stat-value');
    if (profileVisitsValue) {
        const valueDiv = profileVisitsValue.querySelector('div');
        const changeSpan = profileVisitsValue.querySelector('.stat-change');
        
        if (valueDiv) {
            valueDiv.textContent = formatNumber(audienceConfig.profileActivity.profileVisits.value);
        }
        if (changeSpan) {
            changeSpan.textContent = audienceConfig.profileActivity.profileVisits.change;
            if (audienceConfig.profileActivity.profileVisits.change.startsWith('+')) {
                changeSpan.classList.add('positive');
                changeSpan.classList.remove('negative');
            } else if (audienceConfig.profileActivity.profileVisits.change.startsWith('-')) {
                changeSpan.classList.add('negative');
                changeSpan.classList.remove('positive');
            }
        }
    }
    
    const externalLinkTaps = document.querySelectorAll('.profile-activity .stat-row .stat-value');
    if (externalLinkTaps.length >= 2) {
        const externalLinkValue = externalLinkTaps[1];
        if (externalLinkValue && !externalLinkValue.querySelector('.stat-change')) {
            externalLinkValue.textContent = formatNumber(audienceConfig.profileActivity.externalLinkTaps);
        }
    }
    
    // Дата и период
    const dateSelector = document.querySelector('.date-selector span');
    if (dateSelector) {
        dateSelector.textContent = audienceConfig.dateRange.selector;
    }
    
    const dateRange = document.querySelector('.date-range');
    if (dateRange) {
        dateRange.textContent = audienceConfig.dateRange.range;
    }
}

// Обновление круговой диаграммы
function updateAudienceChart() {
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
    updateChart('views-blue', 'views-pink', audienceConfig.views.chartBluePercent);
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    updateAudienceMetrics();
    updateAudienceChart();
    initializeContentBars();
    
    // Автоматическое определение цвета для всех процентов изменений
    const statChanges = document.querySelectorAll('.stat-change, .profile-change');
    statChanges.forEach(element => {
        const text = element.textContent.trim();
        if (text.startsWith('+')) {
            element.classList.add('positive');
            element.classList.remove('negative');
        } else if (text.startsWith('-')) {
            element.classList.add('negative');
            element.classList.remove('positive');
        }
    });
});
