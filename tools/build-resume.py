from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
import pdfplumber

root=Path(__file__).resolve().parents[1]
output=root/'tmp'
output.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold','C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Arial',normal='Arial',bold='ArialBold',italic='Arial',boldItalic='ArialBold')
styles={
 'name':ParagraphStyle('name',fontName='ArialBold',fontSize=23,leading=27,spaceAfter=4),
 'headline':ParagraphStyle('headline',fontName='Arial',fontSize=10.8,leading=15,spaceAfter=5),
 'contact':ParagraphStyle('contact',fontName='Arial',fontSize=9,leading=13,textColor=colors.HexColor('#444444'),spaceAfter=10),
 'section':ParagraphStyle('section',fontName='ArialBold',fontSize=10,leading=12,spaceBefore=8,spaceAfter=4),
 'body':ParagraphStyle('body',fontName='Arial',fontSize=9.3,leading=12,spaceAfter=3),
 'role':ParagraphStyle('role',fontName='ArialBold',fontSize=9.5,leading=12,spaceBefore=5,spaceAfter=2),
 'bullet':ParagraphStyle('bullet',fontName='Arial',fontSize=9.3,leading=12,leftIndent=9,firstLineIndent=-9,spaceAfter=2),
}
flow=[]
def p(text,style='body'): flow.append(Paragraph(text,styles[style]))
def section(title):
 p(title.upper(),'section'); flow.append(HRFlowable(width='100%',thickness=.45,color=colors.HexColor('#b9b9b9'),spaceAfter=5))
def bullet(text): p('- '+text,'bullet')
p('Dallen Larson','name')
p('Software Engineer | C#/.NET, React &amp; Applied AI','headline')
p('Birmingham, AL | <link href="https://dallenlarson.com">dallenlarson.com</link> | <link href="mailto:dallen@dallenlarson.com">dallen@dallenlarson.com</link><br/><link href="https://github.com/DallenLarson">github.com/DallenLarson</link> | <link href="https://www.linkedin.com/in/dallen-larson/">linkedin.com/in/dallen-larson</link>','contact')
p('Software engineer building web products, Windows applications, and games, with professional experience in enterprise integrations and production troubleshooting. Bringing that foundation to Applied AI.')
section('Technical Skills')
p('<b>Development:</b> C#, .NET, React, JavaScript, SQL, HTML/CSS, REST APIs, Git/GitHub<br/><b>Platforms:</b> WPF, WebView2, Firebase, Unity; Epicor Kinetic, Application Studio, BPMs, Functions, BAQs<br/><b>AI workflow:</b> ChatGPT and Claude for AI-assisted development, prototyping, and debugging')
section('Selected Projects')
p('Nibble | C#, .NET 8, WPF, WebView2','role')
bullet('Built and released an open-source Windows browser with tab management, session restore, themes, and a per-user installer/update workflow.')
bullet('Used WebView2 instead of bundling Chromium; documented runtime dependencies, packaging, verification workflows, and unsigned-release constraints.')
p('CSKit | JavaScript, Firebase, Node.js, REST APIs','role')
bullet('Built a CS2 workspace with configuration exports, market snapshots, Google sign-in, and private Firestore storage; guest data moves to an account only through explicit migration.')
bullet('Added configuration-export guardrails and automated checks/deployment; exposed data timestamps and stale-feed states in the interface.')
p('DECKRISE | Founder / Developer | 2025 - Present','role')
bullet('Built and launched a card-game analysis product covering deck performance, tournament results, and matchups; own feature definition, data workflows, deployment, and iteration.')
section('Professional Experience')
p('Independent | Software Engineer, Freelance | Jan 2026 - Present','role')
bullet('Deliver software using C#, APIs, and web technologies; turn client requirements into implementations and own investigation, testing, debugging, and delivery.')
p('Six S Partners Inc. | Epicor ERP Software Engineer | Apr 2024 - May 2025','role')
bullet('Built Epicor Kinetic solutions using C#, Application Studio, BPMs, Functions, BAQs, dashboards, and REST integrations for customer workflows.')
bullet('Investigated production issues and supported implementations and Go Live events for clients including Norwest Precision, Poltech, and RPM.')
p('Rook Studios | Software Engineer, Contract | Dec 2023 - Jun 2025','role')
bullet('Implemented Unity/C# gameplay systems for CLAY-TIME, including physics optimization and asynchronous loading; collaborated with designers, artists, writers, and developers.')
p('Larsonsoft | Full-Stack Developer | Jun 2017 - May 2025','role')
bullet('Built and maintained applications with C#, JavaScript, SQL, HTML/CSS, and REST APIs, managing projects from requirements through deployment.')
section('Education')
p('<b>Nashville Software School</b> | Software Developer | Aug 2022 - Aug 2023<br/>Full-stack development: C#, .NET, SQL, JavaScript, React, REST APIs, Git/GitHub.')
out=root/'assets/Dallen-Larson-Resume.pdf'
doc=SimpleDocTemplate(str(out),pagesize=(612,792),rightMargin=40,leftMargin=40,topMargin=30,bottomMargin=28,title='Dallen Larson - Software Engineer Resume',author='Dallen Larson',subject='C#/.NET, React, enterprise integrations, and Applied AI')
doc.build(flow)
with pdfplumber.open(out) as pdf:
 assert len(pdf.pages)==1, f'Resume has {len(pdf.pages)} pages'
 text='\n'.join(page.extract_text() or '' for page in pdf.pages)
 assert '\ufffd' not in text
 assert all(term in text for term in ['Nibble','CSKit','DECKRISE','React','Birmingham'])
 (output/'resume-updated.txt').write_text(text,encoding='utf-8')
 pdf.pages[0].to_image(resolution=140).save(str(output/'resume-updated.png'))
print('One-page PDF exported and text extraction checked.')
