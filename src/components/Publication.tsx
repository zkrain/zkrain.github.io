import { useState, useEffect, useRef } from "react"
import { paperList } from "../assets/info.ts"
import { PAPER } from '../typings/types'
import Paper from "./Paper.tsx"
import * as d3 from 'd3'
import { Button, Divider } from "antd"

function Publication() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const [hoveredAuthor, setHoveredAuthor] = useState<string | null>(null)
  const [hoveredPaper, setHoveredPaper] = useState<string | null>(null)
  const [visiblePapers, setVisiblePapers] = useState<PAPER[]>([])
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [selectedAuthors, setSelectedAuthors] = useState<Set<string>>(new Set())

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    const newSelected = new Set(selectedTags)
    if (newSelected.has(tag)) {
      newSelected.delete(tag)
    } else {
      newSelected.add(tag)
    }
    setSelectedTags(newSelected)
  }

  // Toggle author selection
  const toggleAuthor = (author: string) => {
    const newSelected = new Set(selectedAuthors)
    if (newSelected.has(author)) {
      newSelected.delete(author)
    } else {
      newSelected.add(author)
    }
    setSelectedAuthors(newSelected)
  }

  // Filter papers based on selected tags and authors
  const getFilteredPapers = (): PAPER[] => {
    if (selectedTags.size === 0 && selectedAuthors.size === 0) {
      return paperList
    }

    return paperList.filter((paper) => {
      // Check if paper contains any selected tag
      const hasSelectedTag = selectedTags.size === 0 || paper.tags.some(tag => selectedTags.has(tag))
      
      // Check if paper has any selected author
      const authors = paper.authorsA
        .replace(/\*/g, '')
        .split(', ')
        .concat(paper.authorsB.replace(/\*/g, '').split(', '))
        .filter(a => a.length > 0)
      const hasSelectedAuthor = selectedAuthors.size === 0 || authors.some(author => selectedAuthors.has(author))
      
      // Show paper if it matches selected tags OR selected authors (or both)
      if (selectedTags.size > 0 && selectedAuthors.size > 0) {
        return hasSelectedTag || hasSelectedAuthor
      } else if (selectedTags.size > 0) {
        return hasSelectedTag
      } else {
        return hasSelectedAuthor
      }
    })
  }

  // Helper: Get all visible papers in viewport
  const getVisiblePapers = (): PAPER[] => {
    const paperElements = document.querySelectorAll('.paper')
    const visible: PAPER[] = []
    
    paperList.forEach((paper) => {
      const paperEl = Array.from(paperElements).find((el) =>
        el.textContent?.includes(paper.title)
      ) as HTMLElement | undefined
      
      if (paperEl && isInViewport(paperEl)) {
        visible.push(paper)
      }
    })
    
    return visible
  }

  // Helper: Check if element is visible in the viewport
  const isInViewport = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    )
  }

  // Helper: Draw a cubic Bezier curve between two points
  const drawCurve = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string,
    width: number = 1,
    opacity: number = 0.3
  ) => {
    // Calculate control points for smooth cubic B茅zier curve
    const distance = Math.hypot(toX - fromX, toY - fromY)
    const offset = Math.min(distance * 0.3, 150)
    
    // Control point 1: offset from the start point
    const cp1X = fromX + offset
    const cp1Y = fromY
    
    // Control point 2: offset from the end point
    const cp2X = toX - offset
    const cp2Y = toY

    ctx.strokeStyle = color
    ctx.globalAlpha = opacity
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, toX, toY)
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  // Main canvas drawing function
  const drawConnections = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to window size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Clear canvas
    ctx.fillStyle = 'rgba(255, 255, 255, 0)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Get all tag elements and author elements
    const tagElements = document.querySelectorAll('.tag-list > .interest-tag')
    const authorElements = document.querySelectorAll('.author-list > .author')
    const paperElements = document.querySelectorAll('.paper')


    // Build maps of tag/author name to elements
    const tagMap = new Map<string, HTMLElement>()
    const authorMap = new Map<string, HTMLElement>()
    
    tagElements.forEach((el) => {
      const name = el.textContent?.trim()
      if (name) tagMap.set(name, el as HTMLElement)
    })

    authorElements.forEach((el) => {
      const name = el.textContent?.trim()
      if (name) authorMap.set(name, el as HTMLElement)
    })

    // Draw connections: tag 鈫?paper 鈫?author
    paperList.forEach((paper) => {
      const paperEl = Array.from(paperElements).find((el) =>
        el.textContent?.includes(paper.title)
      ) as HTMLElement | undefined

      if (!paperEl) return

      // Skip if paper is not in viewport
      if (!isInViewport(paperEl)) return

      const paperPos = paperEl.getBoundingClientRect()
      const paperCenterY = paperPos.top + paperPos.height / 2
      const isPaperHovered = hoveredPaper === paper.title

      // Draw connections from tags to paper
      paper.tags.forEach((tag) => {
        const tagEl = tagMap.get(tag)
        if (!tagEl) return
        const tagPos = tagEl.getBoundingClientRect()
        const tagCenterY = tagPos.top + tagPos.height / 2

        const isTagHovered = hoveredTag === tag
        const isTagSelected = selectedTags.has(tag)
        const isPaperOrTagHovered = isTagHovered || isPaperHovered
        const color = isPaperOrTagHovered || isTagSelected ? 'rgba(31, 111, 235, 1)' : 'rgba(88, 88, 88, 1)'
        const opacity = isPaperOrTagHovered || isTagSelected ? 0.8 : 0.18
        const width = isPaperOrTagHovered || isTagSelected ? 0.88 : 0.6

        drawCurve(ctx, tagPos.right + 10, tagCenterY, paperPos.left - 10, paperCenterY, color, width, opacity)
      })

      // Draw connections from paper to authors
      const authors = paper.authorsA
        .replace(/\*/g, '')
        .split(', ')
        .concat(paper.authorsB.replace(/\*/g, '').split(', '))
        .filter((a) => a.length > 0)

      authors.forEach((author) => {
        const authorEl = authorMap.get(author)
        if (!authorEl) return
        const authorPos = authorEl.getBoundingClientRect()
        const authorCenterY = authorPos.top + authorPos.height / 2

        const isAuthorHovered = hoveredAuthor === author
        const isAuthorSelected = selectedAuthors.has(author)
        const isPaperOrAuthorHovered = isAuthorHovered || isPaperHovered
        const color = isPaperOrAuthorHovered || isAuthorSelected ? 'rgba(31, 111, 235, 1)' : 'rgba(88, 88, 88, 1)'
        const opacity = isPaperOrAuthorHovered || isAuthorSelected ? 0.8 : 0.18
        const width = isPaperOrAuthorHovered || isAuthorSelected ? 0.88 : 0.6

        drawCurve(ctx, paperPos.right, paperCenterY, authorPos.left - 10, authorCenterY, color, width, opacity)
      })
    })
  }

  // Set up canvas on mount and redraw on hover/resize/scroll
  useEffect(() => {
    const handleResize = () => {
      drawConnections()
      setVisiblePapers(getVisiblePapers())
    }
    const handleScroll = () => {
      drawConnections()
      setVisiblePapers(getVisiblePapers())
    }
    
    drawConnections()
    setVisiblePapers(getVisiblePapers())
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hoveredTag, hoveredAuthor, hoveredPaper, selectedTags, selectedAuthors])

  const getAuthorList = (papers: PAPER[]) => {
    const authorSet = new Map<string, number>()
    papers.forEach((p: PAPER) => {
      const authors = p.authorsA.replace(/\*/g, "").split(', ').concat(p.authorsB.replace(/\*/g, "").split(', '))
      authors.forEach((a: string) => {
        if (a.length === 0) return
        if (authorSet.has(a)) {
          authorSet.set(a, (authorSet.get(a) || 0) + 1)
        }
        else {
          authorSet.set(a, 1)
        }
      })
    })
    return authorSet
  }

  const getTagList = (papers: PAPER[]) => {
    const tagSet = new Map<string, number>()
    papers.forEach((p: PAPER) => {
      p.tags.forEach((t: string) => {
        if (t.length === 0) return
        if (tagSet.has(t)) {
          tagSet.set(t, (tagSet.get(t) || 0) + 1)
        }
        else {
          tagSet.set(t, 1)
        }
      })
    })
    return tagSet 
  }

  // Calculate dynamic tag list from visible papers (show all tags, but weights based on visible)
  const visibleTagList = Array.from(getTagList(visiblePapers.length > 0 ? visiblePapers : paperList), ([name, count]) => ({ name, count }))
  
  // Create a map to look up counts for all tags (for scaling)
  const allTagList = Array.from(getTagList(paperList), ([name, count]) => ({ name, count }))
  
  // Scale based on visible tag counts, but show all tags
  const visibleTagCounts = new Map(visibleTagList.map(t => [t.name, t.count]))
  
  // For display: all tags with updated weights based on visible papers
  const displayTagList = allTagList.map(tag => ({
    name: tag.name,
    count: visibleTagCounts.get(tag.name) || 0  // 0 if not in visible papers
  }))
  
  const visibleTagSizeScale = d3.scaleLinear()
    .domain([1, Math.max(1, d3.max(displayTagList, d => d.count) || 1)])
    .range([0.88, 1.16])
  const visibleTagWeightScale = d3.scaleLinear()
    .domain([1, Math.max(1, d3.max(displayTagList, d => d.count) || 1)])
    .range([200, 600])

  // Calculate dynamic author list from visible papers (only show authors from visible papers)
  const reservedAuthors: string[] = ['Yingcai Wu', 'Di Weng', 'Huamin Qu', 'Yi Cai', 'Yu Zheng', 'Mingliang Xu']
  
  // Get visible authors from visible papers
  const visibleAuthorsFromPapers = Array.from(getAuthorList(visiblePapers.length > 0 ? visiblePapers : paperList), ([name, count]) => ({ name, count }))
  
  // Create a map of visible author counts for easy lookup
  const visibleAuthorCountsMap = new Map(visibleAuthorsFromPapers.map(a => [a.name, a.count]))
  
  // Build visibleAuthorList with reserved authors on top
  const visibleAuthorNames = (selectedAuthors.size > 0 || selectedTags.size > 0) ? Array.from(visibleAuthorsFromPapers.map(a => a.name)) : Array.from(new Set([...reservedAuthors, ...visibleAuthorsFromPapers.map(a => a.name)]))
  const visibleAuthorList = visibleAuthorNames.map(author => ({
    name: author,
    count: visibleAuthorCountsMap.get(author) || 1,
    isReserved: reservedAuthors.includes(author)
  })).sort((a, b) => b.count - a.count)
  
  const visibleAuthorSizeScale = d3.scaleLinear()
    .domain([1, Math.max(1, d3.max(visibleAuthorList, d => d.count) || 1)])
    .range([0.78, 1.05])
  const visibleAuthorWeightScale = d3.scaleLinear()
    .domain([1, Math.max(1, d3.max(visibleAuthorList, d => d.count) || 1)])
    .range([200, 600])

  const getPaperList = (opt: string) => {
    const filteredPapers = getFilteredPapers()
    if (opt === 'all'){
      return filteredPapers
    }
    else {
      return filteredPapers.filter((p: any) => p.category.includes(opt))
    }
  }

  return (
    <div id="publication" 
      style={{
        width: '95vw',
        margin: '0 auto',
        color: 'rgba(51, 51, 51, 0.87)',
        paddingTop: 110,
        display: 'flex',
        justifyContent: 'center',
      }}>
      {/* tag list */}
      <div className="tag-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '20vw',
          position: 'fixed',
          top: 110,
          left: '2.5vw',
          zIndex: 1,
        }}>
        <h3 style={{ marginTop: 0, width: '11vw', textAlign: 'right' }}>INTERESTS</h3>
        {displayTagList.map((tag) =>
          <div key={tag.name}
            className='interest-tag'
            onClick={() => toggleTag(tag.name)}
            onMouseEnter={() => setHoveredTag(tag.name)}
            onMouseLeave={() => setHoveredTag(null)}
            style={{
              fontSize: `${visibleTagSizeScale(Math.max(1, tag.count))}em`,
              fontWeight: visibleTagWeightScale(Math.max(1, tag.count)),
              width: '11vw',
              cursor: 'pointer',
              transition: 'all 0.2s',
              opacity: hoveredTag === null || hoveredTag === tag.name ? 1 : 0.5,
              textAlign: 'right',
              padding: '4px 0px',
            }}>
            <span style={{
              borderBottom: selectedTags.has(tag.name) ? '2px solid rgba(31, 111, 235, 0.8)' : 'none',
            }}>
              {tag.name}
            </span>
          </div>
        )}
      </div>

      {/* paper list */}
      <div className="paper-list"
        style={{
          width: '50vw',
          zIndex: 1,
        }}>
        <span>* denotes the corresponding author</span> <br/>
        {(selectedTags.size > 0 || selectedAuthors.size > 0) ? 
          <div style={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: 10,
            background: 'rgba(31, 111, 235, 0.05)',
            padding: '8px 0px',
            borderRadius: 4,
            fontSize: 14,
          }}>
            <span>Showing {getFilteredPapers().length} of {getPaperList('all').length} publications</span>
            <Button 
              style={{marginLeft: 10, padding: '1px 6px'}}
              onClick={() => {setSelectedTags(new Set()); setSelectedAuthors(new Set())}}>
              Clear Filters
            </Button>
          </div> : null}
        <Divider style={{ margin: '12px 0px' }} />
        {getPaperList('all').map((paper: PAPER, index: number) =>
          <div 
            key={paper.title}
            onMouseEnter={() => setHoveredPaper(paper.title)}
            onMouseLeave={() => setHoveredPaper(null)}
          >
            <Paper
              selected={paper}
              style={{
                background: hoveredPaper === null ? 'transparent' : hoveredPaper === paper.title ? 'rgba(31, 111, 235, 0.05)' : 'transparent',
                transition: 'opacity 0.2s',
              }}
            />
            {index !== getPaperList('all').length-1 ? <Divider style={{margin: '12px 0px'}}/> : null}
          </div>
        )}
      </div>

      {/* author list */}
      <div className="author-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '20vw',
          alignItems: 'flex-end',
          zIndex: 1,
          position: 'fixed',
          top: 110,
          right: '2.5vw',
        }}>
        <h3 style={{marginTop: 0, width: '10vw', textAlign: 'left'}}>COLLABORATORS</h3>
        {visibleAuthorList.map((author, idx) =>
          idx < 100 ? 
          (<div key={author.name}
            className='author'
            onClick={() => toggleAuthor(author.name)}
            onMouseEnter={() => setHoveredAuthor(author.name)}
            onMouseLeave={() => setHoveredAuthor(null)}
            style={{
              fontSize: `${visibleAuthorSizeScale(author.count)}em`,
              fontWeight: visibleAuthorWeightScale(author.count),
              width: '10vw',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s',
              opacity: hoveredAuthor === null || hoveredAuthor === author.name ? 1 : 0.5,
              padding: '2px 0px',
            }}>
              <span style={{
                borderBottom: selectedAuthors.has(author.name) ? '2px solid rgba(31, 111, 235, 0.8)' : 'none',
              }}>{author.name}</span>
          </div>) : null
        )}
      </div>
      
      <canvas id="canvas"
        ref={canvasRef}
        style={{
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          transition: 'opacity .3s ease-in',
          zIndex: -1,
          pointerEvents: 'none',
      }}>
      </canvas>
    </div>
  )
}

export default Publication