import { useState } from "react";
import type { CSSProperties } from "react";
import "./App.css";

type LinkItem = {
  name: string;
  url: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [htmlResult, setHtmlResult] = useState("");
  const [platform, setPlatform] = useState("tistory");
  const [toast, setToast] = useState("");

  const getExternalLinks = (inputTitle: string): LinkItem[] => {
    const t = inputTitle.toLowerCase();

    if (
      t.includes("지방소득세") ||
      t.includes("환급") ||
      t.includes("세금") ||
      t.includes("종합소득세") ||
      t.includes("부가세") ||
      t.includes("소득세")
    ) {
      return [
        { name: "위택스", url: "https://www.wetax.go.kr" },
        { name: "국세청 홈택스", url: "https://www.hometax.go.kr" },
        { name: "정부24", url: "https://www.gov.kr" },
      ];
    }

    if (
      t.includes("청년") ||
      t.includes("지원금") ||
      t.includes("복지") ||
      t.includes("전월세") ||
      t.includes("장려금")
    ) {
      return [
        { name: "복지로", url: "https://www.bokjiro.go.kr" },
        { name: "정부24", url: "https://www.gov.kr" },
        { name: "고용24", url: "https://www.work24.go.kr" },
      ];
    }

    if (
      t.includes("부동산") ||
      t.includes("전세") ||
      t.includes("월세") ||
      t.includes("임대차") ||
      t.includes("토지") ||
      t.includes("아파트")
    ) {
      return [
        { name: "국토교통부", url: "https://www.molit.go.kr" },
        { name: "부동산거래관리시스템", url: "https://rtms.molit.go.kr" },
        { name: "정부24", url: "https://www.gov.kr" },
      ];
    }

    if (
      t.includes("사업자") ||
      t.includes("창업") ||
      t.includes("소상공인") ||
      t.includes("자영업")
    ) {
      return [
        { name: "소상공인24", url: "https://www.sbiz24.kr" },
        { name: "중소벤처기업부", url: "https://www.mss.go.kr" },
        { name: "정부24", url: "https://www.gov.kr" },
      ];
    }

    if (
      t.includes("여행") ||
      t.includes("가볼만한곳") ||
      t.includes("관광") ||
      t.includes("축제")
    ) {
      return [
        { name: "대한민국 구석구석", url: "https://korean.visitkorea.or.kr" },
        { name: "한국관광공사", url: "https://knto.or.kr" },
        { name: "정부24", url: "https://www.gov.kr" },
      ];
    }

    return [
      {
        name: "네이버 검색",
        url: `https://search.naver.com/search.naver?query=${encodeURIComponent(inputTitle)}`,
      },
      {
        name: "구글 검색",
        url: `https://www.google.com/search?q=${encodeURIComponent(inputTitle)}`,
      },
    ];
  };
  const makeExternalLinkHTML = (links: LinkItem[]) => {
    return `
<div style="margin:34px 0; padding:22px; background:#eef6ff; border-radius:14px; border:1px solid #cfe4ff;">
  <h3 style="margin-top:0;">🔗 외부 참고 링크</h3>
  <p style="color:#555; line-height:1.8;">
    아래 링크는 제목 키워드를 기준으로 자동 추천된 공식 참고 링크입니다. 실제 글 발행 전 주제에 맞게 링크명을 수정하거나 추가해도 좋습니다.
  </p>
  ${links
    .map(
      (link) => `
  <p style="margin:12px 0;">
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="display:inline-block; padding:12px 18px; background:#2563eb; color:#fff; text-decoration:none; border-radius:10px; font-weight:bold;">
      ${link.name} 바로가기
    </a>
  </p>`
    )
    .join("\n")}
</div>`;
  };
  
  const generateHTML = () => {
    const isTistory = platform === "tistory";
    const isWordpress = platform === "wordpress";
    const isBlogger = platform === "blogger";
    
    const cleanTitle = title.trim() || "티스토리 글 제목을 입력하세요";
    const externalLinks = getExternalLinks(cleanTitle);
    const externalLinkHTML = makeExternalLinkHTML(externalLinks);
    
    
    if (isTistory) {
      let html = `
    <h2>${cleanTitle}</h2>
    
    <p>
    ${cleanTitle}에 대해 검색하는 분들은 대부분 빠르게 핵심 정보를 확인하고 싶어 합니다. 하지만 실제로 찾아보면 짧은 요약만 있거나, 공식 확인 경로와 주의사항이 함께 정리되지 않은 경우가 많습니다.
    </p>
    
    <p>
    이번 글에서는 ${cleanTitle}의 기본 개념부터 확인 방법, 핵심 체크포인트, 주의사항, FAQ, 내부링크 자리, 외부 참고 링크, 이미지 삽입 위치까지 한 번에 정리했습니다.
    </p>
    
    <figure style="margin:32px 0; text-align:center;">
      <img src="이미지주소를-여기에-넣으세요-1" alt="${cleanTitle} 대표 이미지" style="max-width:100%; border-radius:14px;" />
      <figcaption style="font-size:14px; color:#666; margin-top:8px;">${cleanTitle} 대표 이미지</figcaption>
    </figure>
    
    <div style="background:#fff8dc;padding:12px;margin:20px 0;border-radius:8px;text-align:center;">
    <!-- 애드센스 광고 위치 ① -->
    </div>
    
    <h3 style="background:#f4efe8; padding:10px; border-radius:8px;">목차</h3>
    <ol style="line-height:1.9;">
      <li>${cleanTitle}를 먼저 알아야 하는 이유</li>
      <li>핵심 내용 한눈에 정리</li>
      <li>확인 방법과 진행 순서</li>
      <li>놓치기 쉬운 주의사항</li>
      <li>이런 분들은 꼭 확인하세요</li>
      <li>자주 묻는 질문 FAQ</li>
      <li>마무리 및 참고 정보</li>
    </ol>
    
    <h3 style="background:#f4efe8; padding:10px; border-radius:8px;">1. ${cleanTitle}를 먼저 알아야 하는 이유</h3>
    
    <p>
    ${cleanTitle}는 단순히 한 가지 정보만 확인한다고 끝나는 주제가 아닐 수 있습니다. 대상 조건, 신청 기간, 처리 일정, 필요 서류, 본인 인증 방식, 기관별 안내 기준 등이 서로 연결되어 있는 경우가 많기 때문입니다.
    </p>
    
    <p>
    예를 들어 환급금이나 지원금처럼 금전과 관련된 주제라면 본인이 대상자인지, 신청을 해야 하는지, 자동으로 처리되는지, 지급일은 언제인지 확인해야 합니다. 부동산이나 생활 제도와 관련된 주제라면 적용 기준, 지역별 차이, 계약 또는 신고 절차, 관련 기관의 안내가 중요합니다.
    </p>
    
    <p>
    따라서 ${cleanTitle}를 확인할 때는 블로그 글을 참고하되, 최종 판단은 공식 기관의 안내를 기준으로 하는 것이 안전합니다. 특히 개인정보나 계좌 정보, 인증번호를 입력해야 하는 경우에는 반드시 주소창의 공식 도메인을 확인하는 습관이 필요합니다.
    </p>
    
    <h3 style="background:#f4efe8; padding:10px; border-radius:8px;">2. 핵심 내용 한눈에 정리</h3>
    
    <table style="width:100%; border-collapse:collapse; margin:24px 0; font-size:15px;">
      <tbody>
        <tr>
          <th style="border:1px solid #ddd; padding:12px; background:#f8f8f8;">구분</th>
          <th style="border:1px solid #ddd; padding:12px; background:#f8f8f8;">확인할 내용</th>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:12px;">주제</td>
          <td style="border:1px solid #ddd; padding:12px;">${cleanTitle}</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:12px;">대상 여부</td>
          <td style="border:1px solid #ddd; padding:12px;">본인에게 해당되는 조건이 있는지 확인</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:12px;">확인 경로</td>
          <td style="border:1px solid #ddd; padding:12px;">공식 홈페이지, 관할 기관, 고객센터, 안내문</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:12px;">필요 정보</td>
          <td style="border:1px solid #ddd; padding:12px;">본인 인증, 신청 내역, 신고 내역, 계좌 정보, 접수번호 등</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd; padding:12px;">주의사항</td>
          <td style="border:1px solid #ddd; padding:12px;">최신 기준 확인, 개인정보 입력 주의, 비공식 링크 주의</td>
        </tr>
      </tbody>
    </table>
    
    <p>
    위 표는 ${cleanTitle}를 확인할 때 기본적으로 살펴보면 좋은 항목입니다. 실제 내용은 주제에 따라 달라질 수 있지만, 대부분의 정보성 글에서는 대상, 방법, 일정, 주의사항, 공식 링크를 함께 정리하면 독자가 이해하기 쉽습니다.
    </p>
    
    <figure style="margin:32px 0; text-align:center;">
      <img src="이미지주소를-여기에-넣으세요-2" alt="${cleanTitle} 핵심 정리 이미지" style="max-width:100%; border-radius:14px;" />
      <figcaption style="font-size:14px; color:#666; margin-top:8px;">${cleanTitle} 핵심 내용 정리</figcaption>
    </figure>
    
    <div style="background:#fff8dc;padding:12px;margin:20px 0;border-radius:8px;text-align:center;">
    <!-- 애드센스 광고 위치 ② -->
    </div>
    
    <h3 style="background:#f4efe8; padding:10px; border-radius:8px;">3. 확인 방법과 진행 순서</h3>
    
    <p>
    가장 먼저 해야 할 일은 공식 홈페이지 또는 관련 기관 안내 페이지를 확인하는 것입니다. 검색 결과에 나온 글만 보고 판단하면 오래된 기준이나 개인적인 경험담을 최신 정보로 착각할 수 있습니다.
    </p>
    
    <p>
    보통은 본인 인증을 거친 뒤 조회 메뉴에서 결과를 확인하거나, 신청 내역 또는 처리 상태를 확인하는 방식으로 진행됩니다. 만약 신청 기간이 정해져 있는 제도라면 기간 내 접수 여부가 중요하고, 환급이나 지급 관련 내용이라면 계좌 정보와 처리 일정을 함께 확인해야 합니다.
    </p>
    
    <p>
    또한 지역별로 처리 일정이 다르거나 기관별로 문의 창구가 다른 경우도 있습니다. 이럴 때는 대표 홈페이지에서 기본 정보를 확인한 뒤, 본인의 주소지나 사업장 소재지에 해당하는 관할 기관에 문의하는 것이 더 정확합니다.
    </p>
    
    ${externalLinks.length > 0 ? externalLinkHTML : ""}
    
    <figure style="margin:32px 0; text-align:center;">
      <img src="이미지주소를-여기에-넣으세요-3" alt="${cleanTitle} 확인 방법 이미지" style="max-width:100%; border-radius:14px;" />
      <figcaption style="font-size:14px; color:#666; margin-top:8px;">${cleanTitle} 확인 방법</figcaption>
    </figure>
    
    <h3 style="background:#f4efe8; padding:10px; border-radius:8px;">4. 놓치기 쉬운 주의사항</h3>
    
    <p>
    ${cleanTitle}와 관련된 정보를 확인할 때 가장 조심해야 할 부분은 비공식 링크입니다. 문자나 메신저로 받은 링크를 무심코 클릭하면 개인정보 입력 화면으로 연결될 수 있습니다.
    </p>
    
    <p>
    또한 신청 조건이나 지급 기준은 해마다 바뀔 수 있습니다. 작년에 가능했던 내용이 올해는 달라질 수 있고, 같은 주제라도 지역이나 소득, 나이, 세대 구성, 신고 내역에 따라 결과가 달라질 수 있습니다.
    </p>
    
    <p>
    블로그 글을 작성하는 입장에서도 이 부분은 중요합니다. 독자가 오해하지 않도록 “최신 정보는 공식 홈페이지를 확인하세요”, “개인별 상황에 따라 결과가 다를 수 있습니다”와 같은 안내문을 넣어주면 글의 신뢰도를 높일 수 있습니다.
    </p>
    
    <figure style="margin:32px 0; text-align:center;">
      <img src="이미지주소를-여기에-넣으세요-4" alt="${cleanTitle} 주의사항 이미지" style="max-width:100%; border-radius:14px;" />
      <figcaption style="font-size:14px; color:#666; margin-top:8px;">${cleanTitle} 확인 시 주의사항</figcaption>
    </figure>
    
    <h3 style="background:#f4efe8; padding:10px; border-radius:8px;">5. 이런 분들은 꼭 확인하세요</h3>
    
    <ul style="line-height:1.9;">
      <li>${cleanTitle}와 관련된 대상 여부가 궁금한 분</li>
      <li>신청 방법이나 조회 방법을 한 번에 정리하고 싶은 분</li>
      <li>공식 링크와 참고 정보를 함께 확인하고 싶은 분</li>
      <li>비슷한 제도나 관련 글까지 함께 보고 싶은 분</li>
      <li>처리 일정이나 지급 여부를 놓치고 싶지 않은 분</li>
    </ul>
    
    <p>
    특히 ${cleanTitle}처럼 실생활과 직접 연결되는 주제는 독자가 빠르게 답을 찾고 싶어 하는 경우가 많습니다. 그래서 글을 작성할 때는 어려운 설명보다 “누가 확인해야 하는지”, “어디서 확인해야 하는지”, “무엇을 조심해야 하는지”를 먼저 알려주는 구성이 좋습니다.
    </p>
    
    <div style="margin:40px 0; padding:24px; background:#fff7ed; border-radius:14px; border:1px solid #fed7aa;">
      <h3 style="margin-top:0;">📌 함께 보면 좋은 글</h3>
      <ul style="padding-left:20px; line-height:1.9;">
        <li><a href="내부링크주소-1">${cleanTitle} 신청 방법 자세히 보기</a></li>
        <li><a href="내부링크주소-2">${cleanTitle} 대상자 확인 방법</a></li>
        <li><a href="내부링크주소-3">${cleanTitle} 주의사항과 최신 정보</a></li>
      </ul>
    </div>
    
    <h3 style="background:#f4efe8; padding:10px; border-radius:8px;">6. 자주 묻는 질문 FAQ</h3>
    
    <p><strong>Q. ${cleanTitle}는 어디서 확인하나요?</strong></p>
    <p>
    A. 관련 기관 공식 홈페이지나 공공기관 안내 페이지에서 확인하는 것이 가장 정확합니다. 블로그 글은 전체 흐름을 이해하는 참고 자료로 활용하는 것이 좋습니다.
    </p>
    
    <p><strong>Q. 신청 조건은 모두 같은가요?</strong></p>
    <p>
    A. 아닙니다. 개인 상황, 지역, 소득, 나이, 신청 기간, 제출 서류 등에 따라 달라질 수 있습니다. 반드시 본인의 조건을 기준으로 다시 확인해야 합니다.
    </p>
    
    <p><strong>Q. 오래된 글을 참고해도 괜찮나요?</strong></p>
    <p>
    A. 오래된 글은 현재 기준과 다를 수 있습니다. 특히 지급일, 환급일, 신청 기간, 제출 서류, 대상 조건은 변경될 수 있으므로 최신 공지를 확인해야 합니다.
    </p>
    
    <figure style="margin:32px 0; text-align:center;">
      <img src="이미지주소를-여기에-넣으세요-5" alt="${cleanTitle} FAQ 이미지" style="max-width:100%; border-radius:14px;" />
      <figcaption style="font-size:14px; color:#666; margin-top:8px;">${cleanTitle} 자주 묻는 질문</figcaption>
    </figure>
    
    <h3 style="background:#f4efe8; padding:10px; border-radius:8px;">마무리</h3>
    
    <p>
    지금까지 ${cleanTitle}에 대해 정리했습니다. 핵심은 단순히 정보를 읽는 데서 끝나는 것이 아니라, 본인에게 실제로 해당되는지 공식 경로를 통해 확인하는 것입니다.
    </p>
    
    <p>
    이 글은 전체적인 이해를 돕기 위한 정보성 글입니다. 실제 신청 조건, 처리 일정, 제출 서류, 지급 여부 등은 관련 기관의 최신 안내를 반드시 확인하시기 바랍니다. 글을 발행하기 전에는 외부 참고 링크와 내부링크 주소를 주제에 맞게 수정한 뒤 사용하는 것을 추천합니다.
    </p>
    
    <div style="background:#fff8dc;padding:12px;margin:20px 0;border-radius:8px;text-align:center;">
    <!-- 애드센스 광고 위치 ③ -->
    </div>
    
    <div style="margin:40px 0; padding:20px; background:#f1f5f9; border-radius:12px;">
      <h3 style="margin-top:0;">검색 설명</h3>
      <p style="line-height:1.8;">
        ${cleanTitle} 핵심 정보, 확인 방법, 대상 조건, 주의사항, 공식 참고 링크와 FAQ를 한 번에 정리한 정보성 가이드입니다.
      </p>
    
      <h3>추천 태그</h3>
      <p style="line-height:1.8;">
        ${cleanTitle}, ${cleanTitle} 확인, ${cleanTitle} 방법, ${cleanTitle} 대상자, ${cleanTitle} 신청, 생활정보, 정부지원, 애드센스
      </p>
    
      <h3>이미지 프롬프트</h3>
      <p style="line-height:1.8;">
        ${cleanTitle} concept, realistic korean lifestyle blog image, clean composition, professional informational blog thumbnail, bright natural light, high quality, 16:9
      </p>
    </div>
    `;
    
      setHtmlResult(html.trim());
      return;
    }
  if (isWordpress) {
    const wordpressHtml = `
  <h2>${cleanTitle}</h2>
  
  <div style="background:#f8fafc;padding:18px;margin:20px 0;border-radius:12px;border:1px solid #e5e7eb;">
  <strong>포커스 키워드</strong><br/>
  ${cleanTitle}<br/><br/>
  
  <strong>SEO 제목</strong><br/>
  ${cleanTitle} 총정리 | 확인 방법부터 주의사항까지 한눈에<br/><br/>
  
  <strong>슬러그</strong><br/>
  ${cleanTitle.toLowerCase().replace(/\s+/g, "-")}<br/><br/>
  
  <strong>메타 설명</strong><br/>
  ${cleanTitle}에 대한 핵심 개념, 확인 방법, 대상 조건, 주의사항, FAQ를 정리한 워드프레스 SEO 최적화 글입니다.
  </div>
  
  <p>
  ${cleanTitle}에 대해 검색하는 분들은 대부분 빠르게 핵심 정보를 확인하고 싶어 합니다. 하지만 실제로 찾아보면 비슷한 내용이 반복되거나, 어디에서 확인해야 하는지 명확하지 않은 경우가 많습니다.
  </p>
  
  <p>
  이 글에서는 ${cleanTitle}와 관련해 기본 개념부터 확인 방법, 대상 조건, 주의사항, 자주 묻는 질문까지 한 번에 정리했습니다.
  </p>
  
  <h3>목차</h3>
  <ol>
    <li>${cleanTitle} 개요</li>
    <li>왜 많은 사람들이 관심을 가질까?</li>
    <li>확인 방법</li>
    <li>대상 조건 및 필요 정보</li>
    <li>주의사항</li>
    <li>자주 묻는 질문</li>
    <li>마무리</li>
  </ol>
  
  <h3>1. ${cleanTitle} 개요</h3>
  <p>
  ${cleanTitle}는 생활, 세금, 복지, 부동산, 지원 제도 등 다양한 분야에서 사람들이 자주 검색하는 정보성 주제입니다. 특히 금전, 신청, 조회, 환급, 신고, 자격 요건과 연결되는 경우에는 정확한 확인이 중요합니다.
  </p>
  
  <p>
  단순히 블로그 글 하나만 보고 판단하기보다는 전체 흐름을 이해한 뒤 공식 홈페이지나 관련 기관 안내를 함께 확인하는 것이 안전합니다.
  </p>
  
  <h3>2. 왜 많은 사람들이 ${cleanTitle}를 검색할까?</h3>
  <p>
  많은 사람들이 ${cleanTitle}를 검색하는 이유는 본인에게 직접적인 영향을 줄 수 있기 때문입니다. 예를 들어 신청 여부, 환급 가능성, 대상 조건, 처리 일정, 제출 서류, 지급 여부 등은 실생활과 바로 연결됩니다.
  </p>
  
  <p>
  특히 제도나 정책과 관련된 내용은 해마다 기준이 바뀔 수 있고, 지역이나 개인 조건에 따라 결과가 달라질 수 있습니다.
  </p>
  
  <h3>3. 핵심 내용 한눈에 보기</h3>
  
  <table style="width:100%;border-collapse:collapse;margin:24px 0;">
    <tbody>
      <tr>
        <th style="border:1px solid #ddd;padding:12px;background:#f8f8f8;">구분</th>
        <th style="border:1px solid #ddd;padding:12px;background:#f8f8f8;">내용</th>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;padding:12px;">주제</td>
        <td style="border:1px solid #ddd;padding:12px;">${cleanTitle}</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;padding:12px;">확인 경로</td>
        <td style="border:1px solid #ddd;padding:12px;">공식 홈페이지, 관련 기관, 고객센터, 공지사항</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;padding:12px;">필요 정보</td>
        <td style="border:1px solid #ddd;padding:12px;">본인 인증, 신청 내역, 접수번호, 계좌 정보, 관련 서류</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;padding:12px;">주의사항</td>
        <td style="border:1px solid #ddd;padding:12px;">최신 기준 확인, 비공식 링크 주의, 개인정보 입력 주의</td>
      </tr>
    </tbody>
  </table>
  
  <h3>4. ${cleanTitle} 확인 방법</h3>
  <p>
  가장 먼저 공식 홈페이지 또는 관련 기관 안내 페이지를 확인하는 것이 좋습니다. 검색 결과에 나온 글은 전체적인 흐름을 이해하는 데 도움이 되지만, 실제 신청이나 조회는 공식 경로를 기준으로 해야 합니다.
  </p>
  
  <p>
  보통은 본인 인증 후 조회 메뉴에서 결과를 확인하거나, 신청 내역과 처리 상태를 확인하는 방식으로 진행됩니다.
  </p>
  
  <h3>5. 대상 조건과 필요 정보</h3>
  <p>
  ${cleanTitle}와 관련된 대상 조건은 주제에 따라 달라질 수 있습니다. 나이, 소득, 거주지, 사업자 여부, 신고 내역, 신청 기간, 제출 서류 등이 기준이 될 수 있습니다.
  </p>
  
  <p>
  따라서 글을 읽은 뒤에는 본인의 상황에 맞는 조건을 다시 확인하는 것이 중요합니다.
  </p>
  
  <h3>6. 꼭 알아야 할 주의사항</h3>
  <p>
  ${cleanTitle} 정보를 확인할 때는 비공식 링크를 조심해야 합니다. 문자나 메신저로 받은 링크를 클릭하기 전에 반드시 공식 도메인인지 확인해야 합니다.
  </p>
  
  <p>
  또한 신청 기간이나 처리 일정은 변경될 수 있으므로 오래된 글만 보고 판단하지 않는 것이 좋습니다.
  </p>
  
  ${externalLinks.length > 0 ? externalLinkHTML : ""}
  
  
  <h3>자주 묻는 질문</h3>
  
  <p><strong>Q. ${cleanTitle}는 어디서 확인하나요?</strong><br/>
  A. 관련 기관 공식 홈페이지나 공공기관 안내 페이지에서 확인하는 것이 가장 정확합니다.</p>
  
  <p><strong>Q. 블로그 글만 보고 판단해도 되나요?</strong><br/>
  A. 블로그 글은 참고용으로 보고, 최종 확인은 공식 안내를 기준으로 하는 것이 안전합니다.</p>
  
  <p><strong>Q. 신청 조건은 모두 같은가요?</strong><br/>
  A. 아닙니다. 개인 상황, 지역, 소득, 신청 기간 등에 따라 달라질 수 있습니다.</p>
  
  <h3>내부링크 추천</h3>
  <p>
  - ${cleanTitle} 신청 방법<br/>
  - ${cleanTitle} 대상자 확인<br/>
  - ${cleanTitle} 주의사항<br/>
  - ${cleanTitle} 최신 정보
  </p>
  
  <h3>추천 태그</h3>
  <p>
  ${cleanTitle}, ${cleanTitle} 정보, ${cleanTitle} 확인, ${cleanTitle} 방법, 워드프레스 SEO, 검색엔진최적화, 생활정보, 정부지원
  </p>
  
  <h3>마무리</h3>
  <p>
  지금까지 ${cleanTitle}에 대해 정리했습니다. 핵심은 검색 결과만 보고 판단하지 말고, 본인에게 실제로 해당되는지 공식 경로를 통해 확인하는 것입니다.
  </p>
  
  <p>
  이 글은 정보 제공을 목적으로 작성된 글입니다. 실제 신청 조건, 제출 서류, 처리 일정, 지급 여부 등은 관련 기관의 최신 안내를 반드시 확인하시기 바랍니다.
  </p>
  `;
    setHtmlResult(wordpressHtml.trim());
    return;
  }
  if (isBlogger) {
    const bloggerHtml = `
  <h2>${cleanTitle}</h2>
  
  <div style="background:#fff7ed;padding:18px;margin:20px 0;border-radius:12px;border:1px solid #fed7aa;">
  <strong>검색 키워드</strong><br/>
  ${cleanTitle}<br/><br/>
  
  <strong>검색 설명</strong><br/>
  ${cleanTitle}에 대한 핵심 개념, 확인 방법, 대상 조건, 주의사항, FAQ를 정리한 구글 검색 노출형 블로거 글입니다.<br/><br/>
  
  <strong>관련 검색어</strong><br/>
  ${cleanTitle} 신청방법, ${cleanTitle} 대상자, ${cleanTitle} 조건, ${cleanTitle} 확인방법, ${cleanTitle} 주의사항
  </div>
  
  <p>
  ${cleanTitle}에 대해 궁금해서 검색하는 분들이 많습니다. 하지만 실제로 정보를 찾아보면 내용이 너무 짧거나, 어디에서 확인해야 하는지 명확하지 않은 경우가 많습니다.
  </p>
  
  <p>
  이번 글에서는 ${cleanTitle}의 기본 개념부터 확인 방법, 대상 조건, 주의사항, 자주 묻는 질문까지 구글 검색에 잘 맞는 구조로 정리했습니다.
  </p>
  
  <h3>목차</h3>
  <ol>
    <li>${cleanTitle}란?</li>
    <li>왜 관심이 많을까?</li>
    <li>핵심 내용 정리</li>
    <li>확인 방법</li>
    <li>대상 조건</li>
    <li>주의사항</li>
    <li>FAQ</li>
    <li>마무리</li>
  </ol>
  
  <h3>1. ${cleanTitle}란?</h3>
  <p>
  ${cleanTitle}는 생활 정보, 세금, 복지, 부동산, 지원 제도, 신청 및 조회 서비스 등과 연결될 수 있는 정보성 주제입니다.
  </p>
  
  <p>
  특히 본인의 자격 여부, 신청 가능성, 환급 여부, 지급 일정, 처리 상태 등을 확인해야 하는 경우에는 정확한 정보 확인이 중요합니다.
  </p>
  
  <h3>2. 왜 많은 사람들이 ${cleanTitle}를 찾을까?</h3>
  <p>
  많은 사람들이 ${cleanTitle}를 검색하는 이유는 실생활과 직접 연결되기 때문입니다. 단순한 정보가 아니라 본인에게 금전적 이익이나 행정 처리, 신청 기회와 관련될 수 있습니다.
  </p>
  
  <p>
  그래서 글을 읽는 사람은 빠르게 핵심을 알고 싶어 하고, 어디서 확인해야 하는지 바로 알고 싶어 합니다.
  </p>
  
  <h3>3. 핵심 내용 한눈에 보기</h3>
  
  <table style="width:100%;border-collapse:collapse;margin:24px 0;">
    <tbody>
      <tr>
        <th style="border:1px solid #ddd;padding:12px;background:#f8f8f8;">구분</th>
        <th style="border:1px solid #ddd;padding:12px;background:#f8f8f8;">확인 내용</th>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;padding:12px;">주제</td>
        <td style="border:1px solid #ddd;padding:12px;">${cleanTitle}</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;padding:12px;">확인 경로</td>
        <td style="border:1px solid #ddd;padding:12px;">공식 홈페이지, 관련 기관, 고객센터, 공지사항</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;padding:12px;">필요 정보</td>
        <td style="border:1px solid #ddd;padding:12px;">본인 인증, 신청 내역, 접수번호, 계좌 정보, 제출 서류</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;padding:12px;">주의사항</td>
        <td style="border:1px solid #ddd;padding:12px;">최신 기준 확인, 비공식 링크 주의, 개인정보 입력 주의</td>
      </tr>
    </tbody>
  </table>
  
  <h3>4. ${cleanTitle} 확인 방법</h3>
  <p>
  ${cleanTitle}를 확인할 때는 먼저 공식 홈페이지나 관련 기관 안내 페이지를 참고하는 것이 좋습니다.
  </p>
  
  <p>
  검색 결과에 나온 블로그 글은 전체 흐름을 이해하는 데 도움이 되지만, 실제 신청이나 조회는 반드시 공식 경로에서 진행하는 것이 안전합니다.
  </p>
  
  ${externalLinks.length > 0 ? externalLinkHTML : ""}
  
  
  <h3>5. 대상 조건은 어떻게 확인할까?</h3>
  <p>
  ${cleanTitle}와 관련된 대상 조건은 주제에 따라 다릅니다. 나이, 소득, 거주지, 사업자 여부, 신고 내역, 신청 기간, 제출 서류 등이 기준이 될 수 있습니다.
  </p>
  
  <p>
  따라서 단순히 글에 나온 내용만 보고 판단하기보다는 본인의 상황에 맞게 다시 확인하는 것이 중요합니다.
  </p>
  
  <h3>6. 꼭 알아야 할 주의사항</h3>
  <p>
  가장 조심해야 할 부분은 비공식 링크입니다. 문자나 메신저로 받은 링크를 클릭하기 전에 공식 사이트인지 반드시 확인해야 합니다.
  </p>
  
  <p>
  또한 신청 기간, 처리 일정, 제출 서류, 지급 여부는 변경될 수 있습니다. 오래된 글만 보고 판단하면 실제 기준과 다를 수 있습니다.
  </p>
  
  <h3>자주 묻는 질문</h3>
  
  <p><strong>Q. ${cleanTitle}는 어디서 확인하나요?</strong><br/>
  A. 관련 기관 공식 홈페이지 또는 공공기관 안내 페이지에서 확인하는 것이 가장 정확합니다.</p>
  
  <p><strong>Q. 신청 조건은 모두 같은가요?</strong><br/>
  A. 아닙니다. 개인 상황, 지역, 소득, 신청 기간 등에 따라 달라질 수 있습니다.</p>
  
  <p><strong>Q. 블로그 글만 보고 판단해도 되나요?</strong><br/>
  A. 블로그 글은 참고용으로 보고, 최종 확인은 공식 안내를 기준으로 하는 것이 안전합니다.</p>
  
  <h3>관련 글 추천</h3>
  <p>
  - ${cleanTitle} 신청 방법<br/>
  - ${cleanTitle} 대상자 확인<br/>
  - ${cleanTitle} 주의사항<br/>
  - ${cleanTitle} 최신 공고
  </p>
  
  <h3>라벨 추천</h3>
  <p>
  ${cleanTitle}, 생활정보, 정부지원, 신청방법, 확인방법, 구글노출, 블로거
  </p>
  
  <h3>마무리</h3>
  <p>
  지금까지 ${cleanTitle}에 대해 정리했습니다. 핵심은 검색 결과만 보고 판단하지 말고, 본인에게 실제로 해당되는지 공식 경로를 통해 확인하는 것입니다.
  </p>
  
  <p>
  이 글은 정보 제공을 목적으로 작성된 글입니다. 실제 신청 조건, 처리 일정, 제출 서류, 지급 여부 등은 관련 기관의 최신 안내를 반드시 확인하시기 바랍니다.
  </p>
  `;
    setHtmlResult(bloggerHtml.trim());
    return;
  }
    
    const naverHtml = `
    <h2>${cleanTitle}</h2>
    
    <p><strong>네이버 유입 중심 블로그 글 구조입니다.</strong></p>
    
    <p>
    ${cleanTitle}에 대해 궁금하신 분들이 많습니다. 막상 찾아보면 정보는 많은데, 어떤 내용이 핵심인지 한눈에 들어오지 않는 경우가 많습니다.
    </p>
    
    <p>
    이번 글에서는 ${cleanTitle}를 처음 알아보는 분들도 쉽게 이해할 수 있도록 기본 개념, 확인 방법, 주의사항, 실전 팁까지 차근차근 정리해보겠습니다.
    </p>
    
    <figure style="margin:32px 0;text-align:center;">
      <img src="이미지주소를-여기에-넣으세요-1" alt="${cleanTitle} 대표 이미지" style="max-width:100%;border-radius:14px;" />
      <figcaption style="font-size:14px;color:#666;margin-top:8px;">${cleanTitle} 대표 이미지</figcaption>
    </figure>
    
    <h3>1. 왜 ${cleanTitle}에 관심이 많을까요?</h3>
    <p>
    ${cleanTitle}는 단순한 검색어가 아니라 실제 생활과 연결되는 경우가 많습니다. 신청, 조회, 환급, 지원, 계약, 확인 절차처럼 개인에게 직접 영향을 줄 수 있는 내용과 관련될 수 있기 때문입니다.
    </p>
    
    <p>
    그래서 많은 분들이 “내가 해당되는지”, “어디서 확인해야 하는지”, “언제까지 해야 하는지”를 가장 궁금해합니다.
    </p>
    
    <h3>2. 핵심 내용 한눈에 정리</h3>
    
    <table style="width:100%;border-collapse:collapse;margin:24px 0;">
      <tbody>
        <tr>
          <th style="border:1px solid #ddd;padding:12px;background:#f8f8f8;">구분</th>
          <th style="border:1px solid #ddd;padding:12px;background:#f8f8f8;">내용</th>
        </tr>
        <tr>
          <td style="border:1px solid #ddd;padding:12px;">주제</td>
          <td style="border:1px solid #ddd;padding:12px;">${cleanTitle}</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd;padding:12px;">확인 포인트</td>
          <td style="border:1px solid #ddd;padding:12px;">대상 여부, 신청 방법, 필요 서류, 처리 일정</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd;padding:12px;">추천 확인 경로</td>
          <td style="border:1px solid #ddd;padding:12px;">공식 홈페이지, 관련 기관, 고객센터, 공지사항</td>
        </tr>
        <tr>
          <td style="border:1px solid #ddd;padding:12px;">주의사항</td>
          <td style="border:1px solid #ddd;padding:12px;">최신 기준 확인, 비공식 링크 주의, 개인정보 입력 주의</td>
        </tr>
      </tbody>
    </table>
    
    <h3>3. ${cleanTitle} 확인 방법</h3>
    <p>
    가장 먼저 확인해야 할 것은 공식 홈페이지나 관련 기관의 안내입니다. 블로그 글은 전체 흐름을 이해하는 데 도움이 되지만, 실제 신청이나 조회는 공식 경로를 기준으로 해야 합니다.
    </p>
    
    <p>
    특히 본인 인증, 계좌 정보, 신청 내역, 접수번호 등이 필요한 경우에는 주소창의 도메인을 꼭 확인하는 것이 좋습니다.
    </p>
    
    ${externalLinks.length > 0 ? externalLinkHTML : ""}
    
    
    <figure style="margin:32px 0;text-align:center;">
      <img src="이미지주소를-여기에-넣으세요-2" alt="${cleanTitle} 확인 방법 이미지" style="max-width:100%;border-radius:14px;" />
      <figcaption style="font-size:14px;color:#666;margin-top:8px;">${cleanTitle} 확인 방법</figcaption>
    </figure>
    
    <h3>4. 이런 분들은 꼭 확인해보세요</h3>
    <ul style="line-height:1.9;">
      <li>${cleanTitle} 대상 여부가 궁금한 분</li>
      <li>신청 방법이나 조회 방법을 쉽게 알고 싶은 분</li>
      <li>공식 링크와 참고 정보를 함께 확인하고 싶은 분</li>
      <li>처리 일정이나 지급 여부를 놓치고 싶지 않은 분</li>
      <li>비슷한 제도나 관련 정보를 함께 보고 싶은 분</li>
    </ul>
    
    <h3>5. 실제로 확인할 때 주의할 점</h3>
    <p>
    ${cleanTitle} 관련 정보를 확인할 때 가장 주의해야 할 부분은 오래된 정보와 비공식 링크입니다. 예전 기준으로 작성된 글은 현재 기준과 다를 수 있고, 문자나 메신저로 받은 링크는 공식 사이트가 아닐 수 있습니다.
    </p>
    
    <p>
    따라서 글을 참고하더라도 최종 확인은 반드시 공식 안내를 기준으로 하는 것이 안전합니다.
    </p>
    
    <h3>6. 네이버 블로그 글 작성 팁</h3>
    <p>
    네이버 블로그에서는 너무 딱딱한 설명만 나열하기보다, 독자가 실제로 궁금해하는 상황을 먼저 풀어주는 방식이 좋습니다.
    </p>
    
    <p>
    예를 들어 “저도 처음에는 어디서 확인해야 하는지 헷갈렸습니다”처럼 자연스럽게 시작하면 체류시간을 늘리는 데 도움이 됩니다.
    </p>
    
    <figure style="margin:32px 0;text-align:center;">
      <img src="이미지주소를-여기에-넣으세요-3" alt="${cleanTitle} 정리 이미지" style="max-width:100%;border-radius:14px;" />
      <figcaption style="font-size:14px;color:#666;margin-top:8px;">${cleanTitle} 핵심 정리</figcaption>
    </figure>
    
    <h3>자주 묻는 질문</h3>
    
    <p><strong>Q. ${cleanTitle}는 어디서 확인하면 좋나요?</strong><br/>
    A. 공식 홈페이지나 관련 기관 안내 페이지를 기준으로 확인하는 것이 가장 정확합니다.</p>
    
    <p><strong>Q. 블로그 글만 보고 판단해도 되나요?</strong><br/>
    A. 블로그 글은 참고용으로 보고, 실제 신청이나 조회는 공식 경로를 이용하는 것이 좋습니다.</p>
    
    <p><strong>Q. 기준이 바뀔 수도 있나요?</strong><br/>
    A. 네, 신청 기간, 대상 조건, 제출 서류, 처리 일정은 변경될 수 있습니다.</p>
    
    <h3>댓글로 남겨주세요</h3>
    <p>
    ${cleanTitle}와 관련해 궁금한 점이나 직접 확인하면서 헷갈렸던 부분이 있다면 댓글로 남겨주세요. 비슷한 주제로 추가 정리 글을 작성할 때 참고하겠습니다.
    </p>
    
    <h3>마무리</h3>
    <p>
    지금까지 ${cleanTitle}에 대해 정리했습니다. 핵심은 정보를 빠르게 읽는 것보다, 본인에게 실제로 해당되는지 정확히 확인하는 것입니다.
    </p>
    
    <p>
    이 글은 정보 제공을 목적으로 작성된 글입니다. 실제 조건, 신청 기간, 제출 서류, 처리 일정 등은 관련 기관의 최신 안내를 반드시 확인하시기 바랍니다.
    </p>
    `;
    
    setHtmlResult(naverHtml.trim());
    return;
    };
    const copyHTML = async () => {
      if (!htmlResult) return;
    
      await navigator.clipboard.writeText(htmlResult);
      setToast("✅ HTML 복사 완료");
    
      setTimeout(() => {
        setToast("");
      }, 2000);
    };

    const resetAll = () => {
    setTitle("");
    setHtmlResult("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div>
            <div style={styles.badge}>MULTI BLOG AI TOOL</div>
            <h1 style={styles.title}>멀티 블로그 콘텐츠 AI</h1>
            <p style={styles.subtitle}>
          티스토리 애드센스 수익형 · 워드프레스 SEO형 · 블로거 구글노출형 ·
          네이버 유입형 콘텐츠를 자동 생성합니다.
            
            </p>
          </div>

          <div style={styles.statusBox}>
            <span style={styles.statusDot}></span>
            제목 입력 방식
          </div>
        </header>

        <main style={styles.grid}>
          <section style={styles.leftPanel}>
            <div style={styles.panelHeader}>
              <div>
                <div style={styles.sectionNumber}>STEP 01</div>
                <h2 style={styles.panelTitle}>제목만 입력하세요</h2>
                <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
  {[
     { id: "tistory", label: "티스토리 애드센스형" },
     { id: "wordpress", label: "워드프레스 SEO형" },
     { id: "blogger", label: "블로거 구글노출형" },
     { id: "naver", label: "네이버 유입형" },
  ].map((item) => (
    <button
      key={item.id}
      type="button"
      onClick={() => setPlatform(item.id)}
      style={{
        padding: "8px 12px",
        borderRadius: "999px",
        border: platform === item.id ? "2px solid #2563eb" : "1px solid #d1d5db",
        background: platform === item.id ? "#2563eb" : "#ffffff",
        color: platform === item.id ? "#ffffff" : "#111827",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {item.label}
    </button>
  ))}
</div>
              </div>
              <p style={{ marginTop: "10px", color: "#64748b" }}>
              {platform === "tistory" && "애드센스 수익형 HTML 콘텐츠 생성"}
              {platform === "wordpress" && "SEO 최적화 제목·메타설명·본문 생성"}
              {platform === "blogger" && "구글 검색 노출형 콘텐츠 생성"}
              {platform === "naver" && "유입·신뢰 확보형 네이버 콘텐츠 생성"}
</p>
              <div style={styles.miniBadge}>간편 생성</div>
            </div>

            <label style={styles.label}>글 제목</label>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 개인지방소득세 환급금 조회방법과 입금일 정리"
            />

<div style={styles.infoBox}>
  <strong>자동 생성되는 구성</strong>

  {platform === "tistory" && (
  <ul>
    <li>애드센스 수익형 제목 구조</li>
    <li>검색 유입형 도입부</li>
    <li>공백 제외 2,000~3,000자 본문</li>
    <li>목차 자동 생성</li>
    <li>H2/H3 소제목 구성</li>
    <li>표 정리</li>
    <li>FAQ 자동 생성</li>
    <li>이미지 삽입 위치 5곳</li>
    <li>내부링크 3곳</li>
    <li>외부링크 자동 추천</li>
    <li>메타설명 생성</li>
    <li>태그 추천</li>
    <li>이미지 프롬프트 생성</li>
    <li>애드센스 최적화 문단 구조</li>
  </ul>
)}

  {platform === "wordpress" && (
    <ul>
      <li>SEO 제목</li>
      <li>메타 설명</li>
      <li>추천 슬러그</li>
      <li>H2/H3 본문 구조</li>
      <li>검색 의도 기반 도입부</li>
      <li>표 정리</li>
      <li>FAQ Schema용 질문 구성</li>
      <li>내부링크 삽입 자리</li>
      <li>외부 참고 링크 추천</li>
      <li>마무리 CTA</li>
    </ul>
  )}

  {platform === "blogger" && (
    <ul>
      <li>구글 검색 노출형 제목</li>
      <li>검색 설명</li>
      <li>라벨 추천</li>
      <li>도입부</li>
      <li>공백 제외 1,500자 이상 본문</li>
      <li>핵심 내용 정리</li>
      <li>표 정리</li>
      <li>이미지 삽입 위치 3곳</li>
      <li>참고 링크 추천</li>
      <li>마무리 안내문</li>
    </ul>
  )}

  {platform === "naver" && (
    <ul>
      <li>네이버 유입형 제목</li>
      <li>공감형 도입부</li>
      <li>체류시간을 늘리는 본문 흐름</li>
      <li>경험담처럼 읽히는 문단 구성</li>
      <li>핵심 내용 정리</li>
      <li>표 정리</li>
      <li>이미지 삽입 위치 3곳</li>
      <li>신뢰를 주는 안내 문구</li>
      <li>댓글·문의 유도 문장</li>
      <li>마무리 안내문</li>
    </ul>
  )}
</div>

            <div style={styles.buttonRow}>
              <button style={styles.primaryButton} onClick={generateHTML}>
                HTML 생성하기
              </button>
              <button style={styles.secondaryButton} onClick={resetAll}>
                초기화
              </button>
            </div>
          </section>

          <aside style={styles.rightPanel}>
            <div style={styles.resultHeader}>
              <div>
                <div style={styles.sectionNumberBlue}>STEP 02</div>
                <h2 style={styles.resultTitle}>생성 결과</h2>
                <p style={styles.hint}>
                  결과를 복사해서 티스토리 글쓰기 HTML 모드에 붙여넣으세요.
                </p>
              </div>

              <button
                style={{
                  ...styles.copyButton,
                  opacity: htmlResult ? 1 : 0.45,
                  cursor: htmlResult ? "pointer" : "not-allowed",
                }}
                onClick={copyHTML}
                disabled={!htmlResult}
              >
                HTML 복사
              </button>
            </div>
            <button
  style={{
    ...styles.copyButton,
    background: "#2563eb",
    marginLeft: "8px",
    opacity: htmlResult ? 1 : 0.45,
    cursor: htmlResult ? "pointer" : "not-allowed",
  }}
  onClick={() => {
    if (!htmlResult) return;

    const blob = new Blob([htmlResult], {
      type: "text/html;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "blog-content"}.html`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast("✅ HTML 다운로드 완료");

    setTimeout(() => {
  setToast("");
}, 2000);

    URL.revokeObjectURL(url);
  }}
  disabled={!htmlResult}
>
  HTML 다운로드
</button>
            <div style={styles.previewCard}>
              <div style={styles.previewHeader}>
                <div style={styles.previewTitle}>미리보기</div>
                <div style={styles.previewBadge}>Preview</div>
              </div>

              {htmlResult ? (
                <div
                  style={styles.previewBox}
                  dangerouslySetInnerHTML={{ __html: htmlResult }}
                />
              ) : (
                <div style={styles.emptyPreview}>
                  아직 생성된 HTML이 없습니다.
                  <br />
                  왼쪽에 제목을 입력한 뒤 HTML 생성하기를 눌러주세요.
                </div>
              )}
            </div>
          </aside>
          {toast && (
  <div
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#111827",
      color: "#fff",
      padding: "12px 18px",
      borderRadius: "10px",
      zIndex: 9999,
      fontWeight: 600,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    }}
  >
    {toast}
  </div>
)}
        </main>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 42%, #f8fafc 42%, #f8fafc 100%)",
    padding: "34px",
    boxSizing: "border-box",
  },
  shell: {
    maxWidth: "1380px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "26px",
    color: "#fff",
  },
  badge: {
    display: "inline-block",
    padding: "7px 12px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.22)",
    border: "1px solid rgba(147,197,253,0.45)",
    color: "#bfdbfe",
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "0.08em",
    marginBottom: "12px",
  },
  title: {
    margin: 0,
    fontSize: "38px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },
  subtitle: {
    marginTop: "12px",
    fontSize: "16px",
    lineHeight: 1.7,
    color: "#cbd5e1",
    maxWidth: "820px",
  },
  statusBox: {
    padding: "12px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#e0f2fe",
    fontSize: "14px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  statusDot: {
    display: "inline-block",
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "#22c55e",
    marginRight: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "0.75fr 1.25fr",
    gap: "22px",
    alignItems: "start",
  },
  leftPanel: {
    background: "rgba(255,255,255,0.97)",
    borderRadius: "24px",
    padding: "26px",
    boxShadow: "0 24px 70px rgba(15,23,42,0.18)",
    border: "1px solid rgba(226,232,240,0.9)",
  },
  rightPanel: {
    background: "#0f172a",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 24px 70px rgba(15,23,42,0.28)",
    border: "1px solid rgba(51,65,85,0.9)",
    color: "#fff",
    position: "sticky",
    top: "20px",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  sectionNumber: {
    fontSize: "12px",
    fontWeight: 900,
    color: "#2563eb",
    letterSpacing: "0.08em",
    marginBottom: "5px",
  },
  sectionNumberBlue: {
    fontSize: "12px",
    fontWeight: 900,
    color: "#93c5fd",
    letterSpacing: "0.08em",
    marginBottom: "5px",
  },
  panelTitle: {
    margin: 0,
    fontSize: "21px",
    fontWeight: 900,
    color: "#111827",
  },
  miniBadge: {
    padding: "7px 10px",
    borderRadius: "999px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: 800,
    margin: "22px 0 8px",
    color: "#111827",
  },
  input: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
  },
  infoBox: {
    marginTop: "22px",
    padding: "18px",
    borderRadius: "16px",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    color: "#334155",
    lineHeight: 1.8,
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  primaryButton: {
    flex: 1,
    padding: "15px 18px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(37,99,235,0.28)",
  },
  secondaryButton: {
    padding: "15px 18px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "flex-start",
    marginBottom: "14px",
  },
  resultTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 900,
    color: "#fff",
  },
  hint: {
    margin: "8px 0 0",
    color: "#94a3b8",
    fontSize: "13px",
    lineHeight: 1.5,
  },
  copyButton: {
    padding: "11px 15px",
    borderRadius: "12px",
    border: "none",
    background: "#22c55e",
    color: "#052e16",
    fontSize: "14px",
    fontWeight: 900,
    whiteSpace: "nowrap",
  },
  resultArea: {
    width: "100%",
    minHeight: "420px",
    padding: "15px",
    borderRadius: "16px",
    border: "1px solid #334155",
    background: "#020617",
    color: "#dbeafe",
    fontSize: "13px",
    lineHeight: 1.65,
    resize: "vertical",
    outline: "none",
    fontFamily: "Consolas, monospace",
  },
  previewCard: {
    marginTop: "18px",
    background: "#fff",
    borderRadius: "18px",
    padding: "18px",
    color: "#111827",
    maxHeight: "560px",
    overflow: "auto",
  },
  previewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  previewTitle: {
    fontSize: "16px",
    fontWeight: 900,
  },
  previewBadge: {
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#f1f5f9",
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 800,
  },
  previewBox: {
    lineHeight: 1.8,
    maxHeight: "800px",
    overflowY: "auto",
    paddingRight: "12px",
  },
  emptyPreview: {
    padding: "48px 20px",
    textAlign: "center",
    color: "#64748b",
    background: "#f8fafc",
    borderRadius: "14px",
    lineHeight: 1.7,
  },
};

export default App;