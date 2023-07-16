---
title: 'CloudFront 에러 - This XML file does not appear to have any style information associated with it'
category: '튜토리얼 / 트러블슈팅'
excerpt: '로컬 서버에서는 앱이 문제없이 작동하다가 CloudFront 배포 후 대체 도메인 이름으로 접근하려고 하면 다음과 같은 텍스트가 출력이 되는 경우가 있습니다.'
description: 'CloudFront 배포 트러블슈팅'
tags: '트러블슈팅, AWS, CloudFront'
date: '2022-07-24'
---

로컬 서버에서는 앱이 문제없이 작동하다가 CloudFront 배포 후 대체 도메인 이름으로 접근하려고 하면 다음과 같은 텍스트가 출력이 되는 경우가 있습니다.

<img src="/assets/markdown-image/Tutorial-AWS-cloudfront-도메인-에러/cloudfront_edit.png" alt="This XML file does not appear to have any style information associated with it" width='550' height='400'>

<span>CloudFront 도메인 에러</span>

도메인 에러는 트러블 슈팅할게 많지 않아 CloudFront 설정 편집 혹은 S3 버킷 설정 편집으로 대부분 해결이 가능합니다.

</br>

## CloudFront 설정

**CloudFront - 배포 - 원본**탭 접근 후 원본 편집 설정에서 **원본 도메인**을 **버킷 웹 사이트 엔드포인트**로 직접 입력해 주세요. 입력란을 클릭했을 때 나타나는 도메인으로 설정했을 경우 도메인 에러 메시지가 출력될 수 있습니다.

<img src="/assets/markdown-image/Tutorial-AWS-cloudfront-도메인-에러/cloudfront_error.png" alt="CloudFront 원본 도메인" width='600' height='400'>

<span>원본 도메인 설정</span>

> 버킷 웹 사이트 엔드포인트는 **S3 버킷 - 속성탭 하단**에서 확인이 가능합니다.
>
> 예) 엔드포인트 http://moonkorea00.com.s3-website.ap-northeast-2.amazonaws.com 를 복사 후 원본 도메인에 붙여넣기 합니다.

## S3 버킷 설정

AWS S3 **퍼블릭 액세스 차단** 기능을 해제해 주세요. S3 퍼블릭 액세스 차단 기능은 리소스에 대한 퍼블릭 액세스를 제한하는 기능이기 때문에 앱을 호스팅해서 도메인으로 접근하려면 모든 퍼블릭 액세스 차단을 해제해야 합니다.

<img src="/assets/markdown-image/Tutorial-AWS-cloudfront-도메인-에러/S3_public_access.png" alt="S3 버킷 퍼블릭 액세스 파단 편집" width='550' height='400'>

<span>퍼블릭 액세스 차단 편집(버킷 설정)</span>
