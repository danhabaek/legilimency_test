let lines = ["레질리먼시", "절대반지가 깨어났다", "스파이스를 지배하고", "비브라늄을 파괴하는 힘", "조사병단이여", "함께 광야로 떠나겠습니까", "나니아와 헤네시스를 위하여"];  // 여러 줄의 텍스트 배열
let baseLineHeight = 80;  // 기본 행간

function setup() {
    createCanvas(windowWidth, windowHeight);
    font1 = loadFont('asset/Legilimency-Regular.ttf');
    textFont(font1);
    textAlign(CENTER, CENTER);  // 텍스트를 가운데 정렬로 설정
    textSize(72);  // 기본 텍스트 크기 설정
}

function draw() {
    background(255);  // 배경을 흰색으로 설정
    fill(0);  // 텍스트 색상을 검은색으로 설정

    let centerX = width / 2;
    let centerY = height / 2;
    
    let maxDistance = dist(0, 0, centerX, centerY);  // 화면의 중심에서 최대 거리 계산

    // 마우스가 화면 중심에 가까워질수록 행간도 줄어들도록
    let adjustedLineHeight = map(dist(mouseX, mouseY, centerX, centerY), 0, maxDistance, 0, baseLineHeight);

    for (let j = 0; j < lines.length; j++) {
        let displayText = lines[j];
        let totalTextWidth = 0;

        // 각 줄의 중심 글자 설정 (줄마다 중간 글자를 기준으로)
        let targetCharIndex = floor(displayText.length / 2);  // 중심 글자 인덱스
        let startY = centerY - ((lines.length - 1) * adjustedLineHeight / 2) + (j * adjustedLineHeight);  // Y 좌표 계산

        // 글자들의 총 너비 계산
        for (let i = 0; i < displayText.length; i++) {
            totalTextWidth += textWidth(displayText.charAt(i));
        }

        let startX = centerX - totalTextWidth / 2;  // 가운데 정렬된 시작 위치

        for (let i = 0; i < displayText.length; i++) {
            let currentChar = displayText.charAt(i);
            let currentCharWidth = textWidth(currentChar);

            // 마우스가 화면 중심에 가까워질수록 글자들이 중심 글자에 모임 (중앙으로 모임)
            let distanceToCenter = dist(mouseX, mouseY, centerX, centerY);
            let xOffset = map(distanceToCenter, 0, maxDistance, (i - targetCharIndex) * currentCharWidth, 0);  // 글자가 중앙으로 모임

            // 글자 및 기호의 크기와 위치 조정
            let charX = startX + (i * currentCharWidth) - xOffset;  // 각 글자가 중심 글자로 모임
            let charY = startY;

            // 글자 크기 조정 (중앙에 가까울수록 글자가 커짐)
            let maxFontSize = 1000;
            let minFontSize = 50;
            let fontSize = map(distanceToCenter, 0, maxDistance, maxFontSize, minFontSize);
            textSize(fontSize);

            // 텍스트 그리기
            text(currentChar, charX, charY);
        }
    }
}
