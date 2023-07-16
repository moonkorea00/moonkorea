---
title: 'CDN(CloudFront)'
category: '튜토리얼 / 트러블슈팅'
excerpt: 'AWS CloudFront는 캐싱 서버와 CDN 서비스를 제공하고 html, css, js 및 이미지 파일 등과 같은 정적/동적 콘텐츠를 최종 사용자에게 더 빨리 배포하도록 지원하는 서비스입니다.'
description: 'CloudFront 배포 시작하기'
tags: '튜토리얼, AWS, CloudFront, CDN, 엣지 로케이션'
date: '2022-07-24'
---

AWS CloudFront는 캐싱 서버와 CDN 서비스를 제공하고 html, css, js 및 이미지 파일 등과 같은 정적/동적 콘텐츠를 최종 사용자에게 더 빨리 배포하도록 지원하는 서비스입니다. https 프로토콜로 앱 배포가 가능하고 엣지 로케이션으로 최소한의 지연 시간과 최적의 데이터 전송 속도로 사용자가에게 웹 콘텐츠를 제공합니다. 사용자가 브라우저에 URL을 한 후 웹 사이트를 요청하면, 해당 웹 사이트와 관련된 도메인 이름으로 요청이 전송됩니다. 도메인 이름은 IP 주소로 해석이 된 후 IP 주소를 사용하여 웹 사이트를 제공하는 서버와 연결이 설정됩니다. 전통적인 CSR 리액트 앱에서는 최초의 요청이 오리진 서버로 보내지며 서버에서는 요청에 따른 자바스크립트, CSS 파일, 폰트 및 이미지 등 빌드에 필요한 정적인 파일들을 클라이언트에 제공합니다. CDN은 클라이언트에 제공된 리소스들을 캐싱 한 후 추후 리소스에 대한 요청이 발생하면 캐싱 된 버전의 리소스가 클라이언트에게 제공되고 캐싱 되지 않은 데이터에 대한 요청은 CDN으로부터 오리진 서버로 보내집니다. 응답을 받은 CDN은 해당 데이터를 캐싱 한 뒤 클라이언트에게 리소스를 서빙합니다. 다만 CDN의 캐싱 전략은 CDN 설정에 따라 다르며 pre-fetching을 통해서 리소스가 pre-warmed 또는 pre-fetched 되어 최초의 요청에도 CDN을 통해서 클라이언트에게 제공될 수 있습니다.

>CloudFront는 엣지 로케이션이라고 하는 데이터 센터의 네트워크와 캐시 기능을 통해 콘텐츠를 제공합니다. 콘텐츠에 대한 요청이 발생하면 지연시간이 가장 낮은 엣지 로케이션으로 요청이 라우팅되고 데이터 캐싱 여부를 확인합니다. 캐싱이 되어 있다면 사용자에게 콘텐츠를 응답으로 전송하고 캐싱이 되어 있지 않았으면 Origin(원본 데이터를 가지고 있는 서버: EC2 인스턴스, S3)으로 요청을 forwarding합니다. Origin은 요청을 받아 엣지 로케이션에 데이터를 캐싱한 뒤 사용자가에게 콘텐츠를 응답으로 전송합니다.

1. **CloudFront - 배포**에서 새로운 배포를 생성합니다.

<img src="/assets/markdown-image/Tutorial-AWS-CDN(cloudfront)/cloudfront1.png" alt="cloudfront 배포 생성" width="850" height="400">
<span>CloudFront 배포 생성</span>

2. 원본 도메인 이름을 선택한 후 S3 버킷 설정을 퍼블릭 액세스 차단으로 해두었으면 **OAI 사용**으로 설정합니다. CloudFront를 통해서만 S3에 접근할 수 있기 때문에 도메인에 접근할 경우 접근하는데 사용되는 권한인 OAI 여부를 확인하는 작업을 거칩니다. **새 OAI 생성**을 눌러 **원본 액세스 ID**를 설정합니다.

3. Origin Shield를 활성화하면 캐시 적중률과 동시 요청 수를 줄여줍니다. Origin Shield는 CDN과 Origin 서버 사이에 캐싱 레이어를 생성해 요청이 발생하면 S3에 직접적으로 요청할 확률이 더 줄어듭니다.

<img src="/assets/markdown-image/Tutorial-AWS-CDN(cloudfront)/cloudfront2.png" alt="cloudfront 배포 / origin shield" width="550" height="400">
<span>CloudFront 배포 설정</span>

4. https 프로토콜 사용을 위해서 **Redirect HTTP to HTTPS**로 편집합니다. 정적 앱일 경우 **허용된 HTTP 방법**을 **GET, HEAD**로 설정합니다.

<img src="/assets/markdown-image/Tutorial-AWS-CDN(cloudfront)/cloudfront3.png" alt="cloudfront 배포 설정" width="550" height="400">
<span>CloudFront https 프로토콜 설정</span>

>캐시 키 및 원본 요청 설정을 **CachingOptimized**로 설정하면 CloudFront가 24시간 동안 웹 콘텐츠를 캐싱하게 합니다.

5. **대체 도메인 이름**(CNAME)에 도메인을 추가하고 발급받은 <a href="https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/request/public" target="_blank">SSL 인증서</a>를 선택합니다.

<img src="/assets/markdown-image/Tutorial-AWS-CDN(cloudfront)/cloudfront4.png" alt="cloudfront CNAME / SSL 인증서" width="550" height="400">
<span>CloudFront CNAME / SSL 인증서</span>

6. CloudFront 배포를 생성했으면 Route 53으로 도메인을 연결합니다. Route 53에서 A 유형의 새로운 **레코드**를 생성해 **트래픽 라우팅 대상**은 **CloudFront 배포에 대한 별칭**으로 합니다.

<img src="/assets/markdown-image/Tutorial-AWS-CDN(cloudfront)/cloudfront5.png" alt="Route 53 레코드" width="550" height="400">
<span>Route 53 레코드</span>
