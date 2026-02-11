import { useState } from "react"
import { paperList } from "../assets/info.ts"
import { PAPER, tagCategory } from '../typings/types'
import Paper from "./Paper.tsx"
import { tagCategories } from "../typings/constant.ts"
import { Divider } from "antd"

interface ITEM {
  label: string;
  key: tagCategory | 'all';
}

function PublicationList() {
  const [current, setCurrent] = useState<string>('all')
  const items: ITEM[] = tagCategories.map((tag) => ({
    label: tag,
    key: tag
  } as ITEM))
  items.unshift({ label: 'All', key: 'all' })

  const onClick = (e: any) => {
    setCurrent(e.key)
  }

  const getPaperList = (opt: string) => {
    if (opt === 'all')
      return paperList
    else {
      return paperList.filter((p: any) => p.tags.includes(opt))
    }
  }

  return (
    <div id="publication-list" style={{ paddingTop: 100 }}>
      <div>
        {items.map((item: ITEM) => {
          return (
            <button
              key={item.key}
              className={`tag ${item.key === current ? 'tag-active' : ''}`}
              onClick={() => onClick(item)}
            >
              {item.label}
            </button>)
        })}
      </div>

      <div className="paper-list">
        {getPaperList(current).map((paper: PAPER) =>
          <>
            <Paper
              key={paper.title}
              selected={paper}
            />
            <Divider style={{margin: '6px 0'}}/>
          </>
        )}
      </div>
    </div>
  )
}

export default PublicationList