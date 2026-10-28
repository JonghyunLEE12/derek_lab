# Derek Lab

공부한 내용을 Markdown으로 기록하는 한국어 개인 블로그입니다. Astro, TypeScript strict, Content Collections를 사용합니다.

## 실행

Node.js 24와 pnpm을 사용합니다.

```sh
pnpm install
pnpm dev
```

터미널에 표시되는 로컬 주소에서 확인합니다.

## 빌드 및 검사

```sh
pnpm build
pnpm astro check
pnpm preview
```

정적 사이트는 `dist/`에 생성됩니다. `/derek_lab/` 아래에 홈, `blog/`, `insights/`, `tags/`, `about/`, `rss.xml`, `sitemap-index.xml`을 제공합니다.

## 새 글 쓰기

`src/content/blog/`에 `.md` 파일을 추가합니다. 파일 이름은 글 주소가 되므로 `flutter-notes.md`처럼 영문과 하이픈을 권장합니다. 예를 들어 해당 파일은 `/derek_lab/blog/flutter-notes/`에 표시됩니다.

```markdown
---
title: '글 제목'
description: '글의 내용을 한 문장으로 요약합니다.'
pubDate: 2026-10-28
updatedDate: 2026-10-29
tags: [flutter, dart]
category: 'Flutter'
---

여기에 직접 공부한 내용을 작성합니다.

## 정리

본문을 이어서 작성합니다.
```

`title`, `description`, `pubDate`, `tags`, `category`는 필수이고 `updatedDate`는 선택입니다. 날짜는 `YYYY-MM-DD` 형식으로 작성합니다. 태그는 경로에 사용할 수 있는 짧은 단어를 권장하며, 태그가 없다면 `tags: []`로 작성합니다. 글 목록과 RSS는 작성일의 최신순으로 정렬됩니다. 홈에는 최근 글 5개가 나타납니다.

코드 블록에는 `ts`, `dart`, `sh`처럼 언어 이름을 붙이면 Astro 기본 Shiki가 구문을 강조합니다. 화면 색상은 운영체제의 밝은 모드와 어두운 모드 설정을 따릅니다.

## 인사이트 글 쓰기

`src/content/insights/`에 Markdown 파일을 추가하면 `/derek_lab/insights/파일명/`에 표시됩니다. 출처 제목은 목록과 상세에 표시되며, YouTube 출처는 영상 ID가 유효하면 개인정보 보호 강화 모드로 임베드됩니다.

```markdown
---
title: '영상에서 배운 내용'
description: '핵심 내용을 한 문장으로 요약합니다.'
pubDate: 2026-10-28
updatedDate: 2026-10-29
tags: [engineering]
source:
  title: '원본 영상 또는 글 제목'
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  author: '채널 또는 발표자'
  type: youtube
---

출처를 바탕으로 배운 내용과 자신의 생각을 작성합니다.
```

`updatedDate`와 `source.author`는 선택이고 나머지는 필수입니다. `source.type`은 `youtube`, `article`, `talk`, `book` 중 하나입니다. 인사이트 목록은 최신순이며 태그 페이지와 RSS에는 일반 글과 인사이트가 함께 나타납니다. 컬렉션에 글이 없어도 목록 페이지가 생성됩니다.

## GitHub Pages 배포

이 `blog` 폴더를 저장소 루트로 사용합니다. Node.js 24와 packageManager에 지정된 pnpm 10.34.5를 사용하며, `.github/workflows/deploy.yml`이 `main` 브랜치 push 또는 수동 실행 시 검사와 빌드 후 Pages에 배포합니다. 저장소 Settings > Pages > Build and deployment의 Source를 GitHub Actions로 설정하세요.

배포 주소는 `https://jonghyunlee12.github.io/derek_lab/`입니다. `astro.config.mjs`의 `site`는 `https://jonghyunlee12.github.io`, `base`는 `/derek_lab`입니다. 내부 링크는 `src/lib/posts.ts`의 `siteUrl()` 헬퍼와 `import.meta.env.BASE_URL`을 통해 생성합니다. 새 내부 링크나 public 정적 자원 경로도 `siteUrl('경로')`를 사용하고, Markdown 본문의 내부 링크는 `/derek_lab/` 접두사를 포함하세요. canonical, RSS, sitemap에도 배포 경로가 반영됩니다. Actions 배포이므로 `.nojekyll`은 필요하지 않습니다.

로컬 개발과 미리보기에서도 `/derek_lab/` 경로로 접속합니다.

## 주요 파일

- `src/content.config.ts`: 글 frontmatter 스키마
- `src/content/blog/`: Markdown 글
- `src/content/insights/`: 출처가 있는 인사이트 글
- `src/layouts/Base.astro`: 공통 레이아웃과 메타 정보
- `src/components/PostList.astro`: 글 목록
- `src/styles/global.css`: 타이포그래피, 모바일, 다크 모드
- `src/pages/`: 홈, 글, 태그, 소개, RSS

Content Collections 구조는 [Astro 공식 문서](https://docs.astro.build/en/guides/content-collections/)를 참고하세요.
