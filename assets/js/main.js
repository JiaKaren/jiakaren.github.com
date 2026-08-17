// ============================================
// Personal Website - Enhanced Main JavaScript
// Features: Theme Switching, Video Auto-pause, Dynamic Backgrounds
// Works with Router for SPA navigation
// ============================================

// ============================================
// Theme Management System
// ============================================

class ThemeManager {
  constructor() {
    this.currentTheme = CONFIG.getTheme();
    this.init();
  }

  init() {
    // Apply current theme
    this.applyTheme(this.currentTheme);
    
    // Listen for theme changes
    window.addEventListener('themeChange', (e) => {
      this.currentTheme = CONFIG.getTheme();
      this.applyTheme(CONFIG.getTheme());
    });
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    // Apply color variables
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--tertiary-color', theme.colors.tertiary);
    root.style.setProperty('--pale-accent', theme.colors.paleAccent);
    root.style.setProperty('--text-dark', theme.colors.textDark);
    root.style.setProperty('--text-light', theme.colors.textLight);
    root.style.setProperty('--bg-light', theme.colors.bgLight);
    root.style.setProperty('--bg-white', theme.colors.bgWhite);
    root.style.setProperty('--border-color', theme.colors.borderColor);
    root.style.setProperty('--success-color', theme.colors.successColor);
    root.style.setProperty('--warning-color', theme.colors.warningColor);
    
    // Apply fonts
    root.style.setProperty('--font-serif-title', theme.fonts.serif);
    root.style.setProperty('--font-serif-body', theme.fonts.body);
    
    // Apply background images for nav, footer, and body
    root.style.setProperty('--navbar-bg', theme.navbar);
    root.style.setProperty('--footer-bg', theme.footer);
    root.style.setProperty('--body-bg', theme.body);
    
    // Trigger re-render
    document.body.style.transition = `background-color ${CONFIG.settings.animationDuration}ms ease`;
    document.body.style.color = theme.colors.textDark;
    document.body.style.backgroundColor = theme.body;
  }

  switchTheme(themeName) {
    CONFIG.switchTheme(themeName);
  }

  getAvailableThemes() {
    return Object.keys(CONFIG.themes);
  }
}

// ============================================
// Translation System
// ============================================

