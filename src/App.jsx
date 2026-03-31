import { useState, useCallback } from "react";

const BJJ_DATA = {
  closedGuard: {
    name: "封闭式防守", nameEn: "Closed Guard", role: "bottom", emoji: "🦵", category: "guard",
    description: "双腿缠绕对手腰部，脚踝交叉锁紧。最基础也最安全的防守位置，进攻选项极其丰富。",
    keyPoints: [
      "Break posture是一切的前提——用双手控制头部/衣领向下拉，让对手无法直起身",
      "髋部保持活跃，不要平躺——微微偏向进攻侧制造角度",
      "双腿夹紧，脚踝锁死，不给对手站起或后退的空间",
      "Grip要有目的：一手控制袖口/手腕（限制其防守），一手控制衣领/后颈（控制姿势）",
      "对手试图站起时立刻打开guard转为open guard，不要硬挂着被slam",
    ],
    chains: [
      { type: "submission", name: "十字固 Armbar",
        steps: ["先break posture，一手控制对手同侧手腕钉住","另一手抓其同侧衣领或后颈，把身体往攻击侧偏移","攻击侧脚踩对手髋部，作为旋转支点","身体大幅旋转至垂直于对手，另一腿高挂过对手头部","双腿夹紧对手手臂，控制其拇指朝上","髋部上顶完成锁技——慢慢提，不要猛拉"],
        tip: "关键：旋转角度要够大（接近90度），腿一定要越过头部卡住。如果对手把手抽回，可以直接转为三角绞。" },
      { type: "submission", name: "三角绞 Triangle Choke",
        steps: ["控制对手一侧手腕，向对侧推开","同侧腿解开guard，高挂到对手颈部/肩膀上方","确保对手一只手臂在里面、一只在外面","另一腿搭到攻击腿的脚踝上锁住三角","双手拉对手后脑向下，调整角度——身体偏转约30度","夹紧大腿完成绞杀"],
        tip: "关键：角度比力量更重要。锁完之后要cut angle（身体偏转），不然绞不紧。对手常见防守是posture up和抽手。" },
      { type: "submission", name: "断头台 Guillotine",
        steps: ["当对手低头尝试pass或抱双腿时抓住时机","前臂（桡骨侧）插入对手下巴下方、喉咙位置","另一手与攻击手合握，形成紧密锁扣","身体后仰，闭合guard","髋部上提，背部弓起——用全身力量而非手臂","可以选择arm-in或无臂版本"],
        tip: "关键：前臂骨要深入卡在喉咙下方，不是用手指掐。High elbow guillotine效率更高：攻击侧肘部指向天花板。" },
      { type: "submission", name: "木村锁 Kimura (from Guard)",
        steps: ["对手一只手撑在你胸口或地面时抓住该手腕","坐起（用另一手撑地），身体贴近对手","攻击手从对手手臂外侧穿过，握住自己控制手腕","形成figure-4锁扣","身体后倒，保持对手手肘紧贴自己身体","用身体旋转将其手腕向背部方向转动"],
        tip: "关键：坐起来是很多人忽略的一步。Kimura grip拿到后也可以作为控制来做sweep，不一定非要finish。" },
      { type: "sweep", name: "剪刀扫 Scissor Sweep",
        steps: ["一手控制对手袖口（拉向一侧），一手深抓衣领","打开guard，将攻击侧膝盖横放在对手腹部（knee shield）","另一腿放低，脚勾住对手膝盖后方","衣领手拉+袖口手推，同时上腿前推+下腿后勾","像剪刀合拢一样完成翻转","跟随动量直接过渡到mount"],
        tip: "关键：时机在对手posture被打破的瞬间。上下腿发力要同步。失败常因下腿勾得不够深。" },
      { type: "sweep", name: "花扫 Flower/Pendulum Sweep",
        steps: ["同侧手深控对手袖口，将其手臂钉向一侧","另一手穿到对手同侧腿外侧，深抓裤腿/腰带","打开guard攻击侧，脚踩地面准备发力","另一腿（摆锤腿）向天花板方向大幅摆动","摆锤腿的动量+踩地腿的蹬力+手的配合完成翻转","直接过渡到mount"],
        tip: "关键：摆锤腿要甩得又高又远，这是主要力量来源。抓裤腿要深。这个扫技对大体型对手也很有效。" },
    ]
  },

  butterflyGuard: {
    name: "蝴蝶防守", nameEn: "Butterfly Guard", role: "bottom", emoji: "🦋", category: "guard",
    description: "坐起状态，双脚勾在对手大腿内侧（蝴蝶钩），上体紧贴对手。Marcelo Garcia标志性位置，以扫技和快速过渡著称。",
    keyPoints: [
      "必须坐直——一旦被推倒平躺，蝴蝶防守就失效了",
      "上体要紧贴对手胸口/肩膀，像拥抱一样——距离是蝴蝶防守的命",
      "至少一侧要有underhook（手臂穿过对手腋下），这是进攻基础",
      "双脚hooks不要太深——脚跟勾在大腿内侧即可，太深反而发不了力",
      "头的位置：贴在underhook同侧对手胸口/肩膀上",
      "随时准备切换——蝴蝶防守是动态位置，不适合消极等待",
    ],
    chains: [
      { type: "sweep", name: "基础蝴蝶扫 Basic Butterfly Sweep",
        steps: ["underhook侧手臂深穿到对手腋下，抓住腰带或后背","另一手控制对手同侧手腕或肘部（阻止其base）","上体完全贴紧对手——头顶在其胸口","向underhook的对侧方向倾倒身体","同时underhook侧蝴蝶hook大力上提","用hook把对手整个翻过去，跟随到top位"],
        tip: "关键：倒的方向和hook提的方向要一致。最常见的错误是上体不够贴近。想象'把对手扛在自己身上再倒下'。" },
      { type: "sweep", name: "单蝶扫 One Hook Sweep",
        steps: ["只用一侧蝴蝶hook","另一腿放到对手同侧腿外侧控制","拿到underhook，上体贴紧","hook侧倾倒+上提","外侧腿辅助控制对手腿部防止其base"],
        tip: "关键：当双hook都进不去时的替代方案。外侧腿的控制是关键。" },
      { type: "submission", name: "断头台 Guillotine (from Butterfly)",
        steps: ["对手低头试图underhook你或pass时","前臂滑入对手颈部下方","另一手合握，形成high elbow guillotine锁扣","身体后倒，guard锁闭","肘部指向天花板，髋部上提完成绞杀"],
        tip: "关键：蝴蝶防守的坐起姿态特别适合接guillotine——距离近、对手头在你面前。Marcelo Garcia标志性combo。" },
      { type: "transition", name: "Arm Drag反背 Back Take",
        steps: ["控制对手一侧手腕/前臂","快速将其手臂拽过你的身体中线（arm drag）","同时身体向拽的方向移动","绕到对手侧面/背后","建立seatbelt grip + 一个hook先上","再插入第二个hook完成back control"],
        tip: "关键：arm drag要快、要突然。拽手臂的同时身体一定要跟着移动，不是原地拽。" },
      { type: "transition", name: "转入单腿 Single Leg",
        steps: ["利用underhook控制，身体向一侧偏移","空出的手抓住对手一条腿","从坐起位置站起来","完成single leg takedown"],
        tip: "关键：蝴蝶防守和摔跤的衔接非常自然。" },
    ]
  },

  delaRiva: {
    name: "德拉希瓦防守", nameEn: "De La Riva Guard (DLR)", role: "bottom", emoji: "🪝", category: "guard",
    description: "以Ricardo De La Riva命名。一腿从外侧勾住对手前腿（DLR hook），另一脚踩在对手髋部或大腿。现代竞技BJJ核心open guard之一。",
    keyPoints: [
      "DLR hook要深：脚从对手小腿外侧穿过，脚背勾住大腿内侧",
      "必须有grip配合——至少抓对手同侧脚踝防止其抽腿",
      "另一脚踩在对手髋部、大腿或二头肌上管理距离",
      "不要只是'挂着'——DLR是进攻性位置，要主动打破对手平衡",
      "髋部保持活跃，不停调整角度",
      "如果对手抽出DLR hook的腿，立刻转其他guard（spider/lasso/SLX）",
    ],
    chains: [
      { type: "sweep", name: "经典DLR扫 Classic DLR Sweep",
        steps: ["DLR hook深勾对手前腿","同侧手抓对手被勾腿的脚踝","另一手抓对手同侧袖口或衣领","非DLR脚踩对手另一侧髋部","DLR hook向外推+踩髋脚向内推=破坏侧向平衡","配合手的拉拽将对手摔向一侧","跟随到top位"],
        tip: "关键：双腿的'推拉'配合——DLR hook腿往外拧送对手重心，踩髋脚辅助方向控制。" },
      { type: "sweep", name: "Berimbolo",
        steps: ["从DLR位置，抓住对手腰带或后裤腰","身体向后滚动（倒转方向）","DLR hook保持控制，利用滚动动量","绕到对手身体下方/侧面","穿过到对手背后","建立back control（hooks + seatbelt）"],
        tip: "关键：Berimbolo是DLR最华丽最高阶的技术。核心是'用滚动代替力量'。Miyao兄弟和Rafa Mendes的看家技术。" },
      { type: "transition", name: "DLR直接反背 Back Take",
        steps: ["DLR hook控制住对手前腿","当对手重心前移时","手抓腰带/后衣领，身体向DLR hook方向旋转","穿过对手腿下方绕到背后","建立一个hook，然后seatbelt grip","插入第二个hook"],
        tip: "关键：比berimbolo更直接的back take路径。时机是对手重心前倾的瞬间。" },
      { type: "sweep", name: "转X-Guard/SLX扫",
        steps: ["从DLR hook位置，将脚插入对手两腿之间","另一腿也进入，形成X-guard或Single Leg X","上提被控腿，同时推倒对手","或者直接stand up进single leg"],
        tip: "关键：DLR和X-Guard/SLX是天然连接。对手重心前压时特别适合转X-Guard。" },
      { type: "submission", name: "脚锁入口 Ankle Lock Entry",
        steps: ["从DLR位置放弃hook","控制对手一条腿，将脚踝夹入腋下","进入Ashi Garami腿纠缠位","前臂骨卡住跟腱","身体后仰+髋部上挺完成脚锁"],
        tip: "关键：DLR是进入leg lock系统的重要入口。IBJJF白带只允许straight ankle lock。" },
    ]
  },

  spiderGuard: {
    name: "蜘蛛防守", nameEn: "Spider Guard", role: "bottom", emoji: "🕷️", category: "guard",
    description: "双手抓住对手袖口，双脚踩在对手二头肌上形成四点控制。Gi专用强力远距离guard，控制力极强，扫技多样。",
    keyPoints: [
      "双手必须紧紧抓住袖口——松开就等于放弃整个位置",
      "脚要踩在对手二头肌上（不是肘部），脚趾扣住、脚跟勾住",
      "手臂伸直+腿伸直=最大控制距离，不让对手靠近",
      "一旦对手break一个grip，立刻重建或转其他guard",
      "蜘蛛防守很累手——grip维持不住时及时转guard",
    ],
    chains: [
      { type: "sweep", name: "蜘蛛扫 Spider Sweep",
        steps: ["双手控制袖口，双脚踩二头肌","一腿保持伸直推住，另一腿弯曲收回","收回的腿快速伸直推向对手同侧","同时松开同侧袖口并拉另一侧袖口向斜后方","对手被对角线力量推倒","跟随到top位"],
        tip: "关键：对角线力量——推的方向和拉的方向形成斜线，对手最难抵抗。" },
      { type: "sweep", name: "Lasso扫 Lasso Sweep",
        steps: ["一侧脚从踩二头肌的位置绕过对手手臂外侧，小腿缠绕其上臂（lasso）","另一侧保持标准蜘蛛脚踩控制","lasso侧腿向内拧转，限制对手手臂活动","踩侧腿推对手向另一方向","双腿配合+手拉袖口，将对手翻向lasso侧"],
        tip: "关键：lasso缠绕要深（小腿完全绕过手臂），对手很难解开。半蜘蛛半lasso组合非常强力。" },
      { type: "submission", name: "蜘蛛三角绞 Triangle from Spider",
        steps: ["双手蜘蛛位控制","一腿从踩二头肌位置高挂到对手颈部","另一腿放开踩髋或地面","如果对手低头→直接锁三角绞","如果对手posture up→用腿杠杆力将其前翻","sweep成功后仍可继续完成三角绞"],
        tip: "关键：蜘蛛到三角是高频combo。因为你已经控制双臂，很容易制造'一手进一手出'的条件。" },
      { type: "submission", name: "全蛛十字固 Armbar from Spider",
        steps: ["双蜘蛛控制，选择攻击侧","攻击侧脚从二头肌滑到对手肩膀上方","另一腿踩对手髋部控制距离","拉攻击侧袖口同时脚下压控制手臂","身体旋转，腿过头","完成armbar"],
        tip: "关键：蜘蛛控制让你已经在控制手臂，转armbar非常顺畅。旋转要快、要突然。" },
      { type: "transition", name: "转DLR / Berimbolo",
        steps: ["当对手试图跨过你一条腿pass时","放弃蜘蛛控制，被跨的腿转为DLR hook","手从袖口转抓裤腿/脚踝","进入DLR体系继续进攻"],
        tip: "关键：Spider和DLR是天然互转系统。高水平选手会在两者间自如切换。" },
    ]
  },

  halfGuard: {
    name: "半防守", nameEn: "Half Guard", role: "bottom", emoji: "🔄", category: "guard",
    description: "用双腿缠住对手一条腿。现代BJJ中发展出极丰富的子系统（knee shield、deep half、lockdown等），是攻防转换的关键枢纽。",
    keyPoints: [
      "绝对不要平躺——侧身面对对手是生存基础",
      "争取underhook——这是整个进攻体系的基石",
      "如果被crossface压住，先用knee shield制造空间",
      "下方腿要主动缠紧，不是被动等着被pass",
      "随时准备转deep half或恢复full guard",
    ],
    chains: [
      { type: "sweep", name: "老忠实扫 Old Faithful Sweep",
        steps: ["拿到underhook——深穿到对手腋下抓腰带或后背","头顶住对手胸口（头是支撑点）","身体侧起来，用underhook和头形成支架","后腿勾住对手被缠的腿","前脚踩地面辅助发力","用underhook+头顶+腿的配合整体翻转","跟到top side control"],
        tip: "关键：underhook要深、头的位置要正确、用整个身体的力量翻。如果对手用whizzer反控，可以转dog fight。" },
      { type: "transition", name: "反背 Back Take (Underhook → Dog Fight)",
        steps: ["拿到underhook后身体坐起来","进入dog fight位置（双方半跪，你有underhook）","用underhook手臂爬到对手背后","身体下潜，从对手侧面穿到背后","建立seatbelt grip","插入hooks"],
        tip: "关键：half guard → underhook → dog fight → back take是Lucas Leite的经典路线。关键是不要在dog fight停留太久。" },
      { type: "sweep", name: "电梯扫 Elevator Sweep",
        steps: ["用蝴蝶hook勾住对手被缠腿内侧","上体紧贴，拿住underhook","与蝴蝶扫类似：向underhook方向倾倒","hook腿上提完成翻转"],
        tip: "关键：本质是在half guard里做蝴蝶扫。需要先把脚从缠腿状态转成蝴蝶hook。" },
      { type: "sweep", name: "Knee Shield / Z-Guard进攻",
        steps: ["建立knee shield（膝盖抵住对手胸口/肩膀）","控制对手一侧袖口+同侧衣领","knee shield侧脚踩对手髋部推开制造空间","可以从这里做arm drag → back take","或者转butterfly hook → sweep"],
        tip: "关键：knee shield是half guard的'安全模式'——先稳定再决定进攻路径。" },
      { type: "transition", name: "深半防守 Deep Half Entry",
        steps: ["当对手压力太大拿不到underhook时","身体潜到对手被缠腿的下方","肩膀扛住对手大腿","双手抱住对手该腿","进入deep half guard","从deep half可做多种扫技或back take"],
        tip: "关键：deep half是'被压了就往下钻'的策略。Jeff Glover和Ryan Hall的标志性位置。" },
      { type: "escape", name: "回到Full Guard",
        steps: ["用knee shield创造空间","shrimp髋部远离对手","解开缠腿，另一腿穿过","建立full closed guard","重新锁闭脚踝"],
        tip: "关键：有时退回full guard重新来也完全可以。" },
    ]
  },

  sideControl: {
    name: "侧面控制", nameEn: "Side Control", role: "top", emoji: "⬛", category: "control",
    description: "身体垂直压在对手胸部上方。BJJ中最常见的控制位置，可以向多方向transition，submission选项丰富。",
    keyPoints: [
      "体重要沉在对手胸口——胸对胸的压力，不要浮起来",
      "Crossface控制：前臂横压对手脸部，让其头只能看向远侧",
      "膝盖顶住对手近侧髋部——阻止其转身恢复guard",
      "先稳定位置再考虑进攻——不要急着上submission而丢位置",
      "用小幅度调整维持压力，大动作反而给对手空间",
    ],
    chains: [
      { type: "submission", name: "美国锁 Americana",
        steps: ["确保侧控稳定，crossface到位","当对手远侧手臂放在地面时","一手按住手腕压到地面（形成L形）","另一手从手臂下方穿过","握住自己压腕手的手腕形成figure-4","保持对手肘部为支点不离地","缓慢将手腕沿弧线向头部方向提起"],
        tip: "关键：肘部是支点必须固定在地面。发力方向是手腕画弧线向头部，不是直接向上提。" },
      { type: "submission", name: "木村锁 Kimura",
        steps: ["目标是对手的近侧手臂","一手控制其手腕","另一手从对手上臂外侧穿过","握住自己控制手腕的手形成figure-4","可能需要step over对手头部增加控制","用身体旋转的力量将手腕向背部扭转"],
        tip: "关键：Kimura的力量来源是身体转动。如果finish不了，Kimura grip本身也是很好的控制手段。" },
      { type: "submission", name: "棒球棒绞 Baseball Bat Choke",
        steps: ["一手深抓对手远侧衣领（四指朝内）","另一手抓近侧衣领（四指朝外）——双手像握棒球棒","手到位后从对手身上滑到north-south方向","胸口压低，收紧双手完成绞杀"],
        tip: "关键：很多人在pass过程中就提前埋好grip，到达侧控时直接旋转finish。" },
      { type: "transition", name: "过渡到骑乘 Mount",
        steps: ["确保侧控稳定","将体重短暂移到对手上体","远侧膝盖沿地面滑向对手髋部","膝盖越过腹部到另一侧","坐稳mount调整hooks和base"],
        tip: "关键：过渡时保持胸口压力不中断——一旦抬身对手就会插膝盖defense。" },
      { type: "transition", name: "膝盖压腹 Knee on Belly",
        steps: ["从侧控提起上体","近侧膝盖放到对手腹部/胸口","另一脚外撑保持平衡","一手控制远侧衣领（拉起），一手抓裤腿","体重通过膝盖施压"],
        tip: "关键：KOB是逼迫对手反应的位置——每种反应你都有对应进攻。" },
      { type: "transition", name: "North-South南北位",
        steps: ["从侧控向对手头部方向旋转180度","变成头对头、胸口压住对手脸部","双手控制对手手臂/腰带","可以直接上North-South choke"],
        tip: "关键：旋转时贴着对手身体旋转。N/S的压力非常窒息。" },
    ]
  },

  sideControlBottom: {
    name: "侧控（下位逃脱）", nameEn: "Side Control Bottom", role: "bottom", emoji: "😰", category: "escape",
    description: "被侧面控制是很不利的位置。但不要恐慌——frame住、制造空间、恢复guard是系统化的过程。",
    keyPoints: [
      "不要平躺——侧身面向对手是第一步",
      "建立Frame：近侧前臂顶对手颈部，远侧手推对手髋部——用骨骼支撑",
      "保护颈部：下巴内收",
      "耐心等待对手transition或attack时产生的空间",
      "对手越急着attack越容易出现空间——让他犯错",
    ],
    chains: [
      { type: "escape", name: "虾行逃脱 Shrimp Escape",
        steps: ["建立frame：近侧前臂顶对手颈/肩，远侧手推对手髋","双脚踩地做一个bridge顶起对手","趁bridge制造的空间立刻shrimp——髋部快速远离","近侧膝盖弯曲插入两人之间","用膝盖作为frame继续制造空间","恢复half guard或full guard"],
        tip: "关键：bridge+shrimp是组合动作——bridge制造垂直空间，shrimp利用它做水平移动。一次不够就连续做多次。" },
      { type: "escape", name: "翻桥逃脱 Bridge & Roll",
        steps: ["当对手体重前倾或一只手去attack时","一手控制对手远侧手臂拉到你身体这边","同侧脚勾住对手同侧腿","爆发性bridge向被控手臂方向","将对手翻转——你到top"],
        tip: "关键：时机很重要——对手专注attack时重心前移是最佳时机。" },
      { type: "escape", name: "Ghost Escape幽灵逃脱",
        steps: ["当对手从侧控转向north-south方向时","利用旋转产生的瞬间空间","身体向对手头部方向滑动（和对手旋转同向）","从对手身下穿出去","到达对手背后或龟位","快速恢复guard或站起"],
        tip: "关键：Ghost escape需要精确时机——在对手旋转的动作中做。像'顺着水流游'。" },
    ]
  },

  kesaGatame: {
    name: "浮固 / 袈裟固", nameEn: "Kesa Gatame (Scarf Hold)", role: "top", emoji: "🔒", category: "control",
    description: "柔道传统压制技。坐在对手身侧，一手搂住头/颈，另一手控制近侧手臂，髋部紧贴。压力极大、控制极强，在MMA中也非常有效。",
    keyPoints: [
      "髋部紧贴对手身侧——不要留空间",
      "搂头的手要深——前臂穿过后颈，手抓到远侧",
      "控制近侧手臂：夹在腋下或控制手腕",
      "双腿展开base——前脚弯曲身前，后脚伸直身后，三角支撑",
      "体重通过侧肋骨/髋部施加在对手胸口——不是用上体压",
      "对手常见逃脱是向你背后翻转——保持base",
    ],
    chains: [
      { type: "submission", name: "头臂绞 Head & Arm Choke",
        steps: ["确保搂头手臂深穿过对手颈部","对手一只手臂被夹在你搂头手臂和身体之间","形成'头+手臂'同时压迫颈部的条件","收紧搂头手臂，头部下压","身体微微前倾增加压力","对手自己的肩膀帮助施压——等待tap"],
        tip: "关键：靠位置和压力完成的绞杀，不需要太多肌肉发力。搂头要够深，手臂要被困在里面。" },
      { type: "submission", name: "美国锁 Americana (from Kesa)",
        steps: ["在kesa控制中，对手近侧手臂被夹在腋下","腾出手按住对手手腕向地面压","形成figure-4锁","利用体重优势慢慢提手腕"],
        tip: "关键：从kesa做americana角度不同于标准侧控，但kesa控制力极强对手很难防守。" },
      { type: "submission", name: "反向袈裟绞 Reverse Kesa Attacks",
        steps: ["从标准kesa转为反向（面朝对手脚方向）","搂腰或控制对手手臂","可以攻击对手近侧手臂——americana或直臂锁","也可以从这里转到north-south"],
        tip: "关键：反向kesa是向mount和north-south过渡的好跳板。" },
      { type: "transition", name: "过渡到标准侧控",
        steps: ["松开搂头，手移到crossface位置","另一手从夹臂改为控制远侧","身体旋转为垂直标准侧控","膝盖顶住髋部"],
        tip: "关键：当kesa位submission打不出来时，转回标准侧控重新布局是明智选择。" },
      { type: "transition", name: "过渡到Mount",
        steps: ["从kesa将搂头手改为交叉压脸","后腿慢慢越过对手身体","利用已有的髋部接触作为滑动支点","建立mount"],
        tip: "关键：从kesa到mount比从标准侧控更近——因为你已经紧贴对手了。" },
    ]
  },

  kesaGatameBottom: {
    name: "浮固（下位逃脱）", nameEn: "Kesa Gatame Bottom", role: "bottom", emoji: "😤", category: "escape",
    description: "被浮固压住非常难受——胸口压力大、手臂被控、呼吸困难。但它有明确的弱点：背后毫无防守。",
    keyPoints: [
      "保持冷静控制呼吸——kesa的压力窒息但不致命",
      "kesa的弱点在背后——对手背朝你的那一侧是逃脱方向",
      "被困手臂争取抽出来——抽出来就打开逃脱空间",
      "不要正面bridge——kesa的base很稳，正面翻不动",
    ],
    chains: [
      { type: "escape", name: "背后翻转 Back Roll Escape",
        steps: ["被困手臂尽量向对手后方移动（绕到背后）","另一手推对手后腰/臀部","bridge向对手的背部方向（不是侧面！）","利用kesa位缺乏后方base的弱点","将对手向后翻倒","你到top位"],
        tip: "关键：方向是关键——向对手后脑方向翻。因为kesa位的双腿都在前方/侧面，后方完全没有base。" },
      { type: "escape", name: "抽手逃脱 Arm Extraction → Guard",
        steps: ["被困手臂向下（朝自己髋部）抽动","配合bridge制造瞬间空间","手臂抽出后立刻建立frame","shrimp髋部远离","膝盖插入重建guard"],
        tip: "关键：手臂抽出后不要停——立刻进入frame → shrimp → guard recovery。" },
      { type: "escape", name: "坐起反控 Sit-up Escape",
        steps: ["自由手绕到对手后方","抓住腰带或后裤腰","用grip辅助坐起来","身体向对手背后方向移动","打破kesa控制"],
        tip: "关键：需要core力量和时机——在对手放松压力的瞬间坐起。" },
    ]
  },

  mount: {
    name: "骑乘", nameEn: "Mount", role: "top", emoji: "👑", category: "control",
    description: "坐在对手腰腹上方。仅次于背控的最强位置——重力完全站在你这边，submission选项极其丰富。",
    keyPoints: [
      "髋部下沉贴紧，膝盖夹紧——像骑马一样",
      "低位mount先稳定，逐渐向高位mount移动",
      "高位mount = armbar/choke的最佳攻击位",
      "对手会bridge翻转——降低重心+张开腿base应对",
      "不要双手撑地——撑地=把手臂送给对手",
      "对手手放哪你就攻击哪——放胸口打americana，推你打armbar，护颈打choke",
    ],
    chains: [
      { type: "submission", name: "十字固 Armbar (from Mount)",
        steps: ["向高位mount移动","一手控制目标手臂手腕","另一手撑在对手头旁地面","攻击侧脚踩到对手头旁边","另一腿越过对手脸部","身体后倒，夹紧双腿","髋部上顶完成armbar"],
        tip: "关键：mount armbar最关键是不要丢位置——腿要夹紧特别是过头的那条腿。S-mount是更高阶的起始位。" },
      { type: "submission", name: "十字绞 Cross Choke (Gi)",
        steps: ["一手深插对手远侧衣领（四指朝内，越深越好）","耐心等待——这只手到位后不要急","另一手从另一侧也抓衣领","双手呈X形交叉","肘部内收，前臂骨顶住颈部两侧","身体前倾施压辅助"],
        tip: "关键：第一只手的深度决定成败。Roger Gracie凭这一招横扫所有人——因为他的第一手永远够深。" },
      { type: "submission", name: "Ezekiel绞 袖绞",
        steps: ["一手从对手头下方穿过到另一侧","穿过的手抓住自己另一只手的袖口内侧","被抓袖口的手刀横切对手喉咙","穿过的手向上提+切的手向下压，形成剪切力"],
        tip: "关键：Ezekiel是mount的隐藏杀招——对手全力防cross choke时不会预料到这个。" },
      { type: "submission", name: "美国锁 Americana (from Mount)",
        steps: ["当对手一只手臂放在地面","按住手腕压向地面","另一手穿过手臂下方","figure-4锁","利用mount的体重优势慢慢提手腕"],
        tip: "关键：从mount做比侧控更有优势——体重全压上面。" },
      { type: "transition", name: "过渡到背控 Back Take",
        steps: ["当对手翻身（趴下）试图逃脱时","顺势滑到背后——不要阻止对手翻身","建立seatbelt grip","插入hooks"],
        tip: "关键：对手翻身=送背。如果submission打不出，故意施压让对手想翻身然后顺势拿背。" },
    ]
  },

  mountBottom: {
    name: "骑乘（下位逃脱）", nameEn: "Mount Bottom", role: "bottom", emoji: "😫", category: "escape",
    description: "被骑乘是最危险的位置之一。保持冷静、保护手臂和颈部、系统性逃脱。",
    keyPoints: [
      "双肘紧贴身体——T-Rex手臂。绝对不要伸直手臂推",
      "不要着急翻——先保护好自己再找时机",
      "逃脱优先级：肘膝逃脱（高百分比）> trap & roll（爆发性）",
      "保持呼吸——恐慌是最大敌人",
    ],
    chains: [
      { type: "escape", name: "肘膝逃脱 Elbow-Knee Escape",
        steps: ["双臂frame住（肘部护身体两侧）","一侧肘部向下，和同侧膝盖尝试连接","做small bridge制造髋部空间","shrimp同时膝盖插入两人之间","用膝盖/小腿作为屏障","继续shrimp直到恢复half guard"],
        tip: "关键：最高百分比mount逃脱——即使对方比你大很多也能用。连续做3-4次bridge-shrimp就能逃出来。" },
      { type: "escape", name: "陷阱翻桥 Trap & Roll (Upa)",
        steps: ["选择一侧：同侧手抓对手手腕","同侧脚勾住对手同侧脚","两个控制点同时到位后","爆发性bridge直接向被困侧翻转","对手手脚都被困无法base","翻入对手closed guard"],
        tip: "关键：手和脚必须同时trap住。最佳时机是对手试图submission时伸出手的瞬间。白带第一课。" },
      { type: "escape", name: "高位mount降级",
        steps: ["如果对手到了高位mount（坐胸口）","不要急着逃——先推回低位","双手推对手膝盖/髋部结合shrimp","对手回到低位后执行标准逃脱"],
        tip: "关键：高位mount逃脱难度远大于低位——先降级再逃脱是正确策略。" },
    ]
  },

  backControl: {
    name: "背部控制", nameEn: "Back Control", role: "top", emoji: "🏆", category: "control",
    description: "BJJ王者位置。在对手背后，双hooks缠住腰部，seatbelt grip控制上体。对手看不到你、无法有效防守。",
    keyPoints: [
      "Seatbelt grip：一手过肩绕颈（choking hand），一手穿腋下抱胸",
      "双hooks脚跟勾住对手大腿内侧",
      "身体偏向choking hand一侧",
      "如果对手摘hooks，只要seatbelt还在就有控制",
      "Body triangle是hooks的高阶替代——更难逃脱",
    ],
    chains: [
      { type: "submission", name: "裸绞 Rear Naked Choke (RNC)",
        steps: ["choking hand需要绕过对手颈部——最难的一步","对手会双手护颈——需要各种方法打开防线","方法1：另一手拨开对手护颈的手","方法2：从下巴上方强行插入","方法3：大幅切换角度创造空间","choking手到位后：前臂贴紧颈动脉","choking手放到另一手二头肌上","另一手放到对手后脑","夹肘+胸口前挺完成绞杀"],
        tip: "关键：RNC力量来自胸口膨胀+肘部内收，不是手臂挤压。正确位置下几秒就会tap。" },
      { type: "submission", name: "弓箭绞 Bow & Arrow Choke (Gi)",
        steps: ["choking hand深抓对手远侧衣领（四指朝内，越深越好）","另一手控制对手同侧腿——抓裤腿膝弯处","将控制腿那一侧hook取出","腿伸直踩在对手髋部/大腿辅助","身体向后伸展——一手拉领一手拉腿","像拉弓：对手身体被拉成弧形","颈部被衣领绞紧"],
        tip: "关键：弓箭绞可能是BJJ中finish率最高的绞杀之一。衣领抓握要够深至少过对手中线。拉腿的手是关键——没有拉腿对手可以转身。Roger Gracie和Braulio Estima的经典finish。" },
      { type: "submission", name: "短袖绞 Collar Choke (from Back)",
        steps: ["当RNC绕不过去时","直接用choking hand抓对手衣领","前臂骨顶住颈部一侧","另一手辅助拉衣领或抱头","身体偏移施压"],
        tip: "关键：不一定非要RNC——collar choke从背后做也非常有效。" },
      { type: "transition", name: "丢背控→过渡到Mount",
        steps: ["当对手摘hooks开始转身时","不要死拽seatbelt","顺势让对手翻到面朝上","你直接到mount位置"],
        tip: "关键：丢back control≠失败——过渡到mount你仍在上位。" },
    ]
  },

  backControlBottom: {
    name: "被背控（逃脱）", nameEn: "Back Control Bottom", role: "bottom", emoji: "🆘", category: "escape",
    description: "最危险的下位——各种choke威胁。优先级：保护颈部 > 清除hooks > 滑脱逃生。",
    keyPoints: [
      "双手始终保护颈部——至少一手在下巴和choking hand之间",
      "不要让choking hand穿过你的下巴",
      "逃脱方向是向choking hand那侧滑落——反直觉但正确",
      "背靠地面是相对安全的中间状态",
      "不要趴下——那样更容易被bow & arrow / RNC",
    ],
    chains: [
      { type: "escape", name: "经典滑落 Slide to Choking Side",
        steps: ["双手保护颈部——紧贴下巴","身体向choking hand方向移动","让肩膀落向地面","身体逐渐滑落到对手身侧","肩膀触地后已脱离最危险位置","继续转身面对对手重建guard"],
        tip: "关键：向choking hand那侧滑——用肩膀压住对手choking手臂。很多人本能往另一侧逃反而把脖子送过去了。" },
      { type: "escape", name: "清除Hooks逃脱",
        steps: ["保护好颈部是前提","用脚依次剥离对手hooks","先踩住对手一侧脚固定","身体向被踩脚方向旋转","另一个hook自然脱落","快速转身面对对手"],
        tip: "关键：一次清一个hook。清掉hooks后对手控制力大幅下降。" },
      { type: "escape", name: "防弓箭绞：手控衣领",
        steps: ["感觉到对手在抓你衣领时","同侧手立刻抓住自己衣领——不给对手空间","另一手控制对手正在抓领的手","转身面对对手进入guard"],
        tip: "关键：防bow & arrow的核心是不让对手第一手深入衣领。一旦grip深了就很难防。" },
    ]
  },

  turtle: {
    name: "龟缩", nameEn: "Turtle", role: "bottom", emoji: "🐢", category: "escape",
    description: "四肢着地蜷缩。通常是过渡位置——不要停留。三个选择：恢复guard、站起来、反攻。",
    keyPoints: [
      "肘部夹紧膝盖——不给对手穿手穿hooks的空间",
      "下巴内收保护颈部",
      "不要停留超过3秒——turtle是过渡站不是家",
    ],
    chains: [
      { type: "escape", name: "Sit-out逃脱",
        steps: ["一手撑地","同侧腿向外踢出","身体迅速旋转面向对手","建立面对面位置或guard"],
        tip: "关键：要快速连贯——力量来自爆发性和意外性。" },
      { type: "escape", name: "Granby Roll",
        steps: ["头部和一侧肩膀着地","向对手身下做前滚翻","利用翻滚动量穿过控制","翻滚结束直接面对对手","恢复guard"],
        tip: "关键：用肩膀和上背滚动，头不要着地。Eduardo Telles标志性技术。" },
      { type: "transition", name: "技术站立 Technical Stand-up",
        steps: ["一手撑地（远离对手侧）","同侧脚前踏","另一手做frame保护","站起同时面对对手"],
        tip: "关键：起身时不要背对对手。" },
      { type: "transition", name: "Peterson Roll反攻",
        steps: ["对手从侧面控制turtle时","一手从对手腿下穿过抓大腿","肩膀着地做滚动","利用grip将对手翻过去","你到top位"],
        tip: "关键：wrestling经典技术。对手体重在你上方时最有效。" },
    ]
  },

  northSouth: {
    name: "南北位", nameEn: "North-South", role: "top", emoji: "⬆️", category: "control",
    description: "头对头、胸口压住对手脸部的控制位置。压力极大，是侧控的常见延伸，有独特绞杀攻击。",
    keyPoints: [
      "胸对胸压住——体重全部施加在对手胸口和脸部",
      "双手控制对手手臂防止其frame",
      "髋部低沉不要翘起来",
    ],
    chains: [
      { type: "submission", name: "N/S绞 North-South Choke",
        steps: ["一手从对手颈侧绕过，前臂贴紧颈部","身体微微向choking手方向偏移","另一手辅助控制","整个身体向下沉","用体重+手臂位置完成blood choke"],
        tip: "关键：Marcelo Garcia标志性submission。手臂绕颈深度和身体下沉角度是关键。" },
      { type: "submission", name: "木村锁 Kimura (from N/S)",
        steps: ["从N/S控制对手一侧手臂","figure-4 grip锁住","身体旋转回侧控方向施加扭转力"],
        tip: "关键：对手手臂已经在控制范围内，很难收回。" },
      { type: "transition", name: "回到侧控 / 转另一侧",
        steps: ["从N/S向一侧旋转","回到该侧标准侧控","或旋转180度到对手另一侧"],
        tip: "关键：N/S ↔ 侧控自由切换可以消耗对手体力、打乱防御节奏。" },
    ]
  },
};

