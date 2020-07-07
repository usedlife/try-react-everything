import React from 'react'
import { List } from '@/components'

import styles from './styles.module.scss'

const getNewList = ({ page, pageSize = 6 }) => {
  return new Promise((resolve) => {
    const getNum = (multiple = 100) => Math.ceil(Math.random() * multiple)
    const records = []
    const newsUrls = [
      'http://123.57.11.4/hmp/images/newsHTML/200101823963594752.html',
      "http://123.57.11.4/hmp/images/newsHTML/200099799050092544.html",

    ]
    const newsTitles = [
      '营养师每天坚持的7个饮食习惯，瘦身、美白、冻龄，一次到位！',
      "控制饮食+适度运动后，坚持6件燃脂小事，3个月后，衣服L码换M码",
    ]
    const imageUrls = [
      'http://123.57.11.4/hmp/images/classroom/200101463890984960.jpg',
      "http://123.57.11.4/hmp/images/classroom/200098035278151680.jpg",
    ]
    const imagetbUrls = [
      'http://123.57.11.4/hmp/images/classroom/200101408379371520.jpg',
      "http://123.57.11.4/hmp/images/classroom/200098005469233152.jpg",
    ]
    for (let i = (page - 1) * pageSize; i < page * pageSize; i++) {
      records.push({
        "releaseTime": 1594023058000,
        "newsUrl": newsUrls[i % newsUrls.length],
        "newsTitle": newsTitles[i % newsTitles.length],
        "imageUrl": imageUrls[i % imageUrls.length],
        "newMode": getNum(4),
        "imagetbUrl1": imagetbUrls[i % imagetbUrls.length],
        "newsSourceName": "佑健康",
        "newsId": "200101823963594752" + i,
        "visitSum": getNum(),
      })
    }
    setTimeout(() => {
      resolve({
        "code": 200,
        "data": {
            "current": page,
            "pages": 3,
            "records": records,
            "size": pageSize,
            "total": 3 * pageSize
        },
        "msg": "成功"
    })
    }, 300)
  })
}

const News = () => {
  /**
    "releaseTime": 1594023058000,
    "newsUrl": newsUrls[i % newsUrls.length],
    "newsTitle": newsTitles[i % newsTitles.length],
    "imageUrl": imageUrls[i % imageUrls.length],
    "newMode": getNum(4),
    "imagetbUrl1": imagetbUrls[i % imagetbUrls.length],
    "newsSourceName": "佑健康",
    "newsId": "200101823963594752" + i,
    "visitSum": getNum(),
   */
  const renderItem = (item, index) => {
    return (
      <div className={styles.tile_wrapper}>
        <div className={styles.img_box}>
          <img src={item.imageUrl} alt={item.newsTitle} />
        </div>
        <div className={styles.content_box}>
          <div>{item.newsTitle}</div>
          <Infos item={item} />
        </div>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <List 
        requestMethod={getNewList}
        renderItem={renderItem}
        getSource={s => ({list: s.records, isMore: s.pages > s.current, page: s.current})}
        rowKey="newsId"
      />
    </div>
  )
}

const Infos = ({item: { newsSourceName, releaseTime, visitSum }}) => (
  <div className={styles.infos}>
    <span>{newsSourceName}</span>
    <span>{visitSum}</span>
    <span>{releaseTime}</span>
  </div>
)

export default News