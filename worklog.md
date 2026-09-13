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

---
Task ID: R5(cron 第4轮巡检, 2026-09-13 15:30)
Agent: main
Task: QA回归 + 7项新功能(筛选持久化/列hover高亮/面包屑计数/数据徽章墙/快捷键面板/搜索高亮/密度切换)

Work Log:
- 【环境判断】dev server 一度进程死亡(非代码问题),以 `setsid nohup bun run dev >> dev.log` 重启后稳定;z-ai 全部 API(image/LLM)整轮仍账户级 429,P0 补图继续搁置;image-search 未再探测
- 【QA回归】agent-browser 全链路实测:首页/目录筛选(真菌21)/对比托盘+对比视图12行表/对比→详情跳转/搜索建议→详情/暗色切换/Agent 429优雅降级("暂时失联"提示)/Enter提交Agent消息(需先聚焦textarea,属测试脚本问题非bug)/零console错误/零dev overlay
- 【修复已知边界】browse 筛选状态(q/sort/hasImage)导航丢失 → store 重构:
  - bio-store.ts:BioView.browse 改为纯标记 `{type:"browse"}`;新增 BrowseState{kingdom,iucn,tag,hasImage,q,sort} 存于 store.browseFilter;patchBrowseFilter(不压历史栈);openBrowse(filter) 语义改为"有键=整组应用,空=保留上次筛选";browseDensity("grid"/"list")+shortcutsOpen 新增
  - hydrateFromHash 解析 #browse? 完整 6 参数(含 q/sort/hasImage,sort 白名单校验)
  - page.tsx:hash 同步集中到 store.subscribe(compare/browse 双分支均由 page 统一写,用 browseFilterToParams);BrowseView 无 props 挂载;挂载 ShortcutsDialog
  - 实测:设"真菌界+关键词芝+列表密度"→回首页→再进目录,三项全部保留 ✓;粘贴 #browse?kingdom=Fungi&iucn=CR&hasImage=1 恢复 ✓(CR真菌=0为数据事实,空态+重置按钮正常)
- 【新功能1:对比视图列hover高亮】hoverCol state;列头卡 onMouseEnter/Leave + ring-1/border-primary 类;表格 td 双向联动(列头hover→12单元格高亮;td hover→列头卡ring);native hover 实测双向均 12 格+1 卡 ✓
- 【新功能2:面包屑物种计数徽章】id→sc Map(从 tree DTO 递归构建);explore-view 与 taxon-detail 两处面包屑均加(名后小圆徽章+title提示"·N物种");实测详情页"细菌域24→变形菌门8→…→埃希菌属1" ✓。注:探索视图卡片点击进的是详情视图,故详情页面包屑必须同步加,两处样式一致
- 【新功能3:首页数据完备度徽章墙】hero 统计带下方新卡片:头行(旗舰84/NCBI锚定47/21+科学库徽章)+三列 SVG 环形进度(物种配图46% 绿/IUCN评估20% 琥珀/NCBI锚定15% 青,useCountUp 数字动画+stroke-dashoffset 过渡)
- 【新功能4:键盘快捷键帮助面板】新组件 shortcuts-dialog.tsx:4分组(全局/详情页/AI助手/指针)kbd 速查表+博物馆风"Claves Breves"标题;`?` 键全局开关(input/textarea 聚焦时忽略)+header Keyboard 图标按钮;实测两种打开方式+Esc 关闭 ✓
- 【新功能5:搜索关键词高亮】src/lib/highlight.tsx(escapeRegExp+双遍正则重组+<mark> amber 亮标,暗色模式适配);SearchView 中文名/拉丁名/描述三处应用;实测搜"灵芝"6 处 mark ✓
- 【新功能6:目录密度切换】卡片网格/紧凑列表双模式(SpeciesRow 行组件:48px缩略图+名称+拉丁+标签+界徽章+IUCN+hover对比按钮,斑马纹+reveal动画);密度存 store 跨导航保留;实测切换+筛选持久化联动 ✓
- 【Agent提示词】规范9:教阿博新功能(密度切换/筛选保留/?快捷键面板/面包屑计数)
- 【验证】lint 零错误;tsc 零错误(仅 skills/examples 固有);390px 移动端无横向溢出;暗色截图合格;全新加载零 dev issue

