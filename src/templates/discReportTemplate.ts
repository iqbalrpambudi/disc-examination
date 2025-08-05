export const discReportTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DISC Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #fff;
      padding: 20px;
      color: #333;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .subtitle {
      text-align: center;
      background: #f5f9ff;
      padding: 15px;
      border-radius: 8px;
      font-size: 18px;
      margin-bottom: 30px;
    }
    .subtitle span {
      color: #1976d2;
      font-weight: bold;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .card {
      background: #fafafa;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .section-subtitle {
      margin-bottom: 8px;
    }
    .bar {
      height: 8px;
      border-radius: 5px;
      background: #e0e0e0;
      margin-bottom: 10px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      border-radius: 5px;
    }
    .bar.red .bar-fill { background: #d32f2f; }
    .bar.orange .bar-fill { background: #f57c00; }
    .bar.green .bar-fill { background: #388e3c; }
    .bar.blue .bar-fill { background: #1976d2; }
    .strengths, .challenges {
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
    }
    .strengths { background: #e8f5e9; }
    .challenges { background: #fff3e0; }
    .strengths ul, .challenges ul {
      padding-left: 20px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
      font-size: 14px;
    }
    .info div {
      text-align: center;
    }
    .info-title {
      font-weight: bold;
      font-size: 12px;
      color: #555;
    }
    .info-value {
      margin-top: 5px;
      font-size: 14px;
    }
    .about {
      background: #f5f9ff;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      font-size: 14px;
      color: #444;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">Your DISC Results</div>
    <div class="subtitle">
      Your dominant type is: <span>{{dominantType}}</span><br>
      {{dominantTypeDescription}}
    </div>

    <div class="grid">
      <div class="card">
        <div class="section-title">Your Profile</div>
        <p>
          {{profileDescription}}
        </p>
        <p><b>Work Style</b></p>
        <p>
          {{workStyleDescription}}
        </p>
        <div class="strengths">
          <b>Strengths</b>
          <ul>
            {{strengthsList}}
          </ul>
        </div>
        <div class="challenges">
          <b>Challenges</b>
          <ul>
            {{challengesList}}
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="section-title">Your DISC Distribution</div>
        <div class="section-subtitle">Dominance (D): {{dPercentage}}%</div>
        <div class="bar red"><div class="bar-fill" style="width:{{dPercentage}}%"></div></div>
        <div class="section-subtitle">Influence (I): {{iPercentage}}%</div>
        <div class="bar orange"><div class="bar-fill" style="width:{{iPercentage}}%"></div></div>
        <div class="section-subtitle">Steadiness (S): {{sPercentage}}%</div>
        <div class="bar green"><div class="bar-fill" style="width:{{sPercentage}}%"></div></div>
        <div class="section-subtitle">Conscientiousness (C): {{cPercentage}}%</div>
        <div class="bar blue"><div class="bar-fill" style="width:{{cPercentage}}%"></div></div>
        <div class="about">
          While {{dominantTypeLetter}} is your primary style, everyone has a blend of all four DISC styles.
          The percentages above show your distribution across all styles. Your unique combination
          shapes how you interact with others and approach situations.
        </div>
      </div>
    </div>

    <div class="info">
      <div>
        <div class="info-title">EMAIL</div>
        <div class="info-value">{{email}}</div>
      </div>
      <div>
        <div class="info-title">TEST DATE</div>
        <div class="info-value">{{testDate}}</div>
      </div>
      <div>
        <div class="info-title">COMPLETION TIME</div>
        <div class="info-value">{{completionTime}}</div>
      </div>
      <div>
        <div class="info-title">DURATION</div>
        <div class="info-value">{{duration}}</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

export interface DISCReportData {
  dominantType: string;
  dominantTypeDescription: string;
  dominantTypeLetter: string;
  profileDescription: string;
  workStyleDescription: string;
  strengthsList: string;
  challengesList: string;
  dPercentage: number;
  iPercentage: number;
  sPercentage: number;
  cPercentage: number;
  email: string;
  testDate: string;
  completionTime: string;
  duration: string;
}

export function generateDISCReportHTML(data: DISCReportData): string {
  let html = discReportTemplate;

  // Replace all placeholders with actual data
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    html = html.replace(new RegExp(placeholder, "g"), String(value));
  });

  return html;
}
