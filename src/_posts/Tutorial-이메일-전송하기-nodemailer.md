---
title: 'nodemailer로 이메일 전송(Zoho mail)'
category: 'Tutorial'
excerpt: 'nodemailer로 사용자에게 이메일을 보내 사용자 인증 프로세스를 처리하거나 알림의 기능이 필요한 경우의 과정을 다뤄보겠습니다. nodemailer 모듈은 발신자와 수신자 정보, 보낼 내용만 설정하여 간편하게 서드파티 앱에서 이메일을 보낼 수 있게 도와줍니다'
description: '비즈니스 계정으로 사용자에게 이메일 보내기'
tags: '튜토리얼, nodemailer, Node.js'
date: '2023-02-23'
---

# Nodemailer로 이메일 전송 : Zoho mail

&emsp;비즈니스 로직에서 사용자에게 이메일을 보내 사용자 인증 프로세스를 처리하거나 알림의 기능이 필요한 경우의 과정을 다뤄보겠습니다.

> Zoho mail 설정은 서론을 건너뛰어도 무방합니다.

&emsp;nodemailer 모듈은 <a href='https://nodemailer.com/about/' target='_blank'>공식문서</a>에 나와 있듯 'a module for Node.js applications to allow easy as cake email sending' 발신자와 수신자 정보, 보낼 내용만 설정하여 간편하게 서드파티 앱에서 이메일을 보낼 수 있게 도와줍니다.

## Gmail 계정 설정

&emsp;nodemailer를 통해서 이메일을 보내려면 유효한 이메일 계정이 필요합니다. 가장 간편한 방법으로 Gmail 계정을 발신자 계정으로 설정해서 사용할 수 있습니다. 서드파티 앱에게 접근권한을 설정하기 위해서 <a href='https://myaccount.google.com/security' target='_blank'>구글 계정</a>에 접속해 <b>보안 - Google에 로그인 - 앱 비밀번호</b> 항목에서앱 비밀번호를 발급받아 본 계정의 비밀번호 대신 사용합니다.

<img src="/assets/markdown-image/Tutorial-nodemailer/gmail_app_password.png" alt="Gmail 앱 비밀번호" width="450" height="400">

<span>1.1 Gmail 앱 비밀번호 발급</span>

> 22년 5월부로 구글에서는 'allow less secure apps' 기능을 제공하지 않습니다. Gmail을 사용할 경우 앱 비밀번호를 발급받아 사용해야 합니다.

## Nodemailer

```javascript
let transporter = nodemailer.createTransport(transport[, defaults])
```

&emsp;nodemailer는 <b>createTransport</b>함수로 SMTP 서버로 전달될 <b>transporter 객체</b>를 생성하고 이메일을 전송합니다. 첫 번째 인자로 createTransport 함수는 서버 호스트명, 이메일 프로바이더 포트번호, 발신자 인증 정보 등을 전달받는 필수 설정값들로 구성되고 이메일 전송마다 발신자와 같은 디폴트 옵션들을 객체로 전달할 수도 있습니다.

발신자의 서버 호스트(gmail)와 인증 정보가 준비되면 nodemailer에게 나머지 일을 맡깁니다.

```javascript
const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com', // 서버 호스트명
    port: 587, // SSL은 465 TLS는 587 (이메일 프로바이더에 따라 포트번호는 상이할 수 있습니다)
    secure: false, // SSL은 true TLS는 false
    auth: {
      // 발신자 인증 정보
      user: 'recipient@gmail.com', // 발신자 이메일
      pass: 'password', // 비밀번호
    },
  },
  {
    from: 'recipient@gmail.com', // 발신자 이메일
    subject: 'Email with nodemailer', // 이메일 제목
  }
);
```

> SMTP 서버는 이메일을 보내거나 받을 때 사용되고 클라이언트(Gmail)가 이메일을 보내거나 받기 위해 SMTP 서버와 통신합니다. 이메일을 전송할 때, 클라이언트는 이메일을 SMTP 서버에 전송하고, SMTP 서버는 내용을 받아서 수신자의 이메일 서버로 다시 전송합니다.

&emsp;sendMail 내장 메소드를 통해서 transporter에 발신자, 수신자, 제목 등 이메일에 담길 필수 정보들을 전달합니다. 단순 알림 이메일 또는 사용자 인증 이메일 등 이메일 성격에 따라 로직을 구상하여 html을 담아 전송합니다.

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.PASS,
  },
});

const sendNotification = async (recipientEmail: string, code: string) => {
  // 발신자, 수신자와 전송할 이메일 내용 설정
  const BUSINESS_NAME = 'moonkorea';
  const mailOptions = {
    from: `${BUSINESS_NAME} <${process.env.ADMIN_EMAIL}>`,
    to: recipientEmail, // 수신자
    subject: `${BUSINESS_NAME} : Confirmation Code`, // 제목
    text: '', // 이메일 내용
    html: `
    <div>
      <p>${BUSINESS_NAME}</p>
      <p>Confirmation Code : ${code}</p>
    </div>
    `, // 이메일 본문에 html을 담아 전송
  };
  try {
    await transporter.sendMail(mailOptions);
    // ...
  } catch (err) {
    // ...
  }
};
```

### sendMail 예외처리

&emsp;nodemailer로 sendMail 메소드의 결과에 따라 예외처리 또한 가능합니다.

```javascript
transporter.sendMail(data[, callback])
```

```javascript
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('error occured sending email:', error);
  } else {
    console.log('success:', info.response);
  }
});
```

> 수신자가 다수일 경우 한 명의 수신자에게 성공적으로 이메일 전송되더라도 성공적으로 전송된 것으로 nodemailer는 간주합니다.

### 다수에게 전송하기

&emsp;한 번의 이메일을 보낼 때마다 nodemailer는 SMTP 서버와 연결을 하고 통신을 합니다. 다수의 사용자에게 이메일을 전송할 때는 불필요하게 서버와 연결을 맺고 끊고를 반복하지 않고 pool 옵션을 추가해 한 번의 연결을 통해서 다수의 이메일을 전송할 수 있습니다.

```typescript
const transporter = nodemailer.createTransport({
  pool: true, // pooled connection
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.PASS,
  },
});
const sendNotification = async (to: string[], subject: string, date: Date) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: to.join(','),
    subject,
    text: 'notification',
    html: `<div>Your subscription expires at ${date}</div>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    // ...
  } catch (err) {
    // ...
  }
};
```