const TRANSLATIONS = {
  'en': {
    'Search pages, essays, articles...': 'Search pages, essays, articles...'
  },
  'zh-Hans': {
    'Search pages, essays, articles...': '搜索页面、文章、作品...',
    'This is my first website collaborating with AI!': '这是我与AI合作的第一个网站！',
    'Welcome to my personal hub! Here you\'ll find information about my academic journey, professional achievements, creative projects, and passion for learning. Feel free to explore and reach out!': '欢迎来到我的个人中心！在这里您可以了解我的学术旅程、专业成就、创意项目和对学习的热情。请随意浏览并与我联系！',
    'Get to Know Me': '了解我',
    'BLAH BLAH BLAH still in middle school': '嗡嗡嗡，我仍然在读中学。',
    'I\'m interested in how critical thinking and analytical communication plays a big part in both finance and law.': '我对批判性思维和分析性沟通在金融与法律中发挥的重要作用很感兴趣。',
    'At the age of 10, I started learning to code. By age 14 I had built two websites, and had learned JavaScript, HTML, CSS, SQL, and Python. My journey was driven by my own curiosity and determination as I experimented with creating my own games.': '在10岁时，我开始学习编码。到了14岁，我已经搭建了两个网站，并掌握了JavaScript、HTML、CSS、SQL和Python。我的旅程由好奇心和决心驱动，我不断尝试创建自己的游戏。',
    'As a student, programmer, and ____, I have come to appreciate the importance of independence and self-motivation. Learning is something that comes from a curiosity within. With passion, you can learn anything, even on your own.': '作为学生、程序员和____，我越来越意识到独立性和自我激励的重要性。学习源于内心的好奇。只要有热情，即使独自一人，你也能学会任何东西。',
    'I love to expand my knowledge of different cultures! I do this by traveling and learning languages. My first languages are English and Mandarin Chinese. Currently, I am learning Japanese, French, and Korean!': '我喜欢扩展对不同文化的了解！我通过旅行和学习语言来实现这一点。我的第一语言是英语和普通话。目前，我正在学习日语、法语和韩语！',
    'Another hobby of mine is performing arts. I love to sing and listen to music. Additionally, I play piano, percussion, and traditional Chinese instruments such as the ruan, liuqin, and guzheng.': '我的另一个爱好是表演艺术。我喜欢唱歌和听音乐。此外，我还演奏钢琴、打击乐以及传统中国乐器，例如阮、柳琴和古筝。',
    'Get In Touch': '保持联系',
    'Send Message': '发送留言',
    'Name *': '姓名 *',
    'Email *': '电子邮件 *',
    'Subject *': '主题 *',
    'Message *': '留言 *',
    'Self-studying is fun!': '自学很有趣！',
    'BLAH BLAH BLAH still in middle school': '嗡嗡嗡，我仍然在中学阶段。',
    'I began this YouTube channel at the age of 8, along with my brother and sister. The mission of this channel is to share creative and fun solutions to interesting math problems. More information about our team is': '我在8岁时与我的哥哥和姐姐一起创办了这个YouTube频道。这个频道的使命是分享有趣数学问题的创造性和有趣解法。有关我们团队的更多信息：',
    'Follow my channel for regular updates on machine learning, web development, and creative coding projects.': '关注我的频道，了解有关机器学习、网络开发和创意编码项目的定期更新。',
    'Built with HTML, CSS, and JavaScript': '由 HTML、CSS 和 JavaScript 构建',
    'Home': '首页',
    'About': '关于',
    'Accomplishments': '成就',
    'Academics': '学术',
    'Videos': '视频',
    'Essays': '随笔',
    'Articles': '文章',
    'Library': '资料库',
    'My Journey': '我的旅程',
    'Chinese Competitions': '中文竞赛',
    'Math Competitions': '数学竞赛',
    'Humanities Competitions': '人文学科竞赛',
    'Community Work': '社区服务',
    'Education': '教育',
    'Academic Transcript': '学术成绩单',
    'Grade 12 Course Transcript': '12年级课程成绩单',
    'Grade 11 Course Transcript': '11年级课程成绩单',
    'Grade 10 Course Transcript': '10年级课程成绩单',
    'Grade 9 Course Transcript': '9年级课程成绩单',
    'Grade 8 Course Transcript': '8年级课程成绩单',
    'Grade 7 Course Transcript': '7年级课程成绩单',
    'Grade 6 Course Transcript': '6年级课程成绩单',
    'School Year': '学年',
    '📄 PDF': '📄 PDF',
    'Watch My': '观看我的',
    'Subscribe for More Content': '订阅以获取更多内容',
    'Subscribe Now': '立即订阅',
    'In the Press': '媒体报道',
    'Public newspaper articles written about me.': '关于我的公开报纸文章。',
    'Read Article': '阅读文章',
    'Language': '语言',
    'Published:': '发布于：',
    'Question:': '问题：',
    'Answer:': '答案：',
    'Setup:': '设置：',
    'There is no missing dollar! This is a trick question based on incorrect arithmetic.': '并没有丢失一美元！这是一个基于错误算术的文字游戏。',
    'The $27 the friends spent includes the $2 tip they gave. So the correct calculation is: $27 (what they paid) = $25 (meal cost) + $2 (tip). The $3 they got back makes the total $30.': '朋友们花费的27美元已包含2美元小费。因此正确的计算是：27美元（他们支付的总额）= 25美元（餐费）+ 2美元（小费）。他们收到的3美元找零使总额变成30美元。',
    'You should SWITCH! Your probability of winning increases from 1/3 to 2/3.': '你应该更换选择！你获胜的概率从1/3增加到2/3。',
    'Can you determine if he\'s a Knight or a Knave?': '你能判断他是骑士还是嘲讽者吗？',
    'Should you stick with your original choice or switch to the remaining unopened door?': '你应该坚持最初的选择，还是换到剩下未开的门？',
    'The farmer should:': '农夫应该：',
    'Take the goat across first (leave wolf and cabbage)': '首先带山羊过去（留下狼和卷心菜）',
    'Return alone': '独自返回',
    'Take the wolf across, but bring the goat back': '带狼过去，但把山羊带回来',
    'Leave the goat, take the cabbage across': '留山羊，带卷心菜过去',
    'Take the goat across again': '再次带山羊过去',
    'The Monty Hall Problem': '蒙提霍尔问题',
    'The Missing Dollar Riddle': '失踪的一美元谜题',
    'Knights and Knaves': '骑士与说谎者',
    'The Birthday Paradox': '生日悖论',
    'River Crossing Puzzle': '过河谜题',
    'This is my first website collaborating with AI!': '这是我与人工智能合作的第一个网站！',
    'Welcome to my personal hub! Here you\'ll find information about my academic journey, professional achievements, creative projects, and passion for learning. Feel free to explore and reach out!': '欢迎来到我的个人中心！在这里您可以了解我的学术旅程、专业成就、创意项目和对学习的热情。请随意探索并与我联系！',
    'A Bedford Citizen article on the JGMS team’s strong finish at the state MATHCOUNTS competition.': '一篇关于JGMS队在州级MATHCOUNTS比赛中取得优异成绩的Bedford Citizen文章。',
    'A Bedford Citizen story on the council’s annual survey requesting resident input about local arts and culture programming.': '一篇关于理事会年度调查的Bedford Citizen报道，征求居民对本地艺术和文化项目的意见。',
    'A profile of Bedford students achieving state and national recognition in math, science, and academic competitions.': '一篇介绍贝德福德学生在数学、科学和学术竞赛中获得州级和全国认可的报道。',
    'Story coverage of the Bedford celebration and community performances welcoming the Year of the Fire Horse.': '报道贝德福德庆祝活动以及社区表演，欢迎火马年。',
    'Announcement of the Bedford Lunar New Year celebration with crafts, performances, and student presentations.': '宣布贝德福德农历新年庆祝活动，包括手工艺、表演和学生展示。',
    'Public newspaper articles written about me.': '关于我的公开报纸文章。',
    'Coverage of the JGMS moving-on ceremony and highlights from the Class of 2026 celebration.': '报道JGMS毕业典礼及2026届庆祝活动亮点。',
    'I love to expand my knowledge of different cultures! I do this by traveling and learning languages. My first languages are English and Mandarin Chinese. Currently, I am learning Japanese, French, and Korean!': '我喜欢扩展对不同文化的了解！我通过旅行和学习语言来做到这一点。我的第一语言是英语和普通话。目前，我正在学习日语、法语和韩语！',
    'Another hobby of mine is performing arts. I love to sing and listen to music. Additionally, I play piano, percussion, and traditional Chinese instruments such as the ruan, liuqin, and guzheng.': '我的另一个爱好是表演艺术。我喜欢唱歌和听音乐。此外，我演奏钢琴、打击乐以及传统中国乐器，如阮、柳琴和古筝。',
    'Built with HTML, CSS, and JavaScript': '用 HTML、CSS 和 JavaScript 构建',
    'Enter keywords to search...': '输入关键字进行搜索...',
    'Search index not ready. Please try again.': '搜索索引尚未就绪。请重试。',
    'No results found for': '找不到相关结果'
  },
  'zh-Hant': {
    'Search pages, essays, articles...': '搜索頁面、文章、作品...',
    'This is my first website collaborating with AI!': '這是我與AI合作的第一個網站！',
    'Welcome to my personal hub! Here you\'ll find information about my academic journey, professional achievements, creative projects, and passion for learning. Feel free to explore and reach out!': '歡迎來到我的個人中心！在這裡您可以了解我的學術旅程、專業成就、創意專案和對學習的熱情。請隨意瀏覽並與我聯繫！',
    'Get to Know Me': '認識我',
    'BLAH BLAH BLAH still in middle school': '嗡嗡嗡，我仍然在中學階段。',
    'I\'m interested in how critical thinking and analytical communication plays a big part in both finance and law.': '我對批判性思維和分析性溝通在金融和法律中發揮的重要作用很感興趣。',
    'At the age of 10, I started learning to code. By age 14 I had built two websites, and had learned JavaScript, HTML, CSS, SQL, and Python. My journey was driven by my own curiosity and determination as I experimented with creating my own games.': '在10歲時，我開始學習程式。到了14歲，我已經建立了兩個網站，並學會了JavaScript、HTML、CSS、SQL和Python。我的旅程由好奇心和決心驅動，我不斷嘗試創建自己的遊戲。',
    'As a student, programmer, and ____, I have come to appreciate the importance of independence and self-motivation. Learning is something that comes from a curiosity within. With passion, you can learn anything, even on your own.': '作為學生、程式設計師和____，我已經開始欣賞獨立性和自我激勵的重要性。學習來自內心的好奇。只要有熱情，即使自己一個人，也能學會任何東西。',
    'I love to expand my knowledge of different cultures! I do this by traveling and learning languages. My first languages are English and Mandarin Chinese. Currently, I am learning Japanese, French, and Korean!': '我喜歡拓展對不同文化的了解！我透過旅行和學習語言來實現這一點。我的第一語言是英語和普通話。目前，我正在學習日語、法語和韓語！',
    'Another hobby of mine is performing arts. I love to sing and listen to music. Additionally, I play piano, percussion, and traditional Chinese instruments such as the ruan, liuqin, and guzheng.': '我的另一個愛好是表演藝術。我喜歡唱歌和聽音樂。此外，我還彈鋼琴、打擊樂，並演奏傳統中國樂器，如阮、柳琴和古箏。',
    'Get In Touch': '保持聯繫',
    'Send Message': '發送留言',
    'Name *': '姓名 *',
    'Email *': '電子郵件 *',
    'Subject *': '主題 *',
    'Message *': '留言 *',
    'Self-studying is fun!': '自學很有趣！',
    'Language': '語言',
    'Published:': '發布於：',
    'Question:': '問題：',
    'Answer:': '答案：',
    'Setup:': '設置：',
    'There is no missing dollar! This is a trick question based on incorrect arithmetic.': '並沒有丟失一美元！這是一個基於錯誤算術的文字遊戲。',
    'The $27 the friends spent includes the $2 tip they gave. So the correct calculation is: $27 (what they paid) = $25 (meal cost) + $2 (tip). The $3 they got back makes the total $30.': '朋友們花費的27美元已包含2美元小費。因此正確的計算是：27美元（他們支付的總額）= 25美元（餐費）+ 2美元（小費）。他們收到的3美元找零使總額變成30美元。',
    'You should SWITCH! Your probability of winning increases from 1/3 to 2/3.': '你應該更換選擇！你獲勝的機率從1/3增加到2/3。',
    'Can you determine if he\'s a Knight or a Knave?': '你能判斷他是騎士還是說謊者嗎？',
    'Should you stick with your original choice or switch to the remaining unopened door?': '你應該堅持最初的選擇，還是換到剩下未開的門？',
    'The farmer should:': '農夫應該：',
    'Take the goat across first (leave wolf and cabbage)': '首先帶山羊過河（留下狼和捲心菜）',
    'Return alone': '獨自返回',
    'Take the wolf across, but bring the goat back': '帶狼過河，但把山羊帶回來',
    'Leave the goat, take the cabbage across': '留下山羊，帶捲心菜過河',
    'Take the goat across again': '再次帶山羊過河',
    'Built with HTML, CSS, and JavaScript': '使用 HTML、CSS 和 JavaScript 構建',
    'Home': '首頁',
    'About': '關於',
    'Accomplishments': '成就',
    'Academics': '學術',
    'Videos': '影片',
    'Essays': '隨筆',
    'Articles': '文章',
    'Library': '資料庫',
    'My Journey': '我的旅程',
    'Chinese Competitions': '中文競賽',
    'Math Competitions': '數學競賽',
    'Humanities Competitions': '人文學科競賽',
    'Community Work': '社區服務',
    'Education': '教育',
    'Academic Transcript': '學術成績單',
    'Grade 12 Course Transcript': '12年級課程成績單',
    'Grade 11 Course Transcript': '11年級課程成績單',
    'Grade 10 Course Transcript': '10年級課程成績單',
    'Grade 9 Course Transcript': '9年級課程成績單',
    'Grade 8 Course Transcript': '8年級課程成績單',
    'Grade 7 Course Transcript': '7年級課程成績單',
    'Grade 6 Course Transcript': '6年級課程成績單',
    'School Year': '學年',
    '📄 PDF': '📄 PDF',
    'Watch My': '觀看我的',
    'Subscribe for More Content': '訂閱以獲取更多內容',
    'Subscribe Now': '立即訂閱',
    'In the Press': '媒體報導',
    'Public newspaper articles written about me.': '關於我的公開報紙文章。',
    'Read Article': '閱讀文章',
    // Accomplishments page descriptions
    'Recognized for academic excellence with a GPA above 3.8. Maintained consistent high performance across all courses while actively participating in research and extracurricular activities.': '因學業優秀（GPA 高於 3.8）而獲得表彰。在積極參與研究和課外活動的同時，保持了所有課程的穩定高表現。',
    'Received recognition for outstanding research in machine learning applied to natural language processing. Project focused on improving neural network efficiency for low-resource languages.': '因在將機器學習應用於自然語言處理方面的傑出研究而獲表彰。專案側重於提高低資源語言下神經網絡的效率。',
    'Selected to contribute to open-source projects. Worked on improving accessibility features in a popular JavaScript library, resulting in 15+ merged pull requests.': '被選中為開源專案做出貢獻。致力於改進一個流行的 JavaScript 庫的無障礙功能，已合併 15+ 個拉取請求。',
    'First place in the AI/ML category for developing an intelligent study assistant using GPT and spaced repetition algorithms. Prize: $5,000 and mentorship opportunity.': '在 AI/ML 類別中獲得第一名，作品為使用 GPT 與間隔重複演算法開發的智能學習助理。獎金：$5,000 並提供導師機會。',
    'Obtained industry certification in cloud computing. Demonstrates proficiency in designing scalable, reliable, and cost-effective solutions on AWS infrastructure.': '獲得雲端運算相關業界認證。展現了在 AWS 基礎架構上設計可擴展、可靠且具成本效益解決方案的能力。',
    'Awarded full tuition scholarship for graduate studies based on academic merit and research potential. Recognizes commitment to advancing knowledge in computer science.': '因學術成就與研究潛力獲頒全額學費獎學金，表彰在推進電腦科學知識方面的承諾。',
    // Footer and header
    'Sections': '欄目',
    'Site Info': '網站資訊',
    '© 2026 Karen Jia. All rights reserved.': '© 2026 賈康文。保留所有權利。',
    // Home tagline
    'Computer Science Student | Researcher | Creative Developer': '計算機科學學生 | 研究員 | 創意開發者',
    // Videos paragraph
    'I began this YouTube channel at the age of 8, along with my brother and sister. The mission of this channel is to share creative and fun solutions to interesting math problems. More information about our team is': '我在8歲時與我的哥哥和姐姐一起創辦了這個 YouTube 頻道。此頻道的使命是分享有趣數學問題的創意且有趣的解法。關於我們團隊的更多資訊：',
    // Accomplishments page descriptions
    'Recognized for academic excellence with a GPA above 3.8. Maintained consistent high performance across all courses while actively participating in research and extracurricular activities.': '因學業優秀（GPA 高於 3.8）而獲表彰。在積極參與研究和課外活動的同時，保持了所有課程的穩定高績效。',
    'Received recognition for outstanding research in machine learning applied to natural language processing. Project focused on improving neural network efficiency for low-resource languages.': '因在將機器學習應用於自然語言處理方面的傑出研究而獲表彰。專案聚焦於提升低資源語言的神經網絡效率。',
    'Selected to contribute to open-source projects. Worked on improving accessibility features in a popular JavaScript library, resulting in 15+ merged pull requests.': '被選中為開源專案做出貢獻。致力於改進一個流行的 JavaScript 庫的無障礙功能，已合併 15+ 個拉取請求。',
    'First place in the AI/ML category for developing an intelligent study assistant using GPT and spaced repetition algorithms. Prize: $5,000 and mentorship opportunity.': '在 AI/ML 類別中獲得第一名，開發了一個使用 GPT 與間隔重複演算法的智能學習助理。獎金：5,000 美元與導師機會。',
    'Obtained industry certification in cloud computing. Demonstrates proficiency in designing scalable, reliable, and cost-effective solutions on AWS infrastructure.': '獲得雲端運算產業認證。展示了在 AWS 基礎架構上設計可擴展、可靠且具成本效益解決方案的能力。',
    'Awarded full tuition scholarship for graduate studies based on academic merit and research potential. Recognizes commitment to advancing knowledge in computer science.': '基於學術成就與研究潛力獲得全額學費獎學金，表彰在推動計算機科學知識方面的投入。',
    // Footer and header
    'Sections': '欄目',
    'Site Info': '網站資訊',
    '© 2026 Karen Jia. All rights reserved.': '© 2026 賈康文。保留所有權利。',
    // Home tagline
    'Computer Science Student | Researcher | Creative Developer': '計算機科學學生 | 研究員 | 創意開發者',
    // Videos paragraph
    'I began this YouTube channel at the age of 8, along with my brother and sister. The mission of this channel is to share creative and fun solutions to interesting math problems. More information about our team is': '我在八歲時與我的哥哥和姐姐共同開始了這個 YouTube 頻道。頻道的使命是分享對有趣數學問題的創意且有趣的解法。更多關於我們團隊的資訊：',
    'Enter keywords to search...': '輸入關鍵字進行搜尋...',
    'Search index not ready. Please try again.': '搜尋索引尚未就緒。請重試。',
    'No results found for': '找不到相關結果'
  },
  'es': {
    'Search pages, essays, articles...': 'Buscar páginas, artículos, ensayos...',
    'This is my first website collaborating with AI!': '¡Este es mi primer sitio web colaborando con IA!',
    'Welcome to my personal hub! Here you\'ll find information about my academic journey, professional achievements, creative projects, and passion for learning. Feel free to explore and reach out!': '¡Bienvenido a mi centro personal! Aquí encontrarás información sobre mi trayectoria académica, logros profesionales, proyectos creativos y pasión por el aprendizaje. ¡Siéntete libre de explorar y contactarme!',
    'Get to Know Me': 'Conóceme',
    'BLAH BLAH BLAH still in middle school': 'Blah blah blah todavía en la escuela secundaria.',
    'I\'m interested in how critical thinking and analytical communication plays a big part in both finance and law.': 'Me interesa cómo el pensamiento crítico y la comunicación analítica juegan un papel importante tanto en finanzas como en derecho.',
    'At the age of 10, I started learning to code. By age 14 I had built two websites, and had learned JavaScript, HTML, CSS, SQL, and Python. My journey was driven by my own curiosity and determination as I experimented with creating my own games.': 'A los 10 años comencé a aprender a programar. A los 14 años había creado dos sitios web y aprendido JavaScript, HTML, CSS, SQL y Python. Mi viaje fue impulsado por mi propia curiosidad y determinación mientras experimentaba creando mis propios juegos.',
    'As a student, programmer, and ____, I have come to appreciate the importance of independence and self-motivation. Learning is something that comes from a curiosity within. With passion, you can learn anything, even on your own.': 'Como estudiante, programador y ____, he llegado a apreciar la importancia de la independencia y la automotivación. Aprender es algo que proviene de una curiosidad interna. Con pasión, puedes aprender cualquier cosa, incluso por tu cuenta.',
    'I love to expand my knowledge of different cultures! I do this by traveling and learning languages. My first languages are English and Mandarin Chinese. Currently, I am learning Japanese, French, and Korean!': 'Me encanta ampliar mi conocimiento de diferentes culturas. Lo hago viajando y aprendiendo idiomas. Mis primeros idiomas son inglés y chino mandarín. ¡Actualmente estoy aprendiendo japonés, francés y coreano!',
    'Another hobby of mine is performing arts. I love to sing and listen to music. Additionally, I play piano, percussion, and traditional Chinese instruments such as the ruan, liuqin, and guzheng.': 'Otro pasatiempo mío es las artes escénicas. Me encanta cantar y escuchar música. Además, toco piano, percusión e instrumentos tradicionales chinos como el ruan, liuqin y guzheng.',
    'Get In Touch': 'Ponte en contacto',
    'Send Message': 'Enviar mensaje',
    'Name *': 'Nombre *',
    'Email *': 'Correo electrónico *',
    'Subject *': 'Asunto *',
    'Message *': 'Mensaje *',
    'Self-studying is fun!': '¡Estudiar por cuenta propia es divertido!',
    'Language': 'Idioma',
    'Published:': 'Publicado:',
    'Question:': 'Pregunta:',
    'Answer:': 'Respuesta:',
    'Setup:': 'Configuración:',
    'There is no missing dollar! This is a trick question based on incorrect arithmetic.': '¡No falta ningún dólar! Esta es una pregunta trampa basada en una aritmética incorrecta.',
    'The $27 the friends spent includes the $2 tip they gave. So the correct calculation is: $27 (what they paid) = $25 (meal cost) + $2 (tip). The $3 they got back makes the total $30.': 'Los 27 dólares que gastaron los amigos incluyen los 2 dólares de propina que dieron. Por lo tanto, el cálculo correcto es: 27 dólares (lo que pagaron) = 25 dólares (costo de la comida) + 2 dólares (propina). Los 3 dólares que recibieron de vuelta hacen un total de 30 dólares.',
    'You should SWITCH! Your probability of winning increases from 1/3 to 2/3.': '¡Debes CAMBIAR! Tu probabilidad de ganar aumenta de 1/3 a 2/3.',
    'Can you determine if he\'s a Knight or a Knave?': '¿Puedes determinar si él es un caballero o un embustero?',
    'Should you stick with your original choice or switch to the remaining unopened door?': '¿Debes mantener tu elección original o cambiar a la puerta restante sin abrir?',
    'The farmer should:': 'El granjero debe:',
    'Take the goat across first (leave wolf and cabbage)': 'Llevar primero la cabra al otro lado (dejar al lobo y la col)',
    'Return alone': 'Regresar solo',
    'Take the wolf across, but bring the goat back': 'Llevar al lobo al otro lado, pero traer de vuelta a la cabra',
    'Leave the goat, take the cabbage across': 'Dejar a la cabra, llevar la col al otro lado',
    'Take the goat across again': 'Llevar la cabra al otro lado nuevamente',
    'Built with HTML, CSS, and JavaScript': 'Creado con HTML, CSS y JavaScript',
    'Home': 'Inicio',
    'About': 'Acerca de',
    'Accomplishments': 'Logros',
    'Academics': 'Académicos',
    'Videos': 'Videos',
    'Essays': 'Ensayos',
    'Articles': 'Artículos',
    'Library': 'Biblioteca',
    'My Journey': 'Mi trayectoria',
    'Chinese Competitions': 'Competiciones de chino',
    'Math Competitions': 'Competiciones de matemáticas',
    'Humanities Competitions': 'Competiciones de humanidades',
    'Community Work': 'Trabajo comunitario',
    'Education': 'Educación',
    'Academic Transcript': 'Expediente académico',
    'Grade 12 Course Transcript': 'Transcripción de cursos de 12.º grado',
    'Grade 11 Course Transcript': 'Transcripción de cursos de 11.º grado',
    'Grade 10 Course Transcript': 'Transcripción de cursos de 10.º grado',
    'Grade 9 Course Transcript': 'Transcripción de cursos de 9.º grado',
    'Grade 8 Course Transcript': 'Transcripción de cursos de 8.º grado',
    'Grade 7 Course Transcript': 'Transcripción de cursos de 7.º grado',
    'Grade 6 Course Transcript': 'Transcripción de cursos de 6.º grado',
    'School Year': 'Año escolar',
    '📄 PDF': '📄 PDF',
    'Watch My': 'Mira mis',
    'Subscribe for More Content': 'Suscríbete para más contenido',
    'Subscribe Now': 'Suscríbete ahora',
    'In the Press': 'En la prensa',
    'Public newspaper articles written about me.': 'Artículos periodísticos publicados sobre mí.',
    'Read Article': 'Leer artículo',
    'Enter keywords to search...': 'Ingrese palabras clave para buscar...',
    'Search index not ready. Please try again.': 'El índice de búsqueda no está listo. Por favor, intente de nuevo.',
    'No results found for': 'No se encontraron resultados para'
  },
  'fr': {    'Search pages, essays, articles...': 'Rechercher des pages, des articles, des essais...',    'This is my first website collaborating with AI!': 'Ceci est mon premier site web en collaboration avec l’IA !',
    'Welcome to my personal hub! Here you\'ll find information about my academic journey, professional achievements, creative projects, and passion for learning. Feel free to explore and reach out!': 'Bienvenue sur mon espace personnel ! Vous trouverez ici des informations sur mon parcours académique, mes réalisations professionnelles, mes projets créatifs et ma passion pour l’apprentissage. N’hésitez pas à explorer et à me contacter !',
    'Get to Know Me': 'Découvrez-moi',
    'BLAH BLAH BLAH still in middle school': 'Bla bla bla toujours au collège.',
    'I\'m interested in how critical thinking and analytical communication plays a big part in both finance and law.': 'Je m’intéresse à la manière dont la pensée critique et la communication analytique jouent un rôle important tant en finance qu’en droit.',
    'At the age of 10, I started learning to code. By age 14 I had built two websites, and had learned JavaScript, HTML, CSS, SQL, and Python. My journey was driven by my own curiosity and determination as I experimented with creating my own games.': 'À l’âge de 10 ans, j’ai commencé à apprendre à coder. À 14 ans, j’avais créé deux sites web et appris JavaScript, HTML, CSS, SQL et Python. Mon parcours a été motivé par ma propre curiosité et détermination alors que j’expérimentais la création de mes propres jeux.',
    'As a student, programmer, and ____, I have come to appreciate the importance of independence and self-motivation. Learning is something that comes from a curiosity within. With passion, you can learn anything, even on your own.': 'En tant qu’étudiant, programmeur et ____, j’ai appris à apprécier l’importance de l’indépendance et de l’automotivation. L’apprentissage vient d’une curiosité intérieure. Avec passion, vous pouvez tout apprendre, même seul.',
    'I love to expand my knowledge of different cultures! I do this by traveling and learning languages. My first languages are English and Mandarin Chinese. Currently, I am learning Japanese, French, and Korean!': 'J’aime élargir mes connaissances des différentes cultures ! Je fais cela en voyageant et en apprenant des langues. Mes premières langues sont l’anglais et le chinois mandarin. Actuellement, j’apprends le japonais, le français et le coréen !',
    'Another hobby of mine is performing arts. I love to sing and listen to music. Additionally, I play piano, percussion, and traditional Chinese instruments such as the ruan, liuqin, and guzheng.': 'Un autre de mes passe-temps est les arts de la scène. J’adore chanter et écouter de la musique. De plus, je joue du piano, des percussions et des instruments traditionnels chinois comme le ruan, le liuqin et le guzheng.',
    'Get In Touch': 'Contactez-moi',
    'Send Message': 'Envoyer le message',
    'Name *': 'Nom *',
    'Email *': 'Email *',
    'Subject *': 'Sujet *',
    'Message *': 'Message *',
    'Self-studying is fun!': 'L’auto-apprentissage est amusant !',
    'Language': 'Langue',
    'Published:': 'Publié :',
    'Question:': 'Question :',
    'Answer:': 'Réponse :',
    'Setup:': 'Contexte :',
    'There is no missing dollar! This is a trick question based on incorrect arithmetic.': 'Il n’y a pas de dollar manquant ! C’est une question piège basée sur une arithmétique incorrecte.',
    'The $27 the friends spent includes the $2 tip they gave. So the correct calculation is: $27 (what they paid) = $25 (meal cost) + $2 (tip). The $3 they got back makes the total $30.': 'Les 27 $ dépensés par les amis incluent le pourboire de 2 $ qu’ils ont donné. Donc le calcul correct est : 27 $ (ce qu’ils ont payé) = 25 $ (coût du repas) + 2 $ (pourboire). Les 3 $ qu’ils ont récupérés font un total de 30 $.',
    'You should SWITCH! Your probability of winning increases from 1/3 to 2/3.': 'Vous devriez CHANGER ! Votre probabilité de gagner passe de 1/3 à 2/3.',
    'Can you determine if he\'s a Knight or a Knave?': 'Pouvez-vous déterminer s’il est un chevalier ou un menteur ?',
    'Should you stick with your original choice or switch to the remaining unopened door?': 'Devez-vous conserver votre choix initial ou passer à la porte restante non ouverte ?',
    'The farmer should:': 'Le fermier doit :',
    'Take the goat across first (leave wolf and cabbage)': 'Traverser d’abord avec la chèvre (laisser le loup et le chou)',
    'Return alone': 'Revenir seul',
    'Take the wolf across, but bring the goat back': 'Traverser avec le loup, mais ramener la chèvre',
    'Leave the goat, take the cabbage across': 'Laisser la chèvre, traverser avec le chou',
    'Take the goat across again': 'Traverser de nouveau avec la chèvre',
    'Built with HTML, CSS, and JavaScript': 'Construit avec HTML, CSS et JavaScript',
    'Home': 'Accueil',
    'About': 'À propos',
    'Accomplishments': 'Réalisations',
    'Academics': 'Académique',
    'Videos': 'Vidéos',
    'Essays': 'Essais',
    'Articles': 'Articles',
    'Library': 'Bibliothèque',
    'My Journey': 'Mon parcours',
    'Chinese Competitions': 'Concours de chinois',
    'Math Competitions': 'Concours de mathématiques',
    'Humanities Competitions': 'Concours en sciences humaines',
    'Community Work': 'Travail communautaire',
    'Education': 'Éducation',
    'Academic Transcript': 'Relevé de notes',
    'Grade 12 Course Transcript': 'Relevé de cours de 12e année',
    'Grade 11 Course Transcript': 'Relevé de cours de 11e année',
    'Grade 10 Course Transcript': 'Relevé de cours de 10e année',
    'Grade 9 Course Transcript': 'Relevé de cours de 9e année',
    'Grade 8 Course Transcript': 'Relevé de cours de 8e année',
    'Grade 7 Course Transcript': 'Relevé de cours de 7e année',
    'Grade 6 Course Transcript': 'Relevé de cours de 6e année',
    'School Year': 'Année scolaire',
    '📄 PDF': '📄 PDF',
    'Watch My': 'Regardez mes',
    'Subscribe for More Content': 'Abonnez-vous pour plus de contenu',
    'Subscribe Now': 'Abonnez-vous maintenant',
    'In the Press': 'Dans la presse',
    'Public newspaper articles written about me.': 'Articles de presse publiés à mon sujet.',
    'Read Article': 'Lire l’article',
    'Enter keywords to search...': 'Entrez des mots-clés pour rechercher...',
    'Search index not ready. Please try again.': 'L\'index de recherche n\'est pas prêt. Veuillez réessayer.',
    'No results found for': 'Aucun résultat trouvé pour'
  }
};