Stage Summary(当前项目状态):
- 【稳定】7 项新功能上线并全部浏览器实测通过;本轮无新增 bug(仅修复上轮遗留的筛选丢失边界)
- 配图仍 142/311;z-ai image/LLM 整轮 429,Agent 新提示词(规范9)未做端到端实测(限流恢复后验证)
- 下一轮优先:
  1. P0 补图(429恢复后):`timeout 90 z-ai image -p test -o /tmp/t.png` 探测,恢复则 `BATCH=999 SCOPE=all CONCURRENCY=2 timeout 580 bun scripts/generate-images.ts` 连跑
  2. Agent 回答实测(限流恢复后):验证规范9新功能指引
  3. 备选新功能:物种详情页"演化谱系时间轴"可视化;图鉴轮盘改桌面摇号动效;首页六界卡加迷你条形图(各门物种数);对比视图导出 CSV 格式
  4. 已知取舍:hashchange 恢复仍会重置浏览历史栈;browse hash 由 page.tsx subscribe 同步(无防抖,replaceState 逐键触发,实测无性能问题)

---
Task ID: R6(cron 第5轮巡检, 2026-09-13 15:55)
Agent: main
Task: QA回归(零错误) + 5项新功能(演化谱系时间轴/轮盘摇号动效/六界迷你条形图/对比导出CSV/浏览足迹)

Work Log:
- 【环境判断】dev server 进程正常;z-ai 全部 API(image/LLM/image-search)整轮仍账户级 429,P0 补图继续搁置(轮初/轮尾各探测一次)
- 【QA回归】agent-browser 全链路:首页零 console 错误/六界卡跳转(R2回归)/真菌界→子囊菌门→盘菌纲→盘菌目→羊肚菌科→羊肚菌属→羊肚菌详情全链路/搜索建议/对比托盘→视图→清空自动退出(R4回归)/目录筛选(真菌21)/暗色切换/?快捷键面板/Agent 429优雅降级——全部通过,零新 bug
- 【新功能A:演化谱系时间轴】新组件 lineage-timeline.tsx:详情页右栏「分类地位」升级为竖向时间轴——域→…→种完整下潜路径,每节点阶元图标圆徽+物种计数徽章+中文名+拉丁名,界色渐变导轨,framer-motion 逐节点错峰入场;当前条目为呼吸光环大节点+「你在此处」标记;节点可点击上溯任一层级(实测黑孢块菌 8 级/真核域节点跳转);脚注显示总阶元数
- 【新功能B:图鉴轮盘摇号动效】home-view 轮盘重写:API 只调 1 次取中奖号,滚动画面从旗舰精选池本地采样;老虎机式减速序列(13 步 55ms→260ms,上下扫动+模糊);揭幕中奖卡 spring 弹入+琥珀荣光描边+缩略图+「翻开这页」按钮(实测:滚动→揭幕桑→跳转详情)
- 【新功能C:六界卡迷你条形图】每张界卡新增 Top3 门物种数条形图(树 DTO 子节点排序,界色渐变,motion 宽度动画错峰入场,truncate+title 提示;实测动物界:脊索83/节肢35/软体13)
- 【新功能D:对比导出 CSV】compare-view 新增「导出 CSV」按钮:BOM+RFC 转义+16 行数据(界域→速览),Blob 下载(biocodex-对比-XX.csv,下载失败降级剪贴板/手动复制);实测文件落地 1458 字节内容正确中文无乱码
- 【新功能E:浏览足迹】src/lib/view-history.ts(localStorage 12 条去重+事件订阅模型+relativeTime 相对时间);taxon-detail 查看时 push;header 新增 History 图标按钮(琥珀计数徽点 9+)+足迹下拉(framer 入场/缩略图或界徽/相对时间/点击跳回/清空;实测:清空→看详情→徽点1→面板「黑孢块菌 刚刚」→点击跳回)
- 【集成更新】Agent 提示词规范10(教阿博 5 项新功能);footer 功能清单更新;TreeNodeDTO rank 字段名修正(rk→rank)
- 【验证】lint/tsc 零错误;dev.log 无错误;暗色模式下时间轴/轮盘/足迹面板渲染正常;新组件均纵向/flex 布局无移动端溢出风险

Stage Summary(当前项目状态):
- 【稳定】5 项新功能全部浏览器实测通过,本轮零 bug 修复(纯功能增量轮)
- 配图仍 142/311;z-ai 全 API 整轮 429(账户级),Agent 规范10提示词未做端到端实测(限流恢复后验证)
- 下一轮优先:
  1. P0 补图(429恢复后):`timeout 90 z-ai image -p test -o /tmp/t.png` 探测,恢复则 `BATCH=999 SCOPE=all CONCURRENCY=2 timeout 580 bun scripts/generate-images.ts` 连跑(勿用并发4)
  2. Agent 实测(限流恢复后):验证规范10新功能指引
  3. 备选新功能:详情页「界主题装饰纹样」(各界卡片区角落纹样差异化);首页「足迹接续」区块(基于浏览足迹推荐近亲);探索视图节点卡加配图缩略;目录视图虚拟滚动优化(311 卡全量渲染)
  4. 已知取舍:足迹记录所有阶元(含非物种,便于回溯);CSV 导出在无头浏览器自动落地 Downloads,普通浏览器走下载栏

