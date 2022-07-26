---
title: CloudFront
category: AWS
date: 2022년 7월 24일
---

# CloudFront

AWS CloudFront는 캐싱 서버와 CDN 서비스를 제공하고 html, css, js 및 이미지 파일 등과 같은 정적/동적 콘텐츠를 최종 사용자에게 더 빨리 배포하도록 지원하는 서비스입니다. https 프로토콜로 앱 배포가 가능하고 엣지 로케이션으로 최소한의 지연 시간과 최적의 데이터 전송 속도로 사용자가에게 웹 콘텐츠를 제공합니다.

>CloudFront는 엣지 로케이션이라고 하는 데이터 센터의 네트워크와 캐시 기능을 통해 콘텐츠를 제공합니다. 콘텐츠에 대한 요청이 발생하면 지연시간이 가장 낮은 엣지 로케이션으로 요청이 라우팅되고 데이터 캐싱 여부를 확인합니다. 캐싱이 되어 있다면 사용자에게 콘텐츠를 응답으로 전송하고 캐싱이 되어 있지 않았으면 Origin(원본 데이터를 가지고 있는 서버: EC2 인스턴스, S3)으로 요청을 forwarding합니다. Origin은 요청을 받아 엣지 로케이션에 데이터를 캐싱한 뒤 사용자가에게 콘텐츠를 응답으로 전송합니다.

1. **CloudFront - 배포**에서 새로운 배포를 생성합니다.

<img src="https://readmedata.github.io/data/cloudfront1.png" alt="cloudfront 배포 생성" width="850">
<span>CloudFront 배포 생성</span>

2. 원본 도메인 이름을 선택한 후 S3 버킷 설정을 퍼블릭 액세스 차단으로 해두었으면 **OAI 사용**으로 설정합니다. CloudFront를 통해서만 S3에 접근할 수 있기 때문에 도메인에 접근할 경우 접근하는데 사용되는 권한인 OAI 여부를 확인하는 작업을 거칩니다. **새 OAI 생성**을 눌러 **원본 액세스 ID**를 설정합니다.

3. Origin Shield를 활성화하면 캐시 적중률과 동시 요청 수를 줄여줍니다. Origin Shield는 CDN과 Origin 서버 사이에 캐싱 레이어를 생성해 요청이 발생하면 S3에 직접적으로 요청할 확률이 더 줄어듭니다.

<img src="https://readmedata.github.io/data/cloudfront2.png" alt="cloudfront 배포 / origin shield">
<span>CloudFront 배포 설정</span>

4. https 프로토콜 사용을 위해서 **Redirect HTTP to HTTPS**로 편집합니다. 정적 앱일 경우 **허용된 HTTP 방법**을 **GET, HEAD**로 설정합니다.

<img src="https://readmedata.github.io/data/cloudfront3.png" alt="cloudfront 배포 설정">
<span>CloudFront https 프로토콜 설정</span>

>캐시 키 및 원본 요청 설정을 **CachingOptimized**로 설정하면 CloudFront가 24시간 동안 웹 콘텐츠를 캐싱하게 합니다.

5. **대체 도메인 이름**(CNAME)에 도메인을 추가하고 발급받은 <a href="https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/request/public" target="_blank" rel="noreferrer">SSL 인증서</a>를 선택합니다.

<img src="https://readmedata.github.io/data/cloudfront4.png" alt="cloudfront CNAME / SSL 인증서" width="850">
<span>CloudFront CNAME / SSL 인증서</span>

6. CloudFront 배포를 생성했으면 Route 53으로 도메인을 연결합니다. Route 53에서 A 유형의 새로운 **레코드**를 생성해 **트래픽 라우팅 대상**은 **CloudFront 배포에 대한 별칭**으로 합니다.

<img src="https://readmedata.github.io/data/cloudfront5.png" alt="Route 53 레코드" width="850">
<span>Route 53 레코드</span>