// Make TRANSLATIONS globally accessible
window.TRANSLATIONS = TRANSLATIONS;

const TRANSLATION_RULES = [
  {
    pattern: /^(Published:)(\s*)(.+)$/,
    translate(lang, parts) {
      const prefix = TRANSLATIONS[lang]['Published:'] || parts[1];
      return prefix + parts[2] + parts[3];
    }
  },
  {
    pattern: /^(Question:)(\s*)(.+)$/,
    translate(lang, parts) {
      const prefix = TRANSLATIONS[lang]['Question:'] || parts[1];
      return prefix + parts[2] + parts[3];
    }
  },
  {
    pattern: /^(Answer:)(\s*)(.+)$/,
    translate(lang, parts) {
      const prefix = TRANSLATIONS[lang]['Answer:'] || parts[1];
      return prefix + parts[2] + parts[3];
    }
  },
  {
    pattern: /^(Setup:)(\s*)(.+)$/,
    translate(lang, parts) {
      const prefix = TRANSLATIONS[lang]['Setup:'] || parts[1];
      return prefix + parts[2] + parts[3];
    }
  }
];

const originalTextMap = new WeakMap();
window.currentLanguage = 'en';
window.translatePage = translatePage;
window.updateLanguageLabel = updateLanguageLabel;

