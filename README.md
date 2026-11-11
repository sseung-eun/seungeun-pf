# 김승은 · IP 프로젝트 매니저 포트폴리오

HTML/CSS/JS만 사용한 정적 사이트입니다(서버·라이브러리 없음, 서체 Pretendard만 CDN 사용).

## 실행
`index.html`을 더블클릭하거나, 폴더에서 `python3 -m http.server`를 실행해 `http://localhost:8000`을 엽니다.

## GitHub Pages 배포
1. GitHub에서 새 저장소를 만들고 이 폴더의 모든 파일을 올립니다(`index.html`이 저장소 루트에 있어야 합니다).
2. Settings → Pages → Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 저장합니다.
3. 1~2분 뒤 `https://<아이디>.github.io/<저장소명>/`에서 확인합니다.

## 수정 방법 (모두 `data/portfolio.js`)
- 프로필·학력·경력·자격증: `profile`, `tables`. 나이는 생년월일로 자동 계산됩니다.
- 이메일: `config`
- 4가지 키워드: `keywords`, 핵심 역량: `competencies`, 마지막 문구: `contact`
- 프로젝트는 배열 순서대로 표시됩니다.
- 프로젝트 문구·성과 수치: `projects[]`의 각 항목
- 색: `css/style.css` 맨 위 `:root` (분홍 `--pri`, 강조 글자색 `--em`)
- 사진 비율: `projects[].ar` (예: `"4/3"`)
- 프로젝트별 사진 위치: `projects[].layout` (`left`/`right`/`top`/`bottom`), 과정 표시 방식: `steps` (`list`/`cols`/`flow`/`tl`/`rows`), 성과 표시 방식: `rstyle` (`kbs`/`stat`)
- 사진: 아래 파일명으로 저장하거나 `images[].src`/`cap`을 수정. 파일이 없으면 자리표시자가 보입니다.
  (확장자가 png 등으로 다르면 `data/portfolio.js`의 경로를 맞춰 주세요)
  - `assets/profile/profile.jpg`
  - `assets/collab-cafe/photo-1.jpg`, `photo-2.jpg` (04 콜라보 카페: 현장 조사 / 기획 결과물)
  - `assets/birthday-cafe/photo-1.jpg`, `photo-2.jpg` (01 생일카페: 공간·굿즈 / 운영)
  - `assets/bbangbbang-popup/photo-1.jpg`, `photo-2.jpg` (02 빵빵이 팝업: 현장 / 상품·진열)
  - `assets/kiddyland/photo-1.jpg`, `photo-2.jpg` (03 진열 개선: 전후 / 상품 연출)
  - `assets/mascot/photo-1.jpg`, `photo-2.jpg` (05 마스코트: 출품·투표 / 굿즈·축제)
  - `assets/esg-goods/photo-1.jpg`, `photo-2.jpg` (06 굿즈 기획안 / 동료 피드백)