---
Task ID: R7(cron 第6轮巡检, 2026-09-13 16:20)
Agent: main
Task: QA回归(零bug) + 6项新功能(标本收藏夹/足迹接续/界纹样/只看差异/多入口收藏/hero快捷入口) + 1 bug修复

Work Log:
- 【环境判断】z-ai 全部 API(image/LLM/image-search)轮初探测仍账户级 429,P0 补图继续搁置;dev server 全程稳定
- 【QA回归】agent-browser 全链路:首页零错误/六界卡跳转/7级下潜(动物界→脊索→脊椎→哺乳→灵长→人科→人属→智人)/智人详情主图+时间轴+近亲/对比托盘+9行表+MD/CSV/分享/搜索大熊猫→建议→详情/暗色/快捷键面板/目录筛选/390px 无溢出——全部通过,本轮 QA 零新 bug
- 【新功能A:标本收藏夹 Specimen Cabinet】(本轮主体)
  - src/lib/favorites.ts:localStorage 持久化(上限60件)+事件订阅模型(同页多实例+跨标签页同步), FavoriteEntry 含渲染卡片所需全部字段(可离线渲染)
  - store 新增 favorites 视图+openFavorites;hash 路由 #favorites(mount 恢复+同页 hashchange 恢复)
  - favorites-view.tsx:标题区(SPECIMEN CABINET+界纹样装饰带)+界色分隔纹章线+SpeciesCard 网格(离线数据映射)+收藏时间行+「全部加入对比」(逐个入托盘≤3,满2自动进对比视图)+「清空」+空态(六界色斜插标本卡插画+指引)
  - 入口全覆盖:①SpeciesCard hover 书签按钮(与对比按钮同排左上,已收藏常亮琥珀+「标本」角标) ②详情页右上角「收藏」按钮(加入对比旁) ③header 书签图标+计数徽章 ④首页 hero「我的标本夹(N)」按钮(N>0时) ⑤Agent 引用卡收藏按钮 ⑥搜索结果卡收藏按钮 ⑦快捷键 F(详情页收藏/取消)
  - 快捷键面板/Agent提示词规范11/footer 功能清单同步更新
- 【修复bug】page.tsx hashchange 监听正则 /^#(compare|browse)/ 漏掉 favorites → 同页粘贴 #favorites 不恢复视图;已改为 /^#(compare|browse|favorites)/ 并实测恢复
- 【新功能B:首页「足迹接续 Ubi Relinquisti」区块】hero 与六界卡之间:琥珀底横滚胶囊芯片(缩略图/界徽/中文名/相对时间),点击续读;「清除足迹」按钮;无足迹时整区块隐藏(首访者不见)
- 【新功能C:界主题装饰纹样 KingdomOrnament】新组件 kingdom-ornament.tsx:6 域差异化手绘 SVG(细菌=链球菌+杆菌+鞭毛波/古菌=六边形晶格/原生=纤毛波浪+眼点/真菌=孢子点阵+菌丝/植物=叶脉+果实/动物=足迹序列+羽毛);三处应用:详情页主图顶部白纹钢印、六界卡右下角界色纹样(hover 加深)、收藏视图标题装饰带(按收藏界别动态显示前3)
- 【新功能D:对比视图「只看差异」聚焦模式】所有行统一计算 uniform(含形态/生境/分布/NCBI 文本字段,徽标全行显示);「只看差异(N)」切换按钮(相异行琥珀底纹强调);全一致时空态提示;实测 11↔10 行切换
- 【验证】lint/tsc 零错误;dev.log 全 200 无错误;暗色截图合格;390px 无横向溢出;console 零错误

Stage Summary(当前项目状态):
- 【稳定】6 项新功能全部浏览器实测通过;修复 1 个真实 bug(hashchange 正则遗漏 favorites)
- 收藏功能全链路:卡片/详情/header/hero/Agent/搜索/快捷键 7 入口 + #favorites 分享路由 + 一键全对比
- 配图仍 142/311;z-ai 全 API 本轮仍 429(账户级),Agent 规范11提示词未做 LLM 端到端实测(限流恢复后验证)
- 下一轮优先:
  1. P0 补图(429恢复后):`timeout 90 z-ai image -p "test" -o /tmp/t.png` 探测,恢复则 `BATCH=999 SCOPE=all CONCURRENCY=2 timeout 580 bun scripts/generate-images.ts` 连跑(勿用并发4)
  2. Agent 实测(限流恢复后):验证规范11收藏指引
  3. 备选新功能:收藏视图列表密度(复用 SpeciesRow);详情页收藏时跨页同步动画;对比导出 JSON 格式;IUCN 红色名录专题聚合页;首页「足迹接续」增加同属近亲推荐(需 API)
  4. 已知取舍:收藏数据仅存本机 localStorage(换设备/清缓存不随行,已在 UI 说明);标本夹上限 60 件