const TYPE_CONFIG = {
  submission: { label: "降服", color: "#ef4444", icon: "\u{1F480}" },
  sweep: { label: "扫技", color: "#3b82f6", icon: "\u{1F504}" },
  escape: { label: "逃脱", color: "#22c55e", icon: "\u{1F3C3}" },
  transition: { label: "过渡", color: "#a855f7", icon: "\u{27A1}\u{FE0F}" },
};
const ROLE_CONFIG = {
  top: { label: "上位", color: "#f59e0b" },
  bottom: { label: "下位", color: "#6b7280" },
};

export default function BJJReference() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedChain, setSelectedChain] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [searchText, setSearchText] = useState("");

  const positions = Object.entries(BJJ_DATA);
  const filtered = positions.filter(([, v]) => {
    const roleMatch = filterRole === "all" || v.role === filterRole;
    if (!searchText.trim()) return roleMatch;
    const s = searchText.toLowerCase();
    const nameMatch = v.name.includes(s) || v.nameEn.toLowerCase().includes(s);
    const chainMatch = v.chains.some(c => c.name.toLowerCase().includes(s) || c.name.includes(s));
    return roleMatch && (nameMatch || chainMatch);
  });

  const handleBack = useCallback(() => {
    if (selectedChain !== null) setSelectedChain(null);
    else if (selectedPosition) setSelectedPosition(null);
  }, [selectedChain, selectedPosition]);

  const gold = "#d4a853";

  if (!selectedPosition) {
    return (
      <div style={{ minHeight:"100vh",fontFamily:"'Noto Sans SC','PingFang SC',-apple-system,sans-serif",background:"linear-gradient(160deg,#0a0a0f 0%,#111827 40%,#0f172a 100%)",color:"#e2e8f0",padding:"20px 16px" }}>
        <div style={{ maxWidth:640,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:28,paddingTop:8 }}>
            <div style={{ fontSize:44,marginBottom:6 }}>{"\u{1F94B}"}</div>
            <h1 style={{ fontSize:26,fontWeight:900,margin:0,background:`linear-gradient(90deg,#f0e6d3,${gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:3 }}>巴柔位置速查</h1>
            <p style={{ fontSize:12,color:"#64748b",marginTop:6,letterSpacing:1 }}>BJJ Position & Technique Reference</p>
          </div>
          <div style={{ marginBottom:16 }}>
            <input type="text" placeholder="搜索位置或技术… (armbar, 蝴蝶, DLR, kimura...)" value={searchText} onChange={e=>setSearchText(e.target.value)} style={{ width:"100%",padding:"12px 16px",borderRadius:12,border:"1px solid #1e293b",background:"rgba(255,255,255,0.03)",color:"#e2e8f0",fontSize:14,outline:"none",boxSizing:"border-box" }} />
          </div>
          <div style={{ display:"flex",gap:8,marginBottom:20,justifyContent:"center",flexWrap:"wrap" }}>
            {[{key:"all",label:"全部"},{key:"top",label:"⬆ 上位"},{key:"bottom",label:"⬇ 下位"}].map(f=>(
              <button key={f.key} onClick={()=>setFilterRole(f.key)} style={{ padding:"7px 18px",borderRadius:20,border:filterRole===f.key?`1.5px solid ${gold}`:"1.5px solid #1e293b",background:filterRole===f.key?`${gold}18`:"rgba(255,255,255,0.02)",color:filterRole===f.key?gold:"#64748b",fontSize:13,fontWeight:600,cursor:"pointer" }}>{f.label}</button>
            ))}
          </div>
          <div style={{ display:"flex",justifyContent:"center",gap:16,marginBottom:20,fontSize:11,color:"#475569" }}>
            <span>{filtered.length} 个位置</span><span>·</span><span>{filtered.reduce((a,[,v])=>a+v.chains.length,0)} 个技术</span>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {filtered.map(([key,pos])=>{
              const counts={submission:0,sweep:0,escape:0,transition:0};
              pos.chains.forEach(c=>counts[c.type]++);
              return (
                <button key={key} onClick={()=>{setSelectedPosition(key);setSelectedChain(null);}} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:14,border:"1px solid #1e293b",background:"rgba(255,255,255,0.02)",cursor:"pointer",textAlign:"left",color:"#e2e8f0",width:"100%" }}>
                  <div style={{ fontSize:28,flexShrink:0,width:40,textAlign:"center" }}>{pos.emoji}</div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap" }}>
                      <span style={{ fontSize:15,fontWeight:700 }}>{pos.name}</span>
                      <span style={{ fontSize:10,padding:"1px 8px",borderRadius:8,background:ROLE_CONFIG[pos.role].color+"20",color:ROLE_CONFIG[pos.role].color,fontWeight:600 }}>{ROLE_CONFIG[pos.role].label}</span>
                    </div>
                    <div style={{ fontSize:11,color:"#475569",marginBottom:4 }}>{pos.nameEn}</div>
                    <div style={{ display:"flex",gap:8,fontSize:10,color:"#64748b",flexWrap:"wrap" }}>
                      {counts.submission>0&&<span style={{color:TYPE_CONFIG.submission.color}}>{"\u{1F480}"}{counts.submission}</span>}
                      {counts.sweep>0&&<span style={{color:TYPE_CONFIG.sweep.color}}>{"\u{1F504}"}{counts.sweep}</span>}
                      {counts.escape>0&&<span style={{color:TYPE_CONFIG.escape.color}}>{"\u{1F3C3}"}{counts.escape}</span>}
                      {counts.transition>0&&<span style={{color:TYPE_CONFIG.transition.color}}>{"\u{27A1}\u{FE0F}"}{counts.transition}</span>}
                    </div>
                  </div>
                  <div style={{ fontSize:16,color:"#334155" }}>›</div>
                </button>
              );
            })}
          </div>
          {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:"#475569",fontSize:14}}>没有找到匹配的位置或技术</div>}
          <div style={{textAlign:"center",marginTop:32,fontSize:11,color:"#334155",lineHeight:1.8}}>训练前快速预习 · 白带至蓝带核心技术体系</div>
        </div>
      </div>
    );
  }

  const pos=BJJ_DATA[selectedPosition];

  if(selectedChain!==null){
    const chain=pos.chains[selectedChain];
    const tc=TYPE_CONFIG[chain.type];
    return(
      <div style={{minHeight:"100vh",fontFamily:"'Noto Sans SC','PingFang SC',-apple-system,sans-serif",background:"linear-gradient(160deg,#0a0a0f 0%,#111827 40%,#0f172a 100%)",color:"#e2e8f0",padding:"20px 16px"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <button onClick={handleBack} style={{background:"none",border:"none",color:gold,fontSize:14,cursor:"pointer",padding:"4px 0",marginBottom:16,fontWeight:600}}>← {pos.name}</button>
          <div style={{padding:"22px 20px",borderRadius:16,background:"rgba(255,255,255,0.03)",border:"1px solid #1e293b",marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{fontSize:24}}>{tc.icon}</span>
              <div>
                <div style={{fontSize:20,fontWeight:800}}>{chain.name}</div>
                <div style={{display:"flex",gap:8,marginTop:4,alignItems:"center"}}>
                  <span style={{fontSize:11,padding:"2px 10px",borderRadius:10,background:tc.color+"20",color:tc.color,fontWeight:600}}>{tc.label}</span>
                  <span style={{fontSize:11,color:"#475569"}}>从 {pos.name} 出发</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <h3 style={{fontSize:13,fontWeight:700,color:gold,marginBottom:14,letterSpacing:1}}>动作步骤</h3>
            <div style={{display:"flex",flexDirection:"column"}}>
              {chain.steps.map((step,i)=>(
                <div key={i} style={{display:"flex",gap:14}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:28,flexShrink:0}}>
                    <div style={{width:26,height:26,borderRadius:"50%",background:tc.color+"20",border:`2px solid ${tc.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:tc.color,flexShrink:0}}>{i+1}</div>
                    {i<chain.steps.length-1&&<div style={{width:2,flex:1,minHeight:16,background:`${tc.color}22`}}/>}
                  </div>
                  <div style={{padding:"2px 0 18px 0",fontSize:14,lineHeight:1.75,color:"#cbd5e1"}}>{step}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:"16px 18px",borderRadius:12,background:`${gold}0a`,border:`1px solid ${gold}25`}}>
            <div style={{fontSize:13,fontWeight:700,color:gold,marginBottom:6}}>{"\u{1F4A1}"} 要点提示</div>
            <div style={{fontSize:14,lineHeight:1.9,color:"#94a3b8"}}>{chain.tip}</div>
          </div>
          <div style={{marginTop:24}}>
            <div style={{fontSize:12,color:"#475569",marginBottom:10}}>同位置其他技术：</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {pos.chains.map((c,i)=>i!==selectedChain&&(
                <button key={i} onClick={()=>setSelectedChain(i)} style={{padding:"6px 12px",borderRadius:8,fontSize:12,border:`1px solid ${TYPE_CONFIG[c.type].color}30`,background:`${TYPE_CONFIG[c.type].color}10`,color:TYPE_CONFIG[c.type].color,cursor:"pointer",fontWeight:500}}>
                  {TYPE_CONFIG[c.type].icon} {c.name.length>10?c.name.substring(0,10)+'…':c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:"100vh",fontFamily:"'Noto Sans SC','PingFang SC',-apple-system,sans-serif",background:"linear-gradient(160deg,#0a0a0f 0%,#111827 40%,#0f172a 100%)",color:"#e2e8f0",padding:"20px 16px"}}>
      <div style={{maxWidth:640,margin:"0 auto"}}>
        <button onClick={handleBack} style={{background:"none",border:"none",color:gold,fontSize:14,cursor:"pointer",padding:"4px 0",marginBottom:16,fontWeight:600}}>← 全部位置</button>
        <div style={{padding:"22px 20px",borderRadius:16,background:"rgba(255,255,255,0.03)",border:"1px solid #1e293b",marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
            <span style={{fontSize:36}}>{pos.emoji}</span>
            <div style={{flex:1}}>
              <h2 style={{fontSize:22,fontWeight:800,margin:0}}>{pos.name}</h2>
              <div style={{fontSize:12,color:"#475569"}}>{pos.nameEn}</div>
            </div>
            <span style={{fontSize:11,padding:"3px 12px",borderRadius:10,background:ROLE_CONFIG[pos.role].color+"20",color:ROLE_CONFIG[pos.role].color,fontWeight:600}}>{ROLE_CONFIG[pos.role].label}</span>
          </div>
          <p style={{fontSize:13,lineHeight:1.9,color:"#94a3b8",margin:0}}>{pos.description}</p>
        </div>
        <div style={{padding:"18px 18px",borderRadius:14,background:`${gold}08`,border:`1px solid ${gold}18`,marginBottom:22}}>
          <h3 style={{fontSize:13,fontWeight:700,color:gold,margin:"0 0 12px 0",letterSpacing:1}}>{"\u{1F4CC}"} 位置要点</h3>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {pos.keyPoints.map((p,i)=>(
              <div key={i} style={{display:"flex",gap:10,fontSize:13,lineHeight:1.8}}>
                <span style={{color:gold,fontWeight:700,flexShrink:0,minWidth:18}}>{i+1}.</span>
                <span style={{color:"#94a3b8"}}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <h3 style={{fontSize:13,fontWeight:700,color:gold,marginBottom:14,letterSpacing:1}}>{"\u{26D3}\u{FE0F}"} 技术链 · 点击查看详细步骤</h3>
        {["submission","sweep","escape","transition"].map(type=>{
          const chainsOfType=pos.chains.map((c,i)=>({...c,idx:i})).filter(c=>c.type===type);
          if(chainsOfType.length===0)return null;
          const tc=TYPE_CONFIG[type];
          return(
            <div key={type} style={{marginBottom:16}}>
              <div style={{fontSize:11,color:tc.color,fontWeight:700,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
                <span>{tc.icon}</span><span>{tc.label}</span><span style={{color:"#334155"}}>({chainsOfType.length})</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {chainsOfType.map(chain=>(
                  <button key={chain.idx} onClick={()=>setSelectedChain(chain.idx)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,border:`1px solid ${tc.color}18`,background:`${tc.color}06`,cursor:"pointer",textAlign:"left",color:"#e2e8f0",width:"100%"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:600}}>{chain.name}</div>
                      <div style={{fontSize:11,color:"#475569",marginTop:2}}>{chain.steps.length} 步</div>
                    </div>
                    <span style={{color:"#334155",fontSize:16}}>›</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