function shouldTranslateNode(node) {
  if (!node || node.nodeType !== Node.TEXT_NODE) return false;
  const text = node.nodeValue.trim();
  if (!text) return false;

  const parent = node.parentElement;
  if (!parent) return false;
  // Avoid translating code, scripts, styles, form inputs, and elements explicitly marked
  if (parent.closest('script, style, code, pre, input, textarea') || parent.closest('[data-no-translate]')) {
    return false;
  }

  return true;
}

function getTranslation(text, lang) {
  if (lang === 'en') return text;
  const key = text.trim();
  const map = TRANSLATIONS[lang] || {};
  let translated = map[key] || null;

  for (const rule of TRANSLATION_RULES) {
    const match = key.match(rule.pattern);
    if (match) {
      translated = rule.translate(lang, match);
      break;
    }
  }

  if (!translated) {
    translated = text;
  }

  // Replace occurrences of the author's name with the localized form for Chinese
  try {
    if (/^zh/i.test(lang)) {
      const cnName = lang === 'zh-Hant' ? '賈康文' : '贾康文';
      translated = translated.replace(/Karen\s+Jia/gi, cnName);
      translated = translated.replace(/Karen/gi, cnName);
    }
  } catch (e) {
    // ignore replacement errors
  }

  return translated;

}