---
Task ID: R8(cron 第7轮巡检, 2026-09-13 16:55)
Agent: main
Task: QA回归(零bug) + 3项新功能(红色名录专题页/收藏夹密度切换/对比导出JSON) + SpeciesRow组件化

Work Log:
- 【环境判断】z-ai 全部 API(image/LLM)轮初探测仍账户级 429,P0 补图继续搁置;dev server 全程稳定
- 【QA回归】agent-browser:首页/足迹接续+hero收藏夹(数据驱动渲染✓)/收藏夹视图→详情→F键双向切换(1→0→1)/Agent 429优雅降级(发消息后显示"暂时失联")/console 零错误——本轮 QA 零新 bug
- 【重构:SpeciesRow 组件化】从 browse-view 提取紧凑列表行为共享组件 src/components/bio/species-row.tsx,与 SpeciesCard 功能对齐(新增收藏书签按钮+已收藏「标本」徽标);browse-view 改为 import(删内部 ~100 行)
- 【新功能A:红色名录专题页 RedlistView】(本轮主体)
  - 新视图 redlist-view.tsx:RUBRUM INDEX 标题区 + 危机统计带(受威胁总数/已评估/CR/EW 四格 + 等级占比纹章条)+ 受威胁分组(EW→CR→EN→VU 按危机程度降序,每组等级徽章+计数+说明+卡片网格)+ 低危折叠区(NT/LC,AnimatePresence 展开)+ 底部说明与目录跳转
  - 六个固定顺序 useSpeciesBrowse({iucn}) hook(避免 map 内 hook 违规)
  - store 新增 redlist 视图 + openRedlist;hash 路由 #redlist(mount+hashchange 恢复,正则已含 redlist);page.tsx 挂载+hash 同步
  - 入口:首页 IUCN 保护状况卡下方「红色名录专题 Rubrum Index」渐变红按钮(显示受威胁物种数)
  - 实测:入口点击→#redlist→EW/CR/EN/VU 四组 39 卡→展开低危→62 卡;390px 无溢出;暗色合格;hash 直达恢复
- 【新功能B:收藏夹密度切换】favorites-view 新增网格/紧凑列表切换(与图鉴目录共用 store.browseDensity 偏好);列表模式含「最新收藏于」时间行;实测双向切换
- 【新功能C:对比导出 JSON】compare-view 新增「导出 JSON」按钮:结构化格式(biocodex.compare.export v1:species 含完整谱系 lineage 对象/形态/生境/分布/IUCN/NCBI/速览 + fields uniform 状态 + diffCount + shareUrl),Blob 文件下载;实测落地 3294 字节,python 解析验证结构完整(虎 lineage 猫科→豹属,diffCount 7)
- 【修复lint】react-compiler "memoization could not be preserved":buildJson 在 rows useMemo 定义之前引用 rows → 移到 rows 之后(python 脚本移动代码块)
- 【集成更新】Agent 提示词规范12(红色名录专题指引+密度切换+JSON导出);footer 功能清单更新
- 【验证】lint/tsc 零错误;dev.log 全 200;console 全新加载零错误

Stage Summary(当前项目状态):
- 【稳定】3 项新功能全部浏览器实测通过;本轮零 bug(仅 lint 时序问题)
- 视图清单:home/explore/taxon/search/browse/compare/favorites/redlist(8 个,4 个有 hash 路由)
- 配图仍 142/311;z-ai 全 API 本轮仍 429,Agent 规范12未做 LLM 端到端实测(限流恢复后验证)
- 下一轮优先:
  1. P0 补图(429恢复后):`timeout 90 z-ai image -p "test" -o /tmp/t.png` 探测,恢复则 `BATCH=999 SCOPE=all CONCURRENCY=2 timeout 580 bun scripts/generate-images.ts` 连跑(勿用并发4)
  2. Agent 实测(限流恢复后):验证规范12红色名录指引
  3. 备选新功能:红色名录页每组加"全部加入对比"按钮;物种详情页 IUCN 徽章点击跳红色名录对应分组;红色名录支持按界过滤;收藏夹导出(备份 JSON 下载/导入);详情页"引用格式"一键复制(学名+权威缩写)
  4. 已知取舍:redlist 六组各发一次 /api/species 请求(无分页全量,数据量小可接受);收藏密度与目录密度共用同一偏好(设计取舍:用户偏好跨视图一致)