&emsp;구글은 로그인 요청이 발생할 때마다 실제 사용자가 로그인하는 패턴이 정상적인 패턴인지 보안수칙을 통해서 감지하고 서드파티 앱 또는 비정상적인 요청을 막기 때문에 예상치 못한 경우에서 에러가 발생할 여지가 있습니다. 이를테면 서버 지역이 다를 경우 개발 환경에서는 정상 기능을 하다가 프로덕션에서 인증 에러가 발생할 수 있습니다. nodemailer는 <a href='https://nodemailer.com/smtp/oauth2/' target='_blank'>OAuth2</a> 또는 기타 이메일 프로바이더의 사용을 권장합니다.

## Zoho mail로 계정 생성

&emsp;Zoho mail은 무료 티어에서도 넉넉한 스토리지를 제공합니다. 기타 이메일 클라이언트를 사용할 경우 해당 클라이언트의 도메인 이름(Gmail의 경우 user@<b>gmail</b>.com)을 사용해야 하지만 Zoho mail은 무료로 도메인 명을 기반으로 이메일을 사용할 수 있어 발신자가 관리자 또는 웹 어플리케이션일 경우 비즈니스 계정으로 사용이 가능합니다.

<!-- <details><summary>도메인 명을 이메일로 설정하기(더보기)</summary>내용</details> -->

1. Zoho에서 계정을 새로 <a href='https://www.zoho.com/mail/' target='_blank'>생성</a>합니다. 소유하고 있는 도메인을 기반으로 계정으로 생성할 거기 때문에 아래의 설정으로 진행합니다.

<img src="/assets/markdown-image/Tutorial-nodemailer/zoho-signup.png" alt="zoho 가입" width="450" height="400">

<span>2.1 Zoho 계정 생성</span>

2. 계정 생성 후 <a href='https://www.zoho.com/mail/' target='_blank'>메일 설정</a>을 계속 진행합니다. 소유하고 있는 도메인 이름과 기타 정보를 입력합니다.

<img src="/assets/markdown-image/Tutorial-nodemailer/zoho-domain.png" alt="도메인 입력" width="450" height="400">

<span>2.2 도메인 입력</span>

3. 도메인이 등록된 호스트의 도메인 설정 페이지에서 레코드를 추가합니다. 아래 2.4에서는 AWS를 예시로 <a href='https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones#' target='_blank'>Route 53</a>에서 레코드를 생성했습니다. Vercel은 <b>Dashboard - <a href='https://vercel.com/dashboard/domains' target='_blank'>Domains</a></b>에서 DNS 설정을 하고 기타 도메인 프로바이더 계정은 각 DNS 페이지(DNS Manager, DNS Control Panel 등)에서 레코드를 생성합니다.

<img src="/assets/markdown-image/Tutorial-nodemailer/zoho-dns.png" alt="레코드 추가" width="450" height="400">

<span>2.3 레코드</span>

<img src="/assets/markdown-image/Tutorial-nodemailer/route53.png" alt="route53" width="500" height="500">

<span>2.4 Route 53</span>

<img src="/assets/markdown-image/Tutorial-nodemailer/txt-record.png" alt="txt-record" width="550" height="500">

<span>2.5 레코드 추가</span>

4. 단계를 계속 진행하며 TXT와 MX 레코드를 추가합니다.

5. 도메인 이름 기반 계정을 새로 생성했으면 서드파티앱에서도 이메일을 사용할 수 있도록 two-factor authentication 설정을 합니다. TFA를 허용하면 기존 비밀번호 대신 Application Specific Password를 사용해서 인증 프로세스를 거치게 됩니다. <a href='https://mailadmin.zoho.com/cpanel/home.do#dashboard' target='_blank'>Zoho Mail Admin Console</a>에 로그인 후 <b>Security and Compliance 탭</b>에서 TFA를 허용합니다.

<img src="/assets/markdown-image/Tutorial-nodemailer/TFA.png" alt="TFA 설정" width="550" height="500">

<span>2.6 TFA 설정</span>

6. <a href='https://accounts.zoho.com/home#profile/personal' target='_blank'>Zoho Accounts</a>에 로그인 후 <b>Security - App Paswords</b>탭에서 Application Specific Password를 새로 발급받습니다.

<img src="/assets/markdown-image/Tutorial-nodemailer/TFA-password.png" alt="Application Specific Password" width="550" height="500">

<span>2.7 Application Specific Password</span>

7. 새로 생성된 비밀번호는 transporter 객체에서 사용됩니다.

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com', // 서버 호스트는 Zoho
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER, // 생성한 Zoho mail
    pass: process.env.NODEMAILER_PASS, // Application Specific Password
  },
});
```

> 설정 후 발생하는 535 서버에러는 계정 설정을 다시 확인해 주세요.

8. 보안 설정과 관련해서는 <a href='https://mailadmin.zoho.com/cpanel/home.do#securityAndCompliance/dashboard' target='_blank'>여기</a>서 권장되는 항목들에 대한 보안 상태를 제공합니다. 보안 상태를 확인한 후 여러 액션에 필요한 지침을 따라주세요.

