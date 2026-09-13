# BioCodex 生物图鉴 - 项目工作日志

项目目标:专业生物学图鉴网站。覆盖原核生物到高等脊椎动物,按"域-界-门-纲-目-科-属-种"专业分类,含拉丁学名、配图、中文说明、科学数据库链接(NCBI/GBIF/EOL/GenBank等),内置 AI Agent 助手(找物种、答问题),UI 采用自然历史博物馆美学(羊皮纸+深林绿+琥珀)。

## 技术架构
- Next.js 16 App Router,仅 / 路由(SPA 内部视图切换:home/explore/taxon/search)
- Prisma + SQLite(db/custom.db),单表 Taxon 自关联树(parentId),1267 条记录 / 311 物种 / 47 门
- 物种配图:z-ai image 生成"复古博物学版画"风格插画(84 旗舰物种已完成,存 public/generated/);z-ai image-search 搜索真实照片(服务曾 429/400,由重试守护进程补齐剩余 227 物种)
- Agent 助手:z-ai-web-dev-sdk LLM(后端 /api/agent,检索库内 taxa+旗舰速查表注入上下文,[[id]] 引用渲染为可点击芯片)
- 前端:shadcn/ui + Tailwind 4,Playfair Display(拉丁学名斜体)+ Noto Serif SC,自然历史主题(羊皮纸/深林绿/琥珀),暗色模式,next-themes

---
Task ID: 1
Agent: main
Task: 初始化项目基础(worklog/schema/类型/主题/布局)

Work Log:
- 读取项目现状:全新脚手架,dev server 已在 3000 端口运行
- 加载 image-search 与 LLM 技能文档
- 编写 prisma/schema.prisma(Taxon 自关联模型),db:push 完成
- 编写 src/data/types.ts(TaxonSeed 接口)与 src/data/seed/core.ts(3 域 4 界骨架)
- 重写 globals.css 自然历史主题(羊皮纸/森林绿/琥珀,paper-texture 纹理,自定义滚动条,卡片 hover,暗色模式)
- 更新 layout.tsx 字体(Playfair Display + Noto Serif SC + Noto Sans SC)+ ThemeProvider

Stage Summary:
- 基础架构定稿

---
Task ID: 2-a
Agent: general-purpose
Task: 原核生物数据

Work Log:
- 编写 src/data/seed/prokaryotes.ts(148 条,31 物种,细菌 8 门 24 种 + 古菌 4 门 7 种)
- 门级 parent 直挂 Bacteria/Archaea(三域系统,无界级)
- ncbiTaxId 16 个高把握值;模式生物/旗舰标签齐备;类型检查通过

Stage Summary:
- 产出 prokaryotes.ts

---
Task ID: 2-b
Agent: general-purpose
Task: 原生生物+真菌数据

Work Log:
- 编写 src/data/seed/protists-fungi.ts(231 条,49 物种:原生生物 11 门 28 种 + 真菌 5 门 21 种)
- 校验脚本确认 parent 闭合/无重复;类型检查通过

Stage Summary:
- 产出 protists-fungi.ts

---
Task ID: 2-c
Agent: general-purpose
Task: 植物界数据

Work Log:
- 编写 src/data/seed/plants.ts(274 条,75 物种:苔藓/蕨类 16 + 裸子 12 + 被子 47,APG 三纲)
- ncbiTaxId 5 个(拟南芥 3702/水稻 4530/小麦 4565/玉米 4577/大豆 3847);IUCN 6 个;类型检查通过

Stage Summary:
- 产出 plants.ts

---
Task ID: 2-d
Agent: general-purpose(超时,由 main 补完)
Task: 无脊椎动物数据

Work Log:
- 子代理写至 228 条(昆虫纲 Blattodea 处上下文耗尽,文件被截断)
- main 补完:蛛形纲 5 种、甲壳亚门 7 种、唇足纲、肢口纲(中华鲎)、棘皮动物门 4 种、半索动物门、尾索动物亚门 2 种、头索动物亚门(白氏文昌鱼),共追加 ~96 条
- 修复字符串瑕疵;最终 324 条 / 76 物种;类型检查通过

Stage Summary:
- 产出 invertebrates.ts(注意:Urochordata/Cephalochordata 亚门的 parent 是 vertebrates.ts 定义的 Chordata)

---
Task ID: 2-e
Agent: general-purpose
Task: 脊椎动物数据

