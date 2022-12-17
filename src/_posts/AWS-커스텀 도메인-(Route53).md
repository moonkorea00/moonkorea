---
title: '커스텀 도메인 (Route 53)'
category: 'AWS'
date: '2022-07-24'
---

# 커스텀 도메인 (Route 53)

&emsp;AWS S3를 사용해서 버킷을 생성했으면 Route 53으로 도메인을 등록합니다. Route 53으로는 도메인의 인터넷 트래픽을 라우팅할 위치를 정의하기 때문에 별칭 레코드(alias)를 생성해 IP 주소 대신 S3 웹 사이트 엔드포인트를 사용합니다. ACM(AWS Certificate Manager) 인증서없이 호스팅되기 때문에 http 프로토콜로 커스텀 도메인이 호스팅됩니다. 커스텀 도메인 설정은 트러블 슈팅할게 많지 않기에 아래 단계에서는 **moonkorea.dev**을 도메인 예제로 생성하는 방법을 알아보겠습니다.

1. <a href="https://console.aws.amazon.com/route53/" target=”_blank” rel="noreferrer">https://console.aws.amazon.com/route53/</a>에서 **호스팅 영역**(Hosted zone)을 생성해줍니다.

<img src="/assets/markdown-image/AWS-커스텀-도메인/create_hostzone.png" alt="호스팅 영역" width="650" height="550">
<span>호스팅 영역 생성</span>

2. 트래픽을 라우팅할 **도메인의 이름**을 설정해 줍니다. 호스팅 영역을 생성할 때 이미 만든 S3 버킷 이름과 동일해야 커스텀 도메인을 사용할 수 있기 때문에 호스팅 영역 이름을 S3 버킷 이름과 동일하게 생성해 줍니다.

<img src="/assets/markdown-image/AWS-커스텀-도메인/create_host_zone_detail.png" alt="호스트 영역 생성" width="650" height="450">
<span>도메인 이름 설정</span>

3. 호스팅 영역을 생성했으면 해당 호스팅 영역에 접근하고 A유형의 **레코드**(record)를 생성해 줍니다.

<img src="/assets/markdown-image/AWS-커스텀-도메인/create_record.png" alt="레코드 생성" width="650" height="450">
<span>레코드 생성</span>

4. 위에서 언급했듯 루트 도메인에 대한 레코드 이름과 S3 버킷 이름이 일치해야 라우팅이 가능해집니다. 이를테면 버킷 이름이 **www.myapp.com**이고 호스팅 영역 이름이 **myapp.com**이면 subdomain에 **www**을 추가해 줍니다. 예제에서는 S3 버킷 이름과 호스팅 영역 이름이 둘 다 moonkorea.dev이기 때문에 subdomain은 공란으로 두었습니다. 별칭(alias)을 활성화해주세요. 커스텀 도메인은 S3 엔드포인트에 대한 별칭이기 때문에 하단의 **S3 웹 사이트 엔드포인트에 대한 별칭**(Alias to S3 website endpoint)으로 설정해 줍니다. 리전까지 선택을 한 후 S3 엔드포인트를 선택해 주세요(S3 버킷 이름과 레코드 이름이 다르면 리소스를 찾을 수 없습니다). 레코드 생성 상태가 pending에서 INSYNC로 변경되면 설정한 커스텀 도메인으로 접근이 가능합니다.

<img src="/assets/markdown-image/AWS-커스텀-도메인/create_record_detail.png" alt="레코드 상세 생성" width="650" height="450">
<span>레코드 이름 및 트래픽을 라우팅할 위치 설정</span>