function translatePage(lang) {
  window.currentLanguage = lang || 'en';
  document.documentElement.lang = lang;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node = walker.nextNode();

  while (node) {
    if (shouldTranslateNode(node)) {
      if (!originalTextMap.has(node)) {
        originalTextMap.set(node, node.nodeValue);
      }
      const originalText = originalTextMap.get(node);
      const translated = getTranslation(originalText, lang);
      if (node.nodeValue !== translated) {
        node.nodeValue = translated;
      }
    }
    node = walker.nextNode();
  }
}

function updateLanguageLabel(lang) {
  const label = document.querySelector('.language-switcher label');
  if (label) {
    label.textContent = TRANSLATIONS[lang]?.['Language'] || 'Language';
  }
}

// ============================================
// Dynamic Background Switcher
// ============================================

class BackgroundSwitcher {
  constructor() {
    this.currentSection = null;
    this.mainElement = document.querySelector('main');
    
    if (!this.mainElement) return;
    
    this.init();
  }

  init() {
    if (CONFIG.settings.enableDynamicBackground) {
      window.addEventListener('scroll', () => this.updateBackground());
      window.addEventListener('themeChange', () => {
        // Reset current section so background gets reapplied
        this.currentSection = null;
        this.updateBackground();
      });
      
      // Initial background
      this.updateBackground();
    }
  }