Work Log:
- 编写 src/data/seed/vertebrates.ts(283 条,80 物种:圆口 2/软骨鱼 5/硬骨鱼 16/两栖 6/爬行 11/鸟 19/哺乳 21)
- Chordata 门精确引用;旗舰 31 个;IUCN 55 种;类型检查通过

Stage Summary:
- 产出 vertebrates.ts

---
Task ID: 3
Agent: main
Task: 数据入库

Work Log:
- 编写 scripts/seed.ts(唯一性/父级/循环校验 + 拓扑排序插入)
- 入库 1267 条:domain 3 / kingdom 4 / phylum 47 / class 101 / order 211 / family 275 / genus 308 / species 311 / subphylum 4 / subclass 3
- IUCN: CR13 EN17 EW1 VU8 NT1 LC22;旗舰 84;ncbiLinked 47

Stage Summary:
- 数据库就绪

---
Task ID: 4
Agent: main
Task: 物种配图

Work Log:
- image-search 服务遭遇 429(并发 8 触发)后 400(服务端故障),fetch-images.ts 已改为并发 2 + 429 退避 + 随机延时
- 改用 z-ai image 生成"复古博物学版画"插画:scripts/generate-images.ts(支持 BATCH/SCOPE/断点续跑,已存在文件直接补录入库)
- 前台分 5 批完成全部 84 旗舰物种插画(public/generated/*.png,imageCaption="复古博物学风格 AI 插图")
- 已配图物种 84/311;剩余 227 个非旗舰物种待 image-search 服务恢复后由 scripts/retry-search-daemon.sh 补真实照片(注意:后台 nohup/setsid 进程会被沙箱会话清理杀死,需定期重启——建议 cron 轮巡时执行 `cd /home/z/my-project && timeout 500 bun scripts/fetch-images.ts` 或分段运行;也可用 generate-images.ts SCOPE=all 继续生成插画)

Stage Summary:
- 84 旗舰物种有图;占位图有界色渐变+属首字母兜底,视觉完整

---
Task ID: 5
Agent: main
Task: 后端 API

Work Log:
- /api/tree(精简树+物种统计,内存缓存 5min)
- /api/taxa/[id](详情+谱系+子单元+兄弟,含上下导航数据)
- /api/search(中英混合 LIKE,精确>前缀>包含加权,物种加权)
- /api/stats(全域统计+各界物种数)  /api/random  /api/featured(旗舰优先有图)
- /api/agent(LLM):术语抽取→库内检索→保护关键词补充候选→旗舰速查表注入;system prompt 禁止编造 id;返回 content+matches
- 修复 stats 字段名 bug、agent Prisma 参数 bug

Stage Summary:
- 7 个 API 全部通过 curl 与浏览器验证

---
Task ID: 6
Agent: main
Task: 前端 UI

Work Log:
- src/lib/bio-domain.ts(五界主题色/RANK_LABEL/IUCN 映射/buildDbLinks 21-34 个链接按 5 组分类:分类学/基因组/生态观察/百科文献/类群专属——真菌 MycoBank、原核 LPSN、植物 Kew POWO、动物 IUCN+WoRMS、物种 BOLD/BHL)
- src/lib/bio-store.ts(zustand 视图状态机+历史栈)、src/hooks/use-bio.ts(TanStack Query)
- 组件:header(⌘K 搜索+建议下拉)、home-view(hero+计数动画+六界卡+旗舰精选+IUCN 条形+数据库徽墙+图鉴轮盘)、taxonomy-tree(递归树+自动展开+移动端 Sheet)、explore-view(树+面包屑+工具条+卡片网格)、taxon-detail(主图+分类地位+数据库链接组+上/下一物种)、agent-panel(聊天+[[id]]芯片+匹配卡片+建议)、footer(sticky)
- page.tsx 组装;lint 零错误;tsc 零错误(仅 examples/skills 脚手架固有报错)

Stage Summary:
- UI 完整,VLM 评估风格协调 9/10

---
Task ID: 9(浏览器验证)
Agent: main
Task: agent-browser 端到端验证

Work Log:
- 首页渲染✓(无 console error);六界卡/统计/旗舰/轮盘/Agent 按钮齐备
- 分类树:域→变形菌门→γ-变形菌纲→肠杆菌目→肠杆菌科→埃希菌属→大肠杆菌 全链路✓
- 物种详情:描述/形态/生境/分布/IUCN/分类地位/21 数据库链接✓;NCBI 链接真实可达
- 搜索"虎":建议下拉+结果页+详情跳转✓
- Agent:建议提问→大熊猫回答→引用芯片点击跳转详情✓;无效 [[占位]] 已被前端清洗
- 暗色模式✓(VLM 评估合格);移动端 390px 布局正常✓;图鉴轮盘抽取→跳转✓
- 修复:layout.tsx 历史报错(theme-provider 创建时序,已消失)

Stage Summary:
- 核心路径全部浏览器实测通过

---

## 项目当前状态(交接必读)

**已稳定运行**:dev server 3000 端口,lint/tsc 零错误,浏览器实测所有核心交互通过。
**核心功能**:分类树探索 / 全局搜索(⌘K) / 图鉴目录(多维筛选) / 物种对比(≤3,可导出Markdown/分享链接) / 首页新页速递时间线 / 详情页灯箱+←/→键盘导航 / AI 助手(限流时优雅降级) / 分享链接恢复(#compare=… 与 #browse?… 两种 hash 路由,支持重载+同页hashchange)。

**数据规模**:1267 分类单元 / 311 物种 / 47 门 / 84 旗舰物种 / IUCN 62 种 / 配图 142/311。

**未完成/风险**:
1. 剩余 169 个非旗舰物种无配图(占位图兜底)。z-ai 全部 API(image/image-search/LLM/VLM)在 2026-09-13 15:00 轮仍账户级 429。恢复后:
   - `timeout 90 z-ai image -p test -o /tmp/t.png` 探测 → 恢复则 `BATCH=999 SCOPE=all CONCURRENCY=2 timeout 580 bun scripts/generate-images.ts` 连跑多批(勿用并发4)
   - image-search 已从 400 变 429(服务存活),恢复后可 `timeout 500 bun scripts/fetch-images.ts` 抓真实照片
2. Agent 引用卡「加对比」按钮因 LLM 限流未做浏览器端到端实测(代码路径与其他对比按钮一致,类型/lint 通过)
3. Agent 回答口语化波动(已知,非阻塞)

**下一阶段建议(优先级)**:
1. P0:补齐非旗舰物种配图(探测→分批前台跑,每批约20张)
2. P1:Agent 新功能指引(规范8)实测;VLM 抽查配图质量
3. P2:对比视图列hover高亮;探索视图物种计数徽章;首页数据徽章墙

---
Task ID: R2(cron 第1轮巡检, 2026-09-13 13:38)
Agent: main
Task: QA回归 + 修复界卡片Bug + 新功能(hero横幅/同属近亲) + 补图两批

Work Log:
- QA 发现真Bug:首页六大界卡片中,真核四界(原生生物/真菌/植物/动物)点击无效
  原因:home-view 用 tree?.find() 只在顶层找节点,而真核界嵌套在 Eukarya 域下 → id 为 undefined,onClick 静默失败
  修复:改为递归 findTreeNode(tree, k);已浏览器实测动物界(10 门卡)与真菌界(5 门卡)跳转正常
- P1 首页 hero 新增"生命之树 Arbor Vitae"复古铜版画横幅(z-ai image 1344x768,渐变遮罩+拉丁图注),VLM 评估协调性高、无遮挡
- P1 物种详情新增"同属近亲"区块:API siblings select 扩展 image/conservation/description,前端横向滚动卡片(已用中华蜜蜂↔西方蜜蜂实测)
- P0 补图:两批 SCOPE=all 生成插画 42 张(变形菌门各菌/古菌/原生生物等),累计配图 ~125/311
- image-search 服务本轮仍 400 不可用(已测试),继续走 AI 插画路线
- lint/tsc 零错误;dev.log 无新增错误

Stage Summary:
- 修复1个真实交互Bug;新增2个P1功能;配图进度 84→~125
- 交接建议:下轮继续 BATCH=40 SCOPE=all 分批补图;可做 P2 物种对比功能或 IUCN/界聚合浏览页;首页六界卡下方可加"最近更新"时间线

---
Task ID: R3(cron 第2轮巡检, 2026-09-13 14:30)
Agent: main
Task: QA回归 + 修3个Bug + P2新功能(物种对比/图鉴目录) + 补图

Work Log:
- QA 发现并修复 3 个真实 Bug:
  1. 首页真核四界卡片「0 条目」:stats.kingdoms 只含三域,改为从 tree 数据递归统计子树条目数(原生139/真菌92/植物274/动物607)
  2. 【严重】DB 中全部 126 张配图路径双斜杠(//generated/…,协议相对URL,生产环境会碎):generate-images.ts 拼接多写了 "/",已批量修复 DB 126 条 + 修正脚本
  3. 暗色模式 hydration 报错(Next dev overlay "1 Issue"):header 主题切换按钮 Sun/Moon 依赖 useTheme() 客户端值,SSR 不一致;改为 CSS dark:block/dark:hidden 切换,新加载 0 issue
- 新 API:/api/species(界/IUCN/标签/配图/关键词过滤 + 4种排序 + 分页 + facets 计数),tags 正确 JSON.parse
- P2 功能①「物种对比」:store compareIds(≤3)+ toggleCompare;底部浮动对比托盘(framer-motion,缩略图/移除/清空/开始对比);compare-view 列头卡(图+界徽章+NCBI快捷链接)+ 对比表(界/门/纲/目/科/属/形态/生境/分布/IUCN/NCBI txid/速览,含「一致/相异」徽标);入口:物种卡hover「对比」按钮(目录/探索/搜索结果卡)、详情页右上角「加入对比」
- P2 功能②「图鉴目录」browse-view:筛选面板(6界+7 IUCN+3标签+有图+关键词+4排序,facet计数徽标)+ SpeciesCard 网格 + 无限加载;入口:顶栏导航、首页 hero 按钮、首页 IUCN 条形图逐行可点击跳转筛选
- 入口与集成:page.tsx 挂载 browse/compare 视图+CompareTray;layout 挂 Sonner Toaster(bottom-center);agent system prompt 增加新功能指引(规范7);agent 建议问题更新;footer 功能清单更新
- 浏览器实测全部通过:目录311物种→真菌筛选21→卡片加对比→托盘→对比视图12行表+6徽标;IUCN CR条→13物种;详情页加入对比;390px 模拟无页面级溢出(横向滚动容器正常);暗色VLM评估通过
- P0 补图:第一批 CONCURRENCY=4 +16张(142/311),但触发严重429,后续批次全部失败,API 持续 429(账户级限流),image-search 服务仍 400 不可用
- lint/tsc 零错误;dev.log 无错误

Stage Summary:
- 3 Bug 修复(含高危图片路径);2 个 P2 大功能上线并实测通过
- 配图 142/311,剩 169;z-ai image API 限流中,需冷却后继续
- 交接建议:下轮先 `timeout 90 z-ai image -p test` 探测限流恢复,然后 `BATCH=999 SCOPE=all CONCURRENCY=2 timeout 580 bun scripts/generate-images.ts` 连续跑(并发2稳定,4 会烧光配额);可再做:搜索结果页对比入口已做、可加「最近配图时间线」、compare 视图增加导出/分享

---
Task ID: R3-收尾(2026-09-13 14:55)
Agent: main
Task: 本轮收尾与交接

Work Log:
- 新增交叉入口:探索视图 界/门/纲 级节点标题卡新增「目录浏览该界物种」按钮(→browse 预置该界筛选),已实测真菌界→21 物种
- Sonner Toaster 加 offset=96 避让对比托盘;agent 面板简介与建议问题更新(教用户用对比功能)
- 最终 QA:全新加载 0 dev issue;首页六界卡条目数正确(109/39/139/92/274/607);全流程(目录→筛选→卡片加对比→托盘→对比视图 12 行表)通过;lint/tsc 零错误;dev.log 无错误
- z-ai image API 全程 429(并发4批次疑似烧掉长窗口配额),本轮补图止步于 142/311;image-search 仍 400

Stage Summary(当前项目状态):
- 【稳定】311 物种图鉴,新增两大功能(物种对比/图鉴目录聚合浏览),3 个 Bug 修复(含高危 // 路径),配图 142/311
- 下一轮优先:
  1. P0 补图:先 `timeout 90 z-ai image -p test -o /tmp/t.png` 探测 429 恢复,再 `BATCH=999 SCOPE=all CONCURRENCY=2 timeout 580 bun scripts/generate-images.ts` 连续跑多批(勿用 CONCURRENCY=4)
  2. P2 备选:对比视图导出(复制 Markdown 表格)/分享链接;首页「最近配图」时间线;对比视图支持从 Agent 引用芯片直接加对比
  3. 风险:z-ai image 若长时间限流,可考虑生成 768x576 小图减少消耗,或等 image-search 恢复抓真实照片

---
Task ID: R4(cron 第3轮巡检, 2026-09-13 15:00)
Agent: main
Task: QA回归 + 4大新功能(分享链接/新页速递/灯箱键盘导航/Agent加对比) + 3处修复

Work Log:
- 【QA回归】agent-browser 全链路实测:首页/目录筛选(真菌21)/对比托盘3上限/对比视图12行表/详情全区块/搜索(银杏)/暗色切换 全部通过,全程零 console 错误
- 【环境判断】z-ai 全部 API(LLM/image/image-search/VLM)账户级 429 限流整轮未恢复;Agent 面板优雅降级正常(显示"暂时失联");P0 补图被迫搁置,转入纯代码功能开发
- 【新功能A:对比分享链接】hash 路由 `#compare=id1,id2`:进入/同页hashchange 均自动还原对比会话(截断≤3并规范化hash);「复制分享链接」按钮;页面订阅 store 同步 hash
- 【新功能A:对比导出】「导出 Markdown」按钮:完整对比表(界/域→属+形态/生境/分布/IUCN/NCBI/速览)转 Markdown 复制到剪贴板,可直接贴笔记/文档
- 【新功能B:首页「新页速递 Novissima」】新 API /api/recent(3min内存缓存)+ useRecent hook + 首页时间线区块:12张最近配图物种卡(界徽章/IUCN/相对时间"今天HH:mm/昨天/M-D"),配「插画完成度 142/311」进度条,卡片点击直达详情(实测双孢蘑菇)
- 【新功能C:Agent引用卡一键加对比】agent-panel 匹配条目卡片右侧新增 GitCompareArrows 按钮,toggleCompare+toast(已加/已移/已满三态);系统提示词规范8教阿博新功能
- 【新功能D:详情页灯箱+键盘导航】主图点击全屏放大(zoom光标/hover提示"点击放大"/Esc或点空白关闭/caption含imageCaption);←/→键盘切换同属上/下物种(输入框聚焦时忽略),导航区加kbd提示徽标(实测中华蜜蜂↔西方蜜蜂)
- 【新功能E:目录筛选分享】hash 路由 `#browse?kingdom=Fungi&iucn=CR&tag=flagship&hasImage=1&q=..&sort=..`:筛选变化300ms防抖同步hash;「分享筛选」按钮;重载/同页hashchange均恢复完整筛选(实测动物界+CR→6卡)
- 【修复1】store.removeCompare/clearCompare 在对比视图时同步更新 view.ids(此前对比视图内移除物种列不消失)
- 【修复2】对比表「界」行原核生物显示"—":改为 kingdom 缺失时回退 domain,行标签改「界/域」(实测细菌域正确显示)
- 【修复3】QA发现的UX缺口:对比视图列头卡无法跳详情——列头图片与名称均可点击跳转(hover浮层"查看图鉴详情→")
- 【共享组件】src/lib/clipboard.ts(copyText 带execCommand降级 + browseFilterToParams);src/components/bio/share-dialog.tsx(剪贴板不可用时手动复制兜底,compare/browse复用);无头浏览器剪贴板被权限拦截时自动弹兜底框(实测Markdown 1052字符完整)
- 【重构】browse hash恢复用 lazy useState 初始化(修复 react-compiler lint 报错 setState-in-effect);taxon-detail 键盘导航 hooks 移到 early return 之前(修复条件hook违规)
- lint/tsc 零错误;dev.log 无新增错误(仅编辑中途瞬态 LayoutGrid 未定义,最终代码已含import)

Stage Summary(当前项目状态):
- 【稳定】新增5大功能(对比分享/对比导出/新页速递/灯箱+键盘导航/目录筛选分享)+3修复,全部浏览器实测通过
- 配图仍 142/311;z-ai 全 API 整轮 429,Agent/补图/VLM评估均环境性阻塞(非代码问题)
- 下一轮优先:
  1. P0 补图(429恢复后):`timeout 90 z-ai image -p test -o /tmp/t.png` 探测,恢复则 `BATCH=999 SCOPE=all CONCURRENCY=2 timeout 580 bun scripts/generate-images.ts` 连跑;同时重测 image-search(本轮从400变为429,说明服务活着,限流或已减轻)
  2. Agent 回答实测(429恢复后):验证规范8新功能指引与引用卡加对比按钮
  3. 备选新功能:对比视图列hover高亮;探索视图面包屑显示物种计数;首页 hero 数据徽章;VLM 抽查最近配图质量
  4. 已知边界:hashchange 恢复会重置浏览历史栈(设计取舍);browse 内部筛选在导航离开再返回时 q/sort/hasImage 重置(kingdom/iucn/tag 由store保留)
