import thyroidJiankang from '@/assets/image/reportRule/rules_thyroid-jiankang.jpg'
import thyroidDifenxian from '@/assets/image/reportRule/rules_thyroid-difenxian.jpg'
import thyroidZhongfenxian from '@/assets/image/reportRule/rules_thyroid-zhongfenxian.jpg'
import thyroidGaofenxian from '@/assets/image/reportRule/rules_thyroid-gaofenxian.jpg'

import arteryJiankang from '@/assets/image/reportRule/rules_artery-jiankang.jpg'
import arteryDifenxian from '@/assets/image/reportRule/rules_artery-difenxian.jpg'
import arteryZhongfenxian from '@/assets/image/reportRule/rules_artery-zhongfenxian.jpg'
import arteryGaofenxian from '@/assets/image/reportRule/rules_artery-gaofenxian.jpg'

import liverCourageJiankang from '@/assets/image/reportRule/rules_liverCourage-jiankang.jpg'
import liverCourageDifenxian from '@/assets/image/reportRule/rules_liverCourage-difenxian.jpg'
import liverCourageZhongfenxian from '@/assets/image/reportRule/rules_liverCourage-zhongfenxian.jpg'
import liverCourageGaofenxian from '@/assets/image/reportRule/rules_liverCourage-gaofenxian.jpg'

import breastJiankang from '@/assets/image/reportRule/rules_breast-jiankang.jpg'
import breastDifenxian from '@/assets/image/reportRule/rules_breast-difenxian.jpg'
import breastZhongfenxian from '@/assets/image/reportRule/rules_breast-zhongfenxian.jpg'
import breastGaofenxian from '@/assets/image/reportRule/rules_breast-gaofenxian.jpg'

export default [
  {
    name: '甲状腺',
    key: 1,
    standards: [
      {
        key: 1,
        values: ['甲状腺弥漫性病变', '不分类', '中风险']
      },
      {
        key: 2,
        values: ['甲状腺囊肿', 'TI-RADS 2类', '低风险']
      },
      {
        key: 3,
        values: ['甲状腺实性/混合性结节', 'TI-RADS 3类', '<=20mm 低风险']
      },
      {
        key: 4,
        values: ['甲状腺实性/混合性结节', 'TI-RADS 3类', '>20mm 中风险']
      },
      {
        key: 5,
        values: ['甲状腺恶性结节', 'TI-RADS 4类', '高风险']
      }
    ],
    templates: [
      {
        name: '健康',
        key: 1,
        img: thyroidJiankang
      },
      {
        name: '低风险',
        key: 2,
        img: thyroidDifenxian
      },
      {
        name: '中风险',
        key: 3,
        img: thyroidZhongfenxian
      },
      {
        name: '高风险',
        key: 4,
        img: thyroidGaofenxian
      }
    ]
  },
  {
    name: '颈动脉',
    key: 2,
    standards: [
      {
        key: 1,
        values: ['内中膜增厚>1mm', '低风险']
      },
      {
        key: 2,
        values: ['点状强回声', '低风险']
      },
      {
        key: 3,
        values: ['斑块长径<=10mm', '低风险']
      },
      {
        key: 4,
        values: ['斑块长径>10mm', '中风险']
      },
      {
        key: 5,
        values: ['血管腔狭窄率>50%', '高风险']
      }
    ],
    templates: [
      {
        name: '健康',
        key: 1,
        img: arteryJiankang
      },
      {
        name: '低风险',
        key: 2,
        img: arteryDifenxian
      },
      {
        name: '中风险',
        key: 3,
        img: arteryZhongfenxian
      },
      {
        name: '高风险',
        key: 4,
        img: arteryGaofenxian
      }
    ]
  },
  {
    name: '肝脏',
    key: 3,
    standards: [
      {
        key: 1,
        values: ['①肝区近场回声弥漫性增强，远场回声衰减']
      },
      {
        key: 2,
        values: ['②肝内管道结构显示不清']
      },
      {
        key: 3,
        values: ['③肝脏轻中度肿大，边缘圆钝']
      },
      {
        key: 4,
        values: ['④血流不易显示，但肝内血管走行正常']
      },
      {
        key: 5,
        values: ['⑤肝右叶包膜及横膈显示不清']
      },
      {
        key: 6,
        values: ['具备第1项及2~4中一项---轻度脂肪肝']
      },
      {
        key: 7,
        values: ['具备第1项及2~4中两项---中度脂肪肝']
      },
      {
        key: 8,
        values: ['具备第1项及2~4中两项和第5项---重度脂肪肝']
      }
    ],
    templates: [
      {
        name: '健康',
        key: 1,
        img: liverCourageJiankang
      },
      {
        name: '低风险',
        key: 2,
        img: liverCourageDifenxian
      },
      {
        name: '中风险',
        key: 3,
        img: liverCourageZhongfenxian
      },
      {
        name: '高风险',
        key: 4,
        img: liverCourageGaofenxian
      }
    ]
  },
  {
    name: '乳腺',
    key: 4,
    standards: [
      {
        key: 1,
        values: ['「健康」正常乳腺']
      },
      {
        key: 2,
        values: ['「低风险」乳腺增生，乳腺结节，<10mm，良性']
      },
      {
        key: 3,
        values: ['「中风险」乳腺结节，≥10mm，良性']
      },
      {
        key: 4,
        values: ['「高风险」乳腺结节，恶性风险']
      },
      {
        key: 5,
        values: ['注意：良恶性均由诊断医生根据影像判定']
      }
    ],
    templates: [
      {
        name: '健康',
        key: 1,
        img: breastJiankang
      },
      {
        name: '低风险',
        key: 2,
        img: breastDifenxian
      },
      {
        name: '中风险',
        key: 3,
        img: breastZhongfenxian
      },
      {
        name: '高风险',
        key: 4,
        img: breastGaofenxian
      }
    ]
  },
  {
    name: '肠系膜淋巴结',
    key: 5,
    standards: [
      {
        key: 1,
        values: ['「健康」肠系膜未见淋巴结']
      },
      {
        key: 2,
        values: ['「低风险」肠系膜淋巴结', '长径≤10mm', '淋巴结可见']
      },
      {
        key: 3,
        values: ['「中风险」肠系膜淋巴结', '长径>10mm', '淋巴结肿大']
      },
      {
        key: 4,
        values: ['「高风险」转移性淋巴结']
      }
    ]
  }
]