  updateBackground() {
    const sections = document.querySelectorAll('section');
    let currentSection = null;
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        currentSection = section;
      }
    });
    
    if (currentSection && this.currentSection !== currentSection.id) {
      this.currentSection = currentSection.id;
      this.applyBackground(currentSection.id);
    }
  }

  applyBackground(sectionId) {
    const theme = CONFIG.getTheme();
    const background = theme.backgroundImages[sectionId] || theme.backgroundImages.home;
    
    if (this.mainElement) {
      this.mainElement.style.transition = `background ${CONFIG.settings.animationDuration}ms ease`;
      this.mainElement.style.background = background;
    }
  }
}

// ============================================
// Slideshow Component
// ============================================

class Slideshow {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.slide');
    this.dots = this.container.querySelectorAll('.slide-dot');
    this.currentSlide = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Show first slide
    this.showSlide(0);

    // Add event listeners to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Add event listeners to arrow buttons
    const prevBtn = this.container.querySelector('.slide-arrow.prev');
    const nextBtn = this.container.querySelector('.slide-arrow.next');

    if (prevBtn) prevBtn.addEventListener('click', () => this.previousSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Start auto play
    this.autoPlay();

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.autoPlay());
  }

  showSlide(n) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));

    this.slides[n].classList.add('active');
    this.dots[n].classList.add('active');
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  goToSlide(n) {
    this.currentSlide = n;
    this.showSlide(this.currentSlide);
  }

  autoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// ============================================
