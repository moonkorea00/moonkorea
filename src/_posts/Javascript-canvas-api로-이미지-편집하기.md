---
title: 'Canvas API로 이미지 편집하기'
category: '자바스크립트'
excerpt: 'Canvas API는 canvas 요소로 2D나 3D 그래픽을 만들 수 있고 목적에 따라 다양한 창의적인 작업을 수행할 수 있습니다. 이 글에서는 Canvas API에 대한 간략한 소개와 Canvas API를 사용해서 이미지의 화질을 압축하는 방법에 대해 알아보겠습니다.'
description: '이미지 화질 압축하기 (하두리캠)'
tags: 'Canvas API, blob 객체, 화질 압축'
date: '2023-04-13'
---

> Canvas API를 사용해서 그림을 그리고, 이미지를 편집하고, 애니메이션을 만들 수 있습니다.

&emsp;하두리캠 감성의 필터를 이미지에 적용할 수 있는 <a href="https://www.haduri-zzal.com" target="_blank">사이드 프로젝트</a>를 만들며 알게 된 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" target="_blank">Canvas API</a>에 대해 간략하게 알아보고 프로젝트에 어떻게 사용했는지 소개해 보겠습니다. Canvas API는 &lt;canvas&gt;요소와 요소의 컨텍스트를 사용해서 2D 그래픽이나 3D 애니메이션을 동적으로 생성합니다.

</br>

<img src="/assets/markdown-image/Javascript-canvas-api/canvas.png" alt="canvas 요소" width="650" height="700"/>

<span>1.2 canvas 요소</span>

Canvas API는 다음과 같은 주요 기능을 제공합니다 :

1. 2D 그래픽 렌더링
2. 그래픽 편집 및 조작
3. 애니메이션 생성

> 애니메이션 관련해서는 이 글에서 다루지 않습니다.

</br>

## 2D 그래픽 그리기

canvas 요소는 화면에 지정한 빈 공간입니다. 2D 그래픽이나 이미지를 그릴 때 이 공간 안에 결과물이 출력됩니다. 2D 그래픽이라고 하면 직선, 사각형, 원, 이미지 등을 그리기 위한 기능들을 말하며 예로 그림판과 같은 그래픽 애플리케이션은 일반적으로 Canvas API를 사용하여 만들어집니다. 아래는 Canvas API를 사용해서 선을 그릴 수 있는 간단한 예시입니다 :

<iframe height="500" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/moonkorea00/embed/dygMOwy?default-tab=result&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

<span>1.1 canvas에 선 그리기</span>

그림을 그리거나 선을 그리기 위해서 먼저 canvas 객체와 2D 렌더링 컨텍스트를 생성합니다. 

```javascript
// html
<canvas id="canvas" width="100%" height="300"></canvas>
// js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// ...
function draw(e) {
  ctx.lineWidth = 2;
  // ...
}
// ...
canvas.addEventListener("mousemove", draw);
```

2D 렌더링 컨텍스트는 우리가 캔버스에 그래픽을 그릴 컨텍스트, 즉 환경을 의미합니다. 마우스 이벤트에 따라 그래픽 출력에 필요한 <a href="https://www.w3schools.com/tags/ref_canvas.asp" target="_blank">내장 메소드</a>를 호출하고 화면에 선을 출력합니다.

</br>

## 그래픽 편집 및 조작

Canvas API로 이미지를 편집할 수도 있습니다. 대표적인 기능들로 이미지 cropping, 이미지 회전, 픽셀 수정, 색상 변경 등이 있습니다. 하두리캠의 화질과 같은 낮은 화질의 이미지를 재현하고자 할 때도 Canvas API를 활용해서 그래픽의 화질을 압축할 수 있습니다.

```typescript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const img = new Image();
img.src = URL.createObjectURL(image as File);
```

canvas 요소와 이미지 객체를 생성하고 출력할 이미지 데이터의 URL을 만듭니다.

```javascript
const resolution = 0.1;
img.onload = () => {
    canvas.width = img.width; // canvas의 width값 설정
    canvas.height = img.height; // canvas의 height값 설정
    ctx.drawImage(img, 0, 0, img.width, img.height); // canvas에 이미지 그리기
    canvas.toBlob(
      blob => {
        if (blob) {
          callback(blob); // blob 객체 생성 시 실행할 로직
          URL.revokeObjectURL(img.src);
        }
      },
      'image/jpeg',
      resolution // 화질 설정
    );
  };
```
이미지 객체가 생성되면 onload() 이벤트로 콜백 함수를 호출합니다. 콜백은 새로 생성된 canvas 요소에 이미지 객체를 그리기 위해 drawImage() 메소드로 canvas요소에 이미지를 그리고 blob 객체의 화질을 조절해서 압축된 blob 객체를 반환합니다.

<img src="/assets/markdown-image/Javascript-canvas-api/canvas_drawimage.png" alt="mdn drawImage()" width="300" height="330"/>

<span>1.3 drawImage(), https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage</span>

> <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage" target="_blank">CanvasRenderingContext2D.drawImage()</a>는 canvas요소에 이미지를 그릴 수 있게 합니다.

> <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob" target="_blank">HTMLCanvasElement.toBlob()</a> 메소드에 전달되는 매개변수 중 하나인 quality값을 전달해서 blob 객체의 화질을 조작할 수 있습니다.

이미지 화질을 변경해 보세요 :

<iframe height="500" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/moonkorea00/embed/dygMOwy?default-tab=js%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

<span>1.4 canvas 화질 변경</span>

워터마크 같은 이미지 위에 이미지 또는 svg를 입히는 작업은 css로도 구현이 가능하겠지만 편집한 이미지를 저장하거나 재사용할 때 Canvas API의 사용이 더 적합할 수 있습니다.

이미지 편집에 대한 예시로, 낮은 화질의 이미지를 재현하기 위해 Canvas API를 사용하여 그래픽의 화질을 조절하는 방법을 소개했습니다. Canvas API를 사용하면 기타 스타일 관련 라이브러리나 css를 사용했을 때 보다 파일 크기와 이미지 품질에 대한 더 세밀한 제어가 가능합니다. 목적에 따라 Canvas API를 사용해서 그래픽을 그리고 이미지를 편집하면, 다양한 창의적인 작업을 할 수 있습니다.