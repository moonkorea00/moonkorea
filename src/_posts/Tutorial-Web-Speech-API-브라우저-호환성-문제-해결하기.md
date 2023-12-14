---
title: 'Web Speech API 브라우저 호환성 문제 해결하기'
category: '튜토리얼 / 트러블슈팅'
excerpt: '브라우저 간의 Web Speech API(SpeechRecognition API) 크로스 브라우징 문제를 해결하는 방법에 대해 알아봅니다.'
description: '웹 API 크로스 브라우징 문제 대응하기'
tags: 'JavaScript, 개발 경험, React.js'
date: '2023-06-01'
---

&emsp;서비스를 개발할 때 중요한 목표 중 하나는 웹 브라우저와 관계없이 일관된 사용자 경험을 제공하는 것입니다. 그러나 실제로는 특정 기능이 웹브라우저에 따라 다르게 동작할 경우 그에 맞게 대응할 필요가 있습니다. 이는 사용자가 구버전의 브라우저를 사용하거나 특정 브라우저에서만 기능이 동작할 때 특히 그렇겠죠.

&emsp;Web Speech API는 웹 API의 호환성을 평가하는 <a href="https://www.lambdatest.com/web-technologies/speech-recognition" target="_blank" rel="noopener">lambdatest</a>에서 낮은 호환성 점수를 기록하고 있습니다. 다만 내장 API인 점, 호출 제한이 없다는 점과 우수한 음성 인식 기능을 제공한다는 점에서 호환 문제만 대응을 한다면 원활한 서비스를 제공할 수 있습니다. 이번 글에서는 Web Speech API의 브라우저별 동작 방식의 차이점과 그에 대한 대응 방법에 대해 공유합니다.

<br>

## 브라우저 호환성 문제

&emsp;최근에 Web Speech API를 활용한 프로젝트를 진행했는데요. 브라우저 별로 어떻게 동작하고 출력되는지 확인해 보고자 앱을 preview build로 실행했는데 특정 브라우저(Firefox, Opera)에서 애플리케이션 에러가 발생하는 문제를 발견했습니다. 배포 전에 테스트를 했어야 했는데 아니나 다를까 사용자가 깃헙 이슈로 Opera에서는 동작을 하지 않는다는 피드백을 받았어요.

<br>

<img src="/assets/markdown-image/Tutorial-web-speech-api/github-issue.png" alt="github 이슈" width="550" height="300" />

<span>1.1 깃헙 이슈</span>

<img src="/assets/markdown-image/Tutorial-web-speech-api/firefox-err.png" alt="firefox application error" width="800" height="300" />

<span>1.2 Firefox</span>

<img src="/assets/markdown-image/Tutorial-web-speech-api/opera-err.png" alt="opera application error" width="800" height="300" />

<span>1.3 Opera</span>

<br>

빌드 파일을 확인해 보니 Web Speech API의 SpeechRecognition 인스턴스를 생성하는 과정에서 발생한 문제였습니다. SpeechRecognition 클래스가 읽히지 않아 타입 에러를 반환하고 있었어요.

```ts
ts
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
```

<br>

<img src="/assets/markdown-image/Tutorial-web-speech-api/js-bundle.png" alt="opera application error" width="800" height="400" />

<span>1.4 자바스크립트 번들</span>

<br>

## 호환성 검사

&emsp;Web Speech API는 크로스 브라우징에 있어 친화적인 편은 아니기 때문에 브라우저 호환성 검사를 페이지 접근 시에 수행하도록 할 수 있습니다.

브라우저가 Web Speech API를 지원할 경우, 브라우저는 window 객체에서 SpeechRecognition 또는 webkitSpeechRecognition 프로퍼티를 탐색하게 됩니다. 하지만 해당 프로퍼티가 window 객체에 존재하지 않는다면, 이에 대한 분기 처리가 필요합니다.

먼저 브라우저와 API의 호환성을 확인합니다.

```ts
ts
const isBrowserSupported =
  'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
```

웹 API가 현재 브라우저와 호환이 되면, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator" target="_blank" rel="noopener">Navigator 인터페이스</a>로 음성 장치 관련 검사를 하고 서비스 동작 흐름에 맞게 음성 인식 로직을 실행합니다.

```ts
ts
const checkAudioSettings = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true }); // 음성 장치 사용 권한 설정
    const devices: MediaDeviceInfo[] =
      await navigator.mediaDevices.enumerateDevices(); // 음성 장치 유효성 검사
    const hasConnection = devices.some(device => device.kind === 'audioinput');
    if (!hasConnection) {} // 에러 반환
  } catch (err) {
    if (err instanceof DOMException) {
      // 에러 처리
    }
  }
};
```

하지만 브라우저가 Web Speech API를 지원하지 않는 경우에는 에러 메시지를 출력하거나, fallback UI를 통해 사용자에게 알릴 수 있겠죠?

```ts
ts
const [speechRecognitionError, setSpeechRecognitionError] = useState(
  isBrowserSupported
    ? 'Speech Recognition is not supported in your browser.'
    : ''
);
// ...
if(speechRecognitionError) return <ErrorFallback {...speechRecognitionError} />;
```

<br>

<video url='/assets/markdown-image/Tutorial-web-speech-api/compatible.webm' width='100%' height='auto'><video /> 

<span>1.5 호환 O</span>

<video url='/assets/markdown-image/Tutorial-web-speech-api/not-compatible.webm' width='100%' height='auto'><video />
 
<span>1.6 호환 X</span>

<br>