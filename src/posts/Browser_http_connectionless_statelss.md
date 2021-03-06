---
title: HTTP의 비연결성 무상태
category: Browser&CS
date: 2022년 3월 4일
---

# HTTP의 가장 큰 특징인 비연결성과 무상태

### 비연결성

&emsp;서버는 이 순간에도 수많은 클라이언트와 http 통신을 주고 받고 있습니다. 만약 서버가 다수의 클라이언트와 연결을 계속 유지한다면 이에 따른 엄청난 리소스가 들 뿐더러 이를 받쳐 줄 천문학적인 리소스를 유지할 수도 없을 것입니다. http에서 비연결성이란 특징은 클라이언트와 서버가 http 요청과 응답을 주고 받은 후 맺었던 연결을 끊어 버리는 성질을 말합니다.

&emsp;하지만 서버는 클라이언트를 식별할 수 없기 때문에 동일한 클라이언트의 모든 http 요청에 대해 매번 연결을 맺고 끊는 과정에서 처리 시간 및 메모리 등이 추가적으로 소모됩니다.

<img src="https://readmedata.github.io/data/http_stateless1.2.png" alt="http 비연경설 무상태" width="560" height="280"/>

<span>1.1 medium, cookie+session, https://medium.com/@maheshlsingh8412/cookie-session-story-of-a-stateless-http-3cd09cc01541</span>

</br>

### 무상태

&emsp;&emsp;http 특징인 비연결성 때문에 서버는 클라이언트의 이전 상태를 보존하지 않는데 이를 무상태(stateless)라고 합니다. 사람 간 대화를 할때 문맥이 존재하듯 클라이언트가 서버와 연결이 끊기더라도 요청과 응답을 통해 소통을 하려면 stateful 상태를 유지해야합니다. 이를테면 해당 클라이언트가 과거 웹사이트에 방문을 했었는지 또는 로그인 상태에서 사이트가 제공하는 사용자 경험을 누리기 위해서는 서버가 최소한의 상태를 유지해야합니다. 일반적으로는 브라우저 <a href="" target="_blank" rel="noreferrer"> 쿠키와 웹스토리지 등을 사용하여 상태를 유지합니다. </a>