// Video Auto-pause on Slideshow Scroll
// ============================================

class SlideShowVideoManager {
  constructor() {
    this.slideshow = document.getElementById('slideshow');
    this.videos = [];
    this.init();
  }

  init() {
    if (!this.slideshow) return;
    
    // Collect videos
    this.collectVideos();
    
    // Monitor slideshow visibility
    if ('IntersectionObserver' in window) {
      this.observeSlideshow();
    } else {
      window.addEventListener('scroll', () => this.checkVisibility());
    }
  }

  collectVideos() {
    const allIframes = document.querySelectorAll('iframe[src*="youtube"]');
    this.videos = Array.from(allIframes);
  }

  observeSlideshow() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.resumeVideos();
        } else {
          this.pauseVideos();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.slideshow);
  }

  checkVisibility() {
    const rect = this.slideshow.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      this.resumeVideos();
    } else {
      this.pauseVideos();
    }
  }

  pauseVideos() {
    this.videos.forEach((video) => {
      video.contentWindow.postMessage(
        { event: 'command', func: 'pauseVideo' },
        '*'
      );
    });
  }

  resumeVideos() {
    // Note: Auto-play may be restricted by browser
  }
}

// ============================================
// Back to Top Button
// ============================================

class BackToTopButton {
  constructor() {
    this.button = document.getElementById('back-to-top');
    if (!this.button) return;
    
    this.init();
  }

