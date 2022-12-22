---
title: 'S3 CI-CD 파이프라인 구축 (Github Actions)'
category: 'AWS'
excerpt: 'S3 버킷을 사용해서 앱 배포까지 완료가 되었으면 Github Actions를 통해서 CI/CD 파이프라인을 구축합니다. 코드베이스에 변경 사항이 생길 때마다 빌드, 테스트, 배포 자동화까지 한 번에 처리합니다.'
date: '2022-07-24'
---

# S3 CI/CD w/Github Actions

&emsp;S3 버킷을 사용해서 앱 배포까지 완료가 되었으면 Github Actions를 통해서 CI/CD 파이프라인을 구축합니다. 코드베이스에 변경 사항이 생길 때마다 빌드, 테스트, 배포 자동화까지 한 번에 처리합니다.

Github Actions를 사용하기 위해서는 S3 접근 권한이 필요하기 때문에 **AWS IAM**(Identity and Access Management)으로 리소스에 대한 권한을 허용할 수 있습니다.
1. **IAM - 액세스 관리 - 사용자**탭에서 S3에 접근할 수 있도록 사용자를 새로 추가합니다.

<img src="/assets/markdown-image/AWS-s3-cicd-파이프라인-구축/add_user.png" alt="IAM 사용자 추가" width="650" height="600">
<span>IAM - 사용자 추가</span>

2. **사용자 이름** 등록 후 **액세스 키 - 프로그래밍 방식 액세스** 유형을 선택해 줍니다.

<img src="/assets/markdown-image/AWS-s3-cicd-파이프라인-구축/user_details.png" alt="IAM 사용자 세부 정보 설정" width="550" height="400">
<span>사용자 세부 정보 설정</span>

3. **권한 설정**에서 **기존 정책 직접 연결** 선택 후 **AmazonS3FullAccess**를 선택해 줍니다. CloudFront 등 기타 권한 설정이 필요한 경우 알맞게 편집합니다.

<img src="/assets/markdown-image/AWS-s3-cicd-파이프라인-구축/step2.png" alt="권한 설정" width="550" height="400">
<span>권한 설정</span>

4. 사용자 세부 정보 설정 단계까지 완료했으면 5단계까지 넘어갑니다. 사용자가 성공적으로 추가가 되었으면 사용자에 대한 **액세스 키 ID**와 **비밀 액세스 키**가 생성됩니다.

<img src="/assets/markdown-image/AWS-s3-cicd-파이프라인-구축/keys.png" alt="사용자 추가" width="550" height="400">
<span>사용자 추가</span>

5. Github Actions에서 해당 액세스 키 ID와 비밀 액세스 키를 활용해서 **Settings-Secrets-Actions**에 환경 변수로 등록해 줍니다. 아래와 같이 **AWS_ACCESS_KEY_ID**와 **AWS_SECRET_ACCESS_KEY**의 이름으로 환경 변수를 생성합니다. 해당 레포에 등록되어 있는 모든 collaborator는 secrets를 사용할 수 있습니다.

<img src="/assets/markdown-image/AWS-s3-cicd-파이프라인-구축/access-key.png" alt="Actions secrets-액세스 키 ID-비밀 액세스 키" width="550" height="400">
<span>AWS_ACCESS_KEY_ID</span>

<img src="/assets/markdown-image/AWS-s3-cicd-파이프라인-구축/secret-key.png" alt="Actions secrets-액세스 키 ID-비밀 액세스 키" width="550" height="400">
<span>AWS_SECRET_ACCESS_KEY</span>

6. 앱이 위치해있는 디렉토리에서 **.github** 폴더와 **workflows** 폴더를 생성합니다. main 브랜치에 push할 때마다 읽고 실행할 **some-script-name.yml** 파일을 만들어주세요.

```Shell
cd my-app
mkdir .github && cd "$_"
mkdir workflows && cd "&_"
touch some-script-name.yml
```

```YAML
name: some script name
on:
 push:
   branches:
     - main

jobs:
 Deploy:
   runs-on: ubuntu-latest
   steps:
     - name: Checkout
       uses: actions/checkout@v2

     - name: Setup node
       uses: actions/setup-node@v2

     - name: Install dependencies
       run: npm install

     - name: Build static file
       run: npm run build

     - name: Configure AWS Credentials
       uses: aws-actions/configure-aws-credentials@v1
       with:
         aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
         aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
         aws-region: ap-northeast-2

     - name: Deploy static site to S3 bucket
       run: aws s3 sync ./build s3://S3 버킷 이름
```

기타 환경 변수는 하단에 주석 처리된 **build s3://** 값으로는 생성한 S3 버킷 이름을 등록합니다.

> CloudFront 액세스 허용, yarn 혹은 기타 환경 변수를 등록하고 사용할 경우 그에 맞게 스크립트를 변경해 줍니다.