  init() {
    // Show/hide button on scroll
    window.addEventListener('scroll', () => this.toggleVisibility());
    
    // Scroll to top on click
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  toggleVisibility() {
    // Show button when scrolled down more than 300px
    if (window.scrollY > 300) {
      this.button.classList.add('show');
    } else {
      this.button.classList.remove('show');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Make BackToTopButton available globally
window.BackToTopButton = BackToTopButton;

// ============================================
// Initialize on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme Manager
  window.themeManager = new ThemeManager();
  window.ThemeManager = ThemeManager;
  
  // Initialize Background Switcher
  window.bgSwitcher = new BackgroundSwitcher();
  
  // Initialize Slideshow
  new Slideshow('slideshow');
  
  // Setup navigation mobile toggle
  setupMobileNavigation();
  
  // Setup contact form if it exists
  initContactForm();
  
  // Initialize video manager for slideshow
  setTimeout(() => {
    new SlideShowVideoManager();
  }, 100);

  // Setup toggle controls after DOM is ready
  setupThemeToggle();
  setupLanguageSwitcher();

  // Apply saved translation after full load
  translatePage(window.currentLanguage);
});

// ============================================
// Theme Toggle Button Setup
// ============================================

function updateThemeToggleIcon() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = CONFIG.activeTheme;
  const isLight = currentTheme === 'lightDefault';
  
  if (isLight) {
    // Light theme - show sun icon
    toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    toggleBtn.title = 'Switch to dark theme';
  } else {
    // Dark theme - show moon icon
    toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    toggleBtn.title = 'Switch to light theme';
  }
  
  toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

function setupThemeToggle() {
  if (window.__themeToggleHandler) {
    document.removeEventListener('click', window.__themeToggleHandler);
  }

  if (window.__themeChangeHandler) {
    window.removeEventListener('themeChange', window.__themeChangeHandler);
  }

  window.__themeToggleHandler = function (e) {
    const btn = e.target.closest && e.target.closest('#theme-toggle');
    if (!btn) return;
    if (window.themeManager) {
      const currentTheme = CONFIG.activeTheme;
      const nextTheme = currentTheme === 'lightDefault' ? 'darkDefault' : 'lightDefault';
      window.themeManager.switchTheme(nextTheme);
    }
  };

  window.__themeChangeHandler = updateThemeToggleIcon;

  document.addEventListener('click', window.__themeToggleHandler);
  window.addEventListener('themeChange', window.__themeChangeHandler);

  updateThemeToggleIcon();
}

function updateHtmlLang(lang) {
  if (!lang) return;
  document.documentElement.lang = lang;
}

function setupLanguageSwitcher() {
  const savedLanguage = typeof localStorage !== 'undefined'
    ? localStorage.getItem('selectedLanguage') || 'en'
    : 'en';

  let wrapper = document.querySelector('.theme-switcher.language-switcher');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'theme-switcher language-switcher';
    wrapper.innerHTML = `
      <label for="language-select">Language</label>
      <select id="language-select" aria-label="Select language">
        <option value="en">English</option>
        <option value="zh-Hans">简体中文</option>
        <option value="zh-Hant">繁體中文</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
    `;
    document.body.appendChild(wrapper);
  }

  const select = wrapper.querySelector('#language-select');
  if (!select) return;

  if (wrapper.__langChangeHandler) {
    select.removeEventListener('change', wrapper.__langChangeHandler);
  }

  select.value = savedLanguage;
  updateHtmlLang(select.value);
  updateLanguageLabel(select.value);
  translatePage(select.value);

  wrapper.__langChangeHandler = (event) => {
    const nextLang = event.target.value;
    updateHtmlLang(nextLang);
    updateLanguageLabel(nextLang);
    translatePage(nextLang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selectedLanguage', nextLang);
    }
  };

  select.addEventListener('change', wrapper.__langChangeHandler);
}

window.setupThemeToggle = setupThemeToggle;
window.setupLanguageSwitcher = setupLanguageSwitcher;
window.updateThemeToggleIcon = updateThemeToggleIcon;

// ============================================
// Mobile Navigation Toggle
// ============================================

function setupMobileNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) {
    console.warn('Navigation elements not found');
    return;
  }

  // Remove existing listeners first (in case this is called multiple times)
  const newToggle = navToggle.cloneNode(true);
  navToggle.parentNode.replaceChild(newToggle, navToggle);

  const newToggleBtn = document.querySelector('.nav-toggle');
  newToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only close if it's a data-section link (SPA navigation)
      if (link.getAttribute('data-section')) {
        navLinks.classList.remove('active');
      }
    });
  });
}

// Make setupMobileNavigation globally accessible
window.setupMobileNavigation = setupMobileNavigation;
// Make setupLanguageSwitcher globally accessible
window.setupLanguageSwitcher = setupLanguageSwitcher;

// ============================================
// Contact Form Handler
// ============================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    // Check if success parameter is in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      // Show success message
      alert('Message sent successfully! I\'ll get back to you soon.');
      // Clear the form
      form.reset();
      // Remove success parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  });

  // Check for success on page load
  const params = new URLSearchParams(window.location.search);
  if (params.get('success') === 'true') {
    alert('Message sent successfully! I\'ll get back to you soon.');
    form.reset();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}


// ============================================
// Lightbox for Gallery
// ============================================

class Lightbox {
  constructor() {
    this.observeGallery();
  }

  observeGallery() {
    // Watch for gallery items being added to DOM
    const observer = new MutationObserver(() => {
      const galleryItems = document.querySelectorAll('.gallery-image');
      if (galleryItems.length > 0) {
        this.init();
        observer.disconnect();
      }
    });

    observer.observe(document.getElementById('content-viewport') || document.body, {
      childList: true,
      subtree: true
    });
  }

  init() {
    const galleryItems = document.querySelectorAll('.photo-item');
    if (galleryItems.length === 0) return;

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => this.openLightbox(e));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeLightbox();
    });
  }

  openLightbox(e) {
    const item = e.currentTarget;
    const img = item.querySelector('img');

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${img.src}" alt="${img.alt}">
      </div>
    `;

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.remove();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.remove();
    });

    document.body.appendChild(lightbox);
  }

  closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) lightbox.remove();
  }
}

// Initialize lightbox
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Lightbox());
} else {
  new Lightbox();
}
